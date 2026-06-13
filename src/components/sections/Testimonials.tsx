import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const testimonials = [
  {
    quote: "SUNSTAR transformed our backend infrastructure. Their Go expertise is world-class — we saw a 10x improvement in API response times within the first month.",
    name: "Alex Chen", role: "CTO", company: "TechScale Inc.", initials: "AC",
  },
  {
    quote: "They modernized our legacy PHP platform without a single downtime event. Professional, communicative, and technically exceptional.",
    name: "Sarah Mitchell", role: "VP of Engineering", company: "DataFlow Systems", initials: "SM",
  },
  {
    quote: "The microservices architecture SUNSTAR designed for us handles millions of requests daily. Their attention to code quality and testing is remarkable.",
    name: "James Okonkwo", role: "Founder & CEO", company: "PayBridge Technologies", initials: "JO",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding">
      <Container>
        <SectionHeader
          label="Testimonials"
          title={<>Trusted by <span className="gradient-text">Industry Leaders</span></>}
        />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedDiv key={t.name} delay={i * 0.1} y={30} whileHover={{ scale: 1.02 }} className="glass-card p-6 md:p-8 flex flex-col">
              <div className="mb-6">{Array.from({ length: 5 }).map((_, s) => (<span key={s} className="text-gold-400 text-lg">★</span>))}</div>
              <blockquote className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-heading font-bold text-sm">{t.initials}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{t.role}, {t.company}</div>
                </div>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}
