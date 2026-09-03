"use server";

import prisma from "@/lib/prisma";
import { getRomanMonth } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export interface GenerateLetterInput {
  isManual?: boolean;
  manualSequenceNumber?: number;
  manualFullNumber?: string;
  unitId: string;
  categoryId: string;
  classificationCode?: string; // AKD01, AKD13, KMS01, SDM01, dll.
  signeeCode?: string;         // IT-DEK, IT-WD1, IT-WD2, IT-RPLA, dll.
  subject: string;
  recipient?: string;
  applicantName: string;
  applicantContact?: string;
  letterDate?: string;         // YYYY-MM-DD
  notes?: string;
}

export async function generateLetterNumber(input: GenerateLetterInput) {
  try {
    if (!input.unitId || !input.categoryId || !input.subject.trim() || !input.applicantName.trim()) {
      return { success: false, error: "Semua data wajib (Prodi/Unit, Kategori Perihal, Perihal, Nama Pemohon) harus diisi." };
    }

    const targetDate = input.letterDate ? new Date(input.letterDate) : new Date();
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1; // 1-12
    const monthRomawi = getRomanMonth(month);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Dapatkan Unit dan Kategori
      const [unit, category] = await Promise.all([
        tx.unit.findUnique({ where: { id: input.unitId } }),
        tx.letterCategory.findUnique({ where: { id: input.categoryId } }),
      ]);

      if (!unit || !category) {
        throw new Error("Unit/Prodi atau Kategori Surat tidak ditemukan.");
      }

      const activeClassification = input.classificationCode?.trim() || category.code;
      const activeSignee = input.signeeCode?.trim() || unit.signeeCode || "IT-DEK";

      let finalSequence: number;
      let fullNumber: string;

      if (input.isManual) {
        // MODE MANUAL: Bisa custom nomor urut atau custom nomor lengkap
        if (input.manualFullNumber && input.manualFullNumber.trim()) {
          fullNumber = input.manualFullNumber.trim();
          // Coba ekstrak sequence number dari bagian awal jika ada (misal: "1532/AKD01/...")
          const matchSeq = fullNumber.match(/^(\d+)/);
          finalSequence = matchSeq ? parseInt(matchSeq[1], 10) : (input.manualSequenceNumber || 1);
        } else {
          finalSequence = input.manualSequenceNumber && input.manualSequenceNumber > 0
            ? input.manualSequenceNumber
            : (await tx.letterRequest.count({ where: { year } })) + 1;
          fullNumber = `${finalSequence}/${activeClassification}/${activeSignee}/${year}`;
        }

        // Cek duplikasi nomor surat
        const existing = await tx.letterRequest.findUnique({
          where: { fullNumber },
        });

        if (existing) {
          throw new Error(`Nomor surat "${fullNumber}" sudah terdaftar di buku agenda (oleh pemohon: ${existing.applicantName}). Harap gunakan nomor urut lain.`);
        }
      } else {
        // MODE OTOMATIS: Auto-increment sequence number
        const lastLetter = await tx.letterRequest.findFirst({
          where: { year },
          orderBy: { sequenceNumber: "desc" },
        });

        finalSequence = (lastLetter?.sequenceNumber || 0) + 1;
        // Format Standar FIT: [No_Urut]/[Kode_Klasifikasi]/[Kode_Penandatangan]/[Tahun]
        // Contoh: 1532/AKD01/IT-DEK/2026
        fullNumber = `${finalSequence}/${activeClassification}/${activeSignee}/${year}`;
      }

      // 3. Buat record surat baru
      const createdLetter = await tx.letterRequest.create({
        data: {
          sequenceNumber: finalSequence,
          monthRomawi,
          month,
          year,
          fullNumber,
          classificationCode: activeClassification,
          signeeCode: activeSignee,
          subject: input.subject.trim(),
          recipient: input.recipient?.trim() || null,
          applicantName: input.applicantName.trim(),
          applicantContact: input.applicantContact?.trim() || null,
          letterDate: targetDate,
          notes: input.notes?.trim() || null,
          isManual: !!input.isManual,
          status: "ISSUED",
          unitId: unit.id,
          categoryId: category.id,
        },
        include: {
          unit: true,
          category: true,
        },
      });

      // 4. Update letter counter jika sequence lebih besar
      const currentCounter = await tx.letterCounter.findUnique({
        where: { year_scope: { year, scope: "FIT" } },
      });

      if (!currentCounter || finalSequence > currentCounter.currentNumber) {
        await tx.letterCounter.upsert({
          where: {
            year_scope: {
              year,
              scope: "FIT",
            },
          },
          update: { currentNumber: finalSequence },
          create: {
            year,
            scope: "FIT",
            currentNumber: finalSequence,
          },
        });
      }

      return createdLetter;
    });

    try {
      revalidatePath("/agenda");
      revalidatePath("/generator");
      revalidatePath("/");
    } catch {}

    return {
      success: true,
      letter: {
        id: result.id,
        fullNumber: result.fullNumber,
        sequenceNumber: result.sequenceNumber,
        subject: result.subject,
        applicantName: result.applicantName,
        recipient: result.recipient,
        letterDate: result.letterDate.toISOString(),
        unitName: result.unit.name,
        categoryName: result.category.name,
        classificationCode: result.classificationCode,
        signeeCode: result.signeeCode,
        year: result.year,
        isManual: result.isManual,
      },
    };
  } catch (error: unknown) {
    console.error("Error generating letter number:", error);
    const msg = error instanceof Error ? error.message : "Terjadi kesalahan pada sistem saat membuat nomor surat.";
    return { success: false, error: msg };
  }
}

