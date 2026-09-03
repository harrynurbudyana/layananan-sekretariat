import prisma from "../src/lib/prisma";
import { generateLetterNumber } from "../src/actions/letter-actions";

async function testNumbering() {
  console.log("=== Menguji Format Baru: 1532/AKD01/IT-DEK/2026 ===");

  const unitRpl = await prisma.unit.findFirst({ where: { code: "D3-RPL" } });
  const catAkd13 = await prisma.letterCategory.findFirst({ where: { code: "AKD13" } });

  if (!unitRpl || !catAkd13) {
    throw new Error("Data master unit atau kategori tidak ditemukan.");
  }

  // 1. Uji Mode Otomatis (Auto-Increment)
  console.log("\n1. Menguji Mode Otomatis...");
  const autoResult = await generateLetterNumber({
    unitId: unitRpl.id,
    categoryId: catAkd13.id,
    classificationCode: "AKD13",
    signeeCode: "IT-LKM",
    subject: "Surat Tugas Dosen Pembimbing Lapangan Magang MBKM Batch 7",
    applicantName: "Ahmad Fauzi, M.T.",
    recipient: "PT Telkom Indonesia (Persero) Tbk",
  });

  if (!autoResult.success || !autoResult.letter) {
    throw new Error(`Auto generator gagal: ${autoResult.error}`);
  }
  console.log("✓ Berhasil Auto Generate:", autoResult.letter.fullNumber);

  // 2. Uji Mode Manual dengan nomor acak unik
  const randomSeq = Math.floor(8000 + Math.random() * 1000);
  console.log(`\n2. Menguji Mode Manual (Nomor Urut Khusus: #${randomSeq})...`);
  const manualResult = await generateLetterNumber({
    isManual: true,
    manualSequenceNumber: randomSeq,
    unitId: unitRpl.id,
    categoryId: catAkd13.id,
    classificationCode: "AKD01",
    signeeCode: "IT-DEK",
    subject: "Surat Keputusan Susulan Penugasan Dosen Luar Biasa",
    applicantName: "Sekretariat Dekanat FIT",
    recipient: "Dosen Terkait",
  });

  if (!manualResult.success || !manualResult.letter) {
    throw new Error(`Manual generator gagal: ${manualResult.error}`);
  }
  console.log("✓ Berhasil Manual Generate:", manualResult.letter.fullNumber);

  // 3. Uji Deteksi Duplikasi Nomor Manual
  console.log("\n3. Menguji Validasi Anti-Duplikasi Nomor Manual...");
  const duplicateResult = await generateLetterNumber({
    isManual: true,
    manualSequenceNumber: randomSeq,
    unitId: unitRpl.id,
    categoryId: catAkd13.id,
    classificationCode: "AKD01",
    signeeCode: "IT-DEK",
    subject: "Uji Duplikasi",
    applicantName: "Tester",
  });

  if (duplicateResult.success) {
    throw new Error("Validasi duplikasi gagal (seharusnya menolak nomor kembar)");
  }
  console.log("✓ Berhasil Menolak Duplikasi:", duplicateResult.error);

  console.log("\n=== Semua Pengujian Berhasil! ===");
}

testNumbering()
  .catch((e) => {
    console.error("Test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
