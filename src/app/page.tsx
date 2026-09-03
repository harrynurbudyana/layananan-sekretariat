import { getDashboardStats, getUnits, getCategories } from "@/actions/letter-actions";
import { getRoomDashboardStats } from "@/actions/room-actions";
import { formatDateIndo, formatDateTimeIndo, getCategoryBadgeClass } from "@/lib/utils";
import Link from "next/link";
import {
  FilePlus2,
  BookOpenCheck,
  Building2,
  FileText,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, units, categories, roomStats] = await Promise.all([
    getDashboardStats(),
    getUnits(),
    getCategories(),
    getRoomDashboardStats(),
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-red-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Sistem Layanan Mandiri Sekretariat Fakultas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            E-Office Fakultas Ilmu Terapan
          </h1>
          <p className="text-sm text-red-50 leading-relaxed">
            Otomasi penomoran surat resmi, buku agenda digital, dan pencatatan riwayat administrasi fakultas secara instan tanpa antre manual.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-red-700 hover:bg-red-50 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <FilePlus2 className="h-4 w-4 text-red-600" />
            <span>Buat Nomor Surat</span>
          </Link>
          <Link
            href="/agenda"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-800/60 hover:bg-red-800/80 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all"
          >
            <BookOpenCheck className="h-4 w-4" />
            <span>Buku Agenda</span>
          </Link>
          <Link
            href="/ruangan"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <CalendarDays className="h-4 w-4" />
            <span>Pinjam Ruangan</span>
          </Link>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Tahun Ini */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Surat Tahun {stats.currentYear}
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats.totalThisYear} <span className="text-xs font-normal text-slate-500">dokumen</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>Register Aktif FIT</span>
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center">
            <FileText className="h-6 w-6" />
          </div>
        </div>

        {/* Card 2: Total Bulan Ini */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Surat Bulan Ini
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats.totalThisMonth} <span className="text-xs font-normal text-slate-500">dokumen</span>
            </div>
            <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3" />
              <span>Bulan ke-{stats.currentMonth}</span>
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        {/* Card 3: Program Studi */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Program Studi & Unit
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {units.length} <span className="text-xs font-normal text-slate-500">unit</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              8 Prodi + 4 Bagian/Unit
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
            <Building2 className="h-6 w-6" />
          </div>
        </div>

        {/* Card 4: Kategori Surat */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Kategori Klasifikasi
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {categories.length} <span className="text-xs font-normal text-slate-500">jenis</span>
            </div>
            <span className="text-[11px] text-purple-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Standar Universitas</span>
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
            <Layers className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Layanan Peminjaman Ruangan Quick Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-blue-600/80 text-white flex items-center justify-center shrink-0 shadow-inner">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">
                Layanan Sarana & Prasarana
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Database Terpisah (rooms.db)
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Peminjaman Ruang Rapat & Multimedia FIT
            </h3>
            <p className="text-xs text-blue-100/80 mt-0.5">
              {roomStats.totalRooms} Ruangan Resmi Aktif (Adaut, Namtabung, Multimedia 1 & 2, Learning Lounge) &bull; {roomStats.todayBookingsCount} Jadwal Hari Ini
            </p>
          </div>
        </div>

        <Link
          href="/ruangan"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
        >
          <span>Buka Layanan Ruangan</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Activity & Latest Letters (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Nomor Surat Terakhir Diterbitkan
              </h2>
              <p className="text-xs text-slate-500">
                Pencatatan real-time nomor surat resmi Fakultas Ilmu Terapan
              </p>
            </div>
            <Link
              href="/agenda"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <span>Semua Agenda</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentLetters.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Belum ada nomor surat yang diterbitkan.
              </div>
            ) : (
              stats.recentLetters.map((letter) => (
                <div
                  key={letter.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-red-300 dark:hover:border-red-900 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                        {letter.fullNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${getCategoryBadgeClass(
                          letter.category.code
                        )}`}
                      >
                        {letter.category.code}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 line-clamp-1">
                      {letter.subject}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Pemohon: {letter.applicantName} &bull; {letter.unit.name}
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] text-slate-400 block">
                      {formatDateIndo(letter.letterDate)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Urut #{String(letter.sequenceNumber).padStart(3, "0")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Distribution & Quick Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Unit Breakdown Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Rekap Surat per Program Studi ({stats.currentYear})
            </h3>

            <div className="space-y-3 text-xs">
              {stats.unitStats.length === 0 ? (
                <div className="text-slate-400 text-xs py-4 text-center">
                  Belum ada data distribusi.
                </div>
              ) : (
                stats.unitStats.slice(0, 6).map((item) => {
                  const percentage =
                    stats.totalThisYear > 0
                      ? Math.round((item.count / stats.totalThisYear) * 100)
                      : 0;

                  return (
                    <div key={item.unitId} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700 dark:text-slate-300">
                          {item.unitName} ({item.unitCode})
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {item.count} surat ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Helper Banner */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-md space-y-3 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Panduan Format Nomor Surat FIT</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Format baku penomoran surat resmi FIT:
              <br />
              <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-[10px] mt-1 inline-block">
                1532/AKD01/IT-DEK/2026
              </code>
            </p>
            <Link
              href="/panduan"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Pelajari panduan lengkap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
