import Container from "@/components/layout/Container";

const base = import.meta.env.BASE_URL;
const L = (path: string) => path ? `${base.replace(/\/$/, "")}${path}` : "";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "About", href: L("/#about") },
      { label: "What I Work With", href: L("/#skills") },
      { label: "Selected Work", href: L("/#case-studies") },
      { label: "Philosophy", href: L("/#philosophy") },
      { label: "Leadership", href: L("/#leadership-evidence") },
    ],
  },
  {
    title: "Focus Areas",
    links: [
      { label: "Backend Systems", href: L("/#skills") },
      { label: "Fintech & Payments", href: L("/#case-studies") },
      { label: "Distributed Systems", href: L("/#philosophy") },
      { label: "Performance Tuning", href: L("/#case-studies") },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: L("/blog") },
      { label: "Download Resume", href: "/resume.pdf" },
      { label: "Contact", href: L("/#contact") },
    ],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/suraj-gusain-01037387/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  }
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <a href={L("/")} className="flex flex-col group">
                <span className="text-xl font-heading font-bold tracking-tight">
                  <span className="text-[var(--text-primary)]">SURAJ GUSAIN</span>
                  <span className="text-gold-400">.</span>
                </span>
                <span className="text-[10px] tracking-widest text-gold-400 uppercase font-mono font-medium mt-0.5">
                  SUNSTAR CONSULTANCY
                </span>
              </a>
              <p className="mt-3 text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
                Independent Software Consultancy by Suraj Gusain. Specializing in backend, fintech, payment, and distributed systems.
              </p>
            </div>
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-xs text-[var(--text-muted)] hover:text-gold-400 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="py-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Suraj Gusain • SUNSTAR CONSULTANCY. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                 className="text-[var(--text-muted)] hover:text-gold-400 transition-colors" aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

