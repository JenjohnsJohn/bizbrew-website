export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  image: string;
  challenge: string[];
  approach: string[];
  solution: string[];
  results: { metric: string; value: number; suffix: string; description: string }[];
  technologies: string[];
  testimonial: { quote: string; author: string; role: string };
  relatedService: string;
  relatedServiceSlug: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'tenanthub',
    title: 'TenantHub',
    client: 'TenantHub',
    industry: 'Property Management',
    summary: 'A multi-tenant SaaS platform that replaced spreadsheet chaos with real-time property management — cutting admin time by 60% and onboarding new properties 3x faster.',
    image: '/case_tenanthub.jpg',
    challenge: [
      'TenantHub managed 200+ residential properties across three cities using a patchwork of Excel spreadsheets, email threads, and a legacy desktop application from 2009. Property managers spent 4+ hours daily on manual data entry, reconciliation, and tenant communications.',
      'Billing errors were common — roughly 8% of invoices contained mistakes, leading to disputes and delayed payments. New property onboarding took 2-3 weeks because data had to be manually entered across multiple systems.',
      'The existing desktop application could not support remote work, had no mobile access, and crashed frequently when handling more than 50 concurrent properties. TenantHub needed a modern platform that could scale with their growth plans.',
    ],
    approach: [
      'We started with a two-week discovery phase, shadowing property managers to understand their actual workflows — not just the documented ones. This revealed that 60% of their time went to three core tasks: billing reconciliation, maintenance request routing, and tenant communication.',
      'We designed a multi-tenant architecture using PostgreSQL row-level security, ensuring each property management company sees only their own data while sharing infrastructure. This kept costs predictable as the platform scaled.',
      'We chose an incremental migration strategy: build the new platform, run it alongside the legacy system for 30 days, then cut over property by property. This eliminated the big-bang migration risk.',
    ],
    solution: [
      'The platform centers on a real-time dashboard showing occupancy rates, outstanding payments, maintenance requests, and upcoming lease expirations at a glance. Property managers can filter by building, unit type, or date range.',
      'Automated billing generates invoices on configurable schedules, applies late fees according to lease terms, and sends payment reminders via email and SMS. Stripe integration handles online payments with automatic reconciliation.',
      'A tenant portal gives residents self-service access to pay rent, submit maintenance requests with photo uploads, view lease documents, and communicate with property managers — reducing inbound phone calls by 45%.',
      'The maintenance module routes requests based on issue type and property, tracks contractor assignments, and logs resolution times. Managers can set SLA thresholds and receive alerts for overdue tickets.',
    ],
    results: [
      { metric: 'Admin Time Reduction', value: 60, suffix: '%', description: 'Property managers reclaimed 2.5 hours per day previously spent on manual data entry and reconciliation.' },
      { metric: 'Faster Onboarding', value: 3, suffix: 'x', description: 'New property setup dropped from 2-3 weeks to 3-4 days with automated data import and template-based configuration.' },
      { metric: 'Billing Accuracy', value: 99.2, suffix: '%', description: 'Automated billing eliminated manual calculation errors, reducing disputes by 92%.' },
      { metric: 'Tenant Satisfaction', value: 40, suffix: '%\u2191', description: 'Self-service portal and faster maintenance response times drove measurable improvement in tenant NPS scores.' },
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'Docker', 'Redis'],
    testimonial: {
      quote: 'We went from drowning in spreadsheets to having everything in one place. Our property managers actually look forward to using the software now — that has never happened before.',
      author: 'Marcus Weber',
      role: 'COO, TenantHub',
    },
    relatedService: 'SaaS Products',
    relatedServiceSlug: 'saas-products',
  },
  {
    slug: 'fieldflow',
    title: 'FieldFlow',
    client: 'FieldFlow',
    industry: 'Field Services',
    summary: 'An offline-first mobile and web platform that digitized field inspections — eliminating paper forms, enabling same-day reporting, and reducing missed inspections by 40%.',
    image: '/case_fieldflow.jpg',
    challenge: [
      'FieldFlow coordinated 150+ field technicians conducting safety inspections across industrial facilities. Technicians carried clipboards with paper forms, took photos on personal phones, and submitted reports by scanning completed forms at the end of each week.',
      'This workflow created a 5-7 day reporting lag. By the time inspection data reached the back office, issues had often escalated. Roughly 12% of inspections were never filed — forms got lost, damaged, or forgotten in truck glove compartments.',
      'Management had no real-time visibility into inspection coverage. They could not answer basic questions like "Which facilities were inspected this week?" without calling individual team leads. Compliance audits required weeks of manual report compilation.',
    ],
    approach: [
      'Field connectivity was the central design constraint. Technicians work inside metal buildings, underground facilities, and remote locations with spotty cellular coverage. We built an offline-first architecture where the mobile app works fully without a network connection.',
      'We spent three days in the field with technicians, observing their inspection workflow. This revealed that the average inspection involves 35 data points, 4-8 photos, and takes 25 minutes — insights that shaped our UI design around speed and minimal typing.',
      'We implemented a progressive sync strategy: data saves locally first, syncs when connectivity returns, and handles conflict resolution automatically. The web dashboard updates in near-real-time as field data flows in.',
    ],
    solution: [
      'The mobile app presents dynamic inspection checklists tailored to facility type, equipment category, and regulatory requirements. Technicians tap through items, capture geo-tagged photos, add voice notes, and flag critical findings — all while offline.',
      'A smart scheduling system assigns inspections based on technician location, certification level, and facility requirements. Route optimization reduces drive time, and push notifications alert technicians to schedule changes.',
      'The web dashboard provides real-time inspection coverage maps, completion rates by region and team, and automated compliance reports. Managers can drill down from portfolio-level metrics to individual inspection details.',
      'Automated report generation transforms inspection data into formatted PDF reports within minutes of sync, replacing the previous week-long manual process. Reports include photos, findings, recommended actions, and compliance status.',
    ],
    results: [
      { metric: 'Fewer Missed Inspections', value: 40, suffix: '%', description: 'Digital tracking and automated reminders virtually eliminated lost or forgotten inspection reports.' },
      { metric: 'Same-Day Reporting', value: 95, suffix: '%', description: 'Reports now available within hours of inspection completion, down from 5-7 days.' },
      { metric: 'Inspection Speed', value: 30, suffix: '%\u2191', description: 'Digital forms with auto-fill and photo capture reduced average inspection time from 25 to 17 minutes.' },
      { metric: 'Audit Prep Time', value: 80, suffix: '%\u2193', description: 'Compliance reports that took weeks to compile are now generated automatically in minutes.' },
    ],
    technologies: ['React Native', 'TypeScript', 'Firebase', 'GraphQL', 'Node.js', 'PostgreSQL', 'AWS S3', 'Docker'],
    testimonial: {
      quote: 'The offline capability was the game-changer. Our technicians work in places where you cannot get a cell signal, and the app just works. When they are back in range, everything syncs automatically.',
      author: 'Sarah Chen',
      role: 'VP of Operations, FieldFlow',
    },
    relatedService: 'Mobile Apps',
    relatedServiceSlug: 'mobile-apps',
  },
  {
    slug: 'databridge',
    title: 'DataBridge',
    client: 'DataBridge',
    industry: 'Enterprise Integration',
    summary: 'An event-driven API integration layer that connected a legacy ERP with modern SaaS tools — reducing manual data entry by 90% and cutting sync times from 24 hours to 15 minutes.',
    image: '/case_databridge.jpg',
    challenge: [
      'DataBridge operated a 12-year-old on-premise ERP system that stored critical business data — inventory, orders, customer records, and financial transactions. Over the years, the company adopted Salesforce for CRM, Shopify for e-commerce, and HubSpot for marketing, creating five disconnected data silos.',
      'A team of three full-time data entry clerks manually transferred data between systems. Orders from Shopify were re-keyed into the ERP. Customer updates in Salesforce were emailed to the ERP team. Inventory counts were exported as CSV files and imported nightly.',
      'Data inconsistencies were constant. The ERP showed different inventory counts than Shopify, leading to overselling. Customer records diverged across systems, causing duplicate communications and billing errors. The nightly batch sync meant decisions were always based on stale data.',
    ],
    approach: [
      'We mapped every data flow between the five systems, documenting 47 distinct integration points. We categorized each by criticality (real-time, near-real-time, batch) and direction (bidirectional, one-way). This integration map became the architecture blueprint.',
      'Rather than replacing the ERP — a multi-year project the company could not afford — we designed an API gateway layer that sits between all systems. The ERP exposes data through a thin REST adapter we built; modern systems connect through their native APIs.',
      'We chose an event-driven architecture using RabbitMQ for message queuing. When data changes in any system, an event fires, the gateway transforms it, and routes it to all subscribers. This decoupled approach means adding a new system takes days, not months.',
    ],
    solution: [
      'The API gateway normalizes data formats across all five systems. A unified data model maps ERP part numbers to Shopify SKUs to Salesforce product IDs, maintaining referential integrity across the ecosystem.',
      'Event routing rules ensure data flows to the right systems at the right speed. Inventory changes sync in real-time (under 30 seconds) to prevent overselling. Financial transactions batch every 15 minutes for ERP processing. Marketing data syncs hourly.',
      'A real-time sync dashboard shows data flow health across all integrations. Operators can see message queues, sync latency, error rates, and retry counts. Automated alerts fire when sync delays exceed configurable thresholds.',
      'Webhook orchestration handles complex multi-step workflows. When a Shopify order arrives, the gateway creates an ERP order, reserves inventory, updates Salesforce opportunity status, and triggers HubSpot post-purchase automation — all within seconds.',
    ],
    results: [
      { metric: 'Less Manual Entry', value: 90, suffix: '%', description: 'Automated sync eliminated most manual data transfer, allowing the team to focus on exception handling and data quality.' },
      { metric: 'Sync Time', value: 15, suffix: ' min', description: 'Critical data now syncs in minutes instead of the previous 24-hour nightly batch cycle.' },
      { metric: 'Data Accuracy', value: 99.7, suffix: '%', description: 'Automated validation and referential integrity checks virtually eliminated cross-system data inconsistencies.' },
      { metric: 'Integration Speed', value: 5, suffix: ' days', description: 'Adding a new SaaS tool to the ecosystem now takes days instead of the months required for custom point-to-point integrations.' },
    ],
    technologies: ['Node.js', 'TypeScript', 'Redis', 'RabbitMQ', 'Docker', 'GCP', 'PostgreSQL', 'REST APIs'],
    testimonial: {
      quote: 'We tried two integration platforms before BizBrew. They could not handle our legacy ERP. BizBrew built a custom adapter that finally made our old system talk to the modern world.',
      author: 'Thomas Krause',
      role: 'CTO, DataBridge',
    },
    relatedService: 'Cloud & APIs',
    relatedServiceSlug: 'cloud-apis',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
