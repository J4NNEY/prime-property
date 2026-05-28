"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Refreshes GSAP ScrollTrigger on every route change.
 * This fixes elements not appearing when navigating between pages
 * because ScrollTrigger calculates positions before the new layout is ready.
 */
export default function ScrollTriggerRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on navigation (Next.js sometimes preserves scroll)
    window.scrollTo(0, 0);

    // Kill any lingering ScrollTrigger instances from previous page
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Allow new page's components to mount, then refresh
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => ScrollTrigger.refresh(), 100));
    timers.push(setTimeout(() => ScrollTrigger.refresh(), 400));
    timers.push(setTimeout(() => ScrollTrigger.refresh(), 800));

    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
}
