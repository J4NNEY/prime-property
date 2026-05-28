"use client";

import Image from "next/image";
import { useEffect } from "react";

interface Property {
  id: number;
  nama: string;
  tipe: string;
  kawasan: string;
  harga: number;
  status: string;
  lebar: number;
  panjang: number;
  tingkat: number;
  image: string;
}

interface Props {
  property: Property;
  onClose: () => void;
}

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function PropertyDetailModal({ property, onClose }: Props) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const luas = property.lebar * property.panjang;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: "0.2s" }}></div>

      {/* Modal */}
      <div
        className="relative bg-neutral-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        style={{ animationDuration: "0.3s" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Tutup"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-72">
          <Image
            src={property.image}
            alt={property.nama}
            fill
            className="object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl"></div>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold bg-primary-black/70 text-white backdrop-blur-sm">
              {property.tipe}
            </span>
            <span className={`text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm ${
              property.status === "in_stock"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}>
              {property.status === "in_stock" ? "Tersedia" : "Terjual"}
            </span>
          </div>

          {/* Price on image */}
          <div className="absolute bottom-4 left-4">
            <p className="text-sm text-gray-300">Harga</p>
            <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              {formatRupiah(property.harga)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title & Location */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-black mb-2">
              {property.nama}
            </h2>
            <p className="text-gray-500 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Kawasan {property.kawasan}, Medan
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-soft-gray rounded-xl p-4 text-center">
              <svg className="w-5 h-5 mx-auto text-accent-gold mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <p className="text-lg font-bold text-primary-black">{property.lebar} m</p>
              <p className="text-xs text-gray-500">Lebar</p>
            </div>
            <div className="bg-soft-gray rounded-xl p-4 text-center">
              <svg className="w-5 h-5 mx-auto text-accent-gold mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <p className="text-lg font-bold text-primary-black">{property.panjang} m</p>
              <p className="text-xs text-gray-500">Panjang</p>
            </div>
            <div className="bg-soft-gray rounded-xl p-4 text-center">
              <svg className="w-5 h-5 mx-auto text-accent-gold mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-lg font-bold text-primary-black">{property.tingkat}</p>
              <p className="text-xs text-gray-500">Lantai</p>
            </div>
            <div className="bg-soft-gray rounded-xl p-4 text-center">
              <svg className="w-5 h-5 mx-auto text-accent-gold mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-lg font-bold text-primary-black">{luas} m²</p>
              <p className="text-xs text-gray-500">Luas</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-primary-black mb-2">Deskripsi</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {property.tipe === "Villa"
                ? `${property.nama} adalah hunian premium di kawasan ${property.kawasan} dengan desain modern dan lokasi strategis. Dilengkapi dengan ${property.tingkat} lantai, luas tanah ${luas} m², dan akses mudah ke fasilitas umum. Cocok untuk keluarga yang menginginkan kenyamanan dan investasi jangka panjang.`
                : `${property.nama} adalah ruang usaha strategis di kawasan ${property.kawasan} dengan ${property.tingkat} lantai dan luas ${luas} m². Lokasi ramai dan mudah dijangkau, ideal untuk berbagai jenis bisnis. Investasi yang menjanjikan dengan potensi sewa tinggi.`
              }
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="font-semibold text-primary-black mb-3">Keunggulan</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Lokasi strategis",
                "Akses jalan utama",
                "Dekat fasilitas umum",
                "Lingkungan aman",
                "Desain modern",
                "Surat lengkap",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white font-semibold py-3 rounded-xl text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Hubungi via WhatsApp
            </a>
            <a
              href="/kontak"
              className="flex-1 bg-accent-gold text-primary-black font-semibold py-3 rounded-xl text-center hover:bg-accent-gold-light transition-colors"
            >
              Jadwalkan Survei
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
