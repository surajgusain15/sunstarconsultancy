import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const leadershipPillars = [
  {
    role: "Lead",
    title: "Technical Team Leadership",
    description: "Hands-on team leadership, sprint planning, and breaking down complex specs into actionable engineering tasks.",
    badge: "Leadership & Execution"
  },
  {
    role: "Design",
    title: "System & Architecture Design",
    description: "Architecting resilient microservices, high-throughput payment pipelines, and scalable database schemas.",
    badge: "Distributed Systems"
  },
  {
    role: "Review",
    title: "Code Reviews & Standards",
    description: "Enforcing strict code quality, security patterns, test coverage, and clear technical documentation.",
    badge: "Quality Engineering"
  },
  {
    role: "Mentor",
    title: "Developer & Tester Mentoring",
    description: "Guiding junior engineers, conducting technical onboarding, and assisting QA with automated testing strategies.",
    badge: "Team Growth"
  },
  {
    role: "Operate",
    title: "Production Troubleshooting",
    description: "Rapid incident response, live debugging, memory leak analysis, and high-availability operational support.",
    badge: "Production Engineering"
  },
  {
    role: "Improve",
    title: "Performance & Reliability",
    description: "Optimizing service memory allocations, reducing CPU overhead, and building circuit-breaker POCs.",
    badge: "Optimization"
  },
];

export default function Services() {
  return (
    <section id="about" className="section-padding scroll-mt-20 bg-[var(--bg-primary)]">
      <Container>
        <SectionHeader
          label="Engineering Narrative & Advisory"
          title={<>Software Consultant & <span className="gradient-text">Systems Engineer</span></>}
          subtitle="8+ years of production experience building, optimizing, and operating critical fintech and payment systems."
        />

        {/* Narrative Box */}
        <AnimatedDiv delay={0.1} y={20} className="glass-card p-8 md:p-10 mb-16 border-gold-500/20 bg-gold-500/5">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)] mb-4">
            Production Engineering & Technical Advisory
          </h3>
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-6">
            As an independent <strong className="text-[var(--text-primary)]">Software Consultant</strong>, I specialize in architecting backend microservices, optimizing payment processing reliability, and tackling complex production bottlenecks. Over 8+ years of engineering experience, I design fault-tolerant event-driven workflows, profile service memory leaks, and streamline transaction systems.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Golang", "PHP / Laravel", "Node.js", "AWS", "Microservices", "Fintech & Payments", "RabbitMQ", "Production Troubleshooting"].map((item) => (
              <span key={item} className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-gold-400 border border-gold-500/20">
                {item}
              </span>
            ))}
          </div>
        </AnimatedDiv>

        {/* Leadership Grid */}
        <div id="leadership" className="scroll-mt-20">
          <h3 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-8 text-center md:text-left">
            Hands-on Technical Leadership
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipPillars.map((pillar, i) => (
              <AnimatedDiv key={pillar.role} delay={i * 0.08} y={20} className="glass-card p-6 group hover:border-gold-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold px-2.5 py-1 rounded bg-gold-500/10">
                    {pillar.role}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">{pillar.badge}</span>
                </div>
                <h4 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-2">{pillar.title}</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{pillar.description}</p>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

