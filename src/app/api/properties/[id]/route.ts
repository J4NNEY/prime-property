import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession, requireSuperadmin } from "@/lib/auth";
import { serializeProperty } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const property = await prisma.property.findUnique({
      where: { id, deletedAt: null },
      include: { creator: { select: { name: true } } },
    });

    if (!property) {
      return NextResponse.json({ error: "Properti tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ property: serializeProperty(property) });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireSuperadmin();
    const { id } = await params;

    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Properti tidak ditemukan." }, { status: 404 });
    }

    const body = await request.json();
    const {
      namaProperty, group, lebar, panjang, hadap, tipe,
      tingkat, price, carport, status, siap, mapsLink, kawasan, unit,
    } = body;

    // Validation
    const errors: Record<string, string> = {};
    if (namaProperty !== undefined && (namaProperty.length < 3 || namaProperty.length > 100)) {
      errors.namaProperty = "Nama properti harus 3-100 karakter.";
    }
    if (lebar !== undefined && lebar <= 0) errors.lebar = "Lebar harus lebih dari 0.";
    if (panjang !== undefined && panjang <= 0) errors.panjang = "Panjang harus lebih dari 0.";
    if (tipe !== undefined && !["Ruko", "Villa"].includes(tipe)) errors.tipe = "Tipe harus Ruko atau Villa.";
    if (tingkat !== undefined && (tingkat < 1 || tingkat > 10)) errors.tingkat = "Tingkat harus 1-10.";
    if (price !== undefined && price <= 0) errors.price = "Harga harus lebih dari 0.";
    if (mapsLink && !mapsLink.includes("google.com/maps")) {
      errors.mapsLink = "Link maps harus berisi domain google.com/maps.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Track changes for audit log
    const changes: Record<string, { from: unknown; to: unknown }> = {};
    const updateData: Record<string, unknown> = {};

    if (namaProperty !== undefined && namaProperty !== existing.namaProperty) {
      changes.namaProperty = { from: existing.namaProperty, to: namaProperty };
      updateData.namaProperty = namaProperty.trim();
    }
    if (group !== undefined) { updateData.group = group?.trim() || null; }
    if (lebar !== undefined) { updateData.lebar = parseFloat(lebar); }
    if (panjang !== undefined) { updateData.panjang = parseFloat(panjang); }
    if (hadap !== undefined) { updateData.hadap = hadap; }
    if (tipe !== undefined) { updateData.tipe = tipe; }
    if (tingkat !== undefined) { updateData.tingkat = parseFloat(tingkat); }
    if (price !== undefined) { updateData.price = BigInt(Math.round(price)); }
    if (carport !== undefined) { updateData.carport = Boolean(carport); }
    if (status !== undefined) { updateData.status = status; }
    if (siap !== undefined) { updateData.siap = siap; }
    if (mapsLink !== undefined) { updateData.mapsLink = mapsLink?.trim() || null; }
    if (kawasan !== undefined) { updateData.kawasan = kawasan; }
    if (unit !== undefined) { updateData.unit = unit?.trim() || null; }

    const property = await prisma.property.update({
      where: { id },
      data: updateData,
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: "update",
        entityType: "property",
        entityId: id,
        userId: session.userId,
        changes: JSON.stringify(changes),
      },
    });

    return NextResponse.json({
      property: serializeProperty(property),
      message: "Properti berhasil diperbarui.",
    });
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireSuperadmin();
    const { id } = await params;

    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Properti tidak ditemukan." }, { status: 404 });
    }

    // Soft delete
    await prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: "delete",
        entityType: "property",
        entityId: id,
        userId: session.userId,
        changes: JSON.stringify({ deleted: existing.namaProperty }),
      },
    });

    return NextResponse.json({ message: "Properti berhasil dihapus." });
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
