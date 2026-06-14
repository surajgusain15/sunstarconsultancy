export const SITE_URL = "https://sunstarconsultancy.in";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SUNSTAR CONSULTANCY",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Specialized in Go and PHP application development, backend systems, software modernization and long-term engineering support.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "suraj@sunstarconsultancy.in",
  },
  sameAs: [
    "https://github.com/sunstarconsultancy",
    "https://linkedin.com/company/sunstarconsultancy",
  ],
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development",
  provider: { "@type": "Organization", name: "SUNSTAR CONSULTANCY" },
  areaServed: "Worldwide",
  description:
    "Go and PHP development, microservices, cloud-native applications, software modernization.",
};
