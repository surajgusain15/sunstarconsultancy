import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding your vision, goals, and technical landscape." },
  { num: "02", title: "Planning", desc: "Architecture design, tech stack decisions, and roadmap creation." },
  { num: "03", title: "Design", desc: "System architecture, API contracts, and database schemas." },
  { num: "04", title: "Development", desc: "Agile sprints with continuous integration and code reviews." },
  { num: "05", title: "Testing", desc: "Automated tests, load testing, and security audits." },
  { num: "06", title: "Deployment", desc: "CI/CD pipeline, infrastructure provisioning, and monitoring." },
  { num: "07", title: "Maintenance", desc: "Ongoing support, monitoring, and continuous improvement." },
];

export default function Process() {
  return (
    <section id="process" className="section-padding scroll-mt-20">
      <Container>
        <SectionHeader
          label="Our Process"
          title={<>From Idea to <span className="gradient-text">Production</span></>}
          subtitle="A proven development methodology that delivers predictable, high-quality results."
        />
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/40 via-gold-500/20 to-transparent md:-translate-x-px hidden md:block" />
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => (
              <AnimatedDiv key={step.num} delay={i * 0.1} x={i % 2 === 0 ? -30 : 30} y={0}
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="hidden md:flex w-1/2 justify-end pr-8">
                  {i % 2 === 0 && (
                    <div className="text-right">
                      <span className="text-gold-400/40 font-heading font-bold text-5xl leading-none">{step.num}</span>
                    </div>
                  )}
                </div>
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-navy-800 dark:bg-navy-800 border-2 border-gold-500/40 flex items-center justify-center text-gold-400 font-heading font-bold text-sm shadow-lg shadow-gold-500/10">{step.num}</div>
                </div>
                <div className="flex-1 min-w-0 md:w-1/2 md:pl-8">
                  {i % 2 !== 0 && (
                    <span className="text-gold-400/40 font-heading font-bold text-5xl leading-none hidden md:block">{step.num}</span>
                  )}
                  <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 mt-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
