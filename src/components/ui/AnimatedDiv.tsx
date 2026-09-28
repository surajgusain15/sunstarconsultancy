"use client";

import { motion } from "framer-motion";

const isServer = typeof window === "undefined";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
  whileHover?: Record<string, number>;
}

export function AnimatedDiv({
  children,
  className,
  delay = 0,
  x = 0,
  y = 20,
  scale,
  whileHover,
}: AnimatedDivProps) {
  if (isServer) {
    return <div className={className}>{children}</div>;
  }

  const initial: Record<string, number> = { opacity: 0 };
  if (y) initial.y = y;
  if (x) initial.x = x;
  if (scale) initial.scale = scale;

  const animate: Record<string, number> = { opacity: 1, x: 0, y: 0 };
  if (scale) animate.scale = 1;

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={whileHover}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
}

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  if (isServer) {
    return (
      <div className="text-center mb-16">
        <span className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-4 block">
          {label}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <span className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-4 block">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
