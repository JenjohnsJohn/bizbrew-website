export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  slug: string;
  questions: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    name: 'General',
    slug: 'general',
    questions: [
      {
        question: 'What does BizBrew do?',
        answer: 'BizBrew is a software development company that builds custom software, SaaS products, web applications, mobile apps, and cloud API integrations. We also provide architecture consulting for teams planning new systems or modernizing existing ones. We work with startups launching their first product and established companies replacing legacy systems.',
      },
      {
        question: 'Where is BizBrew located?',
        answer: 'We are based in Germany and work with clients across Europe and North America. Most of our collaboration happens remotely with regular video calls, shared project boards, and asynchronous communication. For clients in Germany and neighboring countries, we are available for on-site workshops and discovery sessions.',
      },
      {
        question: 'How do I get started with a project?',
        answer: 'Start by reaching out through our contact form or emailing us directly. We will schedule a 30-minute discovery call to understand your goals, timeline, and budget range. From there, we typically propose a paid discovery phase — a focused 1-2 week engagement where we define requirements, design the architecture, and deliver a detailed project plan with fixed-price estimates for implementation.',
      },
      {
        question: 'What industries do you work with?',
        answer: 'We have delivered projects across property management, field services, logistics, e-commerce, fintech, healthcare, and education. Our expertise is in the technology — data-intensive applications, workflow automation, and system integration — rather than any single industry. The patterns we apply (multi-tenancy, offline-first, event-driven architecture) translate across domains.',
      },
      {
        question: 'How large is your team?',
        answer: 'We are a focused team of senior engineers — intentionally small so every project gets direct attention from experienced developers. For larger engagements, we scale with trusted contractors who have worked with us across multiple projects. You will always have a dedicated lead engineer who knows your codebase inside out.',
      },
    ],
  },
  {
    name: 'Process',
    slug: 'process',
    questions: [
      {
        question: 'What does a typical project timeline look like?',
        answer: 'Timelines vary by scope, but most projects follow this pattern: Discovery and architecture (1-2 weeks), MVP development (6-10 weeks), iteration and refinement (2-4 weeks), launch preparation and deployment (1 week). A focused MVP can ship in 8-12 weeks. Larger platforms with multiple user roles, integrations, and complex business logic typically take 4-6 months.',
      },
      {
        question: 'How do you handle communication during a project?',
        answer: 'We use a combination of synchronous and asynchronous communication. Weekly video standup calls keep everyone aligned on priorities and blockers. Day-to-day communication happens in a shared Slack channel or Microsoft Teams. You get access to our project board (Linear or Jira) to track progress in real-time. We send weekly written updates summarizing what was completed, what is in progress, and any decisions needed.',
      },
      {
        question: 'What happens during the discovery phase?',
        answer: 'Discovery is a paid engagement (typically 1-2 weeks) where we deeply understand your business problem before writing production code. Deliverables include: user journey maps, system architecture diagrams, database schema design, API specifications, technology recommendations with rationale, and a detailed project plan with milestones and estimates. Discovery de-risks the project by surfacing complexity early.',
      },
      {
        question: 'How do you handle change requests during development?',
        answer: 'Change is expected — we plan for it. We work in two-week sprints with clear priorities. Changes that fit within the current scope are incorporated in the next sprint. For significant scope changes, we assess the impact on timeline and budget, present options, and get your approval before proceeding. Our architecture-first approach means the codebase can absorb changes without requiring rewrites.',
      },
      {
        question: 'Do you provide ongoing support after launch?',
        answer: 'Yes. Most clients move to a monthly retainer for ongoing support, which typically includes bug fixes, minor feature enhancements, security updates, dependency maintenance, and monitoring. We offer different tiers based on response time requirements and expected monthly hours. We also provide documentation and knowledge transfer if you want to bring maintenance in-house.',
      },
    ],
  },
  {
    name: 'Technical',
    slug: 'technical',
    questions: [
      {
        question: 'What is your tech stack?',
        answer: 'Our core stack is React and TypeScript on the frontend, Node.js on the backend, and PostgreSQL for data storage. We use Docker for containerization, and deploy to AWS or Google Cloud depending on project requirements. For mobile apps, we use React Native for cross-platform development. We also work with Redis, RabbitMQ, GraphQL, and various third-party APIs. We choose tools based on the problem, not trends.',
      },
      {
        question: 'Can you work with our existing systems?',
        answer: 'Absolutely. Many of our projects involve integrating with or modernizing existing systems. We have built API adapters for legacy ERPs, migrated data from outdated databases, and wrapped old systems in modern interfaces. We evaluate your current architecture, identify integration points, and design solutions that extend your existing investment rather than replacing everything.',
      },
      {
        question: 'Who owns the source code?',
        answer: 'You do. All source code, documentation, designs, and intellectual property created during the project belong to you. We deliver everything in a Git repository that you control. We use open-source tools and standard patterns so you are never locked into our services. If you decide to bring development in-house or switch vendors, the codebase should be straightforward for any competent developer to pick up.',
      },
      {
        question: 'What are your security practices?',
        answer: 'Security is integrated throughout our development process. We follow OWASP Top 10 guidelines, implement authentication and authorization from day one, encrypt data at rest and in transit, validate all inputs, and apply the principle of least privilege. Every pull request goes through code review with security as a review criterion. We use automated security scanning in CI/CD pipelines and conduct periodic dependency audits.',
      },
      {
        question: 'How do you approach testing?',
        answer: 'We practice pragmatic testing — focused on catching real bugs rather than chasing coverage metrics. Unit tests cover business logic and data transformations. Integration tests verify API endpoints and database operations. End-to-end tests cover critical user flows (signup, payment, core workflows). We use automated testing in CI/CD so every commit is validated before it reaches production.',
      },
    ],
  },
  {
    name: 'Pricing',
    slug: 'pricing',
    questions: [
      {
        question: 'How does your pricing work?',
        answer: 'We offer two pricing models: fixed-price for well-defined projects, and time-and-materials for exploratory or evolving work. Most projects start with a fixed-price discovery phase, then move to either model for implementation based on how clearly requirements are defined. We provide detailed estimates with line-item breakdowns so you understand exactly what drives costs.',
      },
      {
        question: 'What is the difference between fixed-price and time-and-materials?',
        answer: 'Fixed-price works well when scope is clearly defined — you know what you want, and we commit to delivering it for a set price. Time-and-materials is better for projects with evolving requirements — you pay for actual hours worked, with transparency into how time is spent. Fixed-price gives budget certainty; time-and-materials gives flexibility. We will recommend the right model based on your situation.',
      },
      {
        question: 'Is there a minimum project size?',
        answer: 'Our minimum engagement is the discovery phase, which typically starts around a few thousand euros. For implementation projects, most engagements fall in the range where the scope justifies dedicated senior engineering time. We are not the right fit for quick landing page builds or simple WordPress sites — we specialize in custom software with real business logic.',
      },
      {
        question: 'What is included in your estimates?',
        answer: 'Our estimates include: architecture and system design, frontend and backend development, database design and implementation, API development and integration, testing (unit, integration, and key E2E flows), deployment and infrastructure setup, documentation, and two weeks of post-launch support. Design and UX are scoped separately if needed — we can work with your designer or recommend partners.',
      },
      {
        question: 'What are your payment terms?',
        answer: 'For fixed-price projects, we typically structure payments in three milestones: 30% at project kickoff, 40% at MVP delivery, and 30% at final delivery and launch. For time-and-materials work, we invoice monthly with detailed time logs. We accept bank transfer and standard business payment methods. Payment terms are net 14 days.',
      },
    ],
  },
];

export function getAllFAQs(): FAQItem[] {
  return faqCategories.flatMap((cat) => cat.questions);
}
