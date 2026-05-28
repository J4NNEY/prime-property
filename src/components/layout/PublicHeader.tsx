"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../ui/Logo";

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // AC-2.3: Header sticky di seluruh halaman publik
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-primary-black/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-accent-gold/10"
        : "bg-primary-black border-b border-white/5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* AC-2.3: Logo paling kiri */}
          <Link href="/" className="group">
            <Logo />
          </Link>

          {/* AC-2.3: Urutan menu — Beranda | Tentang Kami | Kontak | Login Agent */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Beranda</NavLink>
            <NavLink href="/tentang">Tentang Kami</NavLink>
            <NavLink href="/kontak">Kontak</NavLink>

            {/* Login Agent — outline emas (AC-2.3) */}
            <Link
              href="/agent/login"
              className="ml-4 relative overflow-hidden border border-accent-gold text-accent-gold px-5 py-2 rounded-lg font-medium text-sm group transition-all duration-300 hover:text-primary-black"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login Agent
              </span>
              <span className="absolute inset-0 bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-72 pb-4" : "max-h-0"}`}>
          <nav className="space-y-1 pt-2">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Beranda</MobileNavLink>
            <MobileNavLink href="/tentang" onClick={() => setMobileMenuOpen(false)}>Tentang Kami</MobileNavLink>
            <MobileNavLink href="/kontak" onClick={() => setMobileMenuOpen(false)}>Kontak</MobileNavLink>
            <Link
              href="/agent/login"
              className="block mt-3 border border-accent-gold text-accent-gold px-4 py-2.5 rounded-lg text-center font-medium hover:bg-accent-gold hover:text-primary-black transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login Agent
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-white/80 hover:text-accent-gold px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5 group"
    >
      {children}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent-gold group-hover:w-6 transition-all duration-300 rounded-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      className="block text-white/80 hover:text-accent-gold hover:bg-white/5 px-4 py-2.5 rounded-lg transition-all duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
