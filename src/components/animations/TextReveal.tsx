"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}

export default function TextReveal({ children, className = "", as = "h2", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Split text into words wrapped in spans
    const words = children.split(" ");
    ref.current.innerHTML = words
      .map((w) => `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block word-inner">${w}</span></span>`)
      .join(" ");

    const inners = ref.current.querySelectorAll(".word-inner");

    const animation = gsap.from(inners, {
      yPercent: 110,
      duration: 0.9,
      stagger: 0.06,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
    };
  }, [children, delay]);

  const Tag = as as React.ElementType;
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
