"use client";

import { useState, useTransition, useEffect } from "react";
import { generateLetterNumber, generateBatchLetterNumbers } from "@/actions/letter-actions";
import { getCategoryBadgeClass, formatDateIndo } from "@/lib/utils";
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  Building2,
  Calendar,
  User,
  Phone,
  Send,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sliders,
  PenTool,
  Hash,
  UserCheck,
  Lock,
  Layers,
  Plus,
  Trash2,
  FileSpreadsheet,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";
import { useAdmin } from "@/context/admin-context";

interface UnitItem {
  id: string;
  name: string;
  code: string;
  signeeCode: string;
  category: string;
}

interface CategoryItem {
  id: string;
  name: string;
  code: string;
  group: string;
  classificationCode: string | null;
  description: string | null;
}

interface Props {
  units: UnitItem[];
  categories: CategoryItem[];
}

interface BatchRowItem {
  applicantName: string;
  recipient: string;
  subject: string;
}

export function LetterGeneratorForm({ units, categories }: Props) {
  const [isPending, startTransition] = useTransition();
  const { isAdmin, openLoginModal } = useAdmin();

  // Mode: "single" (1 surat) vs "batch" (banyak surat) vs "manual" (khusus admin)
  const [mode, setMode] = useState<"single" | "batch" | "manual">("single");

  // Jika keluar dari Admin, kembalikan ke mode single
  useEffect(() => {
    if (!isAdmin && mode === "manual") {
      setMode("single");
    }
  }, [isAdmin, mode]);

  // Shared Form State
  const defaultCategory = categories.find((c) => c.code === "SKR05") || categories[0];
  const defaultUnit = units.find((u) => u.signeeCode === "IT-DEK" || u.code === "DEK") || units[0];

  const [unitId, setUnitId] = useState(defaultUnit?.id || units[0]?.id || "");
  const [categoryId, setCategoryId] = useState(defaultCategory?.id || categories[0]?.id || "");
  
  // Custom signee & classification code
  const [customSignee, setCustomSignee] = useState(defaultUnit?.signeeCode || "IT-DEK");
  const [customClassification, setCustomClassification] = useState(defaultCategory?.code || "SKR05");

  // Single & General fields
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantContact, setApplicantContact] = useState("");
  const [letterDate, setLetterDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");

  // Manual specific fields
  const [manualSequenceNumber, setManualSequenceNumber] = useState<string>("");
  const [manualFullNumber, setManualFullNumber] = useState<string>("");

  // Batch specific fields
  const [batchCount, setBatchCount] = useState<number>(3);
  const [batchDetailed, setBatchDetailed] = useState(false);
  const [batchRows, setBatchRows] = useState<BatchRowItem[]>([
    { applicantName: "", recipient: "", subject: "" },
    { applicantName: "", recipient: "", subject: "" },
    { applicantName: "", recipient: "", subject: "" },
  ]);

  // Synchronize batchRows with batchCount when in detailed mode
  const handleBatchCountChange = (newCount: number) => {
    const val = Math.max(1, Math.min(newCount, 100));
    setBatchCount(val);
    if (batchDetailed) {
      setBatchRows((prev) => {
        const rows = [...prev];
        while (rows.length < val) {
          rows.push({ applicantName: "", recipient: "", subject: "" });
        }
        return rows.slice(0, val);
      });
    }
  };

  const handleAddBatchRow = () => {
    if (batchCount >= 100) return;
    const newCount = batchCount + 1;
    setBatchCount(newCount);
    setBatchRows((prev) => [...prev, { applicantName: "", recipient: "", subject: "" }]);
  };

  const handleRemoveBatchRow = (index: number) => {
    if (batchCount <= 1) return;
    const newCount = batchCount - 1;
    setBatchCount(newCount);
    setBatchRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateBatchRow = (index: number, field: keyof BatchRowItem, value: string) => {
    setBatchRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Result States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{
    fullNumber: string;
    sequenceNumber: number;
    subject: string;
    applicantName: string;
    recipient?: string | null;
    letterDate: string;
    unitName: string;
    categoryName: string;
    classificationCode?: string;
    signeeCode?: string;
    isManual?: boolean;
  } | null>(null);

  const [batchSuccessResult, setBatchSuccessResult] = useState<{
    count: number;
    startNumber?: string;
    endNumber?: string;
    letters: Array<{
      id: string;
      fullNumber: string;
      sequenceNumber: number;
      subject: string;
      applicantName: string;
      recipient?: string | null;
      letterDate: string;
      unitName: string;
      categoryName: string;
      classificationCode?: string;
      signeeCode?: string;
    }>;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [copiedBatch, setCopiedBatch] = useState(false);

  // Selected Objects
  const selectedUnit = units.find((u) => u.id === unitId);
  const selectedCategory = categories.find((c) => c.id === categoryId);

  // Auto-update classification when category dropdown changes
  useEffect(() => {
    if (selectedCategory) {
      setCustomClassification(selectedCategory.code);
    }
  }, [selectedCategory]);

  // Auto-preset signee based on selected unit
  useEffect(() => {
    if (selectedUnit) {
      setCustomSignee(selectedUnit.signeeCode || "IT-DEK");
    }
  }, [selectedUnit]);

  // Year calculation
  const parsedDate = letterDate ? new Date(letterDate) : new Date();
  const previewYear = parsedDate.getFullYear();

  // Calculate live preview number
  const currentClassification = customClassification || selectedCategory?.code || "SKR05";
  const currentSignee = customSignee || "IT-DEK";

  const previewNumber = mode === "manual" && manualFullNumber.trim()
    ? manualFullNumber.trim()
    : mode === "batch"
    ? `[No_Urut] s.d. [No_Urut + ${batchCount - 1}]/${currentClassification}/${currentSignee}/${previewYear}`
    : `${mode === "manual" && manualSequenceNumber ? manualSequenceNumber : "[No_Urut]"}/${currentClassification}/${currentSignee}/${previewYear}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyAllBatch = () => {
    if (!batchSuccessResult || !batchSuccessResult.letters) return;
    const allNumbers = batchSuccessResult.letters.map((l) => l.fullNumber).join("\n");
    navigator.clipboard.writeText(allNumbers);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 3000);
  };

  // Export Batch result to CSV
  const handleExportBatchCSV = () => {
    if (!batchSuccessResult || !batchSuccessResult.letters) return;
    const headers = ["No. Urut", "Nomor Surat Lengkap", "Klasifikasi", "Penandatangan", "Perihal", "Pemohon", "Tujuan", "Tanggal"];
    const rows = batchSuccessResult.letters.map((l) => [
      l.sequenceNumber,
      `"${l.fullNumber}"`,
      `"${l.classificationCode}"`,
      `"${l.signeeCode}"`,
      `"${l.subject.replace(/"/g, '""')}"`,
      `"${l.applicantName.replace(/"/g, '""')}"`,
      `"${(l.recipient || "").replace(/"/g, '""')}"`,
      `"${formatDateIndo(l.letterDate)}"`,
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `batch_${batchSuccessResult.count}_nomor_surat.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // MODE BATCH (Banyak Surat Sekaligus)
    if (mode === "batch") {
      startTransition(async () => {
        const items = batchDetailed
          ? batchRows.map((r) => ({
              applicantName: r.applicantName.trim() || applicantName.trim(),
              recipient: r.recipient.trim() || recipient.trim(),
              subject: r.subject.trim() || subject.trim(),
            }))
          : undefined;

        const res = await generateBatchLetterNumbers({
          count: batchCount,
          unitId,
          categoryId,
          classificationCode: customClassification,
          signeeCode: customSignee,
          subject,
          recipient,
          applicantName,
          applicantContact,
          letterDate,
          notes,
          items,
        });

        if (!res.success) {
          setErrorMsg(res.error || "Gagal membuat batch nomor surat.");
          return;
        }

        if (res.letters) {
          setBatchSuccessResult({
            count: res.count,
            startNumber: res.startNumber,
            endNumber: res.endNumber,
            letters: res.letters,
          });
          setSuccessResult(null);
          setSubject("");
          setRecipient("");
          setApplicantContact("");
          setNotes("");
        }
      });
      return;
    }

    // MODE MANUAL (Proteksi Admin)
    if (mode === "manual" && !isAdmin) {
      openLoginModal();
      return;
    }

    // MODE SINGLE / MANUAL
    startTransition(async () => {
      const res = await generateLetterNumber({
        isManual: mode === "manual",
        manualSequenceNumber: mode === "manual" && manualSequenceNumber ? parseInt(manualSequenceNumber, 10) : undefined,
        manualFullNumber: mode === "manual" && manualFullNumber.trim() ? manualFullNumber.trim() : undefined,
        unitId,
        categoryId,
        classificationCode: customClassification,
        signeeCode: customSignee,
        subject,
        recipient,
        applicantName,
        applicantContact,
        letterDate,
        notes,
      });

      if (!res.success) {
        setErrorMsg(res.error || "Gagal membuat nomor surat.");
        return;
      }

      if (res.letter) {
        setSuccessResult(res.letter);
        setBatchSuccessResult(null);
        setSubject("");
        setRecipient("");
        setApplicantContact("");
        setNotes("");
        setManualSequenceNumber("");
        setManualFullNumber("");
      }
    });
  };

  const handleResetForNew = () => {
    setSuccessResult(null);
    setBatchSuccessResult(null);
    setCopied(false);
    setCopiedBatch(false);
    setErrorMsg(null);
  };

  // 22 Official Signees in FIT
  const signeeGroups = [
    {
      group: "Pimpinan Fakultas",
      options: [
        { code: "IT-DEK", label: "IT-DEK — Dekan Fakultas Ilmu Terapan" },
        { code: "IT-WD1", label: "IT-WD1 — Wakil Dekan 1 (Akademik & Riset)" },
        { code: "IT-WD2", label: "IT-WD2 — Wakil Dekan 2 (Keuangan, SDM & Kemahasiswaan)" },
      ],
    },
    {
      group: "Kepala Urusan / Bagian FIT",
      options: [
        { code: "IT-SDM", label: "IT-SDM — Kaur Sumber Daya, Keuangan & Logistik" },
        { code: "IT-SKR", label: "IT-SKR — Kaur Sekretariat" },
        { code: "IT-LAB", label: "IT-LAB — Kaur Laboratorium & Bengkel" },
        { code: "IT-LKM", label: "IT-LKM — Kaur Layanan Kerjasama dan Magang" },
        { code: "IT-LA", label: "IT-LA — Kaur Layanan Akademik" },
        { code: "IT-KMH", label: "IT-KMH — Kaur Kemahasiswaan" },
      ],
    },
    {
      group: "Ketua Program Studi (Kaprodi)",
      options: [
        { code: "IT-D3-SI", label: "IT-D3-SI — Prodi D3 Sistem Informasi" },
        { code: "IT-D3-TKO", label: "IT-D3-TKO — Prodi D3 Teknologi Komputer" },
        { code: "IT-D3-SIA", label: "IT-D3-SIA — Prodi D3 Sistem Informasi Akuntansi" },
        { code: "IT-D3-RPL", label: "IT-D3-RPL — Prodi D3 Rekayasa Perangkat Lunak Aplikasi" },
        { code: "IT-D3-MP", label: "IT-D3-MP — Prodi D3 Manajemen Pemasaran" },
        { code: "IT-D3-PHT", label: "IT-D3-PHT — Prodi D3 Perhotelan" },
        { code: "IT-D3-TT", label: "IT-D3-TT — Prodi D3 Teknologi Telekomunikasi" },
        { code: "IT-D4-TRM", label: "IT-D4-TRM — Prodi S1 Terapan Teknologi Rekayasa Multimedia" },
        { code: "IT-D4-SIKC", label: "IT-D4-SIKC — Prodi S1 Terapan Sistem Informasi Kota Cerdas" },
        { code: "IT-S2-RTI", label: "IT-S2-RTI — Prodi S2 Terapan Rekayasa Teknologi Informasi" },
      ],
    },
    {
      group: "Kelompok Keahlian & Riset (KK / Research Alliance)",
      options: [
        { code: "IT-KK-AITM", label: "IT-KK-AITM — KK Applied Information Technology and Multimedia" },
        { code: "IT-KK-DBS", label: "IT-KK-DBS — KK Applied Digital Business Entrepreneur and Tourism" },
        { code: "IT-RA-ATAP", label: "IT-RA-ATAP — Research Alliance ATAP" },
      ],
    },
  ];

  // Grouping Categories
  const categoryGroups = [
    { key: "AKD", label: "AKD — Akademik & Perkuliahan" },
    { key: "KMH", label: "KMH — Kemahasiswaan, Lomba & Beasiswa" },
    { key: "SDM", label: "SDM — Kepegawaian & Penugasan Dosen" },
    { key: "SAM", label: "SAM — Kerjasama, MoU, MoA & Kemitraan" },
    { key: "LIT", label: "LIT — Penelitian, Jurnal & Konferensi" },
    { key: "ABD", label: "ABD — Pengabdian kepada Masyarakat (Abdimas)" },
    { key: "AST", label: "AST — Sarana, Ruangan & Laboratorium" },
    { key: "KUG", label: "KUG — Keuangan & Anggaran" },
    { key: "SKR", label: "SKR — Sekretariat & Undangan Resmi" },
  ];

  return (
    <div className="space-y-8">
      {/* 3-Way Mode Switcher Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap sm:flex-nowrap items-center gap-2 max-w-xl">
        {/* Tab 1: Satu Surat */}
        <button
          type="button"
          onClick={() => {
            setMode("single");
            setErrorMsg(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mode === "single"
              ? "bg-red-600 text-white shadow-md shadow-red-600/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Satu Surat</span>
        </button>

        {/* Tab 2: Banyak Surat Sekaligus (Batch) */}
        <button
          type="button"
          onClick={() => {
            setMode("batch");
            setErrorMsg(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mode === "batch"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Banyak Surat (Batch)</span>
        </button>

        {/* Tab 3: Mode Manual (Admin Only) */}
        <button
          type="button"
          onClick={() => {
            if (!isAdmin) {
              openLoginModal(() => {
                setMode("manual");
                setErrorMsg(null);
              });
            } else {
              setMode("manual");
              setErrorMsg(null);
            }
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mode === "manual"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
          title={!isAdmin ? "Klik untuk autentikasi Admin Sekretariat" : "Mode Manual Aktif"}
        >
          {isAdmin ? (
            <PenTool className="h-4 w-4" />
          ) : (
            <Lock className="h-3.5 w-3.5 text-amber-500" />
          )}
          <span>Mode Manual {!isAdmin && "(Admin)"}</span>
        </button>
      </div>

      {/* SINGLE SUCCESS BANNER */}
      {successResult && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/50 rounded-2xl p-6 sm:p-8 shadow-xl shadow-emerald-500/5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-300">
                  {successResult.isManual ? "Nomor Surat Manual Terdaftar" : "Nomor Surat Otomatis Diterbitkan"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Tercatat Resmi di Buku Agenda FIT
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="text-center sm:text-left">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Nomor Surat Resmi
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-slate-900 dark:text-slate-100 selection:bg-emerald-200">
                {successResult.fullNumber}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(successResult.fullNumber)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Nomor Surat</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-emerald-100/50 dark:bg-emerald-950/60 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Unit Pemohon:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{successResult.unitName}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Klasifikasi Perihal:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{successResult.classificationCode || successResult.categoryName}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Penandatangan:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{successResult.signeeCode || "IT-DEK"}</p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Tanggal Terbit:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{formatDateIndo(successResult.letterDate)}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleResetForNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Buat Nomor Lainnya</span>
            </button>
            <Link
              href="/agenda"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-all"
            >
              <span>Lihat di Buku Agenda</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* BATCH SUCCESS BANNER */}
      {batchSuccessResult && (
        <div className="bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 animate-in fade-in zoom-in-95 duration-200 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                <Layers className="h-7 w-7" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-blue-700 dark:text-blue-300">
                  Batch Generator Berhasil
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {batchSuccessResult.count} Nomor Surat Berurutan Resmi Diterbitkan!
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyAllBatch}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all active:scale-95 cursor-pointer"
              >
                {copiedBatch ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Semua Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Salin Semua Nomor ({batchSuccessResult.count})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleExportBatchCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>Ekspor CSV</span>
              </button>
            </div>
          </div>

          {/* Range Display Box */}
          <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Rentang Nomor yang Diterbitkan:</span>
              <p className="font-mono text-base font-bold text-blue-700 dark:text-blue-300 mt-0.5">
                {batchSuccessResult.startNumber} &nbsp;&rarr;&nbsp; {batchSuccessResult.endNumber}
              </p>
            </div>
            <div className="text-slate-500 font-semibold bg-blue-50 dark:bg-blue-900/40 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
              Total: {batchSuccessResult.count} Surat
            </div>
          </div>

          {/* Table of Generated Letters */}
          <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden shadow-xs">
            <div className="max-h-80 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3 w-14 text-center">Urut</th>
                    <th className="py-2.5 px-3">Nomor Surat Resmi</th>
                    <th className="py-2.5 px-3">Perihal</th>
                    <th className="py-2.5 px-3">Pemohon / Mahasiswa</th>
                    <th className="py-2.5 px-3">Tujuan</th>
                    <th className="py-2.5 px-3 text-center w-16">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {batchSuccessResult.letters.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500">
                        #{l.sequenceNumber}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-700 dark:text-blue-300">
                        {l.fullNumber}
                      </td>
                      <td className="py-2.5 px-3 font-medium truncate max-w-[200px]" title={l.subject}>
                        {l.subject}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                        {l.applicantName}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">
                        {l.recipient || "-"}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleCopy(l.fullNumber)}
                          title="Salin nomor ini"
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleResetForNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Buat Batch Lainnya</span>
            </button>
            <Link
              href="/agenda"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-all"
            >
              <span>Buka Buku Agenda</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Form & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {mode === "batch" ? (
                  <>
                    <Layers className="h-5 w-5 text-blue-600" />
                    Form Generator Banyak Surat (Batch / Massal)
                  </>
                ) : mode === "single" ? (
                  <>
                    <FileText className="h-5 w-5 text-red-600" />
                    Form Generator Satu Nomor Surat
                  </>
                ) : (
                  <>
                    <PenTool className="h-5 w-5 text-purple-600" />
                    Form Input Nomor Surat Manual (Admin)
                  </>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {mode === "batch"
                  ? "Terbitkan beberapa nomor surat berurutan sekaligus dalam 1 kali klik tanpa risiko bentrok."
                  : mode === "manual"
                  ? "Staf dapat memasukkan nomor urut spesifik, surat susulan/backdate, atau format custom."
                  : "Sistem otomatis menetapkan nomor urut berikutnya sesuai buku agenda resmi FIT."}
              </p>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                mode === "batch"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                  : mode === "manual"
                  ? "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                  : "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300"
              }`}
            >
              {mode === "batch" ? "Mode Batch" : mode === "manual" ? "Mode Manual" : "Mode Tunggal"}
            </span>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start gap-3 text-red-700 dark:text-red-300 text-xs font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* BATCH MODE SETTINGS */}
            {mode === "batch" && (
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-800 dark:text-blue-300">
                    <Layers className="h-4 w-4 text-blue-600" />
                    <span>Pengaturan Batch / Jumlah Surat yang Dibutuhkan</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded">
                    Maks. 100 Nomor
                  </span>
                </div>

                {/* Quick Count Selection Buttons */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Pilih Jumlah Nomor yang Diterbitkan Sekaligus:
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {[2, 3, 5, 10, 15, 20, 50].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleBatchCountChange(num)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          batchCount === num
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {num} Nomor
                      </button>
                    ))}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="text-[11px] text-slate-500">Kustom:</span>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={batchCount}
                        onChange={(e) => handleBatchCountChange(parseInt(e.target.value, 10) || 1)}
                        className="w-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-center text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggle Detailed Mode */}
                <div className="pt-2 border-t border-blue-200/60 dark:border-blue-800/40 flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={batchDetailed}
                        onChange={(e) => {
                          setBatchDetailed(e.target.checked);
                          if (e.target.checked) {
                            handleBatchCountChange(batchCount);
                          }
                        }}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                      />
                      <span>Isi Rincian Nama Pemohon & Tujuan Berbeda per Surat</span>
                    </label>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 ml-5.5">
                      Aktifkan jika surat tugas/magang ditujukan untuk nama mahasiswa atau perusahaan mitra yang berlainan.
                    </p>
                  </div>
                </div>

                {/* Detailed Table Rows if enabled */}
                {batchDetailed && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      <span>Daftar {batchCount} Surat:</span>
                      <button
                        type="button"
                        onClick={handleAddBatchRow}
                        className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Tambah Baris</span>
                      </button>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {batchRows.map((row, idx) => (
                        <div
                          key={idx}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 flex items-center gap-2 text-xs"
                        >
                          <span className="font-mono font-bold text-slate-400 w-6 text-center shrink-0">
                            #{idx + 1}
                          </span>
                          <input
                            type="text"
                            placeholder={`Pemohon / Mahasiswa #${idx + 1}`}
                            value={row.applicantName}
                            onChange={(e) => updateBatchRow(idx, "applicantName", e.target.value)}
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Tujuan / Mitra"
                            value={row.recipient}
                            onChange={(e) => updateBatchRow(idx, "recipient", e.target.value)}
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs"
                          />
                          {batchRows.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveBatchRow(idx)}
                              className="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MANUAL MODE EXTRA INPUTS */}
            {mode === "manual" && (
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <Sliders className="h-4 w-4" />
                  <span>Pengaturan Penomoran Manual (Staf Sekretariat)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Nomor Urut Khusus (Opsional)
                    </label>
                    <input
                      type="number"
                      value={manualSequenceNumber}
                      onChange={(e) => setManualSequenceNumber(e.target.value)}
                      placeholder="Contoh: 1532"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Kosongkan jika ingin auto-increment.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Override Nomor Lengkap (Opsional)
                    </label>
                    <input
                      type="text"
                      value={manualFullNumber}
                      onChange={(e) => setManualFullNumber(e.target.value)}
                      placeholder="Contoh: 1532/AKD01/IT-DEK/2026"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Jika diisi, format ini langsung digunakan.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Prodi / Unit Pemohon */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Program Studi / Unit Pemohon <span className="text-red-500">*</span>
              </label>
              <select
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
              >
                <optgroup label="Program Studi FIT">
                  {units
                    .filter((u) => u.category === "PRODI")
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.signeeCode})
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Pimpinan & Dekanat">
                  {units
                    .filter((u) => u.category === "DEKANAT")
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.signeeCode})
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Urusan / Layanan FIT">
                  {units
                    .filter((u) => u.category === "BAGIAN")
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.signeeCode})
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Kelompok Keahlian & Riset">
                  {units
                    .filter((u) => u.category === "KELOMPOK_KEAHLIAN" || u.category === "RISET")
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.signeeCode})
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>

            {/* Klasifikasi Perihal & Penandatangan Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kategori Klasifikasi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Klasifikasi Perihal Surat <span className="text-red-500">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                >
                  {categoryGroups.map((g) => {
                    const groupCats = categories.filter((c) => c.group === g.key);
                    if (groupCats.length === 0) return null;
                    return (
                      <optgroup key={g.key} label={g.label}>
                        {groupCats.map((c) => (
                          <option key={c.id} value={c.id}>
                            [{c.code}] {c.name}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
              </div>

              {/* Pejabat Penandatangan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Pejabat Penandatangan <span className="text-red-500">*</span>
                </label>
                <select
                  value={customSignee}
                  onChange={(e) => setCustomSignee(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                >
                  {signeeGroups.map((sg) => (
                    <optgroup key={sg.group} label={sg.group}>
                      {sg.options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                          {opt.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Tanggal Surat */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Tanggal Surat <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={letterDate}
                onChange={(e) => setLetterDate(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
              />
            </div>

            {/* Perihal Surat */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {mode === "batch" ? "Perihal Umum / Judul Kegiatan Batch" : "Perihal / Uraian Surat"} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                rows={2}
                placeholder={
                  mode === "batch"
                    ? "Contoh: Surat Tugas Dosen Pembimbing Lapangan Magang MBKM Semester Ganjil 2026/2027"
                    : "Contoh: Surat Tugas Dosen Pembimbing Lapangan Magang MBKM Semester Ganjil 2026/2027"
                }
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
              />
            </div>

            {/* Pemohon & Kontak Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  {mode === "batch" ? "Nama Koordinator / PIC Pengaju" : "Nama Pemohon / PIC"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  required
                  placeholder="Nama Dosen / Staff / Koordinator"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp Pemohon (Opsional)
                </label>
                <input
                  type="tel"
                  value={applicantContact}
                  onChange={(e) => setApplicantContact(e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Tujuan Surat (Hanya jika bukan batch detailed) */}
            {(!batchDetailed || mode !== "batch") && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Tujuan / Penerima Surat (Opsional)
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Contoh: HR Division PT Telkom Indonesia (Persero) Tbk"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                />
              </div>
            )}

            {/* Catatan Tambahan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Catatan Tambahan (Opsional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Keterangan berkas, agenda kegiatan, dll."
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-[0.99] cursor-pointer disabled:bg-slate-400 ${
                  mode === "batch"
                    ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/25"
                    : mode === "manual"
                    ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/25"
                    : "bg-red-600 hover:bg-red-700 shadow-red-600/25"
                }`}
              >
                {isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Menerbitkan {mode === "batch" ? `${batchCount} Nomor Surat...` : "Nomor Surat..."}</span>
                  </>
                ) : mode === "batch" ? (
                  <>
                    <Layers className="h-4 w-4" />
                    <span>Terbitkan {batchCount} Nomor Surat Sekaligus</span>
                  </>
                ) : mode === "manual" ? (
                  <>
                    <PenTool className="h-4 w-4" />
                    <span>Daftarkan Nomor Surat Manual</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Terbitkan Satu Nomor Surat Otomatis</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Preview & Guidance Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Preview Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Live Preview Format Surat FIT
                </span>
              </div>
              <span
                className={`text-[10px] border px-2 py-0.5 rounded-full font-mono font-semibold ${
                  mode === "batch"
                    ? "bg-blue-900/40 text-blue-300 border-blue-500/30"
                    : mode === "manual"
                    ? "bg-purple-900/40 text-purple-300 border-purple-500/30"
                    : "bg-red-900/40 text-red-300 border-red-500/30"
                }`}
              >
                {mode === "batch" ? `Batch ${batchCount} Surat` : mode === "manual" ? "Custom Manual" : "Auto-Increment"}
              </span>
            </div>

            {/* Big Output Format Box */}
            <div className="bg-slate-800/80 rounded-xl p-4 text-center border border-slate-700/80 my-3">
              <div className="text-[11px] text-slate-400 uppercase font-medium mb-1">
                {mode === "batch" ? "Format Alokasi Rentang Nomor:" : "Nomor yang akan diterbitkan:"}
              </div>
              <div className="font-mono text-lg sm:text-xl font-black text-amber-300 tracking-tight break-all">
                {previewNumber}
              </div>
              {mode === "batch" && (
                <div className="text-[11px] text-blue-400 font-semibold mt-1">
                  Sistem akan mengalokasikan {batchCount} nomor urut berurutan tanpa celah
                </div>
              )}
            </div>

            {/* Structure Breakdown */}
            <div className="mt-5 space-y-2.5 text-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Rincian Segmen Nomor Sesuai Panduan PU.006:
              </div>

              {/* Segmen 1 */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">1. Nomor Urut:</span>
                <span className="font-mono font-bold text-amber-400 bg-slate-800 px-2 py-0.5 rounded">
                  {mode === "batch" ? `${batchCount} Nomor Beruntun` : mode === "manual" && manualSequenceNumber ? manualSequenceNumber : "Urutan Otomatis"}
                </span>
              </div>

              {/* Segmen 2 */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">2. Klasifikasi Perihal:</span>
                <span className="font-mono font-bold text-blue-400 bg-slate-800 px-2 py-0.5 rounded">
                  {customClassification || selectedCategory?.code}
                </span>
              </div>

              {/* Segmen 3 */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">3. Pejabat / Penandatangan:</span>
                <span className="font-mono font-bold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded">
                  {customSignee || "IT-DEK"}
                </span>
              </div>

              {/* Segmen 4 */}
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">4. Tahun Surat:</span>
                <span className="font-mono font-bold text-purple-400 bg-slate-800 px-2 py-0.5 rounded">
                  {previewYear}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Guidance Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Info className="h-4 w-4 text-blue-600" />
              <span>Kapan Menggunakan Mode Batch?</span>
            </div>
            <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              <p>
                &bull; <strong>Surat Tugas Magang / MBKM</strong>: Ketika prodi menerbitkan puluhan surat pengantar untuk mahasiswa ke mitra industri yang berbeda.
              </p>
              <p>
                &bull; <strong>Surat Undangan Rapat / Narasumber</strong>: Ketika mengundang belasan pemateri atau dosen penguji sidang.
              </p>
              <p>
                &bull; <strong>Blok Nomor Kegiatan</strong>: Alokasi cepat rentang nomor berurutan tanpa perlu mengulang-ulang klik form puluhan kali.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
