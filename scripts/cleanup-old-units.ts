import prisma from "../src/lib/prisma";

async function cleanupOldUnits() {
  console.log("=== Memeriksa & Membersihkan Unit Lama ===");

  const unitMappings: Record<string, string> = {
    MP: "D3-MP",
    PH: "D3-PHT",
    RPLA: "D3-RPL",
    SI: "D3-SI",
    SIA: "D3-SIA",
    TK: "D3-TKO",
    TT: "D3-TT",
    TRM: "D4-TRM",
    TU: "SKR",
    KMA: "KMH",
  };

  for (const [oldCode, newCode] of Object.entries(unitMappings)) {
    const oldUnit = await prisma.unit.findUnique({ where: { code: oldCode } });
    const newUnit = await prisma.unit.findUnique({ where: { code: newCode } });

    if (oldUnit && newUnit) {
      // Re-link any letter requests pointing to oldUnit
      const updatedLetters = await prisma.letterRequest.updateMany({
        where: { unitId: oldUnit.id },
        data: { unitId: newUnit.id },
      });
      console.log(`Relinked ${updatedLetters.count} letters from ${oldCode} (${oldUnit.signeeCode}) -> ${newCode} (${newUnit.signeeCode})`);

      // Delete the old unit
      await prisma.unit.delete({
        where: { id: oldUnit.id },
      });
      console.log(`✓ Berhasil menghapus unit lama: ${oldUnit.name} (${oldUnit.signeeCode})`);
    } else if (oldUnit && !newUnit) {
      console.warn(`Target unit ${newCode} not found for ${oldCode}`);
    }
  }

  const remainingUnits = await prisma.unit.findMany({
    select: { code: true, signeeCode: true, name: true, category: true },
    orderBy: { category: "asc" },
  });

  console.log("\n=== Daftar Unit Bersih Saat Ini (" + remainingUnits.length + " Unit) ===");
  remainingUnits.forEach((u: { category: string; name: string; signeeCode: string }) => {
    console.log(`- [${u.category}] ${u.name} (${u.signeeCode})`);
  });
}

cleanupOldUnits()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
