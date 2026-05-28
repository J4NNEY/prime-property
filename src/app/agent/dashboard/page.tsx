"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/ui/Toast";

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
  kawasan: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const KAWASAN_OPTIONS = ["Krakatau", "Pancing", "Tembung", "Helvetia", "Cemara Asri", "Kuala", "Sunggal", "Marelan"];

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ role: string; name: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [kawasan, setKawasan] = useState(searchParams.get("kawasan") || "");
  const [hadap, setHadap] = useState(searchParams.get("hadap") || "");
  const [tipe, setTipe] = useState(searchParams.get("tipe") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [siap, setSiap] = useState(searchParams.get("siap") || "");
  const [carport, setCarport] = useState(searchParams.get("carport") || "");
  const [lebarMin, setLebarMin] = useState(searchParams.get("lebarMin") || "");
  const [hargaMax, setHargaMax] = useState(searchParams.get("hargaMax") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [limit, setLimit] = useState(parseInt(searchParams.get("limit") || "50"));

  const activeFilters = [
    kawasan && { key: "kawasan", label: `Kawasan: ${kawasan}` },
    hadap && { key: "hadap", label: `Hadap: ${hadap}` },
    tipe && { key: "tipe", label: `Tipe: ${tipe}` },
    status && { key: "status", label: `Status: ${status === "in_stock" ? "In Stock" : "Sold Out"}` },
    siap && { key: "siap", label: `Siap: ${siap.replace(/_/g, " ")}` },
    carport && { key: "carport", label: `Carport: ${carport === "true" ? "Ya" : "Tidak"}` },
    lebarMin && { key: "lebarMin", label: `Lebar min: ${lebarMin}m` },
    hargaMax && { key: "hargaMax", label: `Harga max: Rp ${Number(hargaMax).toLocaleString("id-ID")}` },
  ].filter(Boolean) as { key: string; label: string }[];

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (kawasan) params.set("kawasan", kawasan);
    if (hadap) params.set("hadap", hadap);
    if (tipe) params.set("tipe", tipe);
    if (status) params.set("status", status);
    if (siap) params.set("siap", siap);
    if (carport) params.set("carport", carport);
    if (lebarMin) params.set("lebarMin", lebarMin);
    if (hargaMax) params.set("hargaMax", hargaMax);
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    router.replace(`/agent/dashboard?${params.toString()}`, { scroll: false });
    try {
      const res = await fetch(`/api/properties?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProperties(data.properties);
        setPagination(data.pagination);
      }
    } finally {
      setLoading(false);
    }
  }, [search, kawasan, hadap, tipe, status, siap, carport, lebarMin, hargaMax, sortBy, sortOrder, page, limit, router]);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  useEffect(() => {
    const t = setTimeout(fetchProperties, 300);
    return () => clearTimeout(t);
  }, [fetchProperties]);

  function removeFilter(key: string) {
    const setters: Record<string, (v: string) => void> = {
      kawasan: setKawasan, hadap: setHadap, tipe: setTipe, status: setStatus,
      siap: setSiap, carport: setCarport, lebarMin: setLebarMin, hargaMax: setHargaMax,
    };
    setters[key]?.("");
    setPage(1);
  }

  function resetFilters() {
    setSearch(""); setKawasan(""); setHadap(""); setTipe(""); setStatus("");
    setSiap(""); setCarport(""); setLebarMin(""); setHargaMax(""); setPage(1);
  }

  function formatRupiah(amount: string | number): string {
    const num = typeof amount === "string" ? parseInt(amount) : amount;
    return `Rp ${num.toLocaleString("id-ID")}`;
  }

  function handleSort(field: string) {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortOrder("asc"); }
  }

  async function handleDelete(id: string, nama: string) {
    if (!confirm(`Yakin hapus properti ${nama}? Tindakan ini tidak dapat dibatalkan.`)) return;
    const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
    if (res.ok) { setToast("Properti berhasil dihapus."); fetchProperties(); }
  }

  // Calculate stats
  const stats = {
    total: pagination.total,
    inStock: properties.filter((p) => p.status === "in_stock").length,
    soldOut: properties.filter((p) => p.status === "sold_out").length,
    villa: properties.filter((p) => p.tipe === "Villa").length,
    ruko: properties.filter((p) => p.tipe === "Ruko").length,
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-black">Daftar Properti</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola seluruh listing properti Prime Property.</p>
        </div>
        {user?.role === "superadmin" && (
          <Link
            href="/agent/dashboard/tambah"
            className="btn-gold text-primary-black font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-accent-gold/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Properti
          </Link>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <StatCard
          label="Total Properti"
          value={stats.total}
          color="text-primary-black"
          bg="bg-white"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
            </svg>
          }
        />
        <StatCard
          label="Tersedia"
          value={stats.inStock}
          color="text-green-600"
          bg="bg-green-50"
          icon={
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
        <StatCard
          label="Terjual"
          value={stats.soldOut}
          color="text-accent-red"
          bg="bg-red-50"
          icon={
            <svg className="w-5 h-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
        <StatCard
          label="Villa"
          value={stats.villa}
          color="text-blue-600"
          bg="bg-blue-50"
          icon={
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        />
        <StatCard
          label="Ruko"
          value={stats.ruko}
          color="text-purple-600"
          bg="bg-purple-50"
          icon={
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
      </div>

      {/* Search + Filter button */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama properti, group, atau kawasan..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="input-premium w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:border-accent-gold outline-none bg-soft-gray/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium transition-all ${
              showFilters || activeFilters.length > 0
                ? "bg-accent-gold/10 border-accent-gold/30 text-accent-gold"
                : "bg-white border-gray-200 text-gray-600 hover:border-accent-gold/30"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
            {activeFilters.length > 0 && (
              <span className="bg-accent-gold text-primary-black text-xs px-2 py-0.5 rounded-full font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel - collapsible */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-slide-down">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <FilterSelect label="Kawasan" value={kawasan} onChange={(v) => { setKawasan(v); setPage(1); }} options={[{ value: "", label: "Semua Kawasan" }, ...KAWASAN_OPTIONS.map((k) => ({ value: k, label: k }))]} />
              <FilterSelect label="Hadap" value={hadap} onChange={(v) => { setHadap(v); setPage(1); }} options={[{ value: "", label: "Semua Hadap" }, { value: "Utara", label: "Utara" }, { value: "Selatan", label: "Selatan" }, { value: "Timur", label: "Timur" }, { value: "Barat", label: "Barat" }]} />
              <FilterSelect label="Tipe" value={tipe} onChange={(v) => { setTipe(v); setPage(1); }} options={[{ value: "", label: "Semua Tipe" }, { value: "Ruko", label: "Ruko" }, { value: "Villa", label: "Villa" }]} />
              <FilterSelect label="Status" value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={[{ value: "", label: "Semua Status" }, { value: "in_stock", label: "In Stock" }, { value: "sold_out", label: "Sold Out" }]} />
              <FilterSelect label="Siap" value={siap} onChange={(v) => { setSiap(v); setPage(1); }} options={[{ value: "", label: "Semua" }, { value: "siap_huni", label: "Siap Huni" }, { value: "siap_kosong", label: "Siap Kosong" }, { value: "siap_huni_renovasi", label: "Siap Huni Renovasi" }]} />
              <FilterSelect label="Carport" value={carport} onChange={(v) => { setCarport(v); setPage(1); }} options={[{ value: "", label: "Semua" }, { value: "true", label: "Ya" }, { value: "false", label: "Tidak" }]} />
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">Lebar Min (m)</label>
                <input type="number" placeholder="0" value={lebarMin} onChange={(e) => { setLebarMin(e.target.value); setPage(1); }} className="input-premium w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-accent-gold bg-soft-gray/50" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">Harga Max (Rp)</label>
                <input type="number" placeholder="0" value={hargaMax} onChange={(e) => { setHargaMax(e.target.value); setPage(1); }} className="input-premium w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-accent-gold bg-soft-gray/50" />
              </div>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {activeFilters.map((f) => (
              <span key={f.key} className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full text-xs font-medium border border-accent-gold/20">
                {f.label}
                <button onClick={() => removeFilter(f.key)} className="hover:text-accent-red transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            <button onClick={resetFilters} className="text-xs text-accent-red hover:underline font-medium">
              Reset semua filter
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-soft-gray border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 cursor-pointer hover:text-primary-black text-xs uppercase tracking-wider" onClick={() => handleSort("namaProperty")}>
                  <span className="inline-flex items-center gap-1">Nama {sortBy === "namaProperty" && <span className="text-accent-gold">{sortOrder === "asc" ? "↑" : "↓"}</span>}</span>
                </th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Group</th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Dimensi</th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Hadap</th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Tipe</th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Tk</th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 cursor-pointer hover:text-primary-black text-xs uppercase tracking-wider" onClick={() => handleSort("price")}>
                  <span className="inline-flex items-center gap-1">Harga {sortBy === "price" && <span className="text-accent-gold">{sortOrder === "asc" ? "↑" : "↓"}</span>}</span>
                </th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Carport</th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Siap</th>
                <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Kawasan</th>
                {user?.role === "superadmin" && <th className="px-4 py-3.5 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={12} className="px-4 py-3">
                      <div className="h-8 bg-gray-100 rounded animate-pulse-soft"></div>
                    </td>
                  </tr>
                ))
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-16 text-center">
                    <div className="inline-flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-soft-gray flex items-center justify-center mb-3">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">Tidak ada properti ditemukan</p>
                      <p className="text-gray-400 text-xs mt-1">Coba ubah filter atau kata kunci pencarian</p>
                    </div>
                  </td>
                </tr>
              ) : (
                properties.map((p) => (
                  <tr key={p.id} className="hover:bg-soft-gray/50 cursor-pointer transition-colors group" onClick={() => router.push(`/agent/dashboard/properti/${p.id}`)}>
                    <td className="px-4 py-3 font-semibold text-primary-black group-hover:text-accent-gold transition-colors">{p.namaProperty}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{p.group || "-"}</td>
                    <td className="px-4 py-3 text-gray-600">{p.lebar} × {p.panjang}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{p.hadap}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${p.tipe === "Villa" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>{p.tipe}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.tingkat}</td>
                    <td className="px-4 py-3 font-bold text-primary-black">{formatRupiah(p.price)}</td>
                    <td className="px-4 py-3 text-center">{p.carport ? <span className="text-green-600">✓</span> : <span className="text-gray-300">—</span>}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${p.status === "in_stock" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-accent-red border border-red-200"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === "in_stock" ? "bg-green-500" : "bg-accent-red"}`}></span>
                        {p.status === "in_stock" ? "In Stock" : "Sold Out"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${p.siap === "siap_huni" ? "bg-yellow-50 text-yellow-700" : p.siap === "siap_kosong" ? "bg-purple-50 text-purple-700" : "bg-orange-50 text-orange-700"}`}>
                        {p.siap.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{p.kawasan}</td>
                    {user?.role === "superadmin" && (
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-1">
                          <Link href={`/agent/dashboard/properti/${p.id}/edit`} className="w-7 h-7 rounded-lg bg-accent-gold/10 text-accent-gold hover:bg-accent-gold hover:text-primary-black flex items-center justify-center transition-colors" title="Edit">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </Link>
                          <button onClick={() => handleDelete(p.id, p.namaProperty)} className="w-7 h-7 rounded-lg bg-red-50 text-accent-red hover:bg-accent-red hover:text-white flex items-center justify-center transition-colors" title="Hapus">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-100 bg-soft-gray/30">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 sm:mb-0">
            <span>Tampilkan</span>
            <select value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }} className="border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-accent-gold bg-white">
              <option value={25}>25</option><option value={50}>50</option><option value={100}>100</option>
            </select>
            <span>dari <span className="font-semibold text-primary-black">{pagination.total}</span> properti</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:border-accent-gold/30 transition-all flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Prev
            </button>
            <span className="text-sm text-gray-600 px-2">Hal <span className="font-bold text-primary-black">{page}</span> / {pagination.totalPages || 1}</span>
            <button onClick={() => setPage(Math.min(pagination.totalPages, page + 1))} disabled={page >= pagination.totalPages} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:border-accent-gold/30 transition-all flex items-center gap-1">
              Next
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, bg, icon }: { label: string; value: number; color: string; bg: string; icon: React.ReactNode }) {
  return (
    <div className={`${bg} rounded-2xl p-4 border border-gray-100 card-hover`}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        {icon}
      </div>
      <p className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1.5 font-medium">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input-premium w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-accent-gold bg-soft-gray/50 cursor-pointer">
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}
