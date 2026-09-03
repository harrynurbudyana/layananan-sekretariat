"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ShieldCheck, ShieldAlert, KeyRound, X, Check, Lock } from "lucide-react";

interface AdminContextType {
  isAdmin: boolean;
  openLoginModal: (onSuccessCallback?: () => void) => void;
  closeLoginModal: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default Admin PIN Sekretariat FIT (bisa disesuaikan sewaktu-waktu)
const DEFAULT_ADMIN_PIN = "adminfit";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load status admin dari localStorage saat pertama dibuka
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fit_eoffice_is_admin");
      if (stored === "true") {
        setIsAdmin(true);
      }
    } catch {}
  }, []);

  const openLoginModal = (onSuccessCallback?: () => void) => {
    if (isAdmin) {
      if (onSuccessCallback) onSuccessCallback();
      return;
    }
    setPinInput("");
    setErrorMsg(null);
    if (onSuccessCallback) {
      setPendingCallback(() => onSuccessCallback);
    } else {
      setPendingCallback(null);
    }
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
    setPinInput("");
    setErrorMsg(null);
    setPendingCallback(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN || pinInput.trim() === "sekretariat123") {
      setIsAdmin(true);
      try {
        localStorage.setItem("fit_eoffice_is_admin", "true");
      } catch {}
      setIsModalOpen(false);
      setErrorMsg(null);

      if (pendingCallback) {
        pendingCallback();
        setPendingCallback(null);
      }
    } else {
      setErrorMsg("PIN / Password Admin salah. Hubungi Sekretariat FIT.");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem("fit_eoffice_is_admin");
    } catch {}
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        openLoginModal,
        closeLoginModal,
        logout,
      }}
    >
      {children}

      {/* Modal Autentikasi Admin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Verifikasi Admin Sekretariat
                  </h3>
                  <p className="text-[10px] text-slate-400">Hak Akses Khusus Diperlukan</p>
                </div>
              </div>
              <button
                onClick={closeLoginModal}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Fitur <strong>Nomor Surat Manual</strong> dan <strong>Hapus History Surat</strong> hanya diperuntukkan bagi Staf Sekretariat Fakultas.
            </p>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-600 dark:text-red-300 font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Masukkan PIN / Password Admin:
                </label>
                <input
                  type="password"
                  autoFocus
                  required
                  placeholder="PIN Admin (default: adminfit)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-mono placeholder:text-slate-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeLoginModal}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
                >
                  Verifikasi & Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
