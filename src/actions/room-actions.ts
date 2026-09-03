"use server";

import prismaRooms from "@/lib/prisma-rooms";
import { revalidatePath } from "next/cache";

export interface CreateRoomBookingInput {
  roomId: string;
  dateStr: string; // YYYY-MM-DD
  startTime: string; // HH:MM (e.g. "09:00")
  endTime: string; // HH:MM (e.g. "11:30")
  purpose: string;
  unitName: string;
  applicantName: string;
  applicantPhone: string;
  participantCount: number;
  facilityNotes?: string;
}

// 1. Get All Rooms
export async function getRooms() {
  try {
    const rooms = await prismaRooms.room.findMany({
      where: { isActive: true },
      orderBy: { capacity: "asc" },
    });
    return rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

// 2. Helper to determine conflicting room codes (Partition Logic MM1 + MM2 + MM_COMBO)
function getConflictingCodes(targetRoomCode: string): string[] {
  if (targetRoomCode === "MM1") {
    return ["MM1", "MM_COMBO"];
  }
  if (targetRoomCode === "MM2") {
    return ["MM2", "MM_COMBO"];
  }
  if (targetRoomCode === "MM_COMBO") {
    return ["MM1", "MM2", "MM_COMBO"];
  }
  return [targetRoomCode];
}

// 3. Check Room Availability & Time Collision
export async function checkRoomAvailability(
  roomId: string,
  dateStr: string,
  startTime: string,
  endTime: string,
  excludeBookingId?: string
) {
  try {
    const targetRoom = await prismaRooms.room.findUnique({
      where: { id: roomId },
    });

    if (!targetRoom) {
      return { available: false, error: "Ruangan tidak ditemukan." };
    }

    if (startTime >= endTime) {
      return { available: false, error: "Jam selesai harus lebih besar dari jam mulai." };
    }

    const conflictCodes = getConflictingCodes(targetRoom.code);
    const relatedRooms = await prismaRooms.room.findMany({
      where: { code: { in: conflictCodes } },
    });
    const relatedRoomIds = relatedRooms.map((r) => r.id);

    // Ambil semua booking aktif di tanggal tersebut pada ruangan terkait
    const existingBookings = await prismaRooms.roomBooking.findMany({
      where: {
        dateStr,
        roomId: { in: relatedRoomIds },
        status: "CONFIRMED",
        ...(excludeBookingId ? { id: { not: excludeBookingId } } : {}),
      },
      include: { room: true },
    });

    // Cek rumus bentrok: (startA < endB && endA > startB)
    const conflict = existingBookings.find((b) => {
      return startTime < b.endTime && endTime > b.startTime;
    });

    if (conflict) {
      const roomDesc =
        conflict.roomId === targetRoom.id
          ? targetRoom.name
          : `${conflict.room.name} (berbagi partisi ruangan dengan ${targetRoom.name})`;

      return {
        available: false,
        conflict: {
          roomName: roomDesc,
          purpose: conflict.purpose,
          unitName: conflict.unitName,
          applicantName: conflict.applicantName,
          timeRange: `${conflict.startTime} - ${conflict.endTime}`,
        },
        error: `Jadwal bentrok! ${roomDesc} telah dipesan oleh ${conflict.unitName} (${conflict.applicantName}) untuk agenda "${conflict.purpose}" pada pukul ${conflict.startTime} - ${conflict.endTime}.`,
      };
    }

    return { available: true };
  } catch (error) {
    console.error("Error checking room availability:", error);
    return { available: false, error: "Gagal memeriksa ketersediaan ruangan." };
  }
}

// 4. Create Room Booking
export async function createRoomBooking(input: CreateRoomBookingInput) {
  try {
    if (
      !input.roomId ||
      !input.dateStr ||
      !input.startTime ||
      !input.endTime ||
      !input.purpose.trim() ||
      !input.unitName.trim() ||
      !input.applicantName.trim()
    ) {
      return { success: false, error: "Semua data wajib harus diisi lengkap." };
    }

    // 1. Cek bentrok jadwal
    const availCheck = await checkRoomAvailability(
      input.roomId,
      input.dateStr,
      input.startTime,
      input.endTime
    );

    if (!availCheck.available) {
      return { success: false, error: availCheck.error };
    }

    // 2. Generate Nomor Booking unik (e.g. PINJAM-20260903-001)
    const dateFormatted = input.dateStr.replace(/-/g, "");
    const todayBookingCount = await prismaRooms.roomBooking.count({
      where: { dateStr: input.dateStr },
    });
    const seq = (todayBookingCount + 1).toString().padStart(3, "0");
    const bookingNumber = `BK-${dateFormatted}-${seq}`;

    // 3. Simpan rekam peminjaman
    const bookingDate = new Date(`${input.dateStr}T${input.startTime}:00`);

    const booking = await prismaRooms.roomBooking.create({
      data: {
        bookingNumber,
        roomId: input.roomId,
        bookingDate,
        dateStr: input.dateStr,
        startTime: input.startTime,
        endTime: input.endTime,
        purpose: input.purpose.trim(),
        unitName: input.unitName.trim(),
        applicantName: input.applicantName.trim(),
        applicantPhone: input.applicantPhone.trim() || "-",
        participantCount: Number(input.participantCount) || 10,
        facilityNotes: input.facilityNotes?.trim() || null,
        status: "PENDING",
      },
      include: {
        room: true,
      },
    });

    try {
      revalidatePath("/ruangan");
      revalidatePath("/");
    } catch {}

    return {
      success: true,
      booking: {
        ...booking,
        bookingDate: booking.bookingDate.toISOString(),
        createdAt: booking.createdAt.toISOString(),
      },
    };
  } catch (error: unknown) {
    console.error("Error creating room booking:", error);
    const msg = error instanceof Error ? error.message : "Terjadi kesalahan sistem saat memesan ruangan.";
    return { success: false, error: msg };
  }
}

// 5. Get Bookings
export async function getRoomBookings(filters?: {
  dateStr?: string;
  roomId?: string;
  search?: string;
}) {
  try {
    const whereClause: Record<string, unknown> = {};

    if (filters?.dateStr) {
      whereClause.dateStr = filters.dateStr;
    }

    if (filters?.roomId && filters.roomId !== "ALL") {
      whereClause.roomId = filters.roomId;
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.trim();
      whereClause.OR = [
        { bookingNumber: { contains: q } },
        { purpose: { contains: q } },
        { applicantName: { contains: q } },
        { unitName: { contains: q } },
      ];
    }

    const bookings = await prismaRooms.roomBooking.findMany({
      where: whereClause,
      include: { room: true },
      orderBy: [{ dateStr: "desc" }, { startTime: "asc" }],
    });

    return bookings.map((b) => ({
      ...b,
      bookingDate: b.bookingDate.toISOString(),
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching room bookings:", error);
    return [];
  }
}

// 6. Approve Room Booking (Khusus Staf Sekretariat)
export async function approveRoomBooking(bookingId: string, adminNotes?: string) {
  try {
    const booking = await prismaRooms.roomBooking.findUnique({
      where: { id: bookingId },
      include: { room: true },
    });

    if (!booking) {
      return { success: false, error: "Data peminjaman tidak ditemukan." };
    }

    // Pastikan tidak ada peminjaman CONFIRMED lain yang bentrok
    const availCheck = await checkRoomAvailability(
      booking.roomId,
      booking.dateStr,
      booking.startTime,
      booking.endTime,
      booking.id
    );

    if (!availCheck.available) {
      return {
        success: false,
        error: `Tidak dapat disetujui: ${availCheck.error}`,
      };
    }

    const updated = await prismaRooms.roomBooking.update({
      where: { id: bookingId },
      data: {
        status: "CONFIRMED",
        notes: adminNotes || "Disetujui resmi oleh Staf Sekretariat Fakultas",
      },
      include: { room: true },
    });

    try {
      revalidatePath("/ruangan");
      revalidatePath("/");
    } catch {}

    return {
      success: true,
      booking: {
        ...updated,
        bookingDate: updated.bookingDate.toISOString(),
        createdAt: updated.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error approving room booking:", error);
    return { success: false, error: "Gagal menyetujui peminjaman ruangan." };
  }
}

// 7. Reject Room Booking (Khusus Staf Sekretariat)
export async function rejectRoomBooking(bookingId: string, reason: string) {
  try {
    const updated = await prismaRooms.roomBooking.update({
      where: { id: bookingId },
      data: {
        status: "REJECTED",
        notes: reason || "Ditolak oleh Staf Sekretariat Fakultas",
      },
      include: { room: true },
    });

    try {
      revalidatePath("/ruangan");
      revalidatePath("/");
    } catch {}

    return {
      success: true,
      booking: {
        ...updated,
        bookingDate: updated.bookingDate.toISOString(),
        createdAt: updated.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error rejecting room booking:", error);
    return { success: false, error: "Gagal menolak peminjaman ruangan." };
  }
}

// 8. Cancel Room Booking (Admin Action)
export async function cancelRoomBooking(bookingId: string, reason?: string) {
  try {
    const updated = await prismaRooms.roomBooking.update({
      where: { id: bookingId },
      data: {
        status: "CANCELLED",
        notes: reason || "Dibatalkan oleh Pengelola Ruangan FIT",
      },
    });

    try {
      revalidatePath("/ruangan");
      revalidatePath("/");
    } catch {}

    return { success: true, booking: updated };
  } catch (error) {
    console.error("Error cancelling room booking:", error);
    return { success: false, error: "Gagal membatalkan peminjaman ruangan." };
  }
}

// 7. Get Today's Room Status & Stats for Dashboard
export async function getRoomDashboardStats() {
  try {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const [totalRooms, todayBookings] = await Promise.all([
      prismaRooms.room.count({ where: { isActive: true } }),
      prismaRooms.roomBooking.findMany({
        where: { dateStr: todayStr, status: "CONFIRMED" },
        include: { room: true },
        orderBy: { startTime: "asc" },
      }),
    ]);

    return {
      todayStr,
      totalRooms,
      todayBookingsCount: todayBookings.length,
      todayBookings: todayBookings.map((b) => ({
        ...b,
        bookingDate: b.bookingDate.toISOString(),
        createdAt: b.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error getting room dashboard stats:", error);
    return {
      todayStr: new Date().toISOString().split("T")[0],
      totalRooms: 6,
      todayBookingsCount: 0,
      todayBookings: [],
    };
  }
}
