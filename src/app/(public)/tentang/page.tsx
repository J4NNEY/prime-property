import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { IconShield, IconStar, IconHandshake, IconLightning, IconEye, IconQuote } from "@/components/ui/Icons";

const values = [
  { num: "01", icon: IconShield, title: "Integritas", desc: "Kejujuran dan transparansi dalam setiap transaksi. Kami menjaga kepercayaan yang diberikan klien." },
  { num: "02", icon: IconStar, title: "Kualitas", desc: "Hanya properti terbaik yang kami rekomendasikan. Standar tinggi adalah komitmen kami." },
  { num: "03", icon: IconHandshake, title: "Kepercayaan", desc: "Hubungan jangka panjang dengan klien adalah prioritas utama. Kami tumbuh bersama Anda." },
];

export default function AboutPage() {
  return (
    <div>
      {/* HERO BANNER */}
      <section className="relative py-32 bg-primary-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=600&fit=crop"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/95 to-primary-black/70"></div>
        </div>
        <div className="absolute inset-0 pattern-architectural opacity-30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/8 rounded-full blur-3xl"></div>

        {/* Frame corners */}
        <div className="absolute top-12 left-12 hidden lg:block">
          <div className="w-12 h-px bg-accent-gold"></div>
          <div className="w-px h-12 bg-accent-gold"></div>
        </div>
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end">
          <div className="w-px h-12 bg-accent-gold"></div>
          <div className="w-12 h-px bg-accent-gold"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel centered>Tentang Kami</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mt-6 mb-5 leading-[1.05]">
            Prime <span className="italic text-gradient-gold">Property</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Mengenal lebih dekat partner investasi properti terpercaya Anda sejak 2014.
          </p>
          <div className="gold-line mx-auto mt-8"></div>
        </div>
      </section>

      {/* AC-3.1: Profil — Layout 2 kolom desktop */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-gold/3 rounded-full blur-3xl -translate-x-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal variant="slideRight">
              <div>
                <SectionLabel>Profil Perusahaan</SectionLabel>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-black mt-4 mb-8 leading-[1.05]">
                  Lebih dari Satu Dekade<br />
                  <span className="italic text-gradient-gold">Membangun Kepercayaan</span>
                </h2>
                <div className="gold-line mb-8"></div>
                <div className="space-y-5 text-gray-600 leading-relaxed text-base">
                  <p>
                    Prime Property adalah perusahaan properti yang berfokus pada penyediaan hunian dan ruang usaha berkualitas premium di lokasi-lokasi strategis. Dengan pengalaman lebih dari satu dekade, kami telah membantu ratusan keluarga dan pengusaha menemukan properti yang tepat.
                  </p>
                  <p>
                    Kami berkomitmen untuk memberikan layanan terbaik dengan transparansi data, harga kompetitif, dan pendampingan profesional dari awal hingga proses serah terima.
                  </p>
                </div>

                {/* Achievements list */}
                <div className="mt-10 space-y-3">
                  {[
                    "10+ tahun pengalaman di industri properti",
                    "300+ klien terlayani dengan tingkat kepuasan 98%",
                    "15+ kawasan strategis di Sumatera Utara",
                    "Tim profesional bersertifikasi",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slideLeft">
              <div className="relative">
                {/* Quote card */}
                <div className="relative bg-primary-black rounded-3xl p-10 gold-glow overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent-gold/10 rounded-full blur-2xl"></div>
                  <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-accent-gold/40 rounded-tr-3xl"></div>
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-accent-gold/40 rounded-bl-3xl"></div>

                  <div className="relative">
                    <IconQuote className="w-12 h-12 text-accent-gold/40 mb-6" />
                    <p className="font-serif text-2xl md:text-3xl text-white italic leading-tight mb-8">
                      Kami menjembatani <span className="text-gradient-gold">impian</span> dengan kenyataan.
                    </p>
                    <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-gold to-accent-gold-dark flex items-center justify-center">
                        <span className="text-primary-black font-bold text-sm">PP</span>
                      </div>
                      <div>
                        <p className="text-accent-gold font-semibold text-sm">Tim Prime Property</p>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mt-0.5">Sejak 2014</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stat */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100 hidden md:block">
                  <p className="font-serif text-4xl text-gradient-gold leading-none">10+</p>
                  <div className="gold-line-thin mt-2 mb-2"></div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Tahun Melayani</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* AC-3.1: Visi & Misi */}
      <section className="py-28 bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent"></div>
        <div className="absolute inset-0 pattern-grid opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <SectionLabel centered>Arah & Tujuan</SectionLabel>
              <h2 className="font-serif text-5xl md:text-6xl text-primary-black mt-4 mb-4 leading-[1.05]">
                Visi & <span className="italic text-gradient-gold">Misi</span>
              </h2>
              <div className="gold-line mx-auto"></div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="stagger" stagger={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Visi */}
              <div className="relative bg-primary-black rounded-3xl p-10 md:p-12 overflow-hidden card-hover">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent-gold/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold-dark flex items-center justify-center shadow-lg shadow-accent-gold/20">
                      <IconEye className="w-8 h-8 text-primary-black" />
                    </div>
                    <span className="font-serif text-7xl text-white/5 leading-none">01</span>
                  </div>
                  <h3 className="font-serif text-4xl text-accent-gold mb-2">Visi</h3>
                  <div className="gold-line mb-6"></div>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    Menjadi <span className="text-accent-gold-light font-medium">perusahaan properti terdepan</span> yang dikenal karena integritas, kualitas, dan inovasi dalam menyediakan solusi hunian dan investasi properti di Indonesia.
                  </p>
                </div>
              </div>

              {/* Misi */}
              <div className="relative bg-primary-black rounded-3xl p-10 md:p-12 overflow-hidden card-hover">
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent-gold/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold-dark flex items-center justify-center shadow-lg shadow-accent-gold/20">
                      <IconLightning className="w-8 h-8 text-primary-black" />
                    </div>
                    <span className="font-serif text-7xl text-white/5 leading-none">02</span>
                  </div>
                  <h3 className="font-serif text-4xl text-accent-gold mb-2">Misi</h3>
                  <div className="gold-line mb-6"></div>
                  <ul className="space-y-4">
                    {[
                      "Menyediakan properti berkualitas dengan harga transparan",
                      "Memberikan pelayanan profesional dan personal",
                      "Membangun kepercayaan melalui data yang akurat",
                      "Mendukung pertumbuhan ekonomi melalui investasi",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="mt-1 w-5 h-5 rounded bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AC-3.1: Nilai Perusahaan */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold/3 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <SectionLabel centered>Fondasi Kami</SectionLabel>
              <h2 className="font-serif text-5xl md:text-6xl text-primary-black mt-4 mb-4 leading-[1.05]">
                Nilai <span className="italic text-gradient-gold">Perusahaan</span>
              </h2>
              <div className="gold-line mx-auto"></div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="stagger" stagger={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.num} className="group relative bg-white rounded-3xl p-10 border border-gray-100 card-hover overflow-hidden text-center">
                    <span className="absolute -top-2 -right-2 font-serif text-7xl text-gray-100 group-hover:text-accent-gold/15 transition-colors duration-700">
                      {item.num}
                    </span>
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-gold/15 to-accent-gold/5 border border-accent-gold/20 flex items-center justify-center text-accent-gold group-hover:from-accent-gold group-hover:to-accent-gold-dark group-hover:border-transparent group-hover:text-primary-black group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-serif text-2xl mb-3 text-primary-black">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
