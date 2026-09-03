import prisma from "../src/lib/prisma";

async function verify() {
  const count = await prisma.letterRequest.count();
  const latest = await prisma.letterRequest.findFirst({ orderBy: { sequenceNumber: "desc" } });
  const first = await prisma.letterRequest.findFirst({ orderBy: { sequenceNumber: "asc" } });
  const counter = await prisma.letterCounter.findFirst({ where: { year: 2026 } });

  console.log("=== Status Database FIT E-Office ===");
  console.log("Total Surat Terdaftar:", count);
  console.log("Surat Pertama (#1):", first?.sequenceNumber, first?.fullNumber, first?.subject);
  console.log("Surat Terakhir (#" + latest?.sequenceNumber + "):", latest?.fullNumber, latest?.subject);
  console.log("Counter Tahun 2026:", counter?.currentNumber);
  console.log("Nomor Berikutnya jika Generate Baru:", (counter?.currentNumber || 0) + 1);
}

verify()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
