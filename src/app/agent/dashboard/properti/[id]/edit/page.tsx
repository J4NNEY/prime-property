"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/ui/Toast";
import PropertyForm from "@/components/PropertyForm";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/properties/${params.id}`)
      .then((r) => r.json())
      .then((data) => setProperty(data.property))
      .catch(() => router.push("/agent/dashboard"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  async function handleSubmit(data: Record<string, unknown>) {
    const res = await fetch(`/api/properties/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setToast("Properti berhasil diperbarui.");
      setTimeout(() => router.push(`/agent/dashboard/properti/${params.id}`), 1500);
    } else {
      const result = await res.json();
      return result.errors || { general: result.error };
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold"></div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="mb-6">
        <Link href={`/agent/dashboard/properti/${params.id}`} className="text-accent-gold hover:underline text-sm">
          ← Kembali ke detail
        </Link>
        <h1 className="text-2xl font-bold text-primary-black mt-2">Edit Properti</h1>
      </div>

      <div className="bg-neutral-white rounded-lg shadow-sm p-6">
        <PropertyForm initialData={property} onSubmit={handleSubmit} submitLabel="Simpan Perubahan" />
      </div>
    </div>
  );
}
