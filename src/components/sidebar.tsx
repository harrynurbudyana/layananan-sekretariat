"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FilePlus2,
  BookOpenCheck,
  Database,
  HelpCircle,
  Building2,
  ExternalLink,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Buat Nomor Surat",
      href: "/generator",
      icon: FilePlus2,
      badge: "Instan",
    },
    {
      name: "Buku Agenda Surat",
      href: "/agenda",
      icon: BookOpenCheck,
    },
    {
      name: "Peminjaman Ruangan",
      href: "/ruangan",
      icon: CalendarDays,
      badge: "Baru",
    },
    {
      name: "Panduan Format",
      href: "/panduan",
      icon: HelpCircle,
    },
    {
      name: "Master Data",
      href: "/master",
      icon: Database,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-full border-r border-slate-800 shrink-0">
      {/* Header / Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-md shadow-red-500/20">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight tracking-tight text-white flex items-center gap-1.5">
              FIT E-Office
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Fakultas Ilmu Terapan
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Menu Utama
        </div>

        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-red-600/15 text-red-400 border border-red-500/30 font-semibold shadow-sm"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-4.5 w-4.5 transition-colors",
                    isActive
                      ? "text-red-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-semibold text-slate-300">Sekretariat FIT</span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">v1.0 MVP</span>
        </div>
        <p className="text-[11px] text-slate-400 line-clamp-1">
          Layanan Administrasi Mandiri
        </p>
      </div>
    </aside>
  );
}
