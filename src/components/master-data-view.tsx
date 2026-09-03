"use client";

import { useState, useTransition } from "react";
import { createUnit, createCategory } from "@/actions/letter-actions";
import {
  Building2,
  FileText,
  Plus,
  Check,
  AlertCircle,
  Hash,
  UserCheck,
  Layers,
} from "lucide-react";

interface UnitItem {
  id: string;
  name: string;
  code: string;
  signeeCode?: string;
  leaderName: string | null;
  category: string;
}

interface CategoryItem {
  id: string;
  name: string;
  code: string;
  group?: string;
  classificationCode: string | null;
  description: string | null;
}

interface Props {
  initialUnits: UnitItem[];
  initialCategories: CategoryItem[];
}

export function MasterDataView({ initialUnits, initialCategories }: Props) {
  const [activeTab, setActiveTab] = useState<"units" | "categories">("units");
  const [units, setUnits] = useState(initialUnits);
  const [categories, setCategories] = useState(initialCategories);

  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  const [unitForm, setUnitForm] = useState({
    name: "",
    code: "",
    signeeCode: "IT-DEK",
    leaderName: "",
    category: "PRODI",
  });

  const [catForm, setCatForm] = useState({
    name: "",
    code: "",
    group: "AKD",
    classificationCode: "",
    description: "",
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCreateUnit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    startTransition(async () => {
      const res = await createUnit(unitForm);
      if (!res.success) {
        setErrorMsg(res.error || "Gagal menambahkan unit.");
        return;
      }
      if (res.unit) {
        setUnits((prev) => [...prev, res.unit as UnitItem]);
        setShowAddUnitModal(false);
        setUnitForm({ name: "", code: "", signeeCode: "IT-DEK", leaderName: "", category: "PRODI" });
      }
    });
  };

  const handleCreateCat = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    startTransition(async () => {
      const res = await createCategory(catForm);
      if (!res.success) {
        setErrorMsg(res.error || "Gagal menambahkan kategori.");
        return;
      }
      if (res.category) {
        setCategories((prev) => [...prev, res.category as CategoryItem]);
        setShowAddCatModal(false);
        setCatForm({ name: "", code: "", group: "AKD", classificationCode: "", description: "" });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("units")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "units"
              ? "bg-red-600 text-white shadow-sm shadow-red-600/20"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Program Studi & Unit ({units.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "categories"
              ? "bg-red-600 text-white shadow-sm shadow-red-600/20"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Klasifikasi Perihal Surat ({categories.length})</span>
        </button>
      </div>

      {/* Tab 1: Units */}
      {activeTab === "units" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Daftar Program Studi & Unit Kerja FIT
              </h3>
              <p className="text-xs text-slate-500">
                Unit pengusul surat dan kode penandatangan pejabat terkait.
              </p>
            </div>
            <button
              onClick={() => {
                setErrorMsg(null);
                setShowAddUnitModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-bold shadow-sm cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Unit Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                      Kode: {unit.code}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {unit.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {unit.name}
                  </h4>
                  <div className="mt-2 text-[11px] text-slate-500 font-mono">
                    Signee: <strong className="text-slate-700 dark:text-slate-300">{unit.signeeCode || "IT-DEK"}</strong>
                  </div>
                </div>

                {unit.leaderName && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{unit.leaderName}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Categories */}
      {activeTab === "categories" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Klasifikasi Perihal Surat Resmi FIT
              </h3>
              <p className="text-xs text-slate-500">
                Kode klasifikasi (contoh: AKD01 = Akademik Umum, AKD13 = Magang, KMS01 = Lomba).
              </p>
            </div>
            <button
              onClick={() => {
                setErrorMsg(null);
                setShowAddCatModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-bold shadow-sm cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Klasifikasi Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
                      {cat.code}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      Grup: {cat.group || "AKD"}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {cat.name}
                  </h4>
                  {cat.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Tambah Unit */}
      {showAddUnitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-red-600" />
              <span>Tambah Program Studi / Unit Baru</span>
            </h3>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateUnit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Program Studi / Unit
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: D3 Rekayasa Perangkat Lunak Aplikasi"
                  value={unitForm.name}
                  onChange={(e) => setUnitForm({ ...unitForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kode Singkatan (Uppercase)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: RPLA"
                    value={unitForm.code}
                    onChange={(e) =>
                      setUnitForm({ ...unitForm, code: e.target.value.toUpperCase() })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kode Penandatangan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: IT-DEK / IT-D3-RPL"
                    value={unitForm.signeeCode}
                    onChange={(e) =>
                      setUnitForm({ ...unitForm, signeeCode: e.target.value.toUpperCase() })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Jenis Unit
                  </label>
                  <select
                    value={unitForm.category}
                    onChange={(e) =>
                      setUnitForm({ ...unitForm, category: e.target.value })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="PRODI">Program Studi</option>
                    <option value="BAGIAN">Bagian / Unit Layanan</option>
                    <option value="DEKANAT">Dekanat</option>
                    <option value="KELOMPOK_KEAHLIAN">Kelompok Keahlian (KK)</option>
                    <option value="RISET">Research Alliance / Pusat Riset</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Kaprodi / Pimpinan
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Lengkap & Gelar"
                    value={unitForm.leaderName}
                    onChange={(e) =>
                      setUnitForm({ ...unitForm, leaderName: e.target.value })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddUnitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
                >
                  {isPending ? "Menyimpan..." : "Simpan Unit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Kategori */}
      {showAddCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-600" />
              <span>Tambah Klasifikasi Perihal Baru</span>
            </h3>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateCat} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Klasifikasi Perihal
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Magang & MBKM Mahasiswa"
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kode Klasifikasi (e.g. AKD13)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: AKD13"
                    value={catForm.code}
                    onChange={(e) =>
                      setCatForm({ ...catForm, code: e.target.value.toUpperCase() })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Grup Bidang
                  </label>
                  <select
                    value={catForm.group}
                    onChange={(e) =>
                      setCatForm({ ...catForm, group: e.target.value.toUpperCase() })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="AKD">AKD (Akademik)</option>
                    <option value="KMS">KMS (Kemahasiswaan)</option>
                    <option value="SDM">SDM (Kepegawaian)</option>
                    <option value="KRS">KRS (Kerjasama)</option>
                    <option value="SAR">SAR (Sarana Prasarana)</option>
                    <option value="KUG">KUG (Keuangan)</option>
                    <option value="TUS">TUS (Tata Usaha)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi / Penjelasan
                </label>
                <textarea
                  rows={2}
                  placeholder="Keterangan peruntukan surat..."
                  value={catForm.description}
                  onChange={(e) =>
                    setCatForm({ ...catForm, description: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCatModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
                >
                  {isPending ? "Menyimpan..." : "Simpan Klasifikasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
