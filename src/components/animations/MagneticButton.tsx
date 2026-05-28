"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ href, children, className = "", strength = 0.3 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function handleMouseMove(e: MouseEvent) {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    function handleMouseLeave() {
      if (!element) return;
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    }

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <Link href={href} ref={ref} className={`inline-block ${className}`}>
      {children}
    </Link>
  );
}
