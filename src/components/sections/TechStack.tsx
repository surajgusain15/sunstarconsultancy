import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const skillCategories = [
  {
    title: "Backend",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    items: ["Golang", "PHP", "Laravel", "Node.js", "Symfony", "Yii"],
  },
  {
    title: "Distributed Systems",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    items: ["RabbitMQ", "SQS", "SNS", "gRPC", "Microservices"],
  },
  {
    title: "Databases",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8-4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    items: ["MySQL", "PostgreSQL", "DynamoDB"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    items: ["AWS RDS", "S3", "EC2", "Lambda", "API Gateway"],
  },
  {
    title: "Frontend",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    items: ["React", "Next.js"],
  },
  {
    title: "Tools & Testing",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
    items: ["Git", "GitLab", "SVN", "Docker", "Postman", "Robot Framework"],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="section-padding bg-[var(--bg-secondary)] scroll-mt-20">
      <Container>
        <SectionHeader
          label="Technical Capabilities"
          title={<>What I <span className="gradient-text">Work With</span></>}
          subtitle="Battle-tested production technologies categorized by engineering purpose."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <AnimatedDiv key={category.title} delay={i * 0.08} y={20}
              className="glass-card p-6 group hover:border-gold-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-gold-400 group-hover:scale-110 transition-transform duration-500">{category.icon}</div>
                <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)]">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="text-xs font-mono font-medium px-3 py-1.5 rounded-md bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border)] group-hover:border-gold-500/20 transition-colors">
                    {item}
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

