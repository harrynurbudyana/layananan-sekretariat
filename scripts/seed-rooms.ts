import { prismaRooms } from "../src/lib/prisma-rooms";

const OFFICIAL_ROOMS = [
  {
    code: "ADAUT",
    name: "Ruang Rapat Adaut",
    capacity: 30,
    location: "Lantai 2, Gedung Selaru FIT",
    facilities: "TV, AC, PC Operator, Alat untuk Conference, Mic, Kamera",
    priorityNotes: "Prioritas untuk rapat dengan eksternal dan rapat koordinasi fakultas",
    isCombo: false,
    comboChildCodes: null,
  },
  {
    code: "NAMTABUNG",
    name: "Ruang Rapat Namtabung",
    capacity: 20,
    location: "Lantai 2, Gedung Selaru FIT",
    facilities: "TV, AC",
    priorityNotes: "Bisa untuk rapat prodi dan rapat lainnya",
    isCombo: false,
    comboChildCodes: null,
  },
  {
    code: "MM1",
    name: "Ruang Multimedia 1",
    capacity: 40,
    location: "Lantai 3, Gedung Selaru FIT",
    facilities: "AC, TV, Sound System",
    priorityNotes: "Bisa untuk meeting besar atau seminar kecil",
    isCombo: false,
    comboChildCodes: null,
  },
  {
    code: "MM2",
    name: "Ruang Multimedia 2",
    capacity: 40,
    location: "Lantai 3, Gedung Selaru FIT",
    facilities: "AC, TV, Sound System",
    priorityNotes: "Bisa untuk meeting besar atau seminar kecil",
    isCombo: false,
    comboChildCodes: null,
  },
  {
    code: "MM_COMBO",
    name: "Ruang Multimedia 1 & 2 (Gabungan)",
    capacity: 80,
    location: "Lantai 3, Gedung Selaru FIT (Partisi Dibuka)",
    facilities: "AC, 2x TV, Integrated Sound System",
    priorityNotes: "Khusus untuk meeting besar / seminar kapasitas 80 orang (partisi dibuka)",
    isCombo: true,
    comboChildCodes: "MM1,MM2",
  },
  {
    code: "LOUNGE",
    name: "Ruang Meeting Learning Lounge",
    capacity: 8,
    location: "Lantai 1, Learning Lounge FIT",
    facilities: "TV, AC",
    priorityNotes: "Cocok untuk diskusi dan meeting terbatas",
    isCombo: false,
    comboChildCodes: null,
  },
];

async function seedRooms() {
  console.log("=== Memulai Seeding Master Ruangan FIT ke rooms.db ===");

  for (const r of OFFICIAL_ROOMS) {
    const room = await prismaRooms.room.upsert({
      where: { code: r.code },
      update: {
        name: r.name,
        capacity: r.capacity,
        location: r.location,
        facilities: r.facilities,
        priorityNotes: r.priorityNotes,
        isCombo: r.isCombo,
        comboChildCodes: r.comboChildCodes,
        isActive: true,
      },
      create: {
        code: r.code,
        name: r.name,
        capacity: r.capacity,
        location: r.location,
        facilities: r.facilities,
        priorityNotes: r.priorityNotes,
        isCombo: r.isCombo,
        comboChildCodes: r.comboChildCodes,
        isActive: true,
      },
    });
    console.log(`✓ Ruangan terdaftar: [${room.code}] ${room.name} (Kapasitas: ${room.capacity} org)`);
  }

  const count = await prismaRooms.room.count();
  console.log(`\nSelesai! Total ${count} ruangan resmi FIT aktif di rooms.db.`);
}

seedRooms()
  .catch(console.error)
  .finally(() => prismaRooms.$disconnect());
