const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const MONTH_MAP = {
  januari: 1, jan: 1,
  februari: 2, feb: 2,
  maret: 3, mar: 3,
  april: 4, apr: 4,
  mei: 5, may: 5,
  juni: 6, jun: 6,
  juli: 7, jul: 7,
  agustus: 8, agu: 8, ags: 8,
  september: 9, sep: 9,
  oktober: 10, okt: 10,
  november: 11, nov: 11,
  desember: 12, des: 12,
};

const ROMAN_MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function parseIndoDate(str) {
  if (!str || !str.trim()) return null;
  const parts = str.trim().toLowerCase().split(/\s+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const monthName = parts[1];
    const year = parseInt(parts[2], 10);
    const month = MONTH_MAP[monthName] || 1;
    if (!isNaN(day) && !isNaN(year)) {
      return new Date(year, month - 1, day);
    }
  }
  return null;
}

function parseCSVLine(line) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = "";
    } else {
      cur += char;
    }
  }
  result.push(cur.trim());
  return result;
}

async function importSpreadsheet() {
  console.log("=== Memulai Sinkronisasi Data Spreadsheet ke FIT E-Office ===");

  const content = fs.readFileSync("C:/Users/ENS/.gemini/antigravity/scratch/spreadsheet_data.csv", "utf-8");
  const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);

  // Cari baris header
  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("NO AGENDA") || lines[i].includes("KODE SURAT")) {
      headerIndex = i;
      break;
    }
  }

  if (headerIndex === -1) {
    throw new Error("Header spreadsheet tidak ditemukan!");
  }

  // Load existing Units & Categories
  let units = await prisma.unit.findMany();
  let categories = await prisma.letterCategory.findMany();

  const defaultUnit = units.find(u => u.code === "DEK") || units[0];
  const defaultCategory = categories.find(c => c.code === "AKD01") || categories[0];

  // Helper unit mapper
  function findUnit(unitStr, dariStr, kodeSurat) {
    const s = `${unitStr} ${dariStr} ${kodeSurat}`.toUpperCase();
    if (s.includes("D3-RPL") || s.includes("D3 RPLA") || s.includes("RPL")) return units.find(u => u.code === "D3-RPL") || defaultUnit;
    if (s.includes("D3-SI") || s.includes("D3 SI") || s.includes("KAPRODI SI")) return units.find(u => u.code === "D3-SI") || defaultUnit;
    if (s.includes("D3-SIA") || s.includes("D3 SIA") || s.includes("SIA")) return units.find(u => u.code === "D3-SIA") || defaultUnit;
    if (s.includes("D3-TKO") || s.includes("D3 TKO") || s.includes("TKO") || s.includes("TK")) return units.find(u => u.code === "D3-TKO") || defaultUnit;
    if (s.includes("D3-MP") || s.includes("D3 MP") || s.includes("MP")) return units.find(u => u.code === "D3-MP") || defaultUnit;
    if (s.includes("D3-PHT") || s.includes("D3 PHT") || s.includes("PHT") || s.includes("PH")) return units.find(u => u.code === "D3-PHT") || defaultUnit;
    if (s.includes("D3-TT") || s.includes("D3 TT") || s.includes("TT")) return units.find(u => u.code === "D3-TT") || defaultUnit;
    if (s.includes("D4-TRM") || s.includes("D4 TRM") || s.includes("TRM")) return units.find(u => u.code === "D4-TRM") || defaultUnit;
    if (s.includes("D4-SIKC") || s.includes("SIKC")) return units.find(u => u.code === "D4-SIKC") || defaultUnit;
    if (s.includes("S2-RTI") || s.includes("RTI")) return units.find(u => u.code === "S2-RTI") || defaultUnit;
    if (s.includes("KK-AITM") || s.includes("AITM")) return units.find(u => u.code === "KK-AITM") || defaultUnit;
    if (s.includes("KK-DBS") || s.includes("DBS") || s.includes("DBEST")) return units.find(u => u.code === "KK-DBS") || defaultUnit;
    if (s.includes("RA-ATAP") || s.includes("ATAP")) return units.find(u => u.code === "RA-ATAP") || defaultUnit;
    if (s.includes("IT-SDM") || s.includes("SDM")) return units.find(u => u.code === "SDM") || defaultUnit;
    if (s.includes("IT-LKM") || s.includes("LKM") || s.includes("MAGANG")) return units.find(u => u.code === "LKM") || defaultUnit;
    if (s.includes("IT-LAB") || s.includes("LAB")) return units.find(u => u.code === "LAB") || defaultUnit;
    if (s.includes("IT-LA") || s.includes(" LA ") || s.endsWith(" LA") || s.startsWith("LA")) return units.find(u => u.code === "LA") || defaultUnit;
    if (s.includes("IT-KMH") || s.includes("KEMAHASISWAAN") || s.includes("KMH")) return units.find(u => u.code === "KMH") || defaultUnit;
    if (s.includes("IT-SKR") || s.includes("SEKRETARIAT") || s.includes("SKR")) return units.find(u => u.code === "SKR") || defaultUnit;
    if (s.includes("IT-WD1") || s.includes("WADEK 1") || s.includes("WD1")) return units.find(u => u.code === "WD1") || defaultUnit;
    if (s.includes("IT-WD2") || s.includes("WADEK 2") || s.includes("WD2")) return units.find(u => u.code === "WD2") || defaultUnit;
    return defaultUnit;
  }

  // Helper category mapper
  async function findOrCreateCategory(codeStr, descStr) {
    if (!codeStr) return defaultCategory;
    const cleanCode = codeStr.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let cat = categories.find(c => c.code === cleanCode);
    if (!cat && cleanCode.length >= 3) {
      const group = cleanCode.substring(0, 3);
      cat = await prisma.letterCategory.create({
        data: {
          code: cleanCode,
          name: descStr || `Klasifikasi ${cleanCode}`,
          group,
          classificationCode: cleanCode,
          description: descStr || null,
        },
      });
      categories.push(cat);
    }
    return cat || defaultCategory;
  }

  let importedCount = 0;
  let maxSeq = 0;

  // Hapus data lama uji coba jika ada
  await prisma.letterRequest.deleteMany();

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const noAgendaStr = cols[1] ? cols[1].trim() : "";
    const seqNum = parseInt(noAgendaStr, 10);

    if (isNaN(seqNum) || noAgendaStr.toLowerCase() === "contoh") {
      continue;
    }

    if (seqNum > maxSeq) {
      maxSeq = seqNum;
    }

    const tglStr = cols[0] || "";
    const kodeSuratStr = cols[2] || "";
    const jenisKategori = cols[3] || "";
    const dari = cols[4] || "";
    const kepada = cols[5] || "";
    const jenisSurat = cols[6] || "";
    const perihal = cols[7] || cols[6] || `Surat Agenda #${seqNum}`;
    const statusUnit = cols[8] || "";
    const pic = cols[9] || "";

    // Parse date
    let dateObj = parseIndoDate(tglStr);
    if (!dateObj) {
      dateObj = new Date(2026, 0, 1);
    }

    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear() || 2026;
    const monthRomawi = ROMAN_MONTHS[month - 1];

    // Extract classification & signee from kodeSurat (e.g. "/SKR05/IT-D3-RPL/2026")
    let classificationCode = "AKD01";
    let signeeCode = "IT-DEK";
    let fullNumber = "";

    const matchFormat = kodeSuratStr.match(/^\/?([A-Z0-9]+)\/([A-Z0-9\-]+)\/(\d{4})$/i);
    if (matchFormat) {
      classificationCode = matchFormat[1].toUpperCase();
      signeeCode = matchFormat[2].toUpperCase();
      fullNumber = `${seqNum}/${classificationCode}/${signeeCode}/${year}`;
    } else if (kodeSuratStr.startsWith("/")) {
      fullNumber = `${seqNum}${kodeSuratStr}`;
      const m = kodeSuratStr.match(/\/([A-Z0-9]+)\/([A-Z0-9\-]+)/i);
      if (m) {
        classificationCode = m[1].toUpperCase();
        signeeCode = m[2].toUpperCase();
      }
    } else if (kodeSuratStr.trim()) {
      fullNumber = kodeSuratStr.trim();
    } else {
      fullNumber = `${seqNum}/AKD01/IT-DEK/${year}`;
    }

    const unit = findUnit(statusUnit, dari, kodeSuratStr);
    const category = await findOrCreateCategory(classificationCode, jenisSurat);

    const notesArr = [];
    if (jenisKategori) notesArr.push(`[${jenisKategori}]`);
    if (dari) notesArr.push(`Dari: ${dari}`);
    if (pic) notesArr.push(`PIC: ${pic}`);
    const notes = notesArr.length > 0 ? notesArr.join(" | ") : null;

    try {
      await prisma.letterRequest.create({
        data: {
          sequenceNumber: seqNum,
          monthRomawi,
          month,
          year,
          fullNumber,
          classificationCode,
          signeeCode,
          subject: perihal || `Agenda #${seqNum}`,
          recipient: kepada || null,
          applicantName: pic || dari || unit.name,
          applicantContact: null,
          letterDate: dateObj,
          status: "ISSUED",
          isManual: false,
          notes,
          unitId: unit.id,
          categoryId: category.id,
        },
      });
      importedCount++;
    } catch (err) {
      // Jika duplicate fullNumber, buat unique
      const fallbackNumber = `${seqNum}/${classificationCode}/${signeeCode}/${year}-${seqNum}`;
      await prisma.letterRequest.create({
        data: {
          sequenceNumber: seqNum,
          monthRomawi,
          month,
          year,
          fullNumber: fallbackNumber,
          classificationCode,
          signeeCode,
          subject: perihal || `Agenda #${seqNum}`,
          recipient: kepada || null,
          applicantName: pic || dari || unit.name,
          applicantContact: null,
          letterDate: dateObj,
          status: "ISSUED",
          isManual: false,
          notes,
          unitId: unit.id,
          categoryId: category.id,
        },
      });
      importedCount++;
    }
  }

  // Update counter ke sequence terakhir
  await prisma.letterCounter.upsert({
    where: { year_scope: { year: 2026, scope: "FIT" } },
    update: { currentNumber: maxSeq },
    create: { year: 2026, scope: "FIT", currentNumber: maxSeq },
  });

  console.log(`\n✓ Berhasil mengimpor ${importedCount} data surat ke database E-Office.`);
  console.log(`✓ Nomor agenda terakhir diset ke: #${maxSeq}`);
  console.log(`✓ Nomor surat berikutnya yang akan di-generate otomatis adalah: #${maxSeq + 1}`);
  console.log("=== Sinkronisasi Selesai ===");
}

importSpreadsheet()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
