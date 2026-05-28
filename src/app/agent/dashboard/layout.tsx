"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogoDark } from "@/components/ui/Logo";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const navItems = [
  {
    href: "/agent/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => router.push("/agent/login"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/agent/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-gray">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-accent-gold/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 text-sm">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-soft-gray">
      {/* Sidebar - Desktop */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-primary-black text-white z-40 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-white/5">
            <Link href="/agent/dashboard" className="block">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-gold to-accent-gold-light flex items-center justify-center">
                  <span className="text-primary-black font-black text-sm">PP</span>
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-tight">PRIME PROPERTY</p>
                  <p className="text-xs text-accent-gold/70">Agent Portal</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2 mt-2">Menu Utama</p>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-accent-gold/15 text-accent-gold border border-accent-gold/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-gold"></span>}
                </Link>
              );
            })}

            {user.role === "superadmin" && (
              <>
                <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-2 mt-6">Manajemen</p>
                <Link
                  href="/agent/dashboard/tambah"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white border border-transparent transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm font-medium">Tambah Properti</span>
                </Link>
              </>
            )}
          </nav>

          {/* User card */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-dark flex items-center justify-center text-primary-black font-bold text-sm flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className={`flex-1 text-xs px-2 py-1.5 rounded-lg text-center font-medium ${
                user.role === "superadmin" ? "bg-accent-gold/15 text-accent-gold" : "bg-blue-500/15 text-blue-400"
              }`}>
                {user.role === "superadmin" ? "👑 Superadmin" : "👤 Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent-red/20 text-gray-400 hover:text-accent-red flex items-center justify-center transition-colors"
                title="Logout"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden text-gray-600 hover:text-primary-black"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="lg:hidden">
                <LogoDark />
              </div>
              <div className="hidden lg:block">
                <p className="text-xs text-gray-500">Selamat datang kembali,</p>
                <p className="text-sm font-semibold text-primary-black">{user.name} 👋</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-accent-gold text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Lihat Website
              </Link>
              <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
