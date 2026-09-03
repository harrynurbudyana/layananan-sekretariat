"use client";

import Link from "next/link";
import { Plus, Menu, Calendar, ShieldCheck, Sparkles, Lock, LogOut } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { useAdmin } from "@/context/admin-context";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const { isAdmin, openLoginModal, logout } = useAdmin();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-4 sm:px-6 justify-between transition-colors">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Buka Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800">
              <Sparkles className="h-3 w-3" />
              Sistem Otomasi Layanan Sekretariat FIT
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Admin Mode Status / Trigger */}
          {isAdmin ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Admin Sekretariat</span>
              <button
                onClick={logout}
                title="Keluar dari Mode Admin"
                className="ml-2 p-0.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openLoginModal()}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer font-medium"
              title="Masuk sebagai Admin Sekretariat untuk mengaktifkan Nomor Manual & Hapus Riwayat"
            >
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Masuk Admin</span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span>Tahun: <strong className="text-slate-700 dark:text-slate-200">{currentYear}</strong></span>
          </div>

          <Link
            href="/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-red-600/20 transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Nomor Surat</span>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 shadow-2xl">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
