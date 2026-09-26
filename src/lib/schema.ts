export const SITE_URL = "https://sunstarconsultancy.in";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SUNSTAR CONSULTANCY",
  url: SITE_URL,
  founder: {
    "@type": "Person",
    name: "Suraj Gusain"
  }
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Suraj Gusain",
  jobTitle: "Software Consultant",
  worksFor: {
    "@type": "Organization",
    name: "SUNSTAR CONSULTANCY",
    url: SITE_URL
  },
  url: SITE_URL,
  description:
    "Software Consultant at SUNSTAR CONSULTANCY with 8+ years of experience building fintech, payment, distributed, and backend systems.",
  knowsAbout: [
    "Golang",
    "PHP",
    "Laravel",
    "Node.js",
    "Fintech Systems",
    "Payment Systems",
    "Distributed Systems",
    "Microservices",
    "AWS",
    "MySQL",
    "PostgreSQL",
    "RabbitMQ"
  ],
  sameAs: [
    "https://github.com/surajgusain",
    "https://www.linkedin.com/in/suraj-gusain-01037387/"
  ]
};

