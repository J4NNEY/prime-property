"use client";

interface Props {
  items: string[];
  className?: string;
}

export default function Marquee({ items, className = "" }: Props) {
  // Duplicate items so seamless loop
  const duplicated = [...items, ...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="mx-12 text-3xl md:text-4xl font-serif italic text-white/15 hover:text-accent-gold/60 transition-colors flex items-center gap-12"
          >
            {item}
            <span className="text-accent-gold/30">✦</span>
          </span>
        ))}
      </div>
      {/* Side fade */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary-black to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary-black to-transparent pointer-events-none"></div>
    </div>
  );
}
