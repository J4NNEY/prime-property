"use client";

import { useState } from "react";
import Image from "next/image";
import PropertyDetailModal from "./PropertyDetailModal";

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

function formatRupiah(amount: number): string {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1).replace(".0", "")} M`;
  }
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function FeaturedProperties({ properties }: { properties: Property[] }) {
  const [selected, setSelected] = useState<Property | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => setSelected(property)}
            className="group bg-neutral-white rounded-2xl overflow-hidden card-hover border border-gray-100 shadow-sm cursor-pointer"
          >
            {/* Property Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={property.image}
                alt={property.nama}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm ${
                property.status === "in_stock"
                  ? "bg-green-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}>
                {property.status === "in_stock" ? "Tersedia" : "Terjual"}
              </span>
              <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold bg-primary-black/70 text-white backdrop-blur-sm">
                {property.tipe}
              </span>
              <div className="absolute bottom-3 left-3">
                <p className="text-xl font-bold text-white drop-shadow-lg">{formatRupiah(property.harga)}</p>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-primary-black group-hover:text-accent-gold transition-colors mb-1">
                {property.nama}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                <svg className="w-3.5 h-3.5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.kawasan}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  <span className="text-xs">{property.lebar}×{property.panjang}m</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  <span className="text-xs">{property.tingkat} Lantai</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold group-hover:text-primary-black text-accent-gold transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <PropertyDetailModal
          property={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
