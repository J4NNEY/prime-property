import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireSuperadmin } from "@/lib/auth";

// Toggle user active status or reset password
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireSuperadmin();
    const { id } = await params;
    const body = await request.json();

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan." }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    let action = "update";

    if (body.isActive !== undefined) {
      updateData.isActive = body.isActive;
      action = body.isActive ? "enable" : "disable";
    }

    if (body.newPassword) {
      updateData.password = await bcrypt.hash(body.newPassword, 10);
      action = "reset_password";
    }

    await prisma.user.update({ where: { id }, data: updateData });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action,
        entityType: "user",
        entityId: id,
        userId: session.userId,
        changes: JSON.stringify({ action, target: user.email }),
      },
    });

    return NextResponse.json({ message: "User berhasil diperbarui." });
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
