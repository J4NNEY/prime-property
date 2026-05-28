"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroAnimations({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Top ornament
      gsap.from(".hero-ornament", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      });

      // Headline split & stagger
      gsap.from(".hero-headline > *", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        delay: 0.2,
        ease: "power3.out",
      });

      // Description
      gsap.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.7,
        ease: "power2.out",
      });

      // CTA bounce in
      gsap.from(".hero-cta", {
        opacity: 0,
        scale: 0.8,
        duration: 0.7,
        delay: 0.9,
        ease: "back.out(1.7)",
      });

      // Trust indicator
      gsap.from(".hero-trust", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 1.2,
        ease: "power2.out",
      });

      // Floating cards intro
      gsap.from(".hero-float-card", {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 1,
        stagger: 0.2,
        delay: 1.4,
        ease: "power3.out",
      });

      // Frame lines draw in
      gsap.from(".hero-frame-line", {
        scaleX: 0,
        scaleY: 0,
        duration: 1.2,
        stagger: 0.05,
        delay: 0.5,
        ease: "power3.out",
        transformOrigin: "left top",
      });

      // Continuous floating
      gsap.to(".hero-float-card", {
        y: "+=10",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.5, from: "random" },
      });

      // Rings rotation
      gsap.to(".hero-ring", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Parallax background
      gsap.to(".hero-bg-image", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger after layout settles
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
