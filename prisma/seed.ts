import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Master Data FIT E-Office berdasarkan PU.006/SKR04/SPS/2023...");

  // 1. Seed 19 Unit & Penandatangan Resmi FIT
  const units = [
    // Pimpinan Fakultas
    { name: "Dekan Fakultas Ilmu Terapan", code: "DEK", signeeCode: "IT-DEK", leaderName: "Dekan FIT", category: "DEKANAT" },
    { name: "Wakil Dekan 1 (Akademik & Riset)", code: "WD1", signeeCode: "IT-WD1", leaderName: "Wakil Dekan 1 FIT", category: "DEKANAT" },
    { name: "Wakil Dekan 2 (Keuangan, SDM & Kemahasiswaan)", code: "WD2", signeeCode: "IT-WD2", leaderName: "Wakil Dekan 2 FIT", category: "DEKANAT" },

    // Urusan / Layanan FIT
    { name: "Kepala Urusan Sumber Daya, Keuangan & Logistik", code: "SDM", signeeCode: "IT-SDM", leaderName: "Kaur SDM, Keuangan & Logistik", category: "BAGIAN" },
    { name: "Kepala Urusan Sekretariat", code: "SKR", signeeCode: "IT-SKR", leaderName: "Kaur Sekretariat FIT", category: "BAGIAN" },
    { name: "Kepala Urusan Laboratorium", code: "LAB", signeeCode: "IT-LAB", leaderName: "Kaur Laboratorium & Bengkel", category: "BAGIAN" },
    { name: "Kepala Urusan Layanan Kerjasama dan Magang", code: "LKM", signeeCode: "IT-LKM", leaderName: "Kaur Layanan Kerjasama & Magang", category: "BAGIAN" },
    { name: "Kepala Urusan Layanan Akademik", code: "LA", signeeCode: "IT-LA", leaderName: "Kaur Layanan Akademik", category: "BAGIAN" },
    { name: "Kepala Urusan Kemahasiswaan", code: "KMH", signeeCode: "IT-KMH", leaderName: "Kaur Kemahasiswaan", category: "BAGIAN" },

    // Program Studi FIT
    { name: "Prodi D3 Sistem Informasi", code: "D3-SI", signeeCode: "IT-D3-SI", leaderName: "Kaprodi D3 Sistem Informasi", category: "PRODI" },
    { name: "Prodi D3 Teknologi Komputer", code: "D3-TKO", signeeCode: "IT-D3-TKO", leaderName: "Kaprodi D3 Teknologi Komputer", category: "PRODI" },
    { name: "Prodi D3 Sistem Informasi Akuntansi", code: "D3-SIA", signeeCode: "IT-D3-SIA", leaderName: "Kaprodi D3 SI Akuntansi", category: "PRODI" },
    { name: "Prodi D3 Rekayasa Perangkat Lunak Aplikasi", code: "D3-RPL", signeeCode: "IT-D3-RPL", leaderName: "Kaprodi D3 RPL Aplikasi", category: "PRODI" },
    { name: "Prodi D3 Manajemen Pemasaran", code: "D3-MP", signeeCode: "IT-D3-MP", leaderName: "Kaprodi D3 Manajemen Pemasaran", category: "PRODI" },
    { name: "Prodi D3 Perhotelan", code: "D3-PHT", signeeCode: "IT-D3-PHT", leaderName: "Kaprodi D3 Perhotelan", category: "PRODI" },
    { name: "Prodi D3 Teknologi Telekomunikasi", code: "D3-TT", signeeCode: "IT-D3-TT", leaderName: "Kaprodi D3 Teknologi Telekomunikasi", category: "PRODI" },
    { name: "Prodi S1 Terapan Teknologi Rekayasa Multimedia", code: "D4-TRM", signeeCode: "IT-D4-TRM", leaderName: "Kaprodi S1 Terapan TRM", category: "PRODI" },
    { name: "Prodi S1 Terapan Sistem Informasi Kota Cerdas", code: "D4-SIKC", signeeCode: "IT-D4-SIKC", leaderName: "Kaprodi S1 Terapan SIKC", category: "PRODI" },
    { name: "Prodi S2 Terapan Rekayasa Teknologi Informasi", code: "S2-RTI", signeeCode: "IT-S2-RTI", leaderName: "Kaprodi S2 Terapan RTI", category: "PRODI" },

    // Kelompok Keahlian & Riset FIT
    { name: "Kelompok Keahlian Applied Information Technology and Multimedia", code: "KK-AITM", signeeCode: "IT-KK-AITM", leaderName: "Ketua KK AITM", category: "KELOMPOK_KEAHLIAN" },
    { name: "Kelompok Keahlian Applied Digital Business Entrepreneur and Tourism", code: "KK-DBS", signeeCode: "IT-KK-DBS", leaderName: "Ketua KK DBEST", category: "KELOMPOK_KEAHLIAN" },
    { name: "Research Alliance ATAP", code: "RA-ATAP", signeeCode: "IT-RA-ATAP", leaderName: "Ketua Research Alliance ATAP", category: "RISET" },
  ];

  for (const unit of units) {
    await prisma.unit.upsert({
      where: { code: unit.code },
      update: unit,
      create: unit,
    });
  }

  // 2. Seed Master Kode Klasifikasi Kegiatan / Perihal sesuai PU.006/SKR04/SPS/2023
  const categories = [
    // === AKADEMIK (AKD) ===
    { code: "AKD01", name: "Akademik Umum & Surat Tugas Akademik", group: "AKD", description: "Penugasan mengajar, bimbingan, sidang, seminar, atau perihal akademik umum" },
    { code: "AKD02", name: "Informasi & Laporan Akademik / PDDIKTI", group: "AKD", description: "Laporan data akademik fakultas dan pelaporan PDDIKTI" },
    { code: "AKD03", name: "Perencanaan Akademik", group: "AKD", description: "Perencanaan proses belajar mengajar dan jadwal akademik semester" },
    { code: "AKD04", name: "Penerimaan Mahasiswa Baru (PMB)", group: "AKD", description: "Proses seleksi, admisi, dan registrasi mahasiswa baru" },
    { code: "AKD05", name: "Program Studi", group: "AKD", description: "Pengelolaan dan administrasi program studi" },
    { code: "AKD06", name: "Kurikulum dan Silabus", group: "AKD", description: "Perubahan struktur mata kuliah, kurikulum OBE, dan RPS/silabus" },
    { code: "AKD07", name: "Pindah Jurusan / Program Studi", group: "AKD", description: "Permohonan dan persetujuan transfer/pindah prodi" },
    { code: "AKD08", name: "Perkuliahan", group: "AKD", description: "Pelaksanaan perkuliahan, kuliah dosen tamu, dan presensi" },
    { code: "AKD09", name: "Praktikum & Laboratorium", group: "AKD", description: "Jadwal dan penugasan asisten praktikum laboratorium" },
    { code: "AKD10", name: "Ujian dan Evaluasi", group: "AKD", description: "Pelaksanaan UTS, UAS, Ujian Susulan, dan evaluasi hasil belajar" },
    { code: "AKD11", name: "Tugas Akhir / Proyek Akhir / Thesis", group: "AKD", description: "Pengantar data TA/PA, penguji sidang akhir, dan yudisium" },
    { code: "AKD12", name: "Coop dan Geladi", group: "AKD", description: "Program pembinaan coop dan geladi mahasiswa" },
    { code: "AKD13", name: "Kerja Praktek (KP), Magang & MBKM", group: "AKD", description: "Surat pengantar & penugasan magang industri, KP, studi independen" },
    { code: "AKD14", name: "Nilai Ujian dan Nilai Mata Kuliah", group: "AKD", description: "Koreksi nilai, input KHS, dan berita acara nilai" },
    { code: "AKD15", name: "Rapat / Sidang Akademik", group: "AKD", description: "Undangan & notulen rapat pleno akademik fakultas" },
    { code: "AKD16", name: "Transkrip Nilai", group: "AKD", description: "Permohonan dan penerbitan transkrip nilai akademik" },
    { code: "AKD17", name: "Ijazah", group: "AKD", description: "Dokumen pengesahan dan legalisir ijazah" },
    { code: "AKD18", name: "Wisuda", group: "AKD", description: "Pelepasan wisudawan dan pelaksanaan prosesi wisuda" },
    { code: "AKD19", name: "Kalender Akademik", group: "AKD", description: "Jadwal kalender operasional akademik universitas" },
    { code: "AKD20", name: "Status Mahasiswa / SKL / Cuti Akademik", group: "AKD", description: "Surat keterangan aktif, cuti akademik, dan SKL" },
    { code: "AKD21", name: "Pendaftaran Ulang / Heregistrasi", group: "AKD", description: "Heregistrasi semester ganjil/genap" },
    { code: "AKD22", name: "Perubahan Rencana Studi (PRS)", group: "AKD", description: "Batal tambah dan penyesuaian mata kuliah" },
    { code: "AKD23", name: "Perwalian dan Bimbingan", group: "AKD", description: "Bimbingan dosen wali terhadap mahasiswa" },
    { code: "AKD24", name: "Dispensasi Akademik", group: "AKD", description: "Surat izin dispensasi ketidakhadiran kuliah/ujian" },
    { code: "AKD25", name: "Lulusan Berprestasi", group: "AKD", description: "Penetapan mahasiswa lulusan terbaik / cumlaude" },
    { code: "AKD26", name: "Rapat dan Koordinasi Akademik", group: "AKD", description: "Koordinasi antar program studi dan layanan akademik" },
    { code: "AKD27", name: "Studi Banding / Kunjungan Industri", group: "AKD", description: "Kunjungan studi lapangan mahasiswa dan dosen" },
    { code: "AKD28", name: "Laporan Akademik", group: "AKD", description: "Laporan capaian pembelajaran semester" },

    // === KEMAHASISWAAN (KMH) ===
    { code: "KMH01", name: "Kemahasiswaan Umum", group: "KMH", description: "Perihal umum urusan kemahasiswaan" },
    { code: "KMH02", name: "Penghargaan Mahasiswa", group: "KMH", description: "Pemberian apresiasi prestasi mahasiswa" },
    { code: "KMH03", name: "Komisi Disiplin Mahasiswa", group: "KMH", description: "Pemeriksaan dan tindakan disiplin tata tertib kampus" },
    { code: "KMH04", name: "Kompetisi & Lomba Mahasiswa", group: "KMH", description: "Surat tugas delegasi lomba nasional / internasional" },
    { code: "KMH05", name: "Pendidikan & Pelatihan Mahasiswa", group: "KMH", description: "Workshop softskills, kepemimpinan, dan LKMM" },
    { code: "KMH06", name: "Pembinaan Karakter", group: "KMH", description: "Program pembinaan moral dan karakter mahasiswa" },
    { code: "KMH07", name: "Konseling Mahasiswa", group: "KMH", description: "Layanan bimbingan konseling psikologis mahasiswa" },
    { code: "KMH08", name: "Kegiatan Mahasiswa", group: "KMH", description: "Izin penyelenggaraan acara dan kegiatan kampus" },
    { code: "KMH09", name: "Organisasi Mahasiswa (Ormawa)", group: "KMH", description: "SK kepengurusan Himpunan, BEM, DPM, dan UKM" },
    { code: "KMH10", name: "Orientasi Mahasiswa Baru (PKKMB)", group: "KMH", description: "Penyelenggaraan ospek dan pengenalan kampus" },
    { code: "KMH12", name: "Beasiswa Mahasiswa", group: "KMH", description: "Rekomendasi & pengelolaan beasiswa internal/eksternal" },
    { code: "KMH14", name: "Asuransi / Kesehatan Mahasiswa", group: "KMH", description: "Klaim santunan dan jaminan kesehatan mahasiswa" },
    { code: "KMH15", name: "Laporan Kemahasiswaan", group: "KMH", description: "Laporan pemeringkatan SIMKATMAWA" },

    // === SUMBER DAYA MANUSIA (SDM) ===
    { code: "SDM01", name: "SDM Umum & Kepegawaian", group: "SDM", description: "Administrasi kepegawaian dosen dan tenaga kependidikan" },
    { code: "SDM02", name: "Perencanaan SDM", group: "SDM", description: "Formasi dan kebutuhan dosen/staff" },
    { code: "SDM03", name: "Rekrutasi Dosen & Staff", group: "SDM", description: "Penerimaan dosen baru dan asisten laboratorium" },
    { code: "SDM04", name: "Pengembangan Karir / Jafung", group: "SDM", description: "Pengusulan Jabatan Fungsional Akademik (JFA)" },
    { code: "SDM05", name: "Studi Lanjut", group: "SDM", description: "Surat izin dan tugas belajar S2/S3 dosen" },
    { code: "SDM06", name: "Training dan Sertifikasi", group: "SDM", description: "Pelatihan kompetensi dan sertifikasi BNSP/Industri" },
    { code: "SDM11", name: "Perjalanan Dinas", group: "SDM", description: "Surat Perintah Perjalanan Dinas (SPPD)" },
    { code: "SDM12", name: "Cuti Pegawai", group: "SDM", description: "Permohonan cuti tahunan, cuti melahirkan, cuti besar" },
    { code: "SDM14", name: "Kinerja Pegawai (SKP)", group: "SDM", description: "Evaluasi BKD (Beban Kerja Dosen) dan performansi pegawai" },
    { code: "SDM17", name: "Penghargaan Pegawai", group: "SDM", description: "Apresiasi dosen berprestasi & pengabdian masa kerja" },
    { code: "SDM21", name: "Laporan SDM", group: "SDM", description: "Rekapitulasi SDM fakultas" },

    // === KERJASAMA (SAM / KRS) ===
    { code: "SAM01", name: "Kerjasama Umum", group: "SAM", description: "Kerjasama kemitraan strategis" },
    { code: "SAM02", name: "Penjajakan Kerjasama", group: "SAM", description: "Inisiasi komunikasi dengan calon mitra industri/kampus" },
    { code: "SAM03", name: "MoU (Nota Kesepahaman)", group: "SAM", description: "Memorandum of Understanding institusi" },
    { code: "SAM04", name: "MoA / Perjanjian Kerja Sama (PKS)", group: "SAM", description: "Memorandum of Agreement tingkat fakultas/prodi" },
    { code: "SAM05", name: "IA (Implementation Arrangement)", group: "SAM", description: "Pelaksanaan teknis kegiatan kerjasama" },

    // === PENELITIAN (LIT) ===
    { code: "LIT01", name: "Penelitian Umum", group: "LIT", description: "Riset dan publikasi karya ilmiah" },
    { code: "LIT04", name: "Kerjasama Penelitian", group: "LIT", description: "Riset kolaborasi industri / kampus mitra" },
    { code: "LIT06", name: "Penelitian Internal", group: "LIT", description: "Hibah riset dana internal fakultas/universitas" },
    { code: "LIT07", name: "Penelitian Eksternal", group: "LIT", description: "Hibah riset Kemdiktisaintek / DRTPM / Kedaireka" },
    { code: "LIT08", name: "Publikasi Hasil Penelitian", group: "LIT", description: "Jurnal terindeks Scopus, Sinta, dan prosiding" },
    { code: "LIT09", name: "Konferensi & Seminar", group: "LIT", description: "Surat tugas presenter / pemakalah konferensi" },

    // === PENGABDIAN MASYARAKAT (ABD) ===
    { code: "ABD01", name: "Pengabdian Masyarakat Umum", group: "ABD", description: "Kegiatan pengabdian kepada masyarakat (Abdimas)" },
    { code: "ABD04", name: "Abdimas Internal", group: "ABD", description: "Desa binaan dan program abdimas internal" },
    { code: "ABD05", name: "Abdimas Eksternal", group: "ABD", description: "Program kemitraan masyarakat hibah eksternal" },

    // === ASET, SARANA & LAB (AST) ===
    { code: "AST01", name: "Aset & Logistik Umum", group: "AST", description: "Pengelolaan sarana dan inventaris kampus" },
    { code: "AST17", name: "Peminjaman Aset & Alat", group: "AST", description: "Peminjaman perangkat keras, kamera, alat bengkel" },
    { code: "AST18", name: "Peminjaman Ruangan & Lab", group: "AST", description: "Penggunaan ruangan kuliah, lab komputer, aula FIT" },
    { code: "AST20", name: "Pemeliharaan Aset & Lab", group: "AST", description: "Perbaikan dan perawatan fasilitas laboratorium" },

    // === KEUANGAN (KUG) ===
    { code: "KUG01", name: "Keuangan Umum", group: "KUG", description: "Administrasi keuangan dan perbendaharaan" },
    { code: "KUG05", name: "Anggaran & RKA", group: "KUG", description: "Pengajuan anggaran operasional prodi/fakultas" },
    { code: "KUG08", name: "Pembayaran & Honorarium", group: "KUG", description: "Honor narasumber, penguji, dan asisten" },

    // === SEKRETARIAT PIMPINAN (SKR) ===
    { code: "SKR01", name: "Sekretariat Umum", group: "SKR", description: "Persuratan dinas dan tata laksana kantor" },
    { code: "SKR02", name: "Rapat Pimpinan (Rapim)", group: "SKR", description: "Rapat koordinasi dekanat dan ketua program studi" },
    { code: "SKR03", name: "Kegiatan Pimpinan / Kelembagaan", group: "SKR", description: "Agenda dinas Dekan dan Wakil Dekan" },
    { code: "SKR04", name: "Tata Naskah Korespondensi", group: "SKR", description: "Pedoman tata naskah dinas dan format baku" },
    { code: "SKR05", name: "Undangan Dinas Resmi", group: "SKR", description: "Surat undangan resmi kegiatan fakultas" },
  ];

  for (const cat of categories) {
    await prisma.letterCategory.upsert({
      where: { code: cat.code },
      update: cat,
      create: cat,
    });
  }

  // 3. Seed Sample Letters with Real Signees & Format: 1532/AKD01/IT-DEK/2026
  const unitDek = await prisma.unit.findUnique({ where: { code: "DEK" } });
  const unitWd1 = await prisma.unit.findUnique({ where: { code: "WD1" } });
  const unitRpl = await prisma.unit.findUnique({ where: { code: "D3-RPL" } });
  const unitSi = await prisma.unit.findUnique({ where: { code: "D3-SI" } });
  const unitTrm = await prisma.unit.findUnique({ where: { code: "D4-TRM" } });

  const catAkd01 = await prisma.letterCategory.findUnique({ where: { code: "AKD01" } });
  const catAkd13 = await prisma.letterCategory.findUnique({ where: { code: "AKD13" } });
  const catKmh04 = await prisma.letterCategory.findUnique({ where: { code: "KMH04" } });
  const catSdm01 = await prisma.letterCategory.findUnique({ where: { code: "SDM01" } });

  if (unitDek && unitWd1 && unitRpl && unitSi && unitTrm && catAkd01 && catAkd13 && catKmh04 && catSdm01) {
    const sampleLetters = [
      {
        sequenceNumber: 1530,
        month: 8,
        year: 2026,
        fullNumber: "1530/AKD01/IT-DEK/2026",
        classificationCode: "AKD01",
        signeeCode: "IT-DEK",
        subject: "Surat Tugas Dosen Pengampu & Koordinator Praktikum Semester Ganjil 2026/2027",
        recipient: "Dosen Pengampu & Asisten Praktikum FIT",
        applicantName: "Dr. Rio Korio Utoro, S.Kom., M.T.",
        applicantContact: "081234567890",
        letterDate: new Date("2026-08-10"),
        unitId: unitRpl.id,
        categoryId: catAkd01.id,
        status: "ISSUED",
        isManual: false,
        notes: "Ditandatangani Dekan FIT",
      },
      {
        sequenceNumber: 1531,
        month: 8,
        year: 2026,
        fullNumber: "1531/AKD13/IT-LKM/2026",
        classificationCode: "AKD13",
        signeeCode: "IT-LKM",
        subject: "Surat Pengantar & Penugasan Magang Industri Mahasiswa di PT Telekomunikasi Seluler",
        recipient: "HR Division PT Telkomsel",
        applicantName: "Amelia (Mahasiswa RPLA - NIM 6706220001)",
        applicantContact: "081398765432",
        letterDate: new Date("2026-08-15"),
        unitId: unitRpl.id,
        categoryId: catAkd13.id,
        status: "ISSUED",
        isManual: false,
        notes: "Program Magang Bersertifikat Kampus Merdeka 6 Bulan",
      },
      {
        sequenceNumber: 1532,
        month: 8,
        year: 2026,
        fullNumber: "1532/AKD01/IT-DEK/2026",
        classificationCode: "AKD01",
        signeeCode: "IT-DEK",
        subject: "Surat Tugas Pengabdian kepada Masyarakat Desa Digital Ciwidey",
        recipient: "Kepala Desa & Warga Desa Mitra",
        applicantName: "Ahmad Fauzi, S.T., M.T.",
        applicantContact: "082111223344",
        letterDate: new Date("2026-08-20"),
        unitId: unitSi.id,
        categoryId: catAkd01.id,
        status: "ISSUED",
        isManual: false,
        notes: "Tim terdiri dari 4 Dosen FIT dan 6 Mahasiswa",
      },
      {
        sequenceNumber: 1533,
        month: 8,
        year: 2026,
        fullNumber: "1533/KMH04/IT-KMH/2026",
        classificationCode: "KMH04",
        signeeCode: "IT-KMH",
        subject: "Surat Tugas Delegasi Mahasiswa Lomba Pagelaran Mahasiswa Nasional Gemastik XIX",
        recipient: "Panitia Puspresnas Kemdikbudristek",
        applicantName: "Bagas Pratama (Ketua Tim TRM)",
        applicantContact: "085712344321",
        letterDate: new Date("2026-08-22"),
        unitId: unitTrm.id,
        categoryId: catKmh04.id,
        status: "ISSUED",
        isManual: false,
        notes: "Ditandatangani Kepala Urusan Kemahasiswaan",
      },
    ];

    for (const letter of sampleLetters) {
      await prisma.letterRequest.upsert({
        where: { fullNumber: letter.fullNumber },
        update: letter,
        create: letter,
      });
    }

    await prisma.letterCounter.upsert({
      where: {
        year_scope: {
          year: 2026,
          scope: "FIT",
        },
      },
      update: { currentNumber: 1533 },
      create: {
        year: 2026,
        scope: "FIT",
        currentNumber: 1533,
      },
    });
  }

  console.log("Seeding Master Data PU.006 Telkom University completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