export interface BatchItemInput {
  subject?: string;
  recipient?: string;
  applicantName?: string;
}

export interface GenerateBatchLetterInput {
  count: number;
  unitId: string;
  categoryId: string;
  classificationCode?: string;
  signeeCode?: string;
  letterDate?: string;
  subject: string;
  recipient?: string;
  applicantName: string;
  applicantContact?: string;
  notes?: string;
  items?: BatchItemInput[];
}

export async function generateBatchLetterNumbers(input: GenerateBatchLetterInput) {
  try {
    const totalCount = Math.max(1, Math.min(input.count || 1, 100)); // Maksimal 100 nomor per batch agar aman
    if (!input.unitId || !input.categoryId || !input.subject.trim() || !input.applicantName.trim()) {
      return { success: false, error: "Semua data wajib (Prodi/Unit, Kategori Perihal, Perihal, Nama Pemohon) harus diisi." };
    }

    const targetDate = input.letterDate ? new Date(input.letterDate) : new Date();
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const monthRomawi = getRomanMonth(month);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Dapatkan Unit dan Kategori
      const [unit, category] = await Promise.all([
        tx.unit.findUnique({ where: { id: input.unitId } }),
        tx.letterCategory.findUnique({ where: { id: input.categoryId } }),
      ]);

      if (!unit || !category) {
        throw new Error("Unit/Prodi atau Kategori Surat tidak ditemukan.");
      }

      const activeClassification = input.classificationCode?.trim() || category.code;
      const activeSignee = input.signeeCode?.trim() || unit.signeeCode || "IT-DEK";

      // 2. Ambil nomor terakhir
      const lastLetter = await tx.letterRequest.findFirst({
        where: { year },
        orderBy: { sequenceNumber: "desc" },
      });

      const startSequence = (lastLetter?.sequenceNumber || 0) + 1;
      const createdLetters = [];

      for (let i = 0; i < totalCount; i++) {
        const currentSequence = startSequence + i;
        const itemData = input.items && input.items[i];

        const itemSubject = itemData?.subject?.trim()
          ? itemData.subject.trim()
          : totalCount > 1
          ? `${input.subject.trim()} (Nomor #${i + 1})`
          : input.subject.trim();

        const itemRecipient = itemData?.recipient?.trim() || input.recipient?.trim() || null;
        const itemApplicant = itemData?.applicantName?.trim() || input.applicantName.trim();
        const fullNumber = `${currentSequence}/${activeClassification}/${activeSignee}/${year}`;

        const letter = await tx.letterRequest.create({
          data: {
            sequenceNumber: currentSequence,
            monthRomawi,
            month,
            year,
            fullNumber,
            classificationCode: activeClassification,
            signeeCode: activeSignee,
            subject: itemSubject,
            recipient: itemRecipient,
            applicantName: itemApplicant,
            applicantContact: input.applicantContact?.trim() || null,
            letterDate: targetDate,
            notes: input.notes?.trim() || (totalCount > 1 ? `Batch ${totalCount} Nomor (#${i + 1})` : null),
            unitId: unit.id,
            categoryId: category.id,
            status: "ISSUED",
            isManual: false,
          },
        });

        createdLetters.push({
          id: letter.id,
          fullNumber: letter.fullNumber,
          sequenceNumber: letter.sequenceNumber,
          subject: letter.subject,
          applicantName: letter.applicantName,
          recipient: letter.recipient,
          letterDate: letter.letterDate.toISOString(),
          unitName: unit.name,
          categoryName: category.name,
          classificationCode: letter.classificationCode,
          signeeCode: letter.signeeCode,
          year: letter.year,
        });
      }

      // 3. Sinkronkan counter
      const finalSequence = startSequence + totalCount - 1;
      await tx.letterCounter.upsert({
        where: { year_scope: { year, scope: "FIT" } },
        update: { currentNumber: finalSequence },
        create: { year, scope: "FIT", currentNumber: finalSequence },
      });

      return createdLetters;
    });

    try {
      revalidatePath("/agenda");
      revalidatePath("/");
    } catch {}

    return {
      success: true,
      count: result.length,
      startNumber: result[0]?.fullNumber,
      endNumber: result[result.length - 1]?.fullNumber,
      letters: result,
    };
  } catch (error: unknown) {
    console.error("Error generating batch letter numbers:", error);
    const msg = error instanceof Error ? error.message : "Terjadi kesalahan sistem saat membuat batch nomor surat.";
    return { success: false, error: msg };
  }
}

