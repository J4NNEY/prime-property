"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ end, suffix = "", duration = 2, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Set initial value
    el.textContent = `0${suffix}`;

    const obj = { val: 0 };

    function runAnimation() {
      gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (el) el.textContent = Math.floor(obj.val).toString() + suffix;
        },
        onComplete: () => {
          if (el) el.textContent = end.toString() + suffix;
        },
      });
    }

    // Check if already in view
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

    let trigger: ScrollTrigger | null = null;

    if (isVisible) {
      runAnimation();
    } else {
      trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: runAnimation,
      });
    }

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(refreshTimer);
      if (trigger) trigger.kill();
      gsap.killTweensOf(obj);
    };
  }, [end, suffix, duration]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
