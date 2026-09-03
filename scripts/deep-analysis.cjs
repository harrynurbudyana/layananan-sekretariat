const fs = require("fs");

function analyzePerihal() {
  const content = fs.readFileSync("C:/Users/ENS/.gemini/antigravity/scratch/spreadsheet_data.csv", "utf-8");
  const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);

  console.log("Total lines:", lines.length);

  // Inspect lines 200, 500, 1000, 1500
  [200, 500, 1000, 1500].forEach(idx => {
    if (lines[idx]) {
      console.log(`Line ${idx}:`, lines[idx]);
    }
  });

  // Extract all perihal keywords
  const perihalKeywords = {};
  const kodeStats = {};
  const signeeStats = {};

  lines.slice(4).forEach(l => {
    const cols = l.split(",");
    const kode = cols[2] || "";
    const perihal = cols[7] || cols[6] || "";

    // Extract code
    const m = kode.match(/\/([A-Z0-9]+)\/([A-Z0-9\-]+)\//i);
    if (m) {
      const k = m[1].toUpperCase();
      const s = m[2].toUpperCase();
      kodeStats[k] = (kodeStats[k] || 0) + 1;
      signeeStats[s] = (signeeStats[s] || 0) + 1;
    }

    const pLower = perihal.toLowerCase();
    if (pLower.includes("undangan") || pLower.includes("rapat")) {
      perihalKeywords["Undangan / Rapat"] = (perihalKeywords["Undangan / Rapat"] || 0) + 1;
    } else if (pLower.includes("tugas") || pLower.includes("surtug") || pLower.includes("st ")) {
      perihalKeywords["Surat Tugas"] = (perihalKeywords["Surat Tugas"] || 0) + 1;
    } else if (pLower.includes("magang") || pLower.includes("kp") || pLower.includes("pkl") || pLower.includes("mbkm")) {
      perihalKeywords["Magang / KP / MBKM"] = (perihalKeywords["Magang / KP / MBKM"] || 0) + 1;
    } else if (pLower.includes("keterangan") || pLower.includes("suket") || pLower.includes("aktif")) {
      perihalKeywords["Surat Keterangan"] = (perihalKeywords["Surat Keterangan"] || 0) + 1;
    } else if (pLower.includes("rekognisi") || pLower.includes("nilai")) {
      perihalKeywords["Rekognisi Nilai / Akademik"] = (perihalKeywords["Rekognisi Nilai / Akademik"] || 0) + 1;
    } else if (pLower.includes("sk") || pLower.includes("keputusan")) {
      perihalKeywords["Surat Keputusan (SK)"] = (perihalKeywords["Surat Keputusan (SK)"] || 0) + 1;
    } else if (pLower.includes("sertifikat") || pLower.includes("piagam")) {
      perihalKeywords["Sertifikat"] = (perihalKeywords["Sertifikat"] || 0) + 1;
    } else if (pLower.includes("permohonan") || pLower.includes("izin") || pLower.includes("ijin")) {
      perihalKeywords["Permohonan / Izin"] = (perihalKeywords["Permohonan / Izin"] || 0) + 1;
    } else if (pLower.includes("rekomendasi")) {
      perihalKeywords["Rekomendasi"] = (perihalKeywords["Rekomendasi"] || 0) + 1;
    } else if (pLower.includes("yudisium") || pLower.includes("ta") || pLower.includes("pa") || pLower.includes("sidang")) {
      perihalKeywords["Sidang / TA / Yudisium"] = (perihalKeywords["Sidang / TA / Yudisium"] || 0) + 1;
    } else {
      perihalKeywords["Lain-lain / Khusus"] = (perihalKeywords["Lain-lain / Khusus"] || 0) + 1;
    }
  });

  console.log("\n=== KODE KLASIFIKASI TERBANYAK ===");
  Object.entries(kodeStats).sort((a,b)=>b[1]-a[1]).slice(0, 15).forEach(([k,v]) => {
    console.log(`${k}: ${v} surat`);
  });

  console.log("\n=== PENANDATANGAN TERBANYAK ===");
  Object.entries(signeeStats).sort((a,b)=>b[1]-a[1]).slice(0, 15).forEach(([k,v]) => {
    console.log(`${k}: ${v} surat`);
  });

  console.log("\n=== KELOMPOK PERIHAL TERBANYAK BERDASARKAN KATA KUNCI ISI ===");
  Object.entries(perihalKeywords).sort((a,b)=>b[1]-a[1]).forEach(([k,v]) => {
    console.log(`${k}: ${v} surat`);
  });
}

analyzePerihal();
