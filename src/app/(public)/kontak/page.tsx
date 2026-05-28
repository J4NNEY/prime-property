"use client";

import { useState } from "react";
import Image from "next/image";
import Toast from "@/components/ui/Toast";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ContactPage() {
  const [formData, setFormData] = useState({ nama: "", email: "", nomorHp: "", pesan: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Format email tidak valid";
    if (!formData.nomorHp.trim()) newErrors.nomorHp = "Nomor HP wajib diisi";
    else if (formData.nomorHp.replace(/\D/g, "").length < 10) newErrors.nomorHp = "Nomor HP minimum 10 digit";
    if (!formData.pesan.trim()) newErrors.pesan = "Pesan wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setToast("Pesan terkirim, tim kami akan menghubungi Anda.");
        setFormData({ nama: "", email: "", nomorHp: "", pesan: "" });
      } else {
        const data = await res.json();
        setToast(data.error || "Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch {
      setToast("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* HERO BANNER */}
      <section className="relative py-32 bg-primary-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=600&fit=crop"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/95 to-primary-black/70"></div>
        </div>
        <div className="absolute inset-0 pattern-architectural opacity-30"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-gold/8 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel centered>Hubungi Kami</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mt-6 mb-5 leading-[1.05]">
            Mari <span className="italic text-gradient-gold">Terhubung</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Kami siap membantu Anda menemukan properti impian. Jangan ragu untuk menghubungi kami.
          </p>
          <div className="gold-line mx-auto mt-8"></div>
        </div>
      </section>

      {/* AC-4.1: Informasi Kontak — floating cards */}
      <section className="bg-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-16 relative z-10">
            {[
              { icon: "📍", title: "Alamat", value: "Jl. Gatot Subroto No. 123, Medan" },
              { icon: "📞", title: "Telepon", value: "+62 812-3456-7890", href: "tel:+6281234567890" },
              { icon: "✉️", title: "Email", value: "info@primeproperty.id", href: "mailto:info@primeproperty.id" },
              { icon: "🕐", title: "Jam Kerja", value: "Sen - Sab: 09:00 - 18:00 WIB" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 card-hover border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 border border-accent-gold/20 flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] mb-1.5">{item.title}</p>
                {item.href ? (
                  <a href={item.href} className="text-sm text-primary-black font-semibold hover:text-accent-gold-dark transition-colors">{item.value}</a>
                ) : (
                  <p className="text-sm text-primary-black font-semibold">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left - Map & WhatsApp */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp CTA */}
              <div className="bg-primary-black rounded-3xl p-7 gold-glow relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-gold/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Chat Langsung</h3>
                      <p className="text-gray-400 text-xs">Respon cepat via WhatsApp</p>
                    </div>
                  </div>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="block w-full bg-green-500 text-white font-semibold py-3 rounded-xl text-center hover:bg-green-600 transition-colors text-sm">
                    Mulai Chat WhatsApp
                  </a>
                </div>
              </div>

              {/* Maps */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0!2d98.67!3d3.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMzUnMjQuMCJOIDk4wrA0MCcxMi4wIkU!5e0!3m2!1sid!2sid!4v1"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kantor"
                />
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
                <div className="mb-8">
                  <SectionLabel>Form Kontak</SectionLabel>
                  <h2 className="font-serif text-3xl md:text-4xl text-primary-black mt-3 mb-2">Kirim Pesan</h2>
                  <p className="text-gray-500 text-sm">Isi form di bawah dan tim kami akan segera menghubungi Anda.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nama" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
                      <input
                        id="nama"
                        type="text"
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        className="input-premium w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-accent-gold outline-none bg-cream/50"
                        placeholder="John Doe"
                      />
                      {errors.nama && <p className="text-accent-red text-xs mt-1.5">{errors.nama}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-premium w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-accent-gold outline-none bg-cream/50"
                        placeholder="email@contoh.com"
                      />
                      {errors.email && <p className="text-accent-red text-xs mt-1.5">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="nomorHp" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Nomor HP / WhatsApp</label>
                    <input
                      id="nomorHp"
                      type="tel"
                      value={formData.nomorHp}
                      onChange={(e) => setFormData({ ...formData, nomorHp: e.target.value })}
                      className="input-premium w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-accent-gold outline-none bg-cream/50"
                      placeholder="08xxxxxxxxxx"
                    />
                    {errors.nomorHp && <p className="text-accent-red text-xs mt-1.5">{errors.nomorHp}</p>}
                  </div>

                  <div>
                    <label htmlFor="pesan" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Pesan</label>
                    <textarea
                      id="pesan"
                      rows={5}
                      value={formData.pesan}
                      onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                      className="input-premium w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-accent-gold outline-none resize-none bg-cream/50"
                      placeholder="Ceritakan kebutuhan properti Anda..."
                    />
                    {errors.pesan && <p className="text-accent-red text-xs mt-1.5">{errors.pesan}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full text-primary-black font-bold py-4 rounded-xl text-sm tracking-wider uppercase shadow-lg shadow-accent-gold/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-black/30 border-t-primary-black rounded-full animate-spin"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
