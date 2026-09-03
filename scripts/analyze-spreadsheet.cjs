const fs = require("fs");

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

function analyze() {
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
    console.error("Header not found!");
    return;
  }

  const headers = parseCSVLine(lines[headerIndex]);
  console.log("Headers:", headers);

  const records = [];
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length >= 4 && cols[1] && cols[1] !== "contoh") {
      records.push({
        tanggal: cols[0] || "",
        noAgenda: cols[1] || "",
        kodeSurat: cols[2] || "",
        jenis: cols[3] || "",
        dari: cols[4] || "",
        kepada: cols[5] || "",
        jenisSurat: cols[6] || "",
        perihal: cols[7] || "",
        statusUnit: cols[8] || "",
        pic: cols[9] || "",
      });
    }
  }

  console.log(`Total valid letter records analyzed: ${records.length}`);

  // 1. Analisis Berdasarkan Jenis Surat/SK
  const jenisSuratCount = {};
  // 2. Analisis Berdasarkan Kode Klasifikasi (AKD13, SKR05, SDM21, etc.)
  const kodeKlasifikasiCount = {};
  // 3. Analisis Berdasarkan Signee / Dari
  const dariCount = {};
  // 4. Analisis Berdasarkan Unit Pengusul (STATUS)
  const unitCount = {};
  // 5. Analisis Berdasarkan Jenis Kategori (Internal, Eksternal, Sertifikat)
  const kategoriCount = {};

  records.forEach(r => {
    // Jenis Surat
    const js = (r.jenisSurat || "Tidak Terisi").trim();
    jenisSuratCount[js] = (jenisSuratCount[js] || 0) + 1;

    // Kode Klasifikasi
    const matchKode = r.kodeSurat.match(/\/([A-Z0-9]+)\//i);
    const kode = matchKode ? matchKode[1].toUpperCase() : (r.kodeSurat || "LAINNYA");
    kodeKlasifikasiCount[kode] = (kodeKlasifikasiCount[kode] || 0) + 1;

    // Dari / Signee
    const dari = (r.dari || "Tidak Terisi").trim();
    dariCount[dari] = (dariCount[dari] || 0) + 1;

    // Unit
    const unit = (r.statusUnit || "Tidak Terisi").trim();
    unitCount[unit] = (unitCount[unit] || 0) + 1;

    // Kategori
    const kat = (r.jenis || "Tidak Terisi").trim();
    kategoriCount[kat] = (kategoriCount[kat] || 0) + 1;
  });

  const sortDesc = obj => Object.entries(obj).sort((a, b) => b[1] - a[1]);

  console.log("\n=== 1. TOP JENIS SURAT / SK ===");
  sortDesc(jenisSuratCount).forEach(([k, v]) => {
    const pct = ((v / records.length) * 100).toFixed(1);
    console.log(`- ${k}: ${v} surat (${pct}%)`);
  });

  console.log("\n=== 2. TOP KODE KLASIFIKASI PERIHAL ===");
  sortDesc(kodeKlasifikasiCount).slice(0, 15).forEach(([k, v]) => {
    const pct = ((v / records.length) * 100).toFixed(1);
    console.log(`- ${k}: ${v} surat (${pct}%)`);
  });

  console.log("\n=== 3. TOP PEJABAT PENANDATANGAN (DARI) ===");
  sortDesc(dariCount).slice(0, 10).forEach(([k, v]) => {
    const pct = ((v / records.length) * 100).toFixed(1);
    console.log(`- ${k}: ${v} surat (${pct}%)`);
  });

  console.log("\n=== 4. TOP UNIT / PRODI PENGUSUL ===");
  sortDesc(unitCount).slice(0, 12).forEach(([k, v]) => {
    const pct = ((v / records.length) * 100).toFixed(1);
    console.log(`- ${k}: ${v} surat (${pct}%)`);
  });

  console.log("\n=== 5. SIFAT SURAT (INTERNAL / EKSTERNAL / SERTIFIKAT) ===");
  sortDesc(kategoriCount).forEach(([k, v]) => {
    const pct = ((v / records.length) * 100).toFixed(1);
    console.log(`- ${k}: ${v} surat (${pct}%)`);
  });
}

analyze();
