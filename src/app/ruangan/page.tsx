import { getRooms, getRoomBookings } from "@/actions/room-actions";
import { getUnits } from "@/actions/letter-actions";
import { RoomBookingView } from "@/components/room-booking-view";
import { Metadata } from "next";
import type { ComponentProps } from "react";

export const metadata: Metadata = {
  title: "Peminjaman Ruangan Rapat & Multimedia - FIT E-Office",
  description: "Layanan mandiri peminjaman ruang rapat adaut, namtabung, multimedia 1, 2, dan learning lounge Fakultas Ilmu Terapan.",
};

export const dynamic = "force-dynamic";

export default async function RuanganPage() {
  const [rooms, units, bookings] = await Promise.all([
    getRooms(),
    getUnits(),
    getRoomBookings(),
  ]);

  return (
    <div className="space-y-6">
      <RoomBookingView
        rooms={rooms}
        units={units}
        initialBookings={bookings as ComponentProps<typeof RoomBookingView>["initialBookings"]}
      />
    </div>
  );
}
