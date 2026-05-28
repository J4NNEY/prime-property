"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogoDark } from "@/components/ui/Logo";

export default function AgentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) router.push("/agent/dashboard");
      else setError(data.error || "Login gagal.");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Image (hidden on mobile) */}
      <div className="hidden lg:block relative bg-primary-black overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=1600&fit=crop"
          alt="Luxury property"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-black/95 via-primary-black/80 to-transparent"></div>
        <div className="absolute inset-0 pattern-dots opacity-15"></div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-12 z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-accent-gold transition-colors group w-fit">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Kembali ke Beranda</span>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-accent-gold text-sm font-medium">Agent Portal</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
              Kelola Properti<br />
              <span className="text-gradient-gold">dengan Mudah</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              Dashboard internal Prime Property untuk mengelola listing, klien, dan transaksi properti.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
              <div className="border-l-2 border-accent-gold pl-3">
                <p className="text-2xl font-bold text-accent-gold">500+</p>
                <p className="text-xs text-gray-400">Properti</p>
              </div>
              <div className="border-l-2 border-accent-gold pl-3">
                <p className="text-2xl font-bold text-accent-gold">300+</p>
                <p className="text-xs text-gray-400">Klien</p>
              </div>
              <div className="border-l-2 border-accent-gold pl-3">
                <p className="text-2xl font-bold text-accent-gold">15+</p>
                <p className="text-xs text-gray-400">Kawasan</p>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Prime Property</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-soft-gray relative">
        {/* Mobile back link */}
        <Link href="/" className="lg:hidden absolute top-6 left-6 inline-flex items-center gap-2 text-gray-600 hover:text-accent-gold transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Beranda
        </Link>

        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <LogoDark className="justify-center" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary-black">Selamat Datang</h2>
              <p className="text-gray-500 mt-2">Masuk ke dashboard agent internal</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-accent-red px-4 py-3 rounded-xl mb-5 text-sm flex items-start gap-2 animate-slide-down">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-premium w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-accent-gold outline-none bg-soft-gray/50"
                    placeholder="agent@primeproperty.id"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button type="button" className="text-xs text-accent-gold hover:underline">Lupa password?</button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-premium w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:border-accent-gold outline-none bg-soft-gray/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full text-primary-black font-bold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-accent-gold/20"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-black/30 border-t-primary-black rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk ke Dashboard
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-6 pt-6 border-t border-gray-100">
              <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Akses aman dengan enkripsi end-to-end
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
