import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function createSession(userId: string, email: string, role: string) {
  const token = jwt.sign({ userId, email, role }, JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user || !user.isActive) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<JWTPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireSuperadmin(): Promise<JWTPayload> {
  const session = await requireAuth();
  if (session.role !== "superadmin") {
    throw new Error("Forbidden");
  }
  return session;
}
