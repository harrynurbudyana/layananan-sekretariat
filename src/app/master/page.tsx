import { getUnits, getCategories } from "@/actions/letter-actions";
import { MasterDataView } from "@/components/master-data-view";
import { Database } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MasterDataPage() {
  const [units, categories] = await Promise.all([
    getUnits(),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <Database className="h-4 w-4" />
            <span>Master Data Sekretariat</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Pengelolaan Kode Unit & Klasifikasi Surat
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Konfigurasi kode singkatan Program Studi dan format penomoran klasifikasi surat universitas.
          </p>
        </div>
      </div>

      <MasterDataView initialUnits={units} initialCategories={categories} />
    </div>
  );
}
