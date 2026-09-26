"use client";

import { motion } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

const base = import.meta.env.BASE_URL;
const L = (path: string) => path ? `${base.replace(/\/$/, "")}${path}` : "";

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
              <span className="text-xs md:text-sm font-semibold text-gold-400 tracking-wider uppercase">Software Consultant</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-[var(--text-primary)]">Building backend systems </span><br />
            <span className="gradient-text">that survive production.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            8+ years of experience building fintech, payment, distributed, and backend systems across Go, PHP/Laravel, Node.js, AWS, MySQL, RabbitMQ, and microservices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href={L("/#contact")} variant="primary" className="text-base px-8 py-4">
              Get In Touch
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button href={L("/#case-studies")} variant="outline" className="text-base px-8 py-4">
              View Case Studies
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm"
          >
            <div className="text-center p-3 border-r border-[var(--border)] last:border-0">
              <div className="text-2xl md:text-3xl font-bold font-heading text-gold-400">8+ Years</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Engineering Experience</div>
            </div>

            <div className="text-center p-3 border-r border-[var(--border)] last:border-0">
              <div className="text-2xl md:text-3xl font-bold font-heading text-[var(--text-primary)]">Go & PHP</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Core Stack</div>
            </div>

            <div className="text-center p-3 border-r border-[var(--border)] last:border-0">
              <div className="text-2xl md:text-3xl font-bold font-heading text-[var(--text-primary)]">Fintech</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Payment Systems</div>
            </div>

            <div className="text-center p-3">
              <div className="text-2xl md:text-3xl font-bold font-heading text-[var(--text-primary)]">Backend</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Distributed Systems</div>
            </div>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </section>
  );
}

