import Image from "next/image";
import HeroAnimations from "@/components/animations/HeroAnimations";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";
import MagneticButton from "@/components/animations/MagneticButton";
import SectionLabel from "@/components/ui/SectionLabel";
import Marquee from "@/components/ui/Marquee";
import {
  IconShield, IconChart, IconHandshake, IconBriefcase, IconArrowRight,
  IconStar, IconLocation, IconCheck, IconBuilding, IconHome,
} from "@/components/ui/Icons";

const featuredProperties = [
  { id: 1, nama: "Aston Villas Blok A", tipe: "Villa", kawasan: "Cemara Asri", harga: 2500000000, status: "in_stock", lebar: 8, panjang: 15, tingkat: 2, hadap: "Utara" },
  { id: 2, nama: "Ruko Krakatau 21", tipe: "Ruko", kawasan: "Krakatau", harga: 1800000000, status: "in_stock", lebar: 5, panjang: 18, tingkat: 3, hadap: "Timur" },
  { id: 3, nama: "Banyan Tree Residence", tipe: "Villa", kawasan: "Pancing", harga: 3200000000, status: "in_stock", lebar: 10, panjang: 20, tingkat: 2, hadap: "Selatan" },
  { id: 4, nama: "Ruko Mentari Square", tipe: "Ruko", kawasan: "Helvetia", harga: 1350000000, status: "sold_out", lebar: 4.5, panjang: 16, tingkat: 3, hadap: "Barat" },
  { id: 5, nama: "Palm Villa Estate", tipe: "Villa", kawasan: "Tembung", harga: 2800000000, status: "in_stock", lebar: 9, panjang: 18, tingkat: 2, hadap: "Utara" },
  { id: 6, nama: "Ruko Pancing Business", tipe: "Ruko", kawasan: "Pancing", harga: 1650000000, status: "in_stock", lebar: 5, panjang: 20, tingkat: 2.5, hadap: "Timur" },
];

