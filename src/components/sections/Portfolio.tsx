import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const projects = [
  {
    title: "High-Scale API Gateway",
    category: "Go Development",
    description: "Designed and built a real-time API gateway handling 100k+ requests per second with sub-10ms latency.",
    metrics: [
      { label: "Latency Reduction", value: "94%" },
      { label: "Requests/sec", value: "100K+" },
      { label: "Cost Savings", value: "60%" },
    ],
    tags: ["Go", "gRPC", "Kubernetes", "Redis"],
  },
  {
    title: "Enterprise CMS Migration",
    category: "PHP Modernization",
    description: "Migrated a legacy PHP CMS to a modern Laravel architecture serving 2M+ monthly active users.",
    metrics: [
      { label: "Page Load Speed", value: "4x" },
      { label: "Monthly Users", value: "2M+" },
      { label: "Dev Velocity", value: "3x" },
    ],
    tags: ["PHP", "Laravel", "PostgreSQL", "AWS"],
  },
  {
    title: "Financial Backend Platform",
    category: "Backend Systems",
    description: "Built a secure, compliant transaction processing system handling $500M+ in monthly volume.",
    metrics: [
      { label: "Monthly Volume", value: "$500M+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Response Time", value: "<50ms" },
    ],
    tags: ["Go", "PostgreSQL", "Kubernetes", "gRPC"],
  },
  {
    title: "E-commerce Modernization",
    category: "Full Stack",
    description: "Modernized a monolithic e-commerce platform into a microservices architecture, improving scalability.",
    metrics: [
      { label: "Deploy Speed", value: "10x" },
      { label: "Infra Cost", value: "-45%" },
      { label: "Peak Traffic", value: "50K rpm" },
    ],
    tags: ["Go", "PHP", "Redis", "Docker"],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding bg-[var(--bg-secondary)] scroll-mt-20">
      <Container>
        <SectionHeader
          label="Case Studies"
          title={<>Results That <span className="gradient-text">Speak</span></>}
          subtitle="Real projects, real outcomes. Here is what we have delivered."
        />
        <div className="space-y-8">
          {projects.map((project, i) => (
            <AnimatedDiv key={project.title} delay={i * 0.1} y={30} whileHover={{ y: -3 }} className="glass-card overflow-hidden group">
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <span className="text-xs font-medium text-gold-400 uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl md:text-2xl font-heading font-bold mt-2 mb-3">{project.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 lg:min-w-[280px]">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-xl bg-[var(--bg-card)]">
                        <div className="text-lg md:text-xl font-heading font-bold gradient-text">{m.value}</div>
                        <div className="text-xs text-[var(--text-muted)] mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}
