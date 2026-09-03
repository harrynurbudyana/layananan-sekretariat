import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { AdminProvider } from "@/context/admin-context";
import { ThemeProvider } from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FIT E-Office - Layanan Administrasi & Penomoran Surat Fakultas Ilmu Terapan",
  description:
    "Sistem layanan administrasi mandiri, penomoran surat otomatis, dan buku agenda digital Fakultas Ilmu Terapan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('fit-theme');
                  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} h-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors`}>
        <ThemeProvider>
          <AdminProvider>
            <div className="flex h-full min-h-screen">
              {/* Desktop Sidebar */}
              <div className="hidden md:flex md:w-64 md:flex-col shrink-0">
                <Sidebar />
              </div>

              {/* Main Content Area */}
              <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
                <Navbar />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                  {children}
                </main>
              </div>
            </div>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
