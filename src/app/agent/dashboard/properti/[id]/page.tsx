"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Property {
  id: string;
  namaProperty: string;
  group: string | null;
  lebar: number;
  panjang: number;
  hadap: string;
  tipe: string;
  tingkat: number;
  price: string;
  carport: boolean;
  status: string;
  siap: string;
  mapsLink: string | null;
  kawasan: string;
  unit: string | null;
  createdAt: string;
  updatedAt: string;
  creator?: { name: string };
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/properties/${params.id}`).then((r) => r.json()),
      fetch("/api/auth/me").then((r) => r.json()),
    ])
      .then(([prop, u]) => { setProperty(prop.property); setUser(u.user); })
      .catch(() => router.push("/agent/dashboard"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-accent-gold/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Properti tidak ditemukan.</p>
        <Link href="/agent/dashboard" className="text-accent-gold hover:underline mt-4 inline-block">← Kembali</Link>
      </div>
    );
  }

  function formatRupiah(amount: string | number): string {
    const num = typeof amount === "string" ? parseInt(amount) : amount;
    return `Rp ${num.toLocaleString("id-ID")}`;
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
  }

  async function handleDelete() {
    if (!confirm(`Yakin hapus properti ${property!.namaProperty}? Tindakan ini tidak dapat dibatalkan.`)) return;
    const res = await fetch(`/api/properties/${property!.id}`, { method: "DELETE" });
    if (res.ok) router.push("/agent/dashboard");
  }

  const luas = property.lebar * property.panjang;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link href="/agent/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-accent-gold transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke daftar
      </Link>

      {/* Hero card */}
      <div className="bg-gradient-to-br from-primary-black to-darker-gray rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${property.tipe === "Villa" ? "bg-blue-500/20 text-blue-300 border border-blue-400/30" : "bg-purple-500/20 text-purple-300 border border-purple-400/30"}`}>
                {property.tipe}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${property.status === "in_stock" ? "bg-green-500/20 text-green-300 border border-green-400/30" : "bg-red-500/20 text-red-300 border border-red-400/30"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${property.status === "in_stock" ? "bg-green-400" : "bg-red-400"}`}></span>
                {property.status === "in_stock" ? "In Stock" : "Sold Out"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{property.namaProperty}</h1>
            <p className="text-gray-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.kawasan} {property.group && `• ${property.group}`}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Harga</p>
            <p className="text-3xl md:text-4xl font-bold text-gradient-gold">{formatRupiah(property.price)}</p>
          </div>
        </div>

        {user?.role === "superadmin" && (
          <div className="relative flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
            <Link href={`/agent/dashboard/properti/${property.id}/edit`} className="btn-gold text-primary-black font-semibold px-5 py-2 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Edit Properti
            </Link>
            <button onClick={handleDelete} className="bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500 hover:text-white font-semibold px-5 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Hapus
            </button>
            {property.mapsLink && (
              <a href={property.mapsLink} target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white border border-white/20 hover:bg-white/20 font-semibold px-5 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Buka Maps
              </a>
            )}
          </div>
        )}
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SpecCard label="Lebar" value={`${property.lebar} m`} icon="📐" />
        <SpecCard label="Panjang" value={`${property.panjang} m`} icon="📏" />
        <SpecCard label="Luas Total" value={`${luas} m²`} icon="🏗️" highlight />
        <SpecCard label="Tingkat" value={`${property.tingkat} Lantai`} icon="🏠" />
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-primary-black mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent-gold rounded-full"></span>
            Informasi Detail
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Nama Properti" value={property.namaProperty} />
            <DetailItem label="Group" value={property.group || "—"} />
            <DetailItem label="Tipe" value={property.tipe} />
            <DetailItem label="Hadap" value={property.hadap} />
            <DetailItem label="Tingkat" value={`${property.tingkat} Lantai`} />
            <DetailItem label="Carport" value={property.carport ? "Ya" : "Tidak"} />
            <DetailItem label="Kawasan" value={property.kawasan} />
            <DetailItem label="Unit" value={property.unit || "—"} />
            <DetailItem label="Status" value={property.status === "in_stock" ? "In Stock" : "Sold Out"} badge={property.status === "in_stock" ? "green" : "red"} />
            <DetailItem label="Siap" value={property.siap.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} badge="gold" />
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-primary-black mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-accent-gold rounded-full"></span>
              Riwayat
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Dibuat oleh</p>
                  <p className="font-medium text-primary-black">{property.creator?.name || "—"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tanggal Dibuat</p>
                  <p className="font-medium text-primary-black">{formatDate(property.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Terakhir Diperbarui</p>
                  <p className="font-medium text-primary-black">{formatDate(property.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {property.mapsLink && (
            <a href={property.mapsLink} target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-br from-accent-gold to-accent-gold-dark rounded-2xl p-5 text-primary-black hover:shadow-xl hover:shadow-accent-gold/30 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-black/10 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold">Lihat Lokasi</p>
                  <p className="text-xs opacity-80">Buka di Google Maps</p>
                </div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SpecCard({ label, value, icon, highlight }: { label: string; value: string; icon: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${highlight ? "bg-gradient-to-br from-accent-gold to-accent-gold-dark text-primary-black border-accent-gold" : "bg-white text-primary-black border-gray-100"} card-hover`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className={`text-xs font-medium uppercase tracking-wide ${highlight ? "opacity-80" : "text-gray-500"}`}>{label}</p>
      <p className="text-xl font-bold mt-0.5">{value}</p>
    </div>
  );
}

function DetailItem({ label, value, badge }: { label: string; value: string; badge?: "green" | "red" | "gold" }) {
  return (
    <div className="py-2">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      {badge ? (
        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${
          badge === "green" ? "bg-green-50 text-green-700 border border-green-200" :
          badge === "red" ? "bg-red-50 text-accent-red border border-red-200" :
          "bg-accent-gold/10 text-accent-gold border border-accent-gold/20"
        }`}>{value}</span>
      ) : (
        <p className="font-semibold text-primary-black">{value}</p>
      )}
    </div>
  );
}
