"use client";

import { useState } from "react";

interface PropertyFormProps {
  initialData?: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => Promise<Record<string, string> | undefined>;
  submitLabel: string;
}

const KAWASAN_OPTIONS = [
  "Krakatau", "Pancing", "Tembung", "Helvetia", "Cemara Asri", "Kuala", "Sunggal", "Marelan"
];

export default function PropertyForm({ initialData, onSubmit, submitLabel }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    namaProperty: (initialData?.namaProperty as string) || "",
    group: (initialData?.group as string) || "",
    lebar: (initialData?.lebar as number)?.toString() || "",
    panjang: (initialData?.panjang as number)?.toString() || "",
    hadap: (initialData?.hadap as string) || "",
    tipe: (initialData?.tipe as string) || "Ruko",
    tingkat: (initialData?.tingkat as number)?.toString() || "",
    price: (initialData?.price as string)?.toString() || "",
    carport: (initialData?.carport as boolean) || false,
    status: (initialData?.status as string) || "in_stock",
    siap: (initialData?.siap as string) || "siap_huni",
    mapsLink: (initialData?.mapsLink as string) || "",
    kawasan: (initialData?.kawasan as string) || "",
    unit: (initialData?.unit as string) || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validateClient(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.namaProperty || formData.namaProperty.length < 3 || formData.namaProperty.length > 100) {
      newErrors.namaProperty = "Nama properti harus 3-100 karakter.";
    }
    if (!formData.lebar || parseFloat(formData.lebar) <= 0) {
      newErrors.lebar = "Lebar harus lebih dari 0.";
    }
    if (!formData.panjang || parseFloat(formData.panjang) <= 0) {
      newErrors.panjang = "Panjang harus lebih dari 0.";
    }
    if (!formData.hadap) {
      newErrors.hadap = "Hadap wajib dipilih.";
    }
    if (!formData.tingkat || parseFloat(formData.tingkat) < 1 || parseFloat(formData.tingkat) > 10) {
      newErrors.tingkat = "Tingkat harus 1-10.";
    }
    if (!formData.price || parseInt(formData.price) <= 0) {
      newErrors.price = "Harga harus lebih dari 0.";
    }
    if (!formData.kawasan) {
      newErrors.kawasan = "Kawasan wajib diisi.";
    }
    if (formData.mapsLink && !formData.mapsLink.includes("google.com/maps")) {
      newErrors.mapsLink = "Link maps harus berisi domain google.com/maps.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateClient()) return;

    setLoading(true);
    const submitData = {
      ...formData,
      lebar: parseFloat(formData.lebar),
      panjang: parseFloat(formData.panjang),
      tingkat: parseFloat(formData.tingkat),
      price: parseInt(formData.price),
    };

    const serverErrors = await onSubmit(submitData);
    if (serverErrors) {
      setErrors(serverErrors);
    }
    setLoading(false);
  }

  function updateField(field: string, value: string | boolean) {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nama Property */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Properti <span className="text-accent-red">*</span>
          </label>
          <input
            type="text"
            value={formData.namaProperty}
            onChange={(e) => updateField("namaProperty", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
            placeholder="Contoh: Aston Villas Blok A"
          />
          {errors.namaProperty && <p className="text-[#B33A3A] text-sm mt-1">{errors.namaProperty}</p>}
        </div>

        {/* Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
          <input
            type="text"
            value={formData.group}
            onChange={(e) => updateField("group", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
            placeholder="Contoh: Mentari"
          />
        </div>

        {/* Lebar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lebar (m) <span className="text-accent-red">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.lebar}
            onChange={(e) => updateField("lebar", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
            placeholder="4.5"
          />
          {errors.lebar && <p className="text-[#B33A3A] text-sm mt-1">{errors.lebar}</p>}
        </div>

        {/* Panjang */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Panjang (m) <span className="text-accent-red">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.panjang}
            onChange={(e) => updateField("panjang", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
            placeholder="21.5"
          />
          {errors.panjang && <p className="text-[#B33A3A] text-sm mt-1">{errors.panjang}</p>}
        </div>

        {/* Hadap */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hadap <span className="text-accent-red">*</span>
          </label>
          <select
            value={formData.hadap}
            onChange={(e) => updateField("hadap", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
          >
            <option value="">Pilih hadap</option>
            <option value="Utara">Utara</option>
            <option value="Selatan">Selatan</option>
            <option value="Timur">Timur</option>
            <option value="Barat">Barat</option>
            <option value="Utara,Timur">Utara & Timur</option>
            <option value="Utara,Barat">Utara & Barat</option>
            <option value="Selatan,Timur">Selatan & Timur</option>
            <option value="Selatan,Barat">Selatan & Barat</option>
          </select>
          {errors.hadap && <p className="text-[#B33A3A] text-sm mt-1">{errors.hadap}</p>}
        </div>

        {/* Tipe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipe <span className="text-accent-red">*</span>
          </label>
          <select
            value={formData.tipe}
            onChange={(e) => updateField("tipe", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
          >
            <option value="Ruko">Ruko</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        {/* Tingkat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tingkat <span className="text-accent-red">*</span>
          </label>
          <input
            type="number"
            step="0.5"
            min="1"
            max="10"
            value={formData.tingkat}
            onChange={(e) => updateField("tingkat", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
            placeholder="2"
          />
          {errors.tingkat && <p className="text-[#B33A3A] text-sm mt-1">{errors.tingkat}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Harga (Rp) <span className="text-accent-red">*</span>
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => updateField("price", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
            placeholder="1350000000"
          />
          {formData.price && (
            <p className="text-xs text-gray-500 mt-1">
              = Rp {parseInt(formData.price || "0").toLocaleString("id-ID")}
            </p>
          )}
          {errors.price && <p className="text-[#B33A3A] text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
          >
            <option value="in_stock">In Stock</option>
            <option value="sold_out">Sold Out</option>
          </select>
        </div>

        {/* Siap */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Siap <span className="text-accent-red">*</span>
          </label>
          <select
            value={formData.siap}
            onChange={(e) => updateField("siap", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
          >
            <option value="siap_huni">Siap Huni</option>
            <option value="siap_kosong">Siap Kosong</option>
            <option value="siap_huni_renovasi">Siap Huni Renovasi</option>
          </select>
        </div>

        {/* Kawasan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kawasan <span className="text-accent-red">*</span>
          </label>
          <select
            value={formData.kawasan}
            onChange={(e) => updateField("kawasan", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
          >
            <option value="">Pilih kawasan</option>
            {KAWASAN_OPTIONS.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
          {errors.kawasan && <p className="text-[#B33A3A] text-sm mt-1">{errors.kawasan}</p>}
        </div>

        {/* Carport */}
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="carport"
            checked={formData.carport}
            onChange={(e) => updateField("carport", e.target.checked)}
            className="w-4 h-4 accent-accent-gold"
          />
          <label htmlFor="carport" className="text-sm font-medium text-gray-700">
            Carport
          </label>
        </div>

        {/* Maps Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link Google Maps</label>
          <input
            type="url"
            value={formData.mapsLink}
            onChange={(e) => updateField("mapsLink", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
            placeholder="https://google.com/maps/..."
          />
          {errors.mapsLink && <p className="text-[#B33A3A] text-sm mt-1">{errors.mapsLink}</p>}
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
          <input
            type="text"
            value={formData.unit}
            onChange={(e) => updateField("unit", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
            placeholder="Contoh: Ready Siap huni"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent-gold text-primary-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
