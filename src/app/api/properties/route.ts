import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession, requireSuperadmin } from "@/lib/auth";
import { serializeProperty } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";
    const kawasan = searchParams.get("kawasan") || "";
    const hadap = searchParams.get("hadap") || "";
    const tipe = searchParams.get("tipe") || "";
    const status = searchParams.get("status") || "";
    const siap = searchParams.get("siap") || "";
    const carport = searchParams.get("carport") || "";
    const lebarMin = searchParams.get("lebarMin") || "";
    const hargaMax = searchParams.get("hargaMax") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build where clause
    const where: Record<string, unknown> = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { namaProperty: { contains: search, mode: "insensitive" } },
        { group: { contains: search, mode: "insensitive" } },
        { kawasan: { contains: search, mode: "insensitive" } },
      ];
    }

    if (kawasan) {
      where.kawasan = { contains: kawasan, mode: "insensitive" };
    }

    if (hadap) {
      where.hadap = { contains: hadap, mode: "insensitive" };
    }

    if (tipe) {
      where.tipe = tipe;
    }

    if (status) {
      where.status = status;
    }

    if (siap) {
      where.siap = siap;
    }

    if (carport === "true") {
      where.carport = true;
    } else if (carport === "false") {
      where.carport = false;
    }

    if (lebarMin) {
      where.lebar = { gte: parseFloat(lebarMin) };
    }

    if (hargaMax) {
      where.price = { lte: BigInt(hargaMax) };
    }

    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        include: {
          creator: { select: { name: true } },
        },
      }),
      prisma.property.count({ where }),
    ]);

    const serialized = properties.map(serializeProperty);

    return NextResponse.json({
      properties: serialized,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireSuperadmin();

    const body = await request.json();
    const {
      namaProperty, group, lebar, panjang, hadap, tipe,
      tingkat, price, carport, status, siap, mapsLink, kawasan, unit,
    } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!namaProperty || namaProperty.length < 3 || namaProperty.length > 100) {
      errors.namaProperty = "Nama properti harus 3-100 karakter.";
    }
    if (!lebar || lebar <= 0) errors.lebar = "Lebar harus lebih dari 0.";
    if (!panjang || panjang <= 0) errors.panjang = "Panjang harus lebih dari 0.";
    if (!hadap) errors.hadap = "Hadap wajib diisi.";
    if (!tipe || !["Ruko", "Villa"].includes(tipe)) errors.tipe = "Tipe harus Ruko atau Villa.";
    if (!tingkat || tingkat < 1 || tingkat > 10) errors.tingkat = "Tingkat harus 1-10.";
    if (!price || price <= 0) errors.price = "Harga harus lebih dari 0.";
    if (!siap || !["siap_huni", "siap_kosong", "siap_huni_renovasi"].includes(siap)) {
      errors.siap = "Status siap tidak valid.";
    }
    if (!kawasan) errors.kawasan = "Kawasan wajib diisi.";
    if (mapsLink && !mapsLink.includes("google.com/maps")) {
      errors.mapsLink = "Link maps harus berisi domain google.com/maps.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const property = await prisma.property.create({
      data: {
        namaProperty: namaProperty.trim(),
        group: group?.trim() || null,
        lebar: parseFloat(lebar),
        panjang: parseFloat(panjang),
        hadap,
        tipe,
        tingkat: parseFloat(tingkat),
        price: BigInt(Math.round(price)),
        carport: Boolean(carport),
        status: status || "in_stock",
        siap,
        mapsLink: mapsLink?.trim() || null,
        kawasan,
        unit: unit?.trim() || null,
        createdBy: session.userId,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: "create",
        entityType: "property",
        entityId: property.id,
        userId: session.userId,
        changes: JSON.stringify({ created: namaProperty }),
      },
    });

    return NextResponse.json(
      { property: serializeProperty(property), message: "Properti berhasil ditambahkan." },
      { status: 201 }
    );
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
