"use client";

import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const caseStudies = [
  {
    id: "perf-opt",
    title: "1. Service Performance & Memory Optimization",
    highlight: "Production Memory & Resource Profiling",
    problem: "A production backend service experienced excessive memory consumption and CPU contention under heavy traffic load.",
    work: "Investigated inefficient execution paths, conducted heap allocation profiling, refactored problematic routines, and isolated memory leaks in shared libraries.",
    result: "Significantly reduced memory usage and CPU overhead, restoring service stability and lowering infrastructure load.",
    tags: ["Go", "Profiling", "Memory Optimization", "Production Engineering"],
    metrics: "Memory Profiling"
  },
  {
    id: "payment-rel",
    title: "2. Payment System Reliability",
    highlight: "Fault-Tolerant Payment Architecture",
    problem: "Payment systems must handle unreliable third-party API dependencies, network drops, timeouts, and inconsistent downstream status responses.",
    work: "Engineered resilient payment retry mechanisms, created proof-of-concept circuit breakers, and implemented async queue workers using RabbitMQ and AWS SQS.",
    result: "Prevented stranded transactions, ensured deterministic payment retries, and stabilized core transaction flows.",
    tags: ["RabbitMQ", "AWS SQS", "Circuit Breakers", "Fintech", "Payment Flows"],
    metrics: "Fault-Tolerant Queue"
  },
  {
    id: "partner-platform",
    title: "3. Partner & Transaction Platform",
    highlight: "Revamping Core Production Subsystems",
    problem: "Existing partner module architecture lacked scalability for new digital product rollouts and deposit verification workflows.",
    work: "Refactored and revamped the core partner management, product catalog management, deposit management, and transaction ledger domains.",
    result: "Streamlined partner onboarding, verified deposit workflows, and created clean domain boundaries across transaction modules.",
    tags: ["Go", "PHP/Laravel", "Partner Management", "Transactions", "PostgreSQL"],
    metrics: "Core Domain Revamp"
  },
  {
    id: "vendor-integration",
    title: "4. Payment Operations & Vendor Integration",
    highlight: "Vendor API & Testing Infrastructure",
    problem: "Integrating multiple vendor APIs without standardized sandbox testing environments created integration bottlenecks across developer teams.",
    work: "Built vendor API integrations, isolated testing/production environments, authored tester documentation, conducted code reviews, and proposed alternative technical solutions.",
    result: "Accelerated vendor testing velocity, eliminated environment crosstalk, and improved cross-functional feedback loops.",
    tags: ["API Gateways", "System Design", "Documentation", "Testing Envs"],
    metrics: "Multi-Env Control Room"
  },
  {
    id: "financial-integrations",
    title: "5. Financial Integrations & Bank UATs",
    highlight: "Bank UATs & Microservice Design",
    problem: "Strict institutional compliance and technical standards required for integrating external banking APIs.",
    work: "Led technical system design, executed bank UAT certifications, implemented circuit-breaker POCs, conducted code reviews, and coordinated product feedback.",
    result: "Successfully passed institutional bank UAT audits and delivered compliant production financial integration microservices.",
    tags: ["Bank UATs", "Circuit Breaker", "gRPC", "Microservices", "Fintech"],
    metrics: "Bank UAT Passed"
  },
  {
    id: "mvp-leadership",
    title: "6. From MVP to Production",
    highlight: "MVP Execution & Technical Stability",
    problem: "Tight timelines for launching an educational fintech MVP while maintaining legacy application stability and meeting ISO certification requirements.",
    work: "Executed task planning, built core MVP components, troubleshot production defects, and contributed to technical ISO 22001 certification compliance.",
    result: "On-time MVP launch, stabilized legacy application, and fulfilled technical ISO compliance guidelines.",
    tags: ["MVP Development", "ISO 22001", "PHP/Laravel", "AWS"],
    metrics: "MVP Launch"
  }
];

export default function WhyChooseUs() {
  return (
    <section id="case-studies" className="section-padding bg-[var(--bg-secondary)] scroll-mt-20">
      <Container>
        <SectionHeader
          label="Case Studies"
          title={<>Selected <span className="gradient-text">Work</span></>}
          subtitle="Engineering challenges, system architecture decisions, and real production outcomes."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((item, i) => (
            <AnimatedDiv
              key={item.id}
              delay={i * 0.08}
              y={20}
              className="glass-card p-6 flex flex-col justify-between group hover:border-gold-500/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-gold-400 font-bold px-2 py-0.5 rounded bg-gold-500/10">
                    {item.metrics}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--text-primary)] mb-2 group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-gold-400/90 mb-4">{item.highlight}</p>
                <div className="space-y-2 text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
                  <div><strong className="text-[var(--text-primary)]">Problem:</strong> {item.problem}</div>
                  <div><strong className="text-[var(--text-primary)]">Solution:</strong> {item.work}</div>
                  <div><strong className="text-[var(--text-primary)]">Result:</strong> {item.result}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
                {item.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border)]">
                    {t}
                  </span>
                ))}
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}

