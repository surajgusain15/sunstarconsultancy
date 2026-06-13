import { AnimatedDiv, SectionHeader } from "@/components/ui/AnimatedDiv";
import Container from "@/components/layout/Container";

const services = [
  {
    title: "Go Development",
    description: "High-performance systems built for scale.",
    features: ["Microservices", "High performance APIs", "Concurrent systems", "Cloud-native applications"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    title: "PHP Development",
    description: "Robust web applications, enterprise-ready.",
    features: ["Laravel applications", "CMS systems", "Enterprise software", "API integrations"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Software Maintenance",
    description: "Keep your systems healthy and modern.",
    features: ["Legacy modernization", "Performance tuning", "Bug fixing", "Security updates"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1 2.51 2.51-5.1m0 0l-2.25-2.25a3.75 3.75 0 115.3-5.3l2.25 2.25m-5.3 5.3l5.1-2.51-2.51 5.1m2.25-2.25a3.75 3.75 0 115.3 5.3l-2.25 2.25m-5.3-5.3l5.1 2.51-2.51-5.1" />
      </svg>
    ),
  },
  {
    title: "Consulting",
    description: "Expert guidance for critical decisions.",
    features: ["Architecture reviews", "System design", "Scalability planning", "Tech strategy"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "DevOps",
    description: "Streamlined deployment and operations.",
    features: ["Dockerization", "Kubernetes orchestration", "CI/CD pipelines", "Infrastructure as code"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding scroll-mt-20">
      <Container>
        <SectionHeader
          label="What We Do"
          title={<>Engineering Excellence, <span className="gradient-text">Delivered</span></>}
          subtitle="From greenfield development to legacy modernization, we deliver production-ready software."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedDiv key={service.title} delay={i * 0.1} y={30} whileHover={{ y: -5 }} className="glass-card p-8 group cursor-default">
              <div className="text-gold-400 mb-5 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
              <h3 className="text-xl font-heading font-semibold mb-3">{service.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                    <svg className="w-4 h-4 text-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
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
