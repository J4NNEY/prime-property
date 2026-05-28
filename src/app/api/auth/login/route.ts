import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";

// Rate limiting for auth: 10 req/min/IP
const authRateLimitMap = new Map<string, { count: number; resetAt: number }>();
// Login attempt tracking: 5 failures in 30 min = 15 min lockout
const loginAttemptMap = new Map<string, { count: number; firstAttempt: number; lockedUntil: number }>();

function checkAuthRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = authRateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    authRateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }

  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

function checkLoginAttempts(email: string): { allowed: boolean; remainingMinutes?: number } {
  const now = Date.now();
  const entry = loginAttemptMap.get(email);

  if (!entry) return { allowed: true };

  if (entry.lockedUntil > now) {
    const remaining = Math.ceil((entry.lockedUntil - now) / 60000);
    return { allowed: false, remainingMinutes: remaining };
  }

  // Reset if 30 min window passed
  if (now - entry.firstAttempt > 1800000) {
    loginAttemptMap.delete(email);
    return { allowed: true };
  }

  if (entry.count >= 5) {
    entry.lockedUntil = now + 900000; // 15 min lockout
    return { allowed: false, remainingMinutes: 15 };
  }

  return { allowed: true };
}

function recordFailedAttempt(email: string) {
  const now = Date.now();
  const entry = loginAttemptMap.get(email);

  if (!entry || now - entry.firstAttempt > 1800000) {
    loginAttemptMap.set(email, { count: 1, firstAttempt: now, lockedUntil: 0 });
  } else {
    entry.count++;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (!checkAuthRateLimit(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    // Check lockout
    const attemptCheck = checkLoginAttempts(email);
    if (!attemptCheck.allowed) {
      return NextResponse.json(
        { error: `Akun terkunci sementara. Coba lagi dalam ${attemptCheck.remainingMinutes} menit.` },
        { status: 423 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isActive) {
      recordFailedAttempt(email);
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      recordFailedAttempt(email);
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    // Clear failed attempts on success
    loginAttemptMap.delete(email);

    const token = await createSession(user.id, user.email, user.role);

    const response = NextResponse.json({
      message: "Login berhasil.",
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
