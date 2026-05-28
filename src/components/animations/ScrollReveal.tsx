"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "stagger";
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "slideUp",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  trigger,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const targets: Element[] | Element = trigger
      ? Array.from(el.querySelectorAll(trigger))
      : variant === "stagger" && el.children.length > 0
      ? Array.from(el.children)
      : el;

    const targetsArray = Array.isArray(targets) ? targets : [targets];
    if (targetsArray.length === 0) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    switch (variant) {
      case "slideUp": fromVars.y = 50; break;
      case "slideLeft": fromVars.x = 50; break;
      case "slideRight": fromVars.x = -50; break;
      case "scale": fromVars.scale = 0.85; break;
      case "stagger": fromVars.y = 40; break;
    }

    // Set initial state immediately to avoid flash
    gsap.set(targets, fromVars);

    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      stagger: variant === "stagger" || trigger ? stagger : 0,
      ease: "power3.out",
    };

    let animation: gsap.core.Tween;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    if (isVisible) {
      // Element already in view — animate immediately
      animation = gsap.to(targets, toVars);
    } else {
      // Use ScrollTrigger for elements below the fold
      animation = gsap.to(targets, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      scrollTriggerInstance = ScrollTrigger.getById(el.id) || null;
    }

    // Refresh ScrollTrigger after layout settles
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(refreshTimer);
      animation.kill();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      // Reset element to visible state on unmount to prevent stuck-invisible elements
      gsap.set(targets, { clearProps: "all" });
    };
  }, [variant, delay, duration, stagger, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
