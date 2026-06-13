"use client";

import { motion } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

const base = import.meta.env.BASE_URL;
const L = (path: string) => `${base.replace(/\/$/, "")}${path}`;

const floatingIcons = [
  { icon: "</>", x: "15%", y: "20%", delay: 0 },
  { icon: "{ }", x: "85%", y: "25%", delay: 1 },
  { icon: "->", x: "10%", y: "70%", delay: 2 },
  { icon: "=>", x: "80%", y: "75%", delay: 0.5 },
  { icon: "/* */", x: "90%", y: "45%", delay: 1.5 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)]">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/60 via-transparent to-[var(--bg-primary)]/90" />

      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-gold-500/10 dark:text-gold-500/15 font-heading font-bold text-3xl md:text-5xl pointer-events-none"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/3 blur-3xl pointer-events-none" />

      <Container className="relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-gold-400 tracking-wider uppercase">Trusted by Startups & Enterprises</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-[var(--text-primary)]">Building Reliable </span><br />
            <span className="gradient-text">Software That Scales</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Specialized in Go and PHP application development, backend systems, software modernization and long-term engineering support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href={L("/#contact")} variant="primary" className="text-base px-8 py-4">
              Book Consultation
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button href={L("/#services")} variant="outline" className="text-base px-8 py-4">View Services</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {["99.9% Uptime", "50+ Projects", "10+ Engineers", "Global Clients"].map((stat) => (
              <div key={stat} className="text-center">
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{stat}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </section>
  );
}
