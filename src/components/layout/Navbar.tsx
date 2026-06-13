"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "Process", href: "/#process" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl font-heading font-bold tracking-tight">
              <span className="text-[var(--text-primary)]">SUNSTAR</span>
              <span className="text-gold-400">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-gold-400 transition-colors rounded-lg hover:bg-gold-500/5"
              >
                {link.label}
              </a>
            ))}
            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <Button href="/#contact" variant="primary">
                Book Consultation
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
              <Button href="/#contact" variant="primary" className="w-full">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
