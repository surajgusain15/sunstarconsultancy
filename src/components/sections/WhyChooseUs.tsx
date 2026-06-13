"use client";

import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 99.9, suffix: "%", label: "Uptime Guaranteed", decimals: 1 },
  { value: 50, suffix: "+", label: "Projects Delivered", decimals: 0 },
  { value: 10, suffix: "+", label: "Senior Engineers", decimals: 0 },
  { value: 3, suffix: "x", prefix: "Up to ", label: "Performance Gains", decimals: 0 },
];

const values = [
  {
    title: "High Performance Architecture",
    desc: "Systems engineered for speed, built for scale from day one.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>),
  },
  {
    title: "Scalable Systems",
    desc: "Architectures that grow seamlessly with your business.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" /></svg>),
  },
  {
    title: "Secure Development",
    desc: "Security-first mindset embedded throughout our process.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>),
  },
  {
    title: "Long-Term Support",
    desc: "We don't just build — we maintain and evolve your software.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>),
  },
  {
    title: "Clean Maintainable Code",
    desc: "Code quality is not optional — it's the foundation of velocity.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
  },
  {
    title: "Transparent Communication",
    desc: "No black boxes. You always know exactly where things stand.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>),
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding bg-[var(--bg-secondary)] scroll-mt-20">
      <Container>
        <SectionHeader label="Why SUNSTAR" title={<>Built Different. <span className="gradient-text">Built Better.</span></>} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <AnimatedDiv key={stat.label} scale={0.9} y={0} className="glass-card p-6 text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} decimals={stat.decimals} />
              </div>
              <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
            </AnimatedDiv>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <AnimatedDiv key={v.title} delay={i * 0.05} y={20}
              className="glass-card p-6 flex gap-4 group hover:border-gold-500/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0 group-hover:bg-gold-500/20 transition-colors">{v.icon}</div>
              <div>
                <h3 className="font-heading font-semibold text-base mb-1">{v.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{v.desc}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}
