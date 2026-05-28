interface Props {
  children: React.ReactNode;
  light?: boolean;
  centered?: boolean;
}

export default function SectionLabel({ children, light = false, centered = false }: Props) {
  return (
    <div className={`inline-flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <div className={`h-px w-10 ${light ? "bg-accent-gold" : "bg-accent-gold"}`}></div>
      <span className="text-accent-gold text-[11px] font-semibold uppercase tracking-[0.4em]">
        {children}
      </span>
      <div className={`h-px w-10 ${light ? "bg-accent-gold" : "bg-accent-gold"}`}></div>
    </div>
  );
}
