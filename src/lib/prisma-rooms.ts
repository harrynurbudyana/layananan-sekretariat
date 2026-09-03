import { PrismaClient as RoomPrismaClient } from "@/generated/room-client";

const globalForRoomPrisma = globalThis as unknown as {
  prismaRooms: RoomPrismaClient | undefined;
};

export const prismaRooms =
  globalForRoomPrisma.prismaRooms ??
  new RoomPrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForRoomPrisma.prismaRooms = prismaRooms;
}

export default prismaRooms;
