import { getUnits, getCategories } from "@/actions/letter-actions";
import { HelpCircle, BookOpen, CheckCircle2, Building2, Layers, AlertCircle, PenTool, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PanduanPage() {
  const [units, categories] = await Promise.all([
    getUnits(),
    getCategories(),
  ]);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
          <HelpCircle className="h-4 w-4" />
          <span>Buku Pedoman Tata Naskah Dinas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Panduan Format Penomoran Surat FIT
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Pedoman resmi struktur format nomor surat dan kode klasifikasi perihal di lingkungan Fakultas Ilmu Terapan (FIT).
        </p>
      </div>

      {/* Anatomi Penomoran Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-red-600" />
          <span>1. Anatomi & Struktur Nomor Surat Resmi</span>
        </h2>

        {/* Big Format Display */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl text-center space-y-2 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Format Baku Surat Fakultas Ilmu Terapan:</div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300 tracking-tight">
            1532 / AKD01 / IT-DEK / 2026
          </div>
          <p className="text-xs text-slate-400 font-mono">
            [No_Urut] / [Kode_Klasifikasi_Perihal] / [Kode_Fakultas_dan_Penandatangan] / [Tahun]
          </p>
        </div>

        {/* Explanation Table */}
        <div className="space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            Penjelasan Setiap Segmen:
          </h3>
          <div className="grid grid-cols-1 gap-2.5">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
              <span className="font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded text-xs shrink-0">
                1532
              </span>
              <div>
                <strong className="text-slate-900 dark:text-slate-100">1. Nomor Urut Register Agenda</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Nomor urut yang di-generate otomatis oleh sistem (atau diisi secara manual oleh staf sekretariat). Urutan bersifat tunggal dalam fakultas dan dihitung akumulatif per tahun kalender.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
              <span className="font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded text-xs shrink-0">
                AKD01 / AKD13
              </span>
              <div>
                <strong className="text-slate-900 dark:text-slate-100">2. Kode Klasifikasi & Rincian Perihal</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Menandakan bidang dan sub-perihal surat. Contoh:
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">AKD01</strong>: Perihal Akademik secara Umum (Surat Tugas Mengajar, Ujian, Dosen Pembimbing).
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">AKD13</strong>: Perihal Magang / Kerja Praktik / MBKM Mahasiswa (masih dalam bidang akademik).
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">KMH01</strong>: Kegiatan Kemahasiswaan & Lomba Mahasiswa.
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">SDM01</strong>: Sumber Daya Manusia & Tugas Kedinasan Staf/Dosen.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
              <span className="font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded text-xs shrink-0">
                IT-DEK
              </span>
              <div>
                <strong className="text-slate-900 dark:text-slate-100">3. Fakultas & Pejabat Penandatangan</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  <strong className="text-slate-700 dark:text-slate-300">IT</strong> merupakan singkatan Fakultas Ilmu Terapan, dan bagian setelah tanda hubung menunjukkan penandatangan:
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">IT-DEK</strong>: Ditandatangani oleh Dekan Fakultas Ilmu Terapan.
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">IT-WD1 / IT-WD2</strong>: Ditandatangani oleh Wakil Dekan I / II.
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">IT-SDM / IT-SKR / IT-LAB / IT-LKM / IT-LA / IT-KMH</strong>: Ditandatangani oleh Kepala Urusan Layanan.
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">IT-D3-RPL / IT-D3-SI / IT-D4-TRM / dll.</strong>: Ditandatangani oleh Ketua Program Studi.
                  <br />
                  &bull; <strong className="text-slate-700 dark:text-slate-300">IT-KK-AITM / IT-KK-DBS / IT-RA-ATAP</strong>: Ditandatangani oleh Ketua Kelompok Keahlian / Research Alliance.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
              <span className="font-mono font-bold text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded text-xs shrink-0">
                2026
              </span>
              <div>
                <strong className="text-slate-900 dark:text-slate-100">4. Tahun Terbit Surat</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Empat digit tahun kalender resmi saat surat tersebut diterbitkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Manual & Otomatis Feature Box */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-3 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <PenTool className="h-4 w-4" />
          <span>Fasilitas Penomoran Otomatis vs Manual</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-300">
          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
            <strong className="text-white block mb-1">Mode Otomatis (Self-Service):</strong>
            Dosen atau staf prodi mengajukan permohonan, dan sistem akan langsung memberikan nomor urut berikutnya yang tersedia secara instan dan anti-bentrok.
          </div>
          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
            <strong className="text-white block mb-1">Mode Manual (Staf Sekretariat):</strong>
            Staf sekretariat dapat memasukkan nomor urut spesifik, surat susulan (backdating), atau format kustom tanpa merusak urutan penomoran otomatis.
          </div>
        </div>
      </div>

      {/* Referensi Klasifikasi Perihal Lengkap */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600" />
          <span>Daftar Kode Klasifikasi Perihal Surat di FIT</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {categories.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded text-xs">
                  {c.code}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{c.group}</span>
              </div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">{c.name}</p>
              {c.description && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{c.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
