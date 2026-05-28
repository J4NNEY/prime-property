"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!overlayRef.current) return;
    const el = overlayRef.current;

    el.style.display = "block";

    gsap.fromTo(
      el,
      { scaleY: 1, transformOrigin: "top" },
      {
        scaleY: 0,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          el.style.display = "none";
        },
      }
    );
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-primary-black z-[9999] origin-top pointer-events-none"
    >
      <div className="h-full flex items-center justify-center">
        <div className="text-2xl font-bold tracking-[0.3em] text-accent-gold animate-pulse">PRIME PROPERTY</div>
      </div>
    </div>
  );
}
