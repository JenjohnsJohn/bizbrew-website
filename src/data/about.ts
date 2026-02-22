export interface ValueItem {
  title: string;
  description: string;
  detail: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export const aboutHero = {
  headline: 'We build software that works',
  subheadline: 'Not software that impresses in demos. Software that runs in production, handles edge cases, and scales when your business does.',
};

export const aboutStory = {
  title: 'Our Story',
  paragraphs: [
    'BizBrew was founded by developers who spent years inside bloated agencies — watching projects spiral over budget, timelines slip by months, and codebases rot from day one. We knew there had to be a better way.',
    'So we built a different kind of shop. Small team. Deep expertise. Direct communication. No account managers relaying messages, no junior developers learning on your dime, no bloated processes designed to bill more hours.',
    'Every project gets senior engineers who have shipped production software across industries — from fintech to logistics, healthcare to e-commerce. We bring architecture-first thinking, security-by-design principles, and a relentless focus on code that lasts.',
    'Based in Germany, working globally. We partner with startups launching their first product and established companies modernizing legacy systems. The common thread: teams who value quality over quantity and want a technology partner, not just a vendor.',
  ],
};

export const aboutValues: ValueItem[] = [
  {
    title: 'Architecture First',
    description: 'We design systems before we write code.',
    detail: 'Every project starts with architecture. We map data flows, define service boundaries, plan for failure modes, and document decisions. This upfront investment saves 10x in rework later. We have seen too many projects fail because someone started coding on day one without thinking about how the pieces fit together.',
  },
  {
    title: 'Security by Design',
    description: 'Protection is built in, not bolted on.',
    detail: 'Authentication, authorization, data encryption, input validation, rate limiting — these are not afterthoughts. We integrate security from the first commit. Our code reviews check for OWASP Top 10 vulnerabilities, and every deployment goes through automated security scanning.',
  },
  {
    title: 'Clean Code',
    description: 'Readable, testable, maintainable.',
    detail: 'We write code for the next developer, not just the compiler. Consistent naming, clear abstractions, comprehensive tests, and honest documentation. When you bring on new team members or switch vendors, the codebase should be an asset, not a liability.',
  },
  {
    title: 'Long-term Thinking',
    description: 'Building for the next five years, not the next sprint.',
    detail: 'Technology decisions compound. The framework you choose, the database you deploy, the patterns you establish — they shape every future feature. We evaluate tools based on ecosystem maturity, community health, and long-term viability, not hype cycles.',
  },
];

export const aboutStats: StatItem[] = [
  { label: 'Years in Business', value: 8, suffix: '+' },
  { label: 'Projects Shipped', value: 47, suffix: '' },
  { label: 'Technologies Mastered', value: 30, suffix: '+' },
  { label: 'Client Retention Rate', value: 94, suffix: '%' },
];

export const aboutTechPhilosophy = {
  title: 'How We Choose Technology',
  paragraphs: [
    'We are opinionated about our stack — but not dogmatic. React and TypeScript form our frontend foundation because they offer the best combination of developer productivity, ecosystem support, and long-term stability. Node.js powers most of our backends because JavaScript everywhere reduces context switching and simplifies hiring.',
    'But we are not a one-stack shop. PostgreSQL for relational data, Redis for caching and queues, Docker for consistent deployments, Terraform for infrastructure as code. We choose tools based on the problem, not the other way around.',
    'What we will not do: chase trends. We will not rewrite your app in the framework that launched last month. We will not adopt a database because it is trending on Hacker News. Every technology choice has a cost — in learning, in maintenance, in future flexibility — and we weigh those costs honestly.',
  ],
};
