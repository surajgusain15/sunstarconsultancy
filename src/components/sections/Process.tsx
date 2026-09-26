import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const principles = [
  {
    num: "01",
    title: "Measure Before Optimizing",
    desc: "Always rely on empirical production profile data and metrics to isolate genuine bottlenecks before altering code."
  },
  {
    num: "02",
    title: "Reliability Matters First",
    desc: "Payment & transaction systems must gracefully handle third-party dependency outages, network drops, and timeouts."
  },
  {
    num: "03",
    title: "Fix Root Causes, Not Symptoms",
    desc: "Production incidents are opportunities to implement systemic architectural fixes rather than swallowing exceptions."
  },
  {
    num: "04",
    title: "Keep Architecture Practical",
    desc: "Introduce distributed complexity only when it solves a real problem; favor clean, maintainable microservice boundaries."
  },
  {
    num: "05",
    title: "Share Technical Context",
    desc: "Thorough code reviews, clear documentation, and proactive mentoring elevate the entire team beyond individual contributions."
  }
];

export default function Process() {
  return (
    <section id="philosophy" className="section-padding scroll-mt-20 bg-[var(--bg-primary)]">
      <Container>
        <SectionHeader
          label="Systems & Architecture"
          title={<>Systems I Build & <span className="gradient-text">Engineering Approach</span></>}
          subtitle="Conceptual system diagrams and core engineering principles for building reliable distributed software."
        />

        {/* Visual Diagrams Section (Step 14) */}
        <div className="mb-20 grid md:grid-cols-2 gap-8">
          {/* Payment Flow Diagram */}
          <AnimatedDiv delay={0.1} y={20} className="glass-card p-6 border-gold-500/20 bg-gold-500/5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading font-bold text-[var(--text-primary)] text-sm md:text-base">
                Payment Reliability Architecture
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-500/20 text-gold-400">
                Fault Tolerant
              </span>
            </div>
            <div className="font-mono text-xs text-[var(--text-secondary)] space-y-3 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border)] overflow-x-auto">
              <div className="flex items-center gap-2">
                <span className="text-gold-400">Client Request</span>
                <span>→</span>
                <span className="text-blue-400">API Gateway</span>
              </div>
              <div className="pl-4 border-l-2 border-gold-500/30 space-y-2">
                <div>↓ (Async Dispatch)</div>
                <div className="text-purple-400">Payment Queue (RabbitMQ / SQS)</div>
                <div>↓ (Worker Processing)</div>
                <div className="text-emerald-400">Vendor API Integration</div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
                <span className="text-amber-400">Circuit Breaker / Retry</span>
                <span>→</span>
                <span className="text-emerald-400">Transaction Status Sync</span>
              </div>
            </div>
          </AnimatedDiv>

          {/* Performance Optimization Flow Diagram */}
          <AnimatedDiv delay={0.2} y={20} className="glass-card p-6 border-gold-500/20 bg-gold-500/5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading font-bold text-[var(--text-primary)] text-sm md:text-base">
                Production Optimization Workflow
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Memory Profiling
              </span>
            </div>
            <div className="font-mono text-xs text-[var(--text-secondary)] space-y-3 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border)] overflow-x-auto">
              <div className="flex items-center gap-2">
                <span className="text-rose-400">Memory Pressure</span>
                <span>→</span>
                <span className="text-gold-400">Profiling & Heaps</span>
              </div>
              <div className="pl-4 border-l-2 border-emerald-500/30 space-y-2">
                <div>↓ (Root Cause Analysis)</div>
                <div className="text-cyan-400">Library Leak & Routine Refactor</div>
                <div>↓ (Validation & Benchmarking)</div>
                <div className="text-emerald-400">Staging Load Verification</div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
                <span className="text-emerald-400">Production Deploy</span>
                <span>→</span>
                <span className="text-emerald-300 font-bold">Optimized Allocation & CPU</span>
              </div>
            </div>
          </AnimatedDiv>
        </div>

        {/* Philosophy Principles */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-6 text-center">
            Core Engineering Philosophy
          </h3>
          {principles.map((item, i) => (
            <AnimatedDiv key={item.num} delay={i * 0.08} y={20} className="glass-card p-5 flex items-start gap-5 hover:border-gold-500/30 transition-colors">
              <span className="font-mono text-xl font-bold text-gold-400 shrink-0">{item.num}</span>
              <div>
                <h4 className="font-heading font-bold text-[var(--text-primary)] text-base mb-1">{item.title}</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}

