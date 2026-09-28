"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";

const base = import.meta.env.BASE_URL;
const L = (path: string) => path ? `${base.replace(/\/$/, "")}${path}` : "";

const navLinks = [
  { label: "About", href: L("/#about") },
  { label: "Selected Work", href: L("/#case-studies") },
  { label: "What I Work With", href: L("/#skills") },
  { label: "Philosophy", href: L("/#philosophy") },
  { label: "Leadership", href: L("/#leadership-evidence") },
  { label: "Blog", href: L("/blog") },
  { label: "Contact", href: L("/#contact") },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-navy-900/10 dark:shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <a href={L("/")} className="flex flex-col group">
            <span className="text-lg md:text-xl font-heading font-bold tracking-tight leading-none">
              <span className="text-[var(--text-primary)]">SURAJ GUSAIN</span>
              <span className="text-gold-400">.</span>
            </span>
            <span className="text-[10px] tracking-widest text-gold-400 uppercase font-mono font-medium">
              SUNSTAR CONSULTANCY
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-xs lg:text-sm text-[var(--text-secondary)] hover:text-gold-400 transition-colors rounded-lg hover:bg-gold-500/5"
              >
                {link.label}
              </a>
            ))}
            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <Button href={L("/#contact")} variant="primary" className="text-xs px-4 py-2">
                Contact
              </Button>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[var(--text-primary)]"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-[var(--border)]">
          <div className="section-container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-[var(--text-secondary)] hover:text-gold-400 transition-colors rounded-lg hover:bg-gold-500/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <Button href={L("/#contact")} variant="primary" className="w-full">
                Contact
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