export async function getLetters(filters?: {
  search?: string;
  unitId?: string;
  categoryId?: string;
  month?: number;
  year?: number;
}) {
  try {
    const currentYear = new Date().getFullYear();
    const targetYear = filters?.year || currentYear;

    const whereClause: Record<string, unknown> = {
      year: targetYear,
    };

    if (filters?.unitId && filters.unitId !== "ALL") {
      whereClause.unitId = filters.unitId;
    }

    if (filters?.categoryId && filters.categoryId !== "ALL") {
      whereClause.categoryId = filters.categoryId;
    }

    if (filters?.month && filters.month > 0) {
      whereClause.month = filters.month;
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.trim();
      whereClause.OR = [
        { fullNumber: { contains: q } },
        { subject: { contains: q } },
        { applicantName: { contains: q } },
        { recipient: { contains: q } },
        { classificationCode: { contains: q } },
        { signeeCode: { contains: q } },
        { notes: { contains: q } },
      ];
    }

    const letters = await prisma.letterRequest.findMany({
      where: whereClause,
      include: {
        unit: true,
        category: true,
      },
      orderBy: { sequenceNumber: "desc" },
    });

    return letters.map((l) => ({
      ...l,
      letterDate: l.letterDate.toISOString(),
      createdAt: l.createdAt.toISOString(),
      updatedAt: l.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching letters:", error);
    return [];
  }
}

export async function getDashboardStats() {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [totalThisYear, totalThisMonth, recentLetters, unitBreakdown, categoryBreakdown] = await Promise.all([
      prisma.letterRequest.count({ where: { year: currentYear } }),
      prisma.letterRequest.count({ where: { year: currentYear, month: currentMonth } }),
      prisma.letterRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { unit: true, category: true },
      }),
      prisma.letterRequest.groupBy({
        by: ["unitId"],
        where: { year: currentYear },
        _count: { id: true },
      }),
      prisma.letterRequest.groupBy({
        by: ["categoryId"],
        where: { year: currentYear },
        _count: { id: true },
      }),
    ]);

    const units = await prisma.unit.findMany();
    const categories = await prisma.letterCategory.findMany();

    const unitMap = new Map(units.map((u) => [u.id, u]));
    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    const unitStats = unitBreakdown.map((item) => ({
      unitId: item.unitId,
      unitName: unitMap.get(item.unitId)?.name || "Unknown",
      unitCode: unitMap.get(item.unitId)?.code || "N/A",
      count: item._count.id,
    })).sort((a, b) => b.count - a.count);

    const categoryStats = categoryBreakdown.map((item) => ({
      categoryId: item.categoryId,
      categoryName: categoryMap.get(item.categoryId)?.name || "Unknown",
      categoryCode: categoryMap.get(item.categoryId)?.code || "N/A",
      count: item._count.id,
    })).sort((a, b) => b.count - a.count);

    return {
      currentYear,
      currentMonth,
      totalThisYear,
      totalThisMonth,
      unitStats,
      categoryStats,
      recentLetters: recentLetters.map((l) => ({
        ...l,
        letterDate: l.letterDate.toISOString(),
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      totalThisYear: 0,
      totalThisMonth: 0,
      unitStats: [],
      categoryStats: [],
      recentLetters: [],
    };
  }
}

export async function getUnits() {
  try {
    return await prisma.unit.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  } catch (error) {
    console.error("Error fetching units:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    return await prisma.letterCategory.findMany({
      where: { isActive: true },
      orderBy: [{ group: "asc" }, { code: "asc" }],
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function deleteLetter(id: string) {
  try {
    await prisma.letterRequest.delete({ where: { id } });
    try {
      revalidatePath("/agenda");
      revalidatePath("/");
    } catch {}
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting letter:", error);
    return { success: false, error: "Gagal menghapus data surat." };
  }
}

export async function deleteLetters(ids: string[]) {
  try {
    if (!ids || ids.length === 0) return { success: true, count: 0 };
    const res = await prisma.letterRequest.deleteMany({
      where: { id: { in: ids } },
    });
    try {
      revalidatePath("/agenda");
      revalidatePath("/");
    } catch {}
    return { success: true, count: res.count };
  } catch (error: unknown) {
    console.error("Error bulk deleting letters:", error);
    return { success: false, error: "Gagal menghapus data surat terpilih." };
  }
}

export async function createUnit(data: { name: string; code: string; signeeCode?: string; leaderName?: string; category: string }) {
  try {
    const unit = await prisma.unit.create({
      data: {
        name: data.name.trim(),
        code: data.code.trim().toUpperCase(),
        signeeCode: data.signeeCode?.trim().toUpperCase() || "IT-DEK",
        leaderName: data.leaderName?.trim() || null,
        category: data.category || "PRODI",
      },
    });
    try {
      revalidatePath("/master");
      revalidatePath("/generator");
    } catch {}
    return { success: true, unit };
  } catch (error: unknown) {
    console.error("Error creating unit:", error);
    return { success: false, error: "Kode unit/prodi sudah digunakan atau format salah." };
  }
}

export async function createCategory(data: { name: string; code: string; group?: string; classificationCode?: string; description?: string }) {
  try {
    const cat = await prisma.letterCategory.create({
      data: {
        name: data.name.trim(),
        code: data.code.trim().toUpperCase(),
        group: data.group?.trim().toUpperCase() || "AKD",
        classificationCode: data.classificationCode?.trim() || null,
        description: data.description?.trim() || null,
      },
    });
    try {
      revalidatePath("/master");
      revalidatePath("/generator");
    } catch {}
    return { success: true, category: cat };
  } catch (error: unknown) {
    console.error("Error creating category:", error);
    return { success: false, error: "Kode kategori sudah digunakan atau format salah." };
  }
}
