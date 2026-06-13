"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
    });
    return unsubscribe;
  }, [spring, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
