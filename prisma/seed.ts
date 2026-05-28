import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create superadmin
  const superadminPassword = await bcrypt.hash("superadmin123", 10);
  const superadmin = await prisma.user.upsert({
    where: { email: "superadmin@primeproperty.id" },
    update: {},
    create: {
      email: "superadmin@primeproperty.id",
      password: superadminPassword,
      name: "Super Admin",
      role: "superadmin",
    },
  });

  // Create admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@primeproperty.id" },
    update: {},
    create: {
      email: "admin@primeproperty.id",
      password: adminPassword,
      name: "Admin Agent",
      role: "admin",
    },
  });

  console.log("✅ Users created");

  // Create 50 dummy properties
  const kawasanList = ["Krakatau", "Pancing", "Tembung", "Helvetia", "Cemara Asri", "Kuala", "Sunggal", "Marelan"];
  const hadapList = ["Utara", "Selatan", "Timur", "Barat", "Utara,Timur", "Selatan,Barat"];
  const tipeList = ["Ruko", "Villa"];
  const statusList = ["in_stock", "sold_out"];
  const siapList = ["siap_huni", "siap_kosong", "siap_huni_renovasi"];
  const namaList = [
    "Aston Villas", "Banyan Tree", "Cemara Residence", "Diamond Square",
    "Emerald Park", "Flora Garden", "Golden Gate", "Harmony Hills",
    "Ivory Tower", "Jade Palace", "Kensington", "Lotus Lake",
    "Maple Court", "Noble Heights", "Orchid Valley", "Pearl Bay",
    "Quantum Plaza", "Royal Crest", "Sapphire Ridge", "Topaz Terrace",
    "Unity Park", "Vista Grande", "Willow Creek", "Xenon Square",
    "Yellowstone", "Zenith Tower", "Azure Bay", "Bronze Gate",
    "Crystal Clear", "Dawn Residence", "Eclipse Tower", "Fortune Mall",
    "Grand Pavilion", "Harbor View", "Imperial Suite", "Jupiter Rise",
    "Kingdom Hall", "Liberty Square", "Monarch Estate", "Neptune Court",
    "Oasis Garden", "Pinnacle Tower", "Quartz Hill", "Riverside Walk",
    "Stellar Point", "Triumph Arc", "Urban Nest", "Vertex Mall",
    "Westfield", "Xanadu Park",
  ];

  for (let i = 0; i < 50; i++) {
    const nama = namaList[i] || `Property ${i + 1}`;
    await prisma.property.create({
      data: {
        namaProperty: `${nama} Blok ${String.fromCharCode(65 + (i % 26))}`,
        group: i % 3 === 0 ? `Group ${Math.ceil((i + 1) / 5)}` : null,
        lebar: parseFloat((3 + Math.random() * 8).toFixed(2)),
        panjang: parseFloat((10 + Math.random() * 15).toFixed(2)),
        hadap: hadapList[i % hadapList.length],
        tipe: tipeList[i % tipeList.length],
        tingkat: parseFloat((1 + Math.floor(Math.random() * 4)).toFixed(1)),
        price: BigInt(Math.floor(800000000 + Math.random() * 3000000000)),
        carport: i % 3 !== 0,
        status: statusList[i % 5 === 0 ? 1 : 0],
        siap: siapList[i % siapList.length],
        mapsLink: i % 4 === 0 ? "https://google.com/maps/place/Medan" : null,
        kawasan: kawasanList[i % kawasanList.length],
        unit: i % 5 === 0 ? "Ready Siap huni" : null,
        createdBy: superadmin.id,
      },
    });
  }

  console.log("✅ 50 properties created");
  console.log("");
  console.log("📋 Login credentials:");
  console.log("   Superadmin: superadmin@primeproperty.id / superadmin123");
  console.log("   Admin:      admin@primeproperty.id / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
