"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/ui/Toast";
import PropertyForm from "@/components/PropertyForm";

export default function AddPropertyPage() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  async function handleSubmit(data: Record<string, unknown>) {
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setToast("Properti berhasil ditambahkan.");
      setTimeout(() => router.push("/agent/dashboard"), 1500);
    } else {
      const result = await res.json();
      return result.errors || { general: result.error };
    }
  }

  return (
    <div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="mb-6">
        <Link href="/agent/dashboard" className="text-accent-gold hover:underline text-sm">
          ← Kembali ke daftar
        </Link>
        <h1 className="text-2xl font-bold text-primary-black mt-2">Tambah Properti Baru</h1>
      </div>

      <div className="bg-neutral-white rounded-lg shadow-sm p-6">
        <PropertyForm onSubmit={handleSubmit} submitLabel="Simpan Properti" />
      </div>
    </div>
  );
}
