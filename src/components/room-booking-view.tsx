"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import {
  checkRoomAvailability,
  createRoomBooking,
  cancelRoomBooking,
  approveRoomBooking,
  rejectRoomBooking,
} from "@/actions/room-actions";
import { useAdmin } from "@/context/admin-context";
import {
  Building2,
  Calendar,
  Clock,
  Users,
  Tv,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Copy,
  Check,
  X,
  Trash2,
  Plus,
  Info,
  Layers,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  Phone,
  User,
  FileText,
  CalendarDays,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";

interface RoomItem {
  id: string;
  name: string;
  code: string;
  capacity: number;
  location: string;
  facilities: string;
  priorityNotes: string | null;
  isCombo: boolean;
  comboChildCodes: string | null;
}

interface BookingItem {
  id: string;
  bookingNumber: string;
  roomId: string;
  room: RoomItem;
  bookingDate: string;
  dateStr: string;
  startTime: string;
  endTime: string;
  purpose: string;
  unitName: string;
  applicantName: string;
  applicantPhone: string;
  participantCount: number;
  facilityNotes: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface UnitItem {
  id: string;
  name: string;
  code: string;
  signeeCode: string;
}

const STAFF_BY_UNIT: Record<string, string[]> = {
  // Staf Urusan Fakultas
  "Staf Urusan Sekretariat": ["Dini (Staf Sekretariat)", "Pak Satri", "Staf Sekretariat"],
  "Staf Urusan Layanan Kerjasama dan Magang": ["Najwa (Staf LKM)", "Fajri", "Teh Fitri", "Staf LKM"],
  "Staf Urusan Layanan Akademik": ["Annisa (Staf LA)", "Puspa (Staf LA)", "Bu Lisda (Staf LA)", "Teh Ica (Staf LA)", "Staf LA"],
  "Staf Urusan Kemahasiswaan": ["Nia (Staf Kemahasiswaan)", "Alfan", "Staf Kemahasiswaan"],
  "Staf Urusan Sumber Daya, Keuangan & Logistik": ["Teh Yayu (Staf Keuangan)", "Hanif (Staf SDM)", "Najwa", "Staf SDM/Keuangan"],
  "Staf Urusan Laboratorium": ["Laboran / Asisten Lab", "Staf Lab"],

  // Kepala Urusan Fakultas
  "Kepala Urusan Sekretariat": ["Dini (Staf Sekretariat)", "Pak Satri", "Kaur Sekretariat"],
  "Kepala Urusan Layanan Kerjasama dan Magang": ["Najwa (Staf LKM)", "Fajri", "Teh Fitri", "Kaur Layanan Kerjasama & Magang"],
  "Kepala Urusan Layanan Akademik": ["Annisa (Staf LA)", "Puspa (Staf LA)", "Bu Lisda (Staf LA)", "Teh Ica (Staf LA)", "Kaur Layanan Akademik"],
  "Kepala Urusan Kemahasiswaan": ["Nia (Staf Kemahasiswaan)", "Alfan", "Kaur Kemahasiswaan"],
  "Kepala Urusan Sumber Daya, Keuangan & Logistik": ["Teh Yayu (Staf Keuangan)", "Hanif (Staf SDM)", "Najwa", "Kaur SDM & Keuangan"],
  "Kepala Urusan Laboratorium": ["Kaur Laboratorium & Bengkel", "Laboran / Asisten Lab"],

  // Program Studi
  "Prodi D3 Rekayasa Perangkat Lunak Aplikasi": ["Septi (Admin Prodi)", "Kaprodi D3 RPL", "Dosen / Staf RPL"],
  "Prodi D3 Sistem Informasi": ["Paxy (Admin Prodi)", "Irbah (Staf Prodi)", "Alifia", "Kaprodi D3 SI"],
  "Prodi D3 Sistem Informasi Akuntansi": ["Paxy (Admin Prodi)", "Kaprodi D3 SIA"],
  "Prodi D3 Teknologi Komputer": ["Nadia (Admin Prodi)", "Teh Fitri", "Kaprodi D3 TKO"],
  "Prodi D3 Manajemen Pemasaran": ["Rangga (Admin Prodi)", "Kaprodi D3 MP"],
  "Prodi D3 Perhotelan": ["Dika (Admin Prodi)", "Kaprodi D3 PHT"],
  "Prodi D3 Teknologi Telekomunikasi": ["Nourman (Admin Prodi)", "Bu Yuyun", "Kaprodi D3 TT"],
  "Prodi S1 Terapan Teknologi Rekayasa Multimedia": ["Zuchra (Admin Prodi)", "Kaprodi S1 TRM"],
  "Prodi S1 Terapan Sistem Informasi Kota Cerdas": ["Dadan (Admin Prodi)", "Irbah", "Kaprodi S1 SIKC"],
  "Prodi S2 Terapan Rekayasa Teknologi Informasi": ["Ivo (Admin Prodi)", "Kaprodi S2 RTI"],

  // Pimpinan & Ormawa
  "Dekan Fakultas Ilmu Terapan": ["Dekan FIT", "Staf Dekanat"],
  "Wakil Dekan 1 (Akademik & Riset)": ["Wadek 1 FIT", "Staf Akademik & Riset"],
  "Wakil Dekan 2 (Keuangan, SDM & Kemahasiswaan)": ["Wadek 2 FIT", "Staf Keuangan & Kemahasiswaan"],
  "Dekanat FIT": ["Dekan FIT", "Wakil Dekan 1", "Wakil Dekan 2", "Staf Dekanat"],
  "Sekretariat Fakultas": ["Dini (Staf Sekretariat)", "Kaur Sekretariat", "Staf Sekretariat"],
  "Kelompok Keahlian Applied Information Technology and Multimedia": ["Ketua KK AITM", "Staf KK AITM"],
  "Kelompok Keahlian Applied Digital Business Entrepreneur and Tourism": ["Bu Vany", "Ketua KK DBS"],
  "Research Alliance ATAP": ["Ketua Research Alliance ATAP", "Peneliti RA ATAP"],
  "BEM / DPM FIT": ["Ketua BEM", "Ketua DPM", "Pengurus BEM FIT"],
  "Himpunan Mahasiswa (HIMA)": ["Ketua HIMA", "Sekretaris HIMA", "Panitia Kegiatan"],
  "Panitia Kegiatan Khusus": ["Ketua Panitia", "Sekretaris Panitia"],
};

// Helper pencari staf yang fleksibel dengan kode unit di dalam kurung
function getStaffList(unitStr: string): string[] {
  if (STAFF_BY_UNIT[unitStr]) return STAFF_BY_UNIT[unitStr];
  const clean = unitStr.replace(/\s*\([^)]*\)/, "").trim();
  if (STAFF_BY_UNIT[clean]) return STAFF_BY_UNIT[clean];
  for (const [key, val] of Object.entries(STAFF_BY_UNIT)) {
    if (unitStr.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(unitStr.toLowerCase())) {
      return val;
    }
  }
  return [];
}

interface Props {
  rooms: RoomItem[];
  units: UnitItem[];
  initialBookings: BookingItem[];
}

export function RoomBookingView({ rooms, units, initialBookings }: Props) {
  const { isAdmin, openLoginModal } = useAdmin();
  const [activeTab, setActiveTab] = useState<"form" | "schedule" | "list">("form");

  // Booking Data
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);

  // Form State
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || "");
  const [dateStr, setDateStr] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("11:00");
  const defaultUnit = "Staf Urusan Sekretariat (IT-SKR)";
  const [unitName, setUnitName] = useState<string>(defaultUnit);
  const [applicantName, setApplicantName] = useState<string>(
    getStaffList(defaultUnit)?.[0] || "Dini (Staf Sekretariat)"
  );
  const [applicantPhone, setApplicantPhone] = useState<string>("");
  const [participantCount, setParticipantCount] = useState<number>(15);
  const [purpose, setPurpose] = useState<string>("");
  const [facilityNotes, setFacilityNotes] = useState<string>("");

  const currentUnitStaff = useMemo(() => {
    return getStaffList(unitName);
  }, [unitName]);

  const handleUnitChange = (newUnit: string) => {
    setUnitName(newUnit);
    const staffList = getStaffList(newUnit);
    if (staffList && staffList.length > 0) {
      setApplicantName(staffList[0]);
    }
  };

  // Live Availability Check State
  const [availChecking, setAvailChecking] = useState<boolean>(false);
  const [availResult, setAvailResult] = useState<{
    checked: boolean;
    available: boolean;
    error?: string;
  }>({ checked: false, available: true });

  // Submit & Transition State
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [successBooking, setSuccessBooking] = useState<BookingItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [listStatusFilter, setListStatusFilter] = useState<string>("ALL");

  // Schedule View Date State
  const [scheduleDate, setScheduleDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // List View Filter State
  const [listSearch, setListSearch] = useState<string>("");
  const [listRoomFilter, setListRoomFilter] = useState<string>("ALL");
  const [listDateFilter, setListDateFilter] = useState<string>("");

  // Selected Room Object
  const currentRoom = useMemo(() => {
    return rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  }, [rooms, selectedRoomId]);

  // Real-time Availability Check whenever room, date, or time changes
  useEffect(() => {
    let isCurrent = true;
    if (!selectedRoomId || !dateStr || !startTime || !endTime) return;

    if (startTime >= endTime) {
      setAvailResult({
        checked: true,
        available: false,
        error: "Jam selesai harus lebih besar dari jam mulai.",
      });
      return;
    }

    setAvailChecking(true);
    const timer = setTimeout(async () => {
      const res = await checkRoomAvailability(selectedRoomId, dateStr, startTime, endTime);
      if (isCurrent) {
        setAvailChecking(false);
        setAvailResult({
          checked: true,
          available: res.available,
          error: res.error,
        });
      }
    }, 250);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [selectedRoomId, dateStr, startTime, endTime]);

  // Handle Form Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (startTime >= endTime) {
      setFormError("Jam selesai kegiatan harus setelah jam mulai.");
      return;
    }

    startTransition(async () => {
      const res = await createRoomBooking({
        roomId: selectedRoomId,
        dateStr,
        startTime,
        endTime,
        purpose,
        unitName,
        applicantName,
        applicantPhone,
        participantCount: Number(participantCount),
        facilityNotes,
      });

      if (!res.success || !res.booking) {
        setFormError(res.error || "Gagal melakukan pemesanan ruangan.");
        return;
      }

      setSuccessBooking(res.booking as unknown as BookingItem);
      setBookings((prev) => [res.booking as unknown as BookingItem, ...prev]);
      setPurpose("");
      setApplicantName("");
      setApplicantPhone("");
      setFacilityNotes("");
    });
  };

  // Copy WhatsApp-ready summary
  const handleCopyWhatsApp = (b: BookingItem) => {
    let statusText = "MENUNGGU PERSETUJUAN (PENDING SEKRETARIAT)";
    if (b.status === "CONFIRMED") statusText = "DISETUJUI RESMI OLEH SEKRETARIAT FIT";
    if (b.status === "REJECTED") statusText = `DITOLAK (${b.notes || "Alasan internal"})`;
    if (b.status === "CANCELLED") statusText = `DIBATALKAN (${b.notes || "Dibatalkan"})`;

    const text = `*PEMINJAMAN RUANGAN FAKULTAS ILMU TERAPAN*\n` +
      `No. Booking: ${b.bookingNumber}\n` +
      `Ruangan: ${b.room.name}\n` +
      `Tanggal: ${b.dateStr}\n` +
      `Waktu: ${b.startTime} - ${b.endTime} WIB\n` +
      `Agenda: ${b.purpose}\n` +
      `Unit/Prodi: ${b.unitName}\n` +
      `PIC: ${b.applicantName} (${b.applicantPhone})\n` +
      `Peserta: ±${b.participantCount} Orang\n` +
      `Status: *${statusText}*`;

    navigator.clipboard.writeText(text);
    setCopiedId(b.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Handle Approve Booking (Secretariat Only)
  const handleApprove = (bookingId: string) => {
    if (!isAdmin) {
      openLoginModal(() => handleApprove(bookingId));
      return;
    }

    startTransition(async () => {
      const res = await approveRoomBooking(bookingId);
      if (res.success && res.booking) {
        setBookings((prev) =>
          prev.map((item) =>
            item.id === bookingId ? (res.booking as unknown as BookingItem) : item
          )
        );
      } else {
        alert(res.error || "Gagal menyetujui peminjaman.");
      }
    });
  };

  // Handle Confirm Reject (Secretariat Only)
  const handleConfirmReject = () => {
    if (!rejectModalId) return;
    if (!isAdmin) {
      openLoginModal(() => handleConfirmReject());
      return;
    }

    startTransition(async () => {
      const res = await rejectRoomBooking(
        rejectModalId,
        rejectReason || "Ditolak oleh Staf Sekretariat Fakultas"
      );
      if (res.success && res.booking) {
        setBookings((prev) =>
          prev.map((item) =>
            item.id === rejectModalId ? (res.booking as unknown as BookingItem) : item
          )
        );
        setRejectModalId(null);
        setRejectReason("");
      } else {
        alert(res.error || "Gagal menolak peminjaman.");
      }
    });
  };

  // Handle Cancel Booking
  const handleConfirmCancel = () => {
    if (!cancelModalId) return;
    if (!isAdmin) {
      openLoginModal(() => handleConfirmCancel());
      return;
    }

    startTransition(async () => {
      const res = await cancelRoomBooking(cancelModalId, cancelReason);
      if (res.success) {
        setBookings((prev) =>
          prev.map((item) =>
            item.id === cancelModalId
              ? { ...item, status: "CANCELLED", notes: cancelReason || "Dibatalkan oleh Admin" }
              : item
          )
        );
        setCancelModalId(null);
        setCancelReason("");
      }
    });
  };

  // Hitung jumlah pengajuan PENDING untuk badge
  const pendingCount = useMemo(() => {
    return bookings.filter((b) => b.status === "PENDING").length;
  }, [bookings]);

  // Filtered Bookings for Schedule View
  const scheduleBookings = useMemo(() => {
    return bookings.filter(
      (b) => b.dateStr === scheduleDate && b.status === "CONFIRMED"
    );
  }, [bookings, scheduleDate]);

  // Filtered Bookings for List View
  const filteredListBookings = useMemo(() => {
    return bookings.filter((b) => {
      const q = listSearch.toLowerCase();
      const matchSearch =
        !q ||
        b.bookingNumber.toLowerCase().includes(q) ||
        b.purpose.toLowerCase().includes(q) ||
        b.applicantName.toLowerCase().includes(q) ||
        b.unitName.toLowerCase().includes(q) ||
        b.room.name.toLowerCase().includes(q);

      const matchRoom = listRoomFilter === "ALL" || b.roomId === listRoomFilter;
      const matchDate = !listDateFilter || b.dateStr === listDateFilter;
      const matchStatus = listStatusFilter === "ALL" || b.status === listStatusFilter;

      return matchSearch && matchRoom && matchDate && matchStatus;
    });
  }, [bookings, listSearch, listRoomFilter, listDateFilter, listStatusFilter]);

  // Working Hours (07:00 to 18:00)
  const timeSlots = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            <span>Layanan Sarana & Prasarana Fakultas</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Sistem Peminjaman Ruangan Rapat & Multimedia FIT
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Reservasi mandiri terpadu ruang rapat pimpinan, ruang rapat prodi, dan ruang multimedia dengan validasi jadwal otomatis.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "form"
                ? "bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Form Pinjam</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isAdmin) {
                openLoginModal(() => setActiveTab("schedule"));
              } else {
                setActiveTab("schedule");
              }
            }}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "schedule"
                ? "bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            <span>Jadwal Ruangan</span>
            {!isAdmin && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <Lock className="h-2.5 w-2.5" />
                <span>Sekretariat</span>
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isAdmin) {
                openLoginModal(() => setActiveTab("list"));
              } else {
                setActiveTab("list");
              }
            }}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "list"
                ? "bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Daftar & Approval</span>
            {!isAdmin ? (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <Lock className="h-2.5 w-2.5" />
                <span>Sekretariat</span>
              </span>
            ) : pendingCount > 0 ? (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                {pendingCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* SUCCESS BOOKING BANNER MODAL */}
      {successBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Pengajuan Peminjaman Terkirim!
                  </h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    Menunggu Persetujuan (Approval) Staf Sekretariat
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSuccessBooking(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-xl text-xs text-amber-800 dark:text-amber-200 leading-relaxed flex items-start gap-2.5">
              <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Permohonan peminjaman ruangan Anda telah terdaftar di sistem dengan status <strong>PENDING</strong>. Staf Sekretariat Fakultas akan meninjau dan menyetujui pemakaian ruangan.
              </span>
            </div>

            {/* Booking Number Display */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Kode Reservasi Peminjaman
                </span>
                <div className="font-mono text-xl font-black text-slate-900 dark:text-white">
                  {successBooking.bookingNumber}
                </div>
              </div>
              <button
                onClick={() => handleCopyWhatsApp(successBooking)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {copiedId === successBooking.id ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin Info ke WA</span>
                  </>
                )}
              </button>
            </div>

            {/* Details Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Ruangan:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{successBooking.room.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Waktu:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {successBooking.dateStr} ({successBooking.startTime} - {successBooking.endTime} WIB)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Agenda / Keperluan:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{successBooking.purpose}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Unit / Prodi:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{successBooking.unitName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Nama PIC:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {successBooking.applicantName} ({successBooking.applicantPhone})
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setSuccessBooking(null);
                  setActiveTab("schedule");
                }}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Lihat di Jadwal
              </button>
              <button
                type="button"
                onClick={() => setSuccessBooking(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: FORM PEMINJAMAN RUANGAN                                            */}
      {/* ========================================================================= */}
      {activeTab === "form" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <div className="mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" />
                <span>Formulir Pengajuan Pinjam Ruangan</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pilih ruangan dan jadwal yang dikehendaki. Sistem akan otomatis memvalidasi apakah ruangan tersedia pada jam tersebut.
              </p>
            </div>

            {formError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-start gap-3 text-red-700 dark:text-red-300 text-xs font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* 1. Pilih Ruangan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Pilih Ruangan yang Dipinjam <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {rooms.map((room) => {
                    const isSelected = room.id === selectedRoomId;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? "bg-red-50/70 dark:bg-red-950/30 border-red-500 ring-2 ring-red-500/20 shadow-xs"
                            : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900 dark:text-white">
                              {room.name}
                            </span>
                            {room.isCombo && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                                Gabungan
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                            <Users className="h-3 w-3 text-slate-400" />
                            <span>Kapasitas: <strong>{room.capacity} Orang</strong></span>
                          </div>
                        </div>

                        {room.priorityNotes && (
                          <div className="mt-2 text-[10px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded border border-amber-200/50 dark:border-amber-800/50 line-clamp-2">
                            {room.priorityNotes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Tanggal & Jam Kegiatan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tanggal */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Tanggal Pinjam <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                {/* Jam Mulai */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Jam Mulai <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                {/* Jam Selesai */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Jam Selesai <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Status Ketersediaan Real-time */}
              <div className="p-3.5 rounded-xl border text-xs">
                {availChecking ? (
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="h-3 w-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    <span>Memeriksa ketersediaan jadwal...</span>
                  </div>
                ) : availResult.available ? (
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Ruangan <strong>Tersedia</strong> pada tanggal & jam yang Anda pilih!</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-red-600 dark:text-red-400 font-medium leading-relaxed">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{availResult.error}</span>
                  </div>
                )}
              </div>

              {/* 3. Unit / Prodi Pemohon & Jumlah Peserta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Unit / Prodi / Lembaga Pemohon <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={unitName}
                    onChange={(e) => handleUnitChange(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <optgroup label="── Staf Urusan Fakultas ──">
                      <option value="Staf Urusan Sekretariat (IT-SKR)">Staf Urusan Sekretariat (IT-SKR)</option>
                      <option value="Staf Urusan Layanan Kerjasama dan Magang (IT-LKM)">Staf Urusan Layanan Kerjasama dan Magang (IT-LKM)</option>
                      <option value="Staf Urusan Layanan Akademik (IT-LA)">Staf Urusan Layanan Akademik (IT-LA)</option>
                      <option value="Staf Urusan Kemahasiswaan (IT-KMH)">Staf Urusan Kemahasiswaan (IT-KMH)</option>
                      <option value="Staf Urusan Sumber Daya, Keuangan & Logistik (IT-SDM)">Staf Urusan Sumber Daya, Keuangan & Logistik (IT-SDM)</option>
                      <option value="Staf Urusan Laboratorium (IT-LAB)">Staf Urusan Laboratorium (IT-LAB)</option>
                    </optgroup>

                    <optgroup label="── Kepala Urusan Fakultas ──">
                      <option value="Kepala Urusan Sekretariat (IT-SKR)">Kepala Urusan Sekretariat (IT-SKR)</option>
                      <option value="Kepala Urusan Layanan Kerjasama dan Magang (IT-LKM)">Kepala Urusan Layanan Kerjasama dan Magang (IT-LKM)</option>
                      <option value="Kepala Urusan Layanan Akademik (IT-LA)">Kepala Urusan Layanan Akademik (IT-LA)</option>
                      <option value="Kepala Urusan Kemahasiswaan (IT-KMH)">Kepala Urusan Kemahasiswaan (IT-KMH)</option>
                      <option value="Kepala Urusan Sumber Daya, Keuangan & Logistik (IT-SDM)">Kepala Urusan Sumber Daya, Keuangan & Logistik (IT-SDM)</option>
                      <option value="Kepala Urusan Laboratorium (IT-LAB)">Kepala Urusan Laboratorium (IT-LAB)</option>
                    </optgroup>

                    <optgroup label="── Pimpinan Fakultas ──">
                      <option value="Dekan Fakultas Ilmu Terapan (IT-DEK)">Dekan Fakultas Ilmu Terapan (IT-DEK)</option>
                      <option value="Wakil Dekan 1 (Akademik & Riset) (IT-WD1)">Wakil Dekan 1 (Akademik & Riset) (IT-WD1)</option>
                      <option value="Wakil Dekan 2 (Keuangan, SDM & Kemahasiswaan) (IT-WD2)">Wakil Dekan 2 (Keuangan, SDM & Kemahasiswaan) (IT-WD2)</option>
                      <option value="Dekanat FIT">Dekanat / Pimpinan FIT</option>
                    </optgroup>

                    <optgroup label="── Program Studi ──">
                      {units.filter((u) => u.name.startsWith("Prodi")).map((u) => (
                        <option key={u.id} value={`${u.name} (${u.signeeCode})`}>
                          {u.name} ({u.signeeCode})
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="── Kelompok Keahlian & Ormawa ──">
                      {units.filter((u) => u.name.startsWith("Kelompok Keahlian")).map((u) => (
                        <option key={u.id} value={`${u.name} (${u.signeeCode})`}>
                          {u.name} ({u.signeeCode})
                        </option>
                      ))}
                      <option value="BEM / DPM FIT">BEM / DPM FIT (Ormawa)</option>
                      <option value="Himpunan Mahasiswa (HIMA)">Himpunan Mahasiswa (HIMA)</option>
                      <option value="Panitia Kegiatan Khusus">Panitia Kegiatan Khusus</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Estimasi Jumlah Peserta (Maks: {currentRoom.capacity}) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={currentRoom.capacity + 20}
                    value={participantCount}
                    onChange={(e) => setParticipantCount(parseInt(e.target.value, 10) || 1)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 4. Agenda / Keperluan Kegiatan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Agenda / Nama Kegiatan Rapat <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                  rows={2}
                  placeholder="Contoh: Rapat Koordinasi Kurikulum OBE Prodi D3 RPL Semester Ganjil"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* 5. PIC & Kontak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Nama PIC Peminjam <span className="text-red-500">*</span>
                    </label>
                    {currentUnitStaff.length > 0 && (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        Staf unit tersedia
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    placeholder="Nama Lengkap Dosen / Staff / PIC"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                  {currentUnitStaff.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Pilih Cepat Staf {unitName.replace("Kepala Urusan ", "").replace("Prodi ", "")}:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {currentUnitStaff.map((staffName) => {
                          const isSelected = applicantName === staffName;
                          return (
                            <button
                              key={staffName}
                              type="button"
                              onClick={() => setApplicantName(staffName)}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                                isSelected
                                  ? "bg-red-600 text-white shadow-xs"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                              }`}
                            >
                              <User className="h-2.5 w-2.5" />
                              <span>{staffName}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    No. WhatsApp PIC (Untuk Konfirmasi) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    required
                    placeholder="0812xxxxxxxx"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 6. Catatan Kebutuhan Tambahan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Kebutuhan Sarana Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  value={facilityNotes}
                  onChange={(e) => setFacilityNotes(e.target.value)}
                  placeholder="Contoh: Kabel konverter HDMI Type-C, pointer wireless, mic tambahan"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending || !availResult.available || availChecking}
                  className="w-full py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all active:scale-98 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Mendaftarkan Reservasi Ruangan...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Ajukan Peminjaman {currentRoom.name}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Room Specification Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Spesifikasi Ruangan Terpilih
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                  {currentRoom.code}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {currentRoom.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{currentRoom.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Kapasitas Maksimal</span>
                  <p className="text-lg font-black text-amber-300 mt-0.5">
                    {currentRoom.capacity} Orang
                  </p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Tipe Ruang</span>
                  <p className="text-xs font-bold text-slate-200 mt-1">
                    {currentRoom.isCombo ? "Partisi Gabungan" : "Ruang Tunggal"}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Fasilitas yang Tersedia:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentRoom.facilities.split(",").map((f, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700"
                    >
                      {f.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {currentRoom.priorityNotes && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Catatan Peruntukan / Prioritas:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/30 p-3 rounded-xl border border-amber-800/30">
                    {currentRoom.priorityNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Rules Info Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Info className="h-4 w-4 text-blue-600" />
                <span>Aturan Peminjaman Ruangan FIT</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 list-disc list-inside leading-relaxed">
                <li>Ruang Multimedia 1 & 2 dapat dipesan terpisah atau digabung (partisi dibuka kapasitas 80 orang).</li>
                <li>Pemesanan divalidasi secara real-time untuk mencegah tabrakan jam antar pemohon.</li>
                <li>Harap menjaga kebersihan dan mematikan AC/TV setelah kegiatan selesai.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: JADWAL & KETERSEDIAAN KALENDER (KHUSUS SEKRETARIAT)                */}
      {/* ========================================================================= */}
      {activeTab === "schedule" && (
        !isAdmin ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto my-6 space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Akses Terbatas Khusus</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Jadwal Ruangan Khusus Staf Sekretariat
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
                Matriks pemakaian ruangan dan rincian agenda rapat pimpinan fakultas hanya dapat dipantau oleh Staf Sekretariat Fakultas. Silakan masuk sebagai admin untuk melihat jadwal.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openLoginModal(() => setActiveTab("schedule"))}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" />
                <span>Masuk sebagai Admin Sekretariat</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm cursor-pointer"
              >
                Kembali ke Form Pinjam
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
            {/* Authorized Status Banner */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-200 font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Akses Terbuka: Terverifikasi sebagai <strong>Admin Sekretariat Fakultas</strong>.</span>
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Menampilkan seluruh agenda pemakaian ruangan terkonfirmasi.
              </div>
            </div>

            {/* Schedule Date Navigator */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-red-600" />
                  <span>Matriks Jadwal Pemakaian Ruangan</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pantau ketersediaan slot waktu seluruh ruangan pada tanggal terpilih secara visual.
                </p>
              </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const d = new Date(scheduleDate);
                  d.setDate(d.getDate() - 1);
                  setScheduleDate(d.toISOString().split("T")[0]);
                }}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                title="Hari Sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
              />

              <button
                onClick={() => {
                  const d = new Date(scheduleDate);
                  d.setDate(d.getDate() + 1);
                  setScheduleDate(d.toISOString().split("T")[0]);
                }}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                title="Hari Berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setScheduleDate(new Date().toISOString().split("T")[0])}
                className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-bold hover:bg-red-100 cursor-pointer"
              >
                Hari Ini
              </button>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="space-y-4">
            {rooms.map((room) => {
              const roomBookings = scheduleBookings.filter(
                (b) =>
                  b.roomId === room.id ||
                  (room.code === "MM1" && b.room.code === "MM_COMBO") ||
                  (room.code === "MM2" && b.room.code === "MM_COMBO") ||
                  (room.code === "MM_COMBO" && (b.room.code === "MM1" || b.room.code === "MM2"))
              );

              return (
                <div
                  key={room.id}
                  className="bg-slate-50/70 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {room.name}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          Kapasitas: {room.capacity} org
                        </span>
                        {room.isCombo && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                            Partisi Gabungan
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{room.location}</p>
                    </div>

                    <div className="text-xs font-semibold">
                      {roomBookings.length === 0 ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" />
                          <span>Sepenuhnya Kosong / Tersedia</span>
                        </span>
                      ) : (
                        <span className="text-amber-600">
                          {roomBookings.length} Jadwal Kegiatan Terdaftar
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Booking Slots on this Room */}
                  {roomBookings.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                      {roomBookings.map((b) => {
                        const isCrossPartition = b.roomId !== room.id;
                        return (
                          <div
                            key={b.id}
                            className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                              isCrossPartition
                                ? "bg-purple-50/70 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-xs"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-red-600 dark:text-red-400">
                                <span>{b.startTime} - {b.endTime} WIB</span>
                                <span className="text-slate-400 font-normal">#{b.bookingNumber}</span>
                              </div>
                              <h4 className="font-bold text-slate-900 dark:text-white mt-1 line-clamp-1" title={b.purpose}>
                                {b.purpose}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                Unit: <strong>{b.unitName}</strong>
                              </p>
                              <p className="text-[11px] text-slate-400">
                                PIC: {b.applicantName} (±{b.participantCount} org)
                              </p>
                            </div>
                            {isCrossPartition && (
                              <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold mt-2">
                                (Terpakai via {b.room.name})
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DAFTAR & RIWAYAT PEMINJAMAN (KHUSUS SEKRETARIAT)                   */}
      {/* ========================================================================= */}
      {activeTab === "list" && (
        !isAdmin ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto my-6 space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Akses Terbatas Khusus</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Daftar & Approval Khusus Staf Sekretariat
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
                Daftar permohonan, riwayat kegiatan, dan proses persetujuan (approval) peminjaman ruangan hanya dapat diakses dan dikelola oleh Staf Sekretariat Fakultas. Silakan masuk sebagai admin untuk mengakses data.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openLoginModal(() => setActiveTab("list"))}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" />
                <span>Masuk sebagai Admin Sekretariat</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm cursor-pointer"
              >
                Kembali ke Form Pinjam
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
            {/* Authorized Status Banner */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-200 font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Akses Terbuka: Terverifikasi sebagai <strong>Admin Sekretariat Fakultas</strong>.</span>
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Kelola approval pengajuan peminjaman ruangan dan batalkan reservasi bila diperlukan.
              </div>
            </div>
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
                placeholder="Cari kode booking, agenda, nama PIC, unit..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Room & Date Filters */}
            <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
              <select
                value={listRoomFilter}
                onChange={(e) => setListRoomFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="ALL">Semua Ruangan</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <select
                value={listStatusFilter}
                onChange={(e) => setListStatusFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="ALL">Semua Status</option>
                <option value="PENDING">Menunggu Review</option>
                <option value="CONFIRMED">Disetujui Resmi</option>
                <option value="REJECTED">Ditolak</option>
                <option value="CANCELLED">Dibatalkan</option>
              </select>

              <input
                type="date"
                value={listDateFilter}
                onChange={(e) => setListDateFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white"
              />

              {listDateFilter && (
                <button
                  onClick={() => setListDateFilter("")}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                  title="Reset Filter Tanggal"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">No. Booking</th>
                  <th className="py-3 px-4">Ruangan</th>
                  <th className="py-3 px-4">Tanggal & Jam</th>
                  <th className="py-3 px-4 min-w-[200px]">Agenda & Unit</th>
                  <th className="py-3 px-4">PIC & Kontak</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Aksi / Approval</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredListBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400">
                      Tidak ada riwayat peminjaman ruangan yang cocok.
                    </td>
                  </tr>
                ) : (
                  filteredListBookings.map((b) => {
                    return (
                      <tr key={b.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        {/* Booking Number */}
                        <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                          {b.bookingNumber}
                        </td>

                        {/* Room Name */}
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {b.room.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Kapasitas {b.room.capacity} org
                          </span>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {b.dateStr}
                          </div>
                          <div className="text-[11px] text-red-600 dark:text-red-400 font-mono font-bold">
                            {b.startTime} - {b.endTime} WIB
                          </div>
                        </td>

                        {/* Purpose & Unit */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                            {b.purpose}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Unit: {b.unitName} &bull; Peserta: ±{b.participantCount} org
                          </div>
                          {b.notes && (
                            <div className="text-[10px] text-slate-400 italic mt-0.5">
                              Catatan: {b.notes}
                            </div>
                          )}
                        </td>

                        {/* PIC & Phone */}
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {b.applicantName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {b.applicantPhone}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 text-center">
                          {b.status === "PENDING" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shadow-2xs">
                              <Clock className="h-3 w-3" />
                              <span>Menunggu Review</span>
                            </span>
                          )}
                          {b.status === "CONFIRMED" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Disetujui</span>
                            </span>
                          )}
                          {b.status === "REJECTED" && (
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                              title={b.notes || "Ditolak"}
                            >
                              <XCircle className="h-3 w-3" />
                              <span>Ditolak</span>
                            </span>
                          )}
                          {b.status === "CANCELLED" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              Dibatalkan
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {/* Copy WA */}
                            <button
                              onClick={() => handleCopyWhatsApp(b)}
                              title="Salin Rincian Agenda ke WA"
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              {copiedId === b.id ? (
                                <Check className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>

                            {/* PENDING ACTIONS (Approval / Reject) */}
                            {b.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() => handleApprove(b.id)}
                                  title={isAdmin ? "Setujui Permohonan Ruangan (Approval)" : "Setujui Permohonan (Khusus Staf Sekretariat)"}
                                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    isAdmin
                                      ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                                      : "text-slate-400 hover:text-amber-600"
                                  }`}
                                >
                                  {isAdmin ? <Check className="h-4 w-4 font-black" /> : <Lock className="h-3.5 w-3.5" />}
                                </button>

                                {isAdmin && (
                                  <button
                                    onClick={() => setRejectModalId(b.id)}
                                    title="Tolak Permohonan Ruangan"
                                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                                  >
                                    <X className="h-4 w-4 font-black" />
                                  </button>
                                )}
                              </>
                            )}

                            {/* CONFIRMED ACTIONS (Cancel) */}
                            {b.status === "CONFIRMED" && (
                              <button
                                onClick={() => {
                                  if (!isAdmin) {
                                    openLoginModal(() => setCancelModalId(b.id));
                                  } else {
                                    setCancelModalId(b.id);
                                  }
                                }}
                                title={isAdmin ? "Batalkan Reservasi" : "Batalkan Reservasi (Khusus Admin)"}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  isAdmin
                                    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                                    : "text-slate-400 hover:text-amber-600"
                                }`}
                              >
                                {isAdmin ? <Trash2 className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )
      )}

      {/* CANCEL BOOKING MODAL */}
      {cancelModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Batalkan Reservasi Ruangan?
                </h3>
                <p className="text-xs text-red-600 font-semibold">Tindakan Khusus Pengelola / Admin Ruangan</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Pemesanan ruangan ini akan dibatalkan dan slot jam tersebut akan kembali tersedia untuk dipesan oleh unit lain.
            </p>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Alasan Pembatalan (Opsional):
              </label>
              <input
                type="text"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Misal: Perubahan jadwal fakultas / pemohon konfirmasi batal"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer"
              >
                Ya, Batalkan Pemesanan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT BOOKING MODAL (KHUSUS STAF SEKRETARIAT) */}
      {rejectModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center shrink-0">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Tolak Pengajuan Peminjaman?
                </h3>
                <p className="text-xs text-rose-600 font-semibold">Tindakan Khusus Staf Sekretariat</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Pengajuan ini akan ditolak dan pemohon akan melihat status Ditolak beserta alasan yang Anda cantumkan di bawah ini.
            </p>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Alasan Penolakan:
              </label>
              <input
                type="text"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Contoh: Ruangan diprioritaskan untuk Rapat Senat / Dekanat"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setRejectModalId(null);
                  setRejectReason("");
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 cursor-pointer"
              >
                Tolak Pengajuan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
