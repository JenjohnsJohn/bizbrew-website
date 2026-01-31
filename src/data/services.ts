export interface ServiceConfig {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  image: string;
  highlights: string[];
  benefits: { title: string; description: string }[];
  useCases?: string[];
  process?: { step: number; title: string; description: string }[];
  technologies?: string[];
  ctaText: string;
}

export const services: ServiceConfig[] = [
  {
    id: 'custom-software',
    slug: 'custom-software',
    title: 'Custom Software',
    tagline: 'Built for your workflows, made to last.',
    description: 'Web apps, internal tools, and API platforms designed around how your team actually works. We skip the generic templates and build solutions that fit your processes, integrate with your stack, and scale with your business.',
    longDescription: 'Off-the-shelf software often forces you to change how you work. Custom software does the opposite—it adapts to you. We partner with teams who have outgrown spreadsheets, manual processes, or patchwork integrations. Whether you need an internal portal to streamline operations, a data pipeline that speaks to your legacy systems, or an API that connects your product to the rest of your stack, we design and build solutions that fit. Every line of code we write serves your business, and you own it all.',
    image: '/custom_rosetta.jpg',
    highlights: [
      'Workflow automation and internal tools',
      'API platforms and integrations',
      'Data dashboards and reporting',
      'Legacy system modernization',
    ],
    benefits: [
      { title: 'Purpose-built', description: 'Every feature serves your actual workflows, not a one-size-fits-all approach.' },
      { title: 'Own your stack', description: 'Full source ownership. No vendor lock-in, no surprise licensing.' },
      { title: 'Integrates everywhere', description: 'Works with your existing tools—CRM, accounting, inventory, whatever you use.' },
    ],
    useCases: [
      'Operations teams drowning in manual data entry and spreadsheets',
      'Product teams needing APIs to connect with partners or internal systems',
      'Leadership wanting dashboards that surface the right metrics in real time',
      'Companies with legacy systems that need a modern interface or bridge',
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'We map your workflows, pain points, and technical constraints so we build the right thing.' },
      { step: 2, title: 'Architecture', description: 'We design the system—data model, integrations, and tech stack—before writing code.' },
      { step: 3, title: 'Build & iterate', description: 'We develop in phases, shipping working software early and refining based on your feedback.' },
      { step: 4, title: 'Handoff', description: 'You get full source code, documentation, and support so your team can own it going forward.' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Python', 'REST & GraphQL APIs'],
    ctaText: 'Discuss your custom software needs',
  },
  {
    id: 'saas-products',
    slug: 'saas-products',
    title: 'SaaS Products',
    tagline: 'From idea to production, built to scale.',
    description: 'Multi-tenant systems, billing, roles, and admin dashboards—the full SaaS stack. We help product teams go from concept to paying customers with infrastructure that scales and architecture that won\'t hold you back.',
    longDescription: 'Building a SaaS product means more than building a web app. You need multi-tenant architecture, subscription billing, role-based access, admin tooling, and onboarding flows—all before you can charge a dime. We\'ve built these foundations dozens of times and know the traps: billing edge cases, scaling bottlenecks, and security gotchas. We get the infrastructure right so you can focus on the features that differentiate you. From MVP to Series A and beyond, we build SaaS that grows with you.',
    image: '/saas_prepare.jpg',
    highlights: [
      'Multi-tenant architecture',
      'Subscription billing & plans',
      'Role-based access control',
      'Admin dashboards & analytics',
    ],
    benefits: [
      { title: 'Launch faster', description: 'Proven patterns for auth, billing, and onboarding—so you can focus on your product.' },
      { title: 'Scale from day one', description: 'Architecture built for growth. No painful rewrites when you hit 10k users.' },
      { title: 'Monetization-ready', description: 'Plans, trials, usage-based billing—we set up the revenue engine.' },
    ],
    useCases: [
      'Startups ready to move from prototype to paying customers',
      'Teams adding a SaaS layer to an existing product or service',
      'B2B products needing org-level accounts, seats, and permissions',
      'Products requiring usage-based or hybrid billing models',
    ],
    process: [
      { step: 1, title: 'Product & monetization', description: 'We align on plans, pricing, and the core user journey before touching code.' },
      { step: 2, title: 'Architecture', description: 'We design multi-tenancy, auth, billing, and data isolation from day one.' },
      { step: 3, title: 'Build core', description: 'We ship the subscription engine, onboarding, and admin tools first.' },
      { step: 4, title: 'Scale & iterate', description: 'We add features, optimize performance, and prepare you for growth.' },
    ],
    technologies: ['Stripe', 'React', 'Node.js', 'PostgreSQL', 'Redis'],
    ctaText: 'Explore your SaaS idea',
  },
  {
    id: 'web-applications',
    slug: 'web-applications',
    title: 'Web Applications',
    tagline: 'Fast, responsive, and built for real users.',
    description: 'Modern web apps that feel instant and work everywhere. From customer-facing portals to complex dashboards, we build with performance, accessibility, and maintainability in mind—so your app stays fast as it grows.',
    longDescription: 'A web app is often the first—or only—touchpoint between your product and your users. We build web applications that load fast, work on any device, and feel delightful to use. Whether it\'s a customer portal, an internal dashboard, an e-commerce experience, or a collaborative tool, we focus on performance, accessibility, and clean architecture. Our apps are built to evolve: easy to maintain, extend, and scale as your needs change.',
    image: '/services_pour.jpg',
    highlights: [
      'Progressive web apps (PWA)',
      'Customer portals & dashboards',
      'E-commerce and marketplaces',
      'Real-time collaboration tools',
    ],
    benefits: [
      { title: 'Performance first', description: 'Fast load times and smooth interactions. We measure, then optimize.' },
      { title: 'Accessible by default', description: 'WCAG-aware design and development. Everyone can use what we build.' },
      { title: 'Mobile-ready', description: 'Responsive layouts that work beautifully on any screen size.' },
    ],
    useCases: [
      'Customer-facing portals for accounts, orders, or support',
      'Internal dashboards for operations, sales, or analytics',
      'E-commerce sites and marketplaces with complex flows',
      'Real-time tools for collaboration, scheduling, or live data',
    ],
    process: [
      { step: 1, title: 'UX & flow design', description: 'We map user journeys, key flows, and UI structure before development.' },
      { step: 2, title: 'Frontend architecture', description: 'We choose the right framework and structure for performance and maintainability.' },
      { step: 3, title: 'Build & test', description: 'We develop in iterations, with accessibility and performance baked in.' },
      { step: 4, title: 'Launch & monitor', description: 'We deploy, monitor metrics, and iterate based on real usage.' },
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Web APIs'],
    ctaText: 'Talk about your web app',
  },
  {
    id: 'mobile-apps',
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    tagline: 'Native feel, cross-platform reach.',
    description: 'iOS and Android apps that users love. We use React Native and similar frameworks to ship native-quality experiences without maintaining two codebases. Perfect when your users need your product in their pocket.',
    longDescription: 'Mobile apps demand a different mindset than web: touch-first interactions, offline behavior, push notifications, and app store constraints. We build cross-platform apps with React Native so you get iOS and Android from a single codebase, with native performance and platform-appropriate UX. Whether you need an app for field workers, customers, or internal teams, we design for the constraints of mobile—small screens, variable connectivity, and the expectations of app store users.',
    image: '/work_machine.jpg',
    highlights: [
      'iOS and Android from one codebase',
      'Offline-first when it matters',
      'Push notifications & in-app features',
      'App store deployment support',
    ],
    benefits: [
      { title: 'One codebase, two platforms', description: 'Ship to iOS and Android faster without sacrificing quality.' },
      { title: 'Native performance', description: 'Smooth animations, fast startup, and platform-appropriate UX.' },
      { title: 'Offline capable', description: 'Works when connectivity is spotty—critical for field and on-the-go users.' },
    ],
    useCases: [
      'Field workers who need apps that work without reliable connectivity',
      'Consumer apps that need to reach users on iOS and Android',
      'Internal tools for teams that work primarily on mobile',
      'Companion apps that extend a web or desktop product',
    ],
    process: [
      { step: 1, title: 'Mobile strategy', description: 'We define core flows, offline requirements, and platform-specific needs.' },
      { step: 2, title: 'Design', description: 'We design for touch, small screens, and platform conventions.' },
      { step: 3, title: 'Build', description: 'We develop in React Native, with shared logic and platform-specific polish.' },
      { step: 4, title: 'Test & ship', description: 'We handle device testing, store submission, and ongoing updates.' },
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Native modules'],
    ctaText: 'Start your mobile app project',
  },
  {
    id: 'cloud-apis',
    slug: 'cloud-apis',
    title: 'Cloud & APIs',
    tagline: 'Infrastructure and integrations that scale.',
    description: 'Cloud architecture, API design, and DevOps that keep your systems running smoothly. We help you move to the cloud, build reliable APIs, and automate deployments so your team can ship with confidence.',
    longDescription: 'Your product is only as reliable as the infrastructure behind it. We design cloud architecture that scales, secure APIs that partners can integrate with, and CI/CD pipelines that let you deploy without fear. Whether you\'re migrating from on-prem, building a new API product, or modernizing your DevOps, we bring cloud-native patterns, API best practices, and automation that reduce toil and improve reliability. You get infrastructure that works—and documentation so your team can maintain it.',
    image: '/cloud_glass.jpg',
    highlights: [
      'Cloud migration & architecture',
      'REST & GraphQL API design',
      'CI/CD and deployment automation',
      'Monitoring and observability',
    ],
    benefits: [
      { title: 'Cloud-native design', description: 'Built for AWS, GCP, or Azure—scalable, secure, and cost-aware.' },
      { title: 'APIs that last', description: 'Clean contracts, versioning, and docs. Easy for partners and internal teams.' },
      { title: 'Ship with confidence', description: 'Automated testing and deployments. Fewer outages, faster releases.' },
    ],
    useCases: [
      'Teams migrating from on-prem or legacy infrastructure',
      'Products exposing APIs to partners, customers, or internal teams',
      'Startups scaling infrastructure and need better DevOps',
      'Organizations standardizing on cloud and improving deployment velocity',
    ],
    process: [
      { step: 1, title: 'Audit & plan', description: 'We assess your current setup and design a migration or build plan.' },
      { step: 2, title: 'Architecture', description: 'We define cloud services, API contracts, and deployment pipelines.' },
      { step: 3, title: 'Implement', description: 'We build the infrastructure, APIs, and automation.' },
      { step: 4, title: 'Document & handoff', description: 'We document everything and train your team to operate it.' },
    ],
    technologies: ['AWS / GCP / Azure', 'Terraform', 'Docker', 'GraphQL', 'REST'],
    ctaText: 'Plan your cloud & API strategy',
  },
  {
    id: 'architecture-consulting',
    slug: 'architecture-consulting',
    title: 'Architecture & Consulting',
    tagline: 'Strategic guidance when stakes are high.',
    description: 'Technical audits, architecture reviews, and advisory for teams who need clarity before they build. We help you make the right decisions on stack, scalability, and technical debt—so you invest in the right direction.',
    longDescription: 'Sometimes you need an outside perspective before you build—or before you invest in a major change. We provide technical due diligence, architecture reviews, and strategic advisory for teams at inflection points: pre-investment, pre-build, or mid-migration. We give you an honest assessment of your current state, a prioritized roadmap, and the knowledge transfer so your team can execute. No vendor lock-in, no agenda—just clarity.',
    image: '/process_architecture.jpg',
    highlights: [
      'Technical due diligence',
      'Architecture reviews & roadmaps',
      'Tech stack selection',
      'Team enablement & training',
    ],
    benefits: [
      { title: 'Unbiased perspective', description: 'Honest assessment of what\'s working and what needs to change.' },
      { title: 'Actionable roadmaps', description: 'Clear priorities and phased plans—not vague recommendations.' },
      { title: 'Transfer knowledge', description: 'We upskill your team so they can own the solution long-term.' },
    ],
    useCases: [
      'Investors or acquirers needing technical due diligence',
      'Teams about to build and wanting to validate approach',
      'Organizations with technical debt and need a prioritized plan',
      'Leaders wanting to upskill their team on modern practices',
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'We review your codebase, architecture, and team to understand the full picture.' },
      { step: 2, title: 'Assessment', description: 'We produce a written report with findings, risks, and recommendations.' },
      { step: 3, title: 'Roadmap', description: 'We create a prioritized, phased plan with clear next steps.' },
      { step: 4, title: 'Enablement', description: 'We present findings, answer questions, and transfer knowledge to your team.' },
    ],
    technologies: ['Architecture review', 'Code audit', 'Tech evaluation', 'Documentation'],
    ctaText: 'Book a consulting session',
  },
];

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