const valuePropositions = [
  { num: "01", icon: IconShield, title: "Properti Premium", desc: "Hanya properti berkualitas tinggi dengan lokasi strategis yang kami tawarkan kepada klien." },
  { num: "02", icon: IconHandshake, title: "Terpercaya", desc: "Lebih dari 10 tahun pengalaman melayani klien di Sumatera Utara dengan dedikasi tinggi." },
  { num: "03", icon: IconChart, title: "Data Transparan", desc: "Informasi lengkap, akurat, dan up-to-date untuk setiap properti yang tersedia." },
  { num: "04", icon: IconBriefcase, title: "Tim Profesional", desc: "Agent berpengalaman siap mendampingi Anda menemukan properti impian." },
];

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function HomePage() {
  return (
    <>
      {/* HERO — Enterprise Premium */}
      <HeroAnimations>
        <section className="relative min-h-screen flex items-center bg-primary-black overflow-hidden">
          {/* Layered backgrounds */}
          <div className="absolute inset-0 hero-bg-image">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
              alt=""
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/95 to-primary-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-primary-black/50"></div>
          </div>

          <div className="absolute inset-0 pattern-architectural opacity-50"></div>

          {/* Animated rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent-gold/5 rounded-full hero-ring"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-dashed border-accent-gold/8 rounded-full hero-ring"></div>

          {/* Glow */}
          <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-accent-gold/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl"></div>

          {/* Frame corners */}
          <div className="absolute top-12 left-12 hidden lg:block">
            <div className="w-16 h-px bg-gradient-to-r from-accent-gold to-transparent hero-frame-line"></div>
            <div className="w-px h-16 bg-gradient-to-b from-accent-gold to-transparent hero-frame-line"></div>
          </div>
          <div className="absolute top-12 right-12 hidden lg:flex flex-col items-end">
            <div className="w-16 h-px bg-gradient-to-l from-accent-gold to-transparent hero-frame-line"></div>
            <div className="w-px h-16 bg-gradient-to-b from-accent-gold to-transparent hero-frame-line"></div>
          </div>
          <div className="absolute bottom-12 left-12 hidden lg:block">
            <div className="w-px h-16 bg-gradient-to-t from-accent-gold to-transparent hero-frame-line"></div>
            <div className="w-16 h-px bg-gradient-to-r from-accent-gold to-transparent hero-frame-line"></div>
          </div>
          <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end">
            <div className="w-px h-16 bg-gradient-to-t from-accent-gold to-transparent hero-frame-line"></div>
            <div className="w-16 h-px bg-gradient-to-l from-accent-gold to-transparent hero-frame-line"></div>
          </div>

          {/* Floating preview cards */}
          <div className="absolute top-1/4 right-8 hidden xl:block hero-float-card">
            <div className="glass rounded-2xl p-4 w-48">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-white/70 uppercase tracking-wider">In Stock</span>
                </div>
                <IconBuilding className="w-4 h-4 text-accent-gold/60" />
              </div>
              <p className="text-xs text-gray-400 mb-1">Villa Premium</p>
              <p className="text-accent-gold font-bold">Rp 2.5 M</p>
            </div>
          </div>
          <div className="absolute bottom-1/4 left-8 hidden xl:block hero-float-card">
            <div className="glass rounded-2xl p-4 w-48">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold uppercase tracking-wider">Ruko</span>
                <IconHome className="w-4 h-4 text-accent-gold/60" />
              </div>
              <p className="text-xs text-gray-400 mb-1">Krakatau Center</p>
              <p className="text-accent-gold font-bold">Rp 1.8 M</p>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            {/* Top ornament */}
            <div className="hero-ornament inline-flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-gold"></div>
              <span className="text-accent-gold text-[11px] font-semibold uppercase tracking-[0.5em]">Est. 2014 · Medan, Indonesia</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-gold"></div>
            </div>

            {/* Headline with serif accent */}
            <h1 className="hero-headline text-white mb-8 leading-[1.05]">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">Properti Premium</div>
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-1">untuk <span className="font-serif italic text-gradient-gold">Masa Depan</span></div>
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-1">yang Bernilai</div>
            </h1>

            {/* Description */}
            <p className="hero-description text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Partner terpercaya untuk investasi Ruko dan Villa premium di Medan dan sekitarnya.
            </p>

            {/* AC-2.1: Single CTA primer */}
            <div className="hero-cta">
              <MagneticButton
                href="#properti-unggulan"
                strength={0.4}
                className="btn-gold inline-flex items-center gap-3 text-primary-black font-bold px-12 py-5 rounded-full shadow-2xl shadow-accent-gold/40 text-sm tracking-wider uppercase"
              >
                Lihat Properti
                <IconArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            {/* Trust indicator */}
            <div className="hero-trust mt-12 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} filled className="w-4 h-4 text-accent-gold" />
                ))}
              </div>
              <p className="text-xs text-gray-400 tracking-wide">
                <span className="text-white font-semibold">Dipercaya 300+ klien</span>
                <span className="mx-2 text-accent-gold">·</span>
                Rating 4.9/5.0
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-accent-gold rounded-full animate-bounce"></div>
            </div>
          </div>
        </section>
      </HeroAnimations>

      {/* MARQUEE — premium tagline ticker */}
      <section className="bg-primary-black border-y border-accent-gold/15 py-6 overflow-hidden">
        <Marquee items={["Premium Real Estate", "Investasi Cerdas", "Lokasi Strategis", "Trusted Partner", "Sejak 2014"]} />
      </section>

      {/* STATS STRIP */}
      <section className="relative bg-primary-black overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <ScrollReveal variant="stagger" stagger={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              {[
                { value: 500, suffix: "+", label: "Properti Terdaftar" },
                { value: 300, suffix: "+", label: "Klien Puas" },
                { value: 15, suffix: "+", label: "Kawasan Strategis" },
                { value: 10, suffix: "+", label: "Tahun Pengalaman" },
              ].map((s, i) => (
                <div key={i} className={`text-center group ${i > 0 ? "pl-4" : ""}`}>
                  <p className="text-5xl md:text-6xl font-serif text-gradient-gold leading-none">
                    <CountUp end={s.value} suffix={s.suffix} duration={2.5} />
                  </p>
                  <div className="gold-line-thin mx-auto mt-4 mb-3"></div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-[0.3em]">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AC-2.2 PROPERTI UNGGULAN — Enterprise data cards */}
      <section id="properti-unggulan" className="py-28 bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent-gold/4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent-gold/4 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <SectionLabel centered>Pilihan Terbaik</SectionLabel>
              <h2 className="font-serif text-5xl md:text-6xl text-primary-black mt-4 mb-5 leading-[1.05]">
                Properti <span className="italic text-gradient-gold">Unggulan</span>
              </h2>
              <div className="gold-line mx-auto"></div>
              <p className="text-gray-600 mt-6 max-w-xl mx-auto leading-relaxed">
                Daftar properti premium pilihan Prime Property dengan data ringkas dan informatif.
              </p>
            </div>
          </ScrollReveal>

          {/* AC-1.2: Tabular cards, no images */}
          <ScrollReveal variant="stagger" stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((p, idx) => (
                <article
                  key={p.id}
                  className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden card-hover"
                >
                  {/* Top gradient accent */}
                  <div className="h-1 bg-gradient-to-r from-accent-gold via-accent-gold-light to-accent-gold"></div>

                  {/* Decorative corners */}
                  <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-accent-gold/0 group-hover:border-accent-gold/50 transition-colors duration-500"></div>
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-accent-gold/0 group-hover:border-accent-gold/50 transition-colors duration-500"></div>

                  <div className="p-7">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] text-accent-gold font-semibold tracking-[0.3em]">
                        № {String(idx + 1).padStart(2, "0")}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold tracking-wider ${
                          p.tipe === "Villa" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                        }`}>{p.tipe.toUpperCase()}</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-bold tracking-wider ${
                          p.status === "in_stock" ? "bg-green-50 text-green-700" : "bg-red-50 text-accent-red"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.status === "in_stock" ? "bg-green-500" : "bg-accent-red"}`}></span>
                          {p.status === "in_stock" ? "TERSEDIA" : "TERJUAL"}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-primary-black group-hover:text-accent-gold-dark transition-colors duration-300 mb-1">
                      {p.nama}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-5">
                      <IconLocation className="w-3 h-3 text-accent-gold" />
                      {p.kawasan}, Medan
                    </p>

                    {/* Specs grid */}
                    <div className="grid grid-cols-4 gap-1 py-4 border-y border-gray-100 mb-5 -mx-7 px-7 bg-cream/40">
                      <Spec label="Lebar" value={`${p.lebar}m`} />
                      <Spec label="Panjang" value={`${p.panjang}m`} />
                      <Spec label="Tingkat" value={`${p.tingkat}`} />
                      <Spec label="Hadap" value={p.hadap} />
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] mb-0.5">Harga</p>
                        <p className="font-serif text-2xl text-accent-gold-dark font-bold">{formatRupiah(p.harga)}</p>
                      </div>
                      <div className="w-11 h-11 rounded-full bg-primary-black flex items-center justify-center text-white group-hover:bg-accent-gold group-hover:text-primary-black transition-all duration-500 group-hover:rotate-45">
                        <IconArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.3}>
            <p className="text-center text-xs text-gray-500 mt-10 italic font-serif">
              ✦ Menampilkan 6 properti unggulan · Hubungi kami untuk daftar lengkap ✦
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* AC-2.2 MENGAPA PRIME PROPERTY — Enterprise polish */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold/3 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 pattern-grid opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-20">
              <SectionLabel centered>Keunggulan Kami</SectionLabel>
              <h2 className="font-serif text-5xl md:text-6xl text-primary-black mt-4 mb-5 leading-[1.05]">
                Mengapa <span className="italic text-gradient-gold">Prime Property</span>
              </h2>
              <div className="gold-line mx-auto"></div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="stagger" stagger={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuePropositions.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.num} className="group relative bg-white rounded-3xl p-8 border border-gray-100 card-hover overflow-hidden">
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/0 to-accent-gold/0 group-hover:from-accent-gold/5 group-hover:to-transparent transition-all duration-700"></div>

                    {/* Big number */}
                    <span className="absolute -top-2 -right-2 font-serif text-7xl text-gray-100 group-hover:text-accent-gold/20 transition-colors duration-700">
                      {item.num}
                    </span>

                    <div className="relative">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-gold/15 to-accent-gold/5 border border-accent-gold/20 flex items-center justify-center text-accent-gold mb-6 group-hover:from-accent-gold group-hover:to-accent-gold-dark group-hover:border-transparent group-hover:text-primary-black group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="font-serif text-xl mb-3 text-primary-black">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>

                      {/* Hover bottom line */}
                      <div className="absolute -bottom-8 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-accent-gold to-transparent transition-all duration-700"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TRUST QUOTE — Enterprise testimonial style */}
      <section className="relative py-28 bg-primary-black overflow-hidden">
        <div className="absolute inset-0 pattern-architectural opacity-25"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal variant="fade">
            <svg className="w-12 h-12 text-accent-gold/40 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 21v-7c0-5.5 3.5-9.5 9-10.5l1 2c-2.5 1-4 3.5-4 6h4v10h-10zm-14 0v-7c0-5.5 3.5-9.5 9-10.5l1 2c-2.5 1-4 3.5-4 6h4v10H0z"/>
            </svg>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.2}>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight italic mb-10">
              &ldquo;Kami percaya setiap orang berhak mendapatkan
              <span className="text-gradient-gold"> properti terbaik </span>
              untuk masa depan mereka.&rdquo;
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.4}>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-accent-gold/40"></div>
              <div>
                <p className="text-accent-gold font-semibold text-sm">Tim Prime Property</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-0.5">Founder · Sejak 2014</p>
              </div>
              <div className="h-px w-12 bg-accent-gold/40"></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA SECTION — Premium closing */}
      <section className="relative py-28 bg-cream overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-gold/8 rounded-full blur-3xl"></div>

        {/* Decorative side lines */}
        <div className="absolute top-1/2 left-12 -translate-y-1/2 hidden lg:block">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent-gold to-transparent"></div>
        </div>
        <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent-gold to-transparent"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal variant="fade">
            <SectionLabel centered>Mari Bekerja Sama</SectionLabel>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.15}>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-black mt-6 mb-6 leading-[1.05]">
              Tertarik dengan<br />
              <span className="italic text-gradient-gold">Prime Property?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.3}>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Hubungi tim kami untuk informasi lebih lanjut, jadwal survei, atau konsultasi properti gratis tanpa komitmen.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={0.4}>
            <MagneticButton
              href="/kontak"
              strength={0.4}
              className="btn-gold inline-flex items-center gap-3 text-primary-black font-bold px-12 py-5 rounded-full shadow-2xl shadow-accent-gold/30 text-sm tracking-wider uppercase"
            >
              Hubungi Kami
              <IconArrowRight className="w-4 h-4" />
            </MagneticButton>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-gray-200 max-w-2xl mx-auto">
              <ContactItem
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                label="Telepon"
                value="+62 812-3456-7890"
                href="tel:+6281234567890"
              />
              <ContactItem
                icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
                label="WhatsApp"
                value="Chat Sekarang"
                href="https://wa.me/6281234567890"
                external
              />
              <ContactItem
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                label="Email"
                value="info@primeproperty.id"
                href="mailto:info@primeproperty.id"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-sm font-bold text-primary-black">{value}</p>
    </div>
  );
}

function ContactItem({ icon, label, value, href, external }: { icon: React.ReactNode; label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white transition-colors"
    >
      <div className="w-11 h-11 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-black group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">{label}</p>
      <p className="text-sm font-semibold text-primary-black group-hover:text-accent-gold-dark transition-colors">{value}</p>
    </a>
  );
}
