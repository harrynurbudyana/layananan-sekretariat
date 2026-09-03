import prisma from "../src/lib/prisma";

async function main() {
  const units = await prisma.unit.findMany({
    select: { id: true, code: true, signeeCode: true, name: true, category: true },
    orderBy: { code: "asc" },
  });
  console.log("Total units in database:", units.length);
  units.forEach(u => console.log(`${u.id} | ${u.code.padEnd(10)} | ${u.signeeCode.padEnd(12)} | ${u.name} (${u.category})`));
}

main().finally(() => prisma.$disconnect());
