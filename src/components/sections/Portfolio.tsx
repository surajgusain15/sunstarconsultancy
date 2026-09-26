import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const leadershipCapabilities = [
  {
    title: "Technical Design",
    description: "System design, microservice boundary definition, and architectural planning for high-throughput backend services.",
    badge: "Architecture"
  },
  {
    title: "Code Reviews",
    description: "Reviewing implementation quality, enforcing security & performance standards, and setting engineering guidelines.",
    badge: "Quality Control"
  },
  {
    title: "Mentoring",
    description: "Helping junior developers and QA testers understand complex system behavior and solve non-trivial bugs.",
    badge: "Mentorship"
  },
  {
    title: "Troubleshooting",
    description: "Hands-on production investigation, memory profiling, live incident response, and operational support.",
    badge: "Operations"
  },
  {
    title: "Cross-Team Coordination",
    description: "Collaborating with product management, external bank integration teams, and vendors on technical decisions.",
    badge: "Alignment"
  },
  {
    title: "Technical Execution & Delivery",
    description: "Guiding project task planning, establishing code quality standards, refactoring legacy platforms, and supporting technical compliance.",
    badge: "Execution"
  }
];

export default function Portfolio() {
  return (
    <section id="leadership-evidence" className="section-padding bg-[var(--bg-secondary)] scroll-mt-20">
      <Container>
        <SectionHeader
          label="Technical Leadership"
          title={<>Beyond <span className="gradient-text">Writing Code</span></>}
          subtitle="How I drive technical alignment, mentor engineering teams, and maintain production standards."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {leadershipCapabilities.map((item, i) => (
            <AnimatedDiv
              key={item.title}
              delay={i * 0.08}
              y={20}
              className="glass-card p-6 flex flex-col justify-between group hover:border-gold-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400 px-2 py-0.5 rounded bg-gold-500/10">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--text-primary)] mb-2 group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}


