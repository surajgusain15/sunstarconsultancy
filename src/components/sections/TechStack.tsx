import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const techCategories = [
  {
    title: "Backend",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    items: ["Golang", "PHP", "Laravel", "REST APIs", "gRPC", "GraphQL"],
  },
  {
    title: "Databases",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    items: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Infrastructure",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    items: ["Docker", "Kubernetes", "AWS", "GCP"],
  },
  {
    title: "DevOps",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    items: ["CI/CD", "Monitoring", "Observability"],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="section-padding bg-[var(--bg-secondary)] scroll-mt-20">
      <Container>
        <SectionHeader
          label="Technology Stack"
          title={<>Trusted Tools, <span className="gradient-text">Modern Stack</span></>}
          subtitle="We leverage battle-tested technologies to build systems that perform under pressure."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, i) => (
            <AnimatedDiv key={category.title} delay={i * 0.1} y={20}
              className="glass-card p-6 group hover:border-gold-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold-500/5">
              <div className="text-gold-400 mb-4 group-hover:scale-110 transition-transform duration-500">{category.icon}</div>
              <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60" />{item}
                  </li>
                ))}
              </ul>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}
