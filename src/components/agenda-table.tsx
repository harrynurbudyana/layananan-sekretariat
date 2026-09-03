"use client";

import { useState, useMemo, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import { deleteLetter, deleteLetters } from "@/actions/letter-actions";
import { formatDateIndo, formatDateTimeIndo, getCategoryBadgeClass } from "@/lib/utils";
import {
  Search,
  Filter,
  Download,
  Copy,
  Check,
  Eye,
  Trash2,
  Calendar,
  Building2,
  FileSpreadsheet,
  X,
  ExternalLink,
  ChevronDown,
  AlertTriangle,
  PenTool,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Rows,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  CheckSquare,
  Square,
  Lock,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";

interface LetterItem {
  id: string;
  sequenceNumber: number;
  month: number;
  year: number;
  fullNumber: string;
  classificationCode: string;
  signeeCode: string;
  subject: string;
  recipient: string | null;
  applicantName: string;
  applicantContact: string | null;
  letterDate: string;
  status: string;
  isManual: boolean;
  notes: string | null;
  createdAt: string;
  unit: {
    id: string;
    name: string;
    code: string;
  };
  category: {
    id: string;
    name: string;
    code: string;
  };
}

interface Props {
  initialLetters: LetterItem[];
  units: { id: string; name: string; code: string }[];
  categories: { id: string; name: string; code: string }[];
}

type SortField =
  | "sequenceNumber"
  | "fullNumber"
  | "classificationCode"
  | "signeeCode"
  | "unit"
  | "subject"
  | "letterDate"
  | "createdAt";

type SortDirection = "asc" | "desc";

export function AgendaTable({ initialLetters, units, categories }: Props) {
  const { isAdmin, openLoginModal } = useAdmin();
  const [letters, setLetters] = useState<LetterItem[]>(initialLetters);
  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedMonth, setSelectedMonth] = useState("ALL");

  // Sorting State
  const [sortField, setSortField] = useState<SortField>("sequenceNumber");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Pagination State: Default 10 data per halaman
  const [pageSize, setPageSize] = useState<number | "ALL">(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Selection & Bulk Actions State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [copiedBulk, setCopiedBulk] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [isBulkDeleting, startBulkDeleteTransition] = useTransition();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [detailLetter, setDetailLetter] = useState<LetterItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const selectAllRef = useRef<HTMLInputElement>(null);

  const months = [
    { num: 1, name: "Januari" },
    { num: 2, name: "Februari" },
    { num: 3, name: "Maret" },
    { num: 4, name: "April" },
    { num: 5, name: "Mei" },
    { num: 6, name: "Juni" },
    { num: 7, name: "Juli" },
    { num: 8, name: "Agustus" },
    { num: 9, name: "September" },
    { num: 10, name: "Oktober" },
    { num: 11, name: "November" },
    { num: 12, name: "Desember" },
  ];

  // Filtering Logic
  const filteredLetters = useMemo(() => {
    return letters.filter((l) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        l.fullNumber.toLowerCase().includes(q) ||
        l.classificationCode.toLowerCase().includes(q) ||
        l.signeeCode.toLowerCase().includes(q) ||
        l.subject.toLowerCase().includes(q) ||
        l.applicantName.toLowerCase().includes(q) ||
        (l.recipient && l.recipient.toLowerCase().includes(q)) ||
        (l.notes && l.notes.toLowerCase().includes(q));

      const matchUnit = selectedUnit === "ALL" || l.unit.id === selectedUnit;
      const matchCat =
        selectedCategory === "ALL" || l.category.id === selectedCategory;
      const matchMonth =
        selectedMonth === "ALL" || l.month === parseInt(selectedMonth);

      return matchSearch && matchUnit && matchCat && matchMonth;
    });
  }, [letters, search, selectedUnit, selectedCategory, selectedMonth]);

  // Sorting Logic
  const sortedLetters = useMemo(() => {
    return [...filteredLetters].sort((a, b) => {
      let comparison = 0;
      if (sortField === "sequenceNumber") {
        comparison = a.sequenceNumber - b.sequenceNumber;
      } else if (sortField === "letterDate") {
        comparison = new Date(a.letterDate).getTime() - new Date(b.letterDate).getTime();
      } else if (sortField === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === "unit") {
        comparison = a.unit.name.localeCompare(b.unit.name, "id");
      } else {
        const valA = (a[sortField] || "").toString();
        const valB = (b[sortField] || "").toString();
        comparison = valA.localeCompare(valB, "id", { numeric: true });
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredLetters, sortField, sortDirection]);

  // Reset page when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedUnit, selectedCategory, selectedMonth, pageSize, sortField, sortDirection]);

  // Toggle sorting from column click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection(field === "sequenceNumber" || field === "letterDate" || field === "createdAt" ? "desc" : "asc");
    }
  };

  // Pagination Calculations
  const totalFiltered = sortedLetters.length;
  const numPageSize = typeof pageSize === "number" ? pageSize : totalFiltered;
  const totalPages = pageSize === "ALL" ? 1 : Math.max(1, Math.ceil(totalFiltered / numPageSize));

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = pageSize === "ALL" ? 0 : (safeCurrentPage - 1) * numPageSize;
  const endIndex = pageSize === "ALL" ? totalFiltered : Math.min(startIndex + numPageSize, totalFiltered);

  // Sliced data for fast rendering
  const displayedLetters = useMemo(() => {
    if (pageSize === "ALL") return sortedLetters;
    return sortedLetters.slice(startIndex, endIndex);
  }, [sortedLetters, pageSize, startIndex, endIndex]);

  // Selection Checkbox Logic
  const isAllDisplayedSelected =
    displayedLetters.length > 0 &&
    displayedLetters.every((l) => selectedIds.includes(l.id));

  const isSomeDisplayedSelected =
    displayedLetters.some((l) => selectedIds.includes(l.id)) && !isAllDisplayedSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isSomeDisplayedSelected;
    }
  }, [isSomeDisplayedSelected]);

  // Toggle Select All on Current Page
  const toggleSelectAllDisplayed = () => {
    if (isAllDisplayedSelected) {
      const displayedIds = new Set(displayedLetters.map((l) => l.id));
      setSelectedIds((prev) => prev.filter((id) => !displayedIds.has(id)));
    } else {
      const newSelected = new Set(selectedIds);
      displayedLetters.forEach((l) => newSelected.add(l.id));
      setSelectedIds(Array.from(newSelected));
    }
  };

  // Toggle Single Row Selection
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select ALL Filtered Across All Pages
  const selectAllFiltered = () => {
    const allFilteredIds = filteredLetters.map((l) => l.id);
    setSelectedIds(allFilteredIds);
  };

  // Clear Selection
  const clearSelection = () => {
    setSelectedIds([]);
  };

  // Copy Single
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Copy Selected Full Numbers
  const handleCopySelected = () => {
    const selectedLetters = letters.filter((l) => selectedIds.includes(l.id));
    const numbers = selectedLetters.map((l) => l.fullNumber).join("\n");
    navigator.clipboard.writeText(numbers);
    setCopiedBulk(true);
    setTimeout(() => setCopiedBulk(false), 2500);
  };

  // Export to CSV helper
  const exportLettersToCSV = (items: LetterItem[], filename: string) => {
    const headers = [
      "No. Urut",
      "Nomor Surat Lengkap",
      "Klasifikasi Perihal",
      "Penandatangan",
      "Tanggal Surat",
      "Program Studi / Unit",
      "Perihal",
      "Nama Pemohon",
      "No. Kontak",
      "Tujuan / Penerima",
      "Metode Input",
      "Catatan",
      "Waktu Pencatatan",
    ];

    const rows = items.map((l) => [
      l.sequenceNumber,
      `"${l.fullNumber.replace(/"/g, '""')}"`,
      `"${l.classificationCode}"`,
      `"${l.signeeCode}"`,
      `"${formatDateIndo(l.letterDate)}"`,
      `"${l.unit.name} (${l.unit.code})"`,
      `"${(l.subject || "").replace(/"/g, '""')}"`,
      `"${(l.applicantName || "").replace(/"/g, '""')}"`,
      `"${(l.applicantContact || "").replace(/"/g, '""')}"`,
      `"${(l.recipient || "").replace(/"/g, '""')}"`,
      `"${l.isManual ? "Manual" : "Otomatis"}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
      `"${formatDateTimeIndo(l.createdAt)}"`,
    ]);

    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Filtered CSV
  const handleExportCSV = () => {
    const dateStr = new Date().toISOString().split("T")[0];
    exportLettersToCSV(sortedLetters, `buku_agenda_fit_${dateStr}.csv`);
  };

  // Export Selected Only CSV
  const handleExportSelectedCSV = () => {
    const selectedLetters = letters.filter((l) => selectedIds.includes(l.id));
    const dateStr = new Date().toISOString().split("T")[0];
    exportLettersToCSV(selectedLetters, `surat_terpilih_fit_${dateStr}.csv`);
  };

  // Delete Single Letter
  const confirmDelete = (id: string) => {
    if (!isAdmin) {
      openLoginModal(() => confirmDelete(id));
      return;
    }
    startDeleteTransition(async () => {
      const res = await deleteLetter(id);
      if (res.success) {
        setLetters((prev) => prev.filter((item) => item.id !== id));
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        setDeleteId(null);
        if (detailLetter?.id === id) {
          setDetailLetter(null);
        }
      }
    });
  };

  // Bulk Delete Letters
  const confirmBulkDelete = () => {
    if (!isAdmin) {
      openLoginModal(() => confirmBulkDelete());
      return;
    }
    startBulkDeleteTransition(async () => {
      const res = await deleteLetters(selectedIds);
      if (res.success) {
        const deletedSet = new Set(selectedIds);
        setLetters((prev) => prev.filter((item) => !deletedSet.has(item.id)));
        setSelectedIds([]);
        setShowBulkDeleteModal(false);
      }
    });
  };

  // Generate visible page numbers for pagination controls
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safeCurrentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (safeCurrentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  // Helper render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 text-slate-400 opacity-40 group-hover:opacity-100 transition-opacity" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
    );
  };

  // RESTRICTED ACCESS GATE: KHUSUS STAF SEKRETARIAT FAKULTAS
  if (!isAdmin) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto my-8 space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Akses Terbatas Khusus</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Buku Agenda Surat Khusus Staf Sekretariat
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
            Halaman Buku Agenda memuat seluruh rekapitulasi 1.620+ dokumen persuratan resmi Fakultas Ilmu Terapan. Sesuai kebijakan tata kelola persuratan, buku agenda hanya dapat dibuka dan dipantau oleh Staf Sekretariat Fakultas.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => openLoginModal()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Lock className="h-4 w-4" />
            <span>Masuk sebagai Admin Sekretariat</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all text-center"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Authorized Status Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-200 font-semibold">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Akses Terbuka: Terverifikasi sebagai <strong>Admin Sekretariat Fakultas</strong>.</span>
        </div>
        <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
          Hak akses penuh: monitoring rekam surat, pencarian, salin nomor, dan ekspor data CSV.
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor surat, kode AKD01, perihal, pemohon..."
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Action Tools: Sort Preset, Page Size Selector & Export Button */}
          <div className="w-full md:w-auto flex flex-wrap items-center justify-between md:justify-end gap-2.5">
            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Urutkan:</span>
              <select
                value={`${sortField}_${sortDirection}`}
                onChange={(e) => {
                  const [f, d] = e.target.value.split("_") as [SortField, SortDirection];
                  setSortField(f);
                  setSortDirection(d);
                }}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-medium text-slate-900 dark:text-white focus:ring-1 focus:ring-red-500 focus:outline-none cursor-pointer"
              >
                <option value="sequenceNumber_asc">No. Urut (1 → N)</option>
                <option value="sequenceNumber_desc">No. Urut (N → 1 / Terbaru)</option>
                <option value="letterDate_desc">Tanggal Surat (Terbaru)</option>
                <option value="letterDate_asc">Tanggal Surat (Terlama)</option>
                <option value="subject_asc">Perihal Surat (A → Z)</option>
                <option value="unit_asc">Program Studi / Unit (A → Z)</option>
                <option value="classificationCode_asc">Kode Klasifikasi (A → Z)</option>
                <option value="signeeCode_asc">Penandatangan (A → Z)</option>
              </select>
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <Rows className="h-3.5 w-3.5 text-slate-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Tampilkan:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  const val = e.target.value;
                  setPageSize(val === "ALL" ? "ALL" : parseInt(val, 10));
                }}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-slate-900 dark:text-white focus:ring-1 focus:ring-red-500 focus:outline-none cursor-pointer"
              >
                <option value={10}>10 data</option>
                <option value={25}>25 data</option>
                <option value={50}>50 data</option>
                <option value={75}>75 data</option>
                <option value={100}>100 data</option>
                <option value="ALL">Semua ({letters.length})</option>
              </select>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              disabled={sortedLetters.length === 0}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Unit / Prodi */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Filter Program Studi / Unit
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="ALL">Semua Program Studi & Unit</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.code})
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Filter Klasifikasi Perihal
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="ALL">Semua Klasifikasi Perihal</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.code}] {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Month */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Filter Bulan Terbit
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="ALL">Semua Bulan (Sepanjang Tahun)</option>
              {months.map((m) => (
                <option key={m.num} value={m.num.toString()}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Floating/Top Bulk Action Bar when items are selected */}
      {selectedIds.length > 0 && (
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md shadow-red-600/5 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              {selectedIds.length}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{selectedIds.length} Surat Terpilih</span>
                {selectedIds.length < totalFiltered && (
                  <button
                    onClick={selectAllFiltered}
                    className="text-red-600 dark:text-red-400 text-xs font-semibold hover:underline cursor-pointer"
                  >
                    &bull; Pilih seluruh {totalFiltered} surat hasil filter
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pilih aksi massal yang ingin diterapkan pada surat terpilih.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Copy All Selected Full Numbers */}
            <button
              onClick={handleCopySelected}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-xs"
            >
              {copiedBulk ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Salin Nomor</span>
                </>
              )}
            </button>

            {/* Export Selected to CSV */}
            <button
              onClick={handleExportSelectedCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs shadow-emerald-600/20"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>Ekspor Terpilih</span>
            </button>

            {/* Bulk Delete Button */}
            <button
              onClick={() => {
                if (!isAdmin) {
                  openLoginModal(() => setShowBulkDeleteModal(true));
                } else {
                  setShowBulkDeleteModal(true);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs shadow-red-600/20"
              title={!isAdmin ? "Klik untuk autentikasi Admin Sekretariat" : "Hapus massal surat"}
            >
              {isAdmin ? <Trash2 className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
              <span>Hapus ({selectedIds.length}) {!isAdmin && "(Admin)"}</span>
            </button>

            {/* Clear Selection */}
            <button
              onClick={clearSelection}
              className="px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Header Info Bar */}
        <div className="px-5 py-3 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>
            Menampilkan data <strong>{totalFiltered === 0 ? 0 : startIndex + 1}</strong> – <strong>{endIndex}</strong> dari total <strong>{totalFiltered}</strong> surat
            {totalFiltered !== letters.length && (
              <span className="text-slate-400 ml-1">(difilter dari {letters.length} total)</span>
            )}
          </div>
          {pageSize !== "ALL" && totalPages > 1 && (
            <div className="font-semibold text-slate-700 dark:text-slate-300">
              Halaman {safeCurrentPage} dari {totalPages}
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                {/* Checkbox Select All Column */}
                <th className="py-3.5 px-4 w-12 text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      ref={selectAllRef}
                      checked={isAllDisplayedSelected}
                      onChange={toggleSelectAllDisplayed}
                      title={isAllDisplayedSelected ? "Batalkan pilihan di halaman ini" : "Pilih semua di halaman ini"}
                      className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-red-600 focus:ring-red-500 cursor-pointer accent-red-600"
                    />
                  </div>
                </th>

                {/* No Urut */}
                <th
                  onClick={() => handleSort("sequenceNumber")}
                  className="py-3.5 px-4 w-20 text-center cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>No Urut</span>
                    {renderSortIcon("sequenceNumber")}
                  </div>
                </th>

                {/* Nomor Surat */}
                <th
                  onClick={() => handleSort("fullNumber")}
                  className="py-3.5 px-4 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Nomor Surat Resmi</span>
                    {renderSortIcon("fullNumber")}
                  </div>
                </th>

                {/* Klasifikasi */}
                <th
                  onClick={() => handleSort("classificationCode")}
                  className="py-3.5 px-4 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Klasifikasi</span>
                    {renderSortIcon("classificationCode")}
                  </div>
                </th>

                {/* Penandatangan */}
                <th
                  onClick={() => handleSort("signeeCode")}
                  className="py-3.5 px-4 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Penandatangan</span>
                    {renderSortIcon("signeeCode")}
                  </div>
                </th>

                {/* Unit / Prodi */}
                <th
                  onClick={() => handleSort("unit")}
                  className="py-3.5 px-4 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Unit / Prodi</span>
                    {renderSortIcon("unit")}
                  </div>
                </th>

                {/* Perihal & Pemohon */}
                <th
                  onClick={() => handleSort("subject")}
                  className="py-3.5 px-4 min-w-[220px] cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Perihal & Pemohon</span>
                    {renderSortIcon("subject")}
                  </div>
                </th>

                {/* Tanggal */}
                <th
                  onClick={() => handleSort("letterDate")}
                  className="py-3.5 px-4 cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Tanggal</span>
                    {renderSortIcon("letterDate")}
                  </div>
                </th>

                {/* Actions */}
                <th className="py-3.5 px-4 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
              {displayedLetters.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="h-8 w-8 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        Tidak ada data surat yang sesuai dengan filter.
                      </p>
                      <p className="text-xs text-slate-400">
                        Coba ubah kata kunci pencarian atau reset filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayedLetters.map((letter) => {
                  const isSelected = selectedIds.includes(letter.id);
                  return (
                    <tr
                      key={letter.id}
                      className={`transition-colors group ${
                        isSelected
                          ? "bg-red-50/60 dark:bg-red-950/30 hover:bg-red-50 dark:hover:bg-red-950/40"
                          : "hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOne(letter.id)}
                            className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-red-600 focus:ring-red-500 cursor-pointer accent-red-600"
                          />
                        </div>
                      </td>

                      {/* No Urut */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-600 dark:text-slate-300">
                        {letter.sequenceNumber}
                      </td>

                      {/* Nomor Surat & Copy Button */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 dark:text-white select-all">
                            {letter.fullNumber}
                          </span>
                          <button
                            onClick={() => handleCopy(letter.id, letter.fullNumber)}
                            title="Salin Nomor Surat"
                            className="opacity-60 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all cursor-pointer"
                          >
                            {copiedId === letter.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 text-slate-500" />
                            )}
                          </button>
                        </div>
                        {letter.isManual && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 font-semibold mt-0.5">
                            <PenTool className="h-2.5 w-2.5" />
                            <span>Input Manual</span>
                          </span>
                        )}
                      </td>

                      {/* Klasifikasi Badge */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
                          {letter.classificationCode}
                        </span>
                      </td>

                      {/* Penandatangan Badge */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                          {letter.signeeCode}
                        </span>
                      </td>

                      {/* Unit / Prodi */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-900 dark:text-slate-200">
                          {letter.unit.code}
                        </span>
                        <span className="block text-[11px] text-slate-400 truncate max-w-[130px]" title={letter.unit.name}>
                          {letter.unit.name}
                        </span>
                      </td>

                      {/* Perihal & Pemohon */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                          {letter.subject}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>Pemohon: <strong>{letter.applicantName}</strong></span>
                          {letter.recipient && (
                            <span className="text-slate-400 truncate max-w-[150px]">
                              &bull; Tujuan: {letter.recipient}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Tanggal */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                        {formatDateIndo(letter.letterDate)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setDetailLetter(letter)}
                            title="Lihat Detail"
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (!isAdmin) {
                                openLoginModal(() => setDeleteId(letter.id));
                              } else {
                                setDeleteId(letter.id);
                              }
                            }}
                            title={isAdmin ? "Hapus Data (Sekretariat)" : "Hapus Data (Khusus Admin)"}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isAdmin
                                ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                                : "text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                            }`}
                          >
                            {isAdmin ? <Trash2 className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Clean & Interactive Pagination Footer */}
        {pageSize !== "ALL" && totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-slate-500 dark:text-slate-400">
              Menampilkan <strong>{startIndex + 1}</strong> – <strong>{endIndex}</strong> dari <strong>{totalFiltered}</strong> data
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              {/* First Page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={safeCurrentPage === 1}
                title="Halaman Pertama"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              >
                <ChevronsLeft className="h-3.5 w-3.5" />
              </button>

              {/* Prev Page */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                title="Halaman Sebelumnya"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              {/* Number Buttons */}
              <div className="flex items-center gap-1 px-1">
                {getPageNumbers().map((p, idx) => {
                  if (p === "...") {
                    return (
                      <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 font-bold">
                        ...
                      </span>
                    );
                  }
                  const pageNum = p as number;
                  const isActive = pageNum === safeCurrentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-[32px] h-8 px-2 rounded-lg font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                          : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Page */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                title="Halaman Berikutnya"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              {/* Last Page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={safeCurrentPage === totalPages}
                title="Halaman Terakhir"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              >
                <ChevronsRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      {detailLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {detailLetter.classificationCode}
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {detailLetter.signeeCode}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white ml-1">
                  Detail Rekam Surat
                </h3>
              </div>
              <button
                onClick={() => setDetailLetter(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Number Box */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Nomor Surat Terdaftar
                </div>
                <div className="font-mono text-lg font-bold text-slate-900 dark:text-white select-all">
                  {detailLetter.fullNumber}
                </div>
              </div>
              <button
                onClick={() => handleCopy(detailLetter.id, detailLetter.fullNumber)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold transition-all cursor-pointer"
              >
                {copiedId === detailLetter.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>

            {/* Details List */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Perihal Surat:</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {detailLetter.subject}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 font-medium">Unit/Program Studi:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {detailLetter.unit.name}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Pejabat Penandatangan:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {detailLetter.signeeCode}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 font-medium">Nama Pemohon:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {detailLetter.applicantName}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Kontak Pemohon:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {detailLetter.applicantContact || "-"}
                  </p>
                </div>
              </div>

              {detailLetter.recipient && (
                <div>
                  <span className="text-slate-400 font-medium">Tujuan / Penerima:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {detailLetter.recipient}
                  </p>
                </div>
              )}

              {detailLetter.notes && (
                <div>
                  <span className="text-slate-400 font-medium">Catatan Tambahan:</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    {detailLetter.notes}
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>Dicatat pada: {formatDateTimeIndo(detailLetter.createdAt)}</span>
                <span>Mode: {detailLetter.isManual ? "Manual" : "Otomatis"}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDetailLetter(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Hapus Rekam Nomor Surat?
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tindakan ini akan menghapus data surat dari buku agenda digital. Pastikan nomor surat ini memang salah dibuat atau dibatalkan resmi.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => confirmDelete(deleteId)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm shadow-red-600/20 cursor-pointer"
              >
                {isDeleting ? "Menghapus..." : "Ya, Hapus Data"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {showBulkDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Hapus Massal {selectedIds.length} Surat?
                </h3>
                <span className="text-xs text-red-600 font-semibold">Tindakan ini permanen</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Anda akan menghapus <strong>{selectedIds.length} rekam nomor surat</strong> yang sedang dipilih dari buku agenda persuratan. Pastikan data tersebut memang dibatalkan resmi.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowBulkDeleteModal(false)}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmBulkDelete}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm shadow-red-600/20 cursor-pointer"
              >
                {isBulkDeleting ? "Menghapus Massal..." : `Ya, Hapus ${selectedIds.length} Data`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
