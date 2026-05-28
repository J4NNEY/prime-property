"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't render on touch devices
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });
    const xToF = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3.out" });
    const yToF = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3.out" });

    function handleMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
      xToF(e.clientX);
      yToF(e.clientY);
    }

    function handleEnter() {
      gsap.to(follower, { scale: 2, opacity: 0.3, duration: 0.3 });
    }
    function handleLeave() {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    }

    document.addEventListener("mousemove", handleMove);

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-accent-gold/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
