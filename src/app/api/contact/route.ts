import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Simple in-memory rate limiting (3 per IP per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return true;
  }

  if (entry.count >= 3) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { nama, email, nomorHp, pesan } = body;

    // Validation
    if (!nama || !email || !nomorHp || !pesan) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    if (nomorHp.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Nomor HP minimum 10 digit." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitized = {
      nama: nama.trim().slice(0, 100),
      email: email.trim().slice(0, 100),
      nomorHp: nomorHp.trim().slice(0, 20),
      pesan: pesan.trim().slice(0, 1000),
      ipAddress: ip,
    };

    await prisma.contactMessage.create({ data: sanitized });

    return NextResponse.json({ message: "Pesan terkirim." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
