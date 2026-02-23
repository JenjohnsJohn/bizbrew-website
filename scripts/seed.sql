DELETE FROM projects;

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'wayvida',
  'Wayvida',
  'E-Learning',
  '2024–2025',
  'Comprehensive e-learning platform with live classes, video lessons, mock tests, and study plans — built for scale with a microservice backend.',
  'Wayvida is a full-featured e-learning ecosystem designed to support diverse learning formats under one roof. We architected the platform around a microservice backend on Azure, enabling independent scaling of live streaming, content delivery, and assessment engines. The Flutter-based mobile apps deliver a native-quality experience across iOS and Android, while the React web dashboard gives administrators and instructors full control over curricula, student progress, and analytics. White-label support means educational institutions can deploy their own branded version without forking the codebase.',
  '/project_education.jpg',
  '["Flutter","Clean Architecture","BLoC","GetIt","React","Redux","Node.js","Microservices","Azure","MongoDB"]',
  '["iOS","Android","Web"]',
  '["Live classes","Video classes","Audio classes","Mock tests","Live tests","Notes (PDF, Image, Word)","Study plans","Webinars","White-label support"]',
  '["Scalable microservice backend on Azure with independent feature scaling","White-label deployments for branded institutional versions","Multi-format learning: live, video, audio, and document-based content","Study plans and webinars alongside structured mock and live tests"]',
  'Neyyar Technologies',
  'Completed',
  'Wayvida — E-Learning Platform | BizBrew',
  'Comprehensive e-learning platform with live classes, video lessons, mock tests, and study plans — built for scale with a microservice backend.',
  '/project_education.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'neyyar-production',
  'Neyyar Production',
  'OTT',
  '2024–2025',
  'Over-the-top streaming platform for movies and series, powered by a microservice architecture for high-availability content delivery.',
  'Neyyar Production is an OTT streaming platform built to deliver movies and series at scale. The architecture follows a microservice pattern, separating content ingestion, transcoding, user management, and streaming delivery into independently deployable services. The Flutter client apps handle adaptive bitrate playback, offline downloads, and personalized recommendations, while the React admin panel provides content management, analytics, and subscriber oversight. The system is designed for high concurrency during peak viewing hours.',
  '/project_management.jpg',
  '["Flutter","Clean Architecture","BLoC","GetIt","React","Redux","Node.js","Microservices"]',
  '["iOS","Android","Web"]',
  '["Movie streaming","Series streaming","Adaptive bitrate playback","Content management"]',
  '["Microservice-based streaming with separated content, auth, and delivery","Adaptive bitrate playback adjusting to network conditions","Cross-platform apps for iOS, Android, and web from one codebase","Admin panel for content lifecycle, analytics, and subscriber management"]',
  'Neyyar Technologies',
  'In Development',
  'Neyyar Production — OTT Streaming | BizBrew',
  'Over-the-top streaming platform for movies and series, powered by a microservice architecture for high-availability content delivery.',
  '/project_management.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'neyyar-hr',
  'Neyyar HR',
  'HR & Project Management',
  '2024–2025',
  'End-to-end HR and project management platform covering employee lifecycle, attendance, payroll, and task tracking.',
  'Neyyar HR consolidates the entire employee lifecycle into one platform — from onboarding and attendance to payroll processing and project delivery. Built with Flutter and Riverpod for reactive state management, the mobile apps give employees self-service access to their profiles, leave requests, and payslips. Managers get shift scheduling, department oversight, and project tracking with task-level granularity. The Python backend handles payroll calculations, compliance rules, and reporting, ensuring accuracy across different organizational structures.',
  '/project_hr.jpg',
  '["Flutter","Clean Architecture","Riverpod","Python"]',
  '["iOS","Android"]',
  '["Employee profiles","Attendance management","Leave management","Shift & roster management","Payroll & payslips","Department & role management","Document management","Project management with tasks"]',
  '["Full payroll engine with configurable compliance and tax rules","Integrated project management with task-level tracking","Self-service employee portal for profiles, leave, and payslips","Shift and roster scheduling with department-level management"]',
  'Neyyar Technologies',
  'In Development',
  'Neyyar HR — HR & Project Management | BizBrew',
  'End-to-end HR and project management platform covering employee lifecycle, attendance, payroll, and task tracking.',
  '/project_hr.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'diq-ecommerce',
  'DIQ E-Commerce Platform',
  'E-Commerce',
  '2018–2024',
  'White-label e-commerce product powering multiple brands across Qatar and the Middle East — mobile apps and responsive web storefronts from a single codebase.',
  'The DIQ E-Commerce Platform is a white-label product that has powered multiple brands across Qatar and the Middle East for over six years. The architecture separates the storefront, cart engine, and order management into modular layers, allowing each client deployment to customize branding, product catalogs, and checkout flows without touching core logic. The Flutter mobile apps and React web storefronts share a unified API layer, ensuring consistent behavior across platforms. Firebase handles real-time inventory sync and push notifications, while the Node.js/Laravel backend manages order processing and fulfillment workflows.',
  '/project_ecommerce.jpg',
  '["Flutter","Dart","React","JavaScript","REST APIs","Firebase","Node.js","Laravel"]',
  '["iOS","Android","Web"]',
  '["Product catalog","Cart & checkout","Order management","User accounts","Brand theming","Responsive storefront","Product search","Order history"]',
  '["White-label theming for per-brand storefronts from one codebase","Unified product catalog, cart, and checkout across mobile and web","Real-time inventory sync and push notifications via Firebase","Modular storefront, cart engine, and order management layers"]',
  'Multiple clients — Qatar / Middle East',
  'Production',
  'DIQ E-Commerce Platform | BizBrew',
  'White-label e-commerce product powering multiple brands across Qatar and the Middle East — mobile apps and responsive web storefronts.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'school-management-system',
  'School Management System',
  'Education Management',
  '2018–2024',
  'White-label school management product handling students, teachers, attendance, exams, fees, and parent communications.',
  'This school management system is a white-label product deployed across multiple educational institutions. It covers the full administrative lifecycle: student enrollment, teacher assignments, class scheduling, attendance tracking, exam management with grade calculations, and fee collection with payment tracking. The notification system keeps parents informed about attendance, grades, and school announcements. Each school gets a branded deployment with customizable modules, allowing institutions to enable only the features they need.',
  '/project_education.jpg',
  '["Flutter","React","Firebase","Node.js","SQL","NoSQL"]',
  '["iOS","Android","Web"]',
  '["Student profiles","Attendance tracking","Timetable management","Exam & results","Fee management","Parent notifications"]',
  '["White-label system with per-school branding and module selection","Automated grade calculations with exam and results management","Parent notification system for attendance, grades, and announcements","Integrated fee collection with payment tracking and reminders"]',
  'Multiple schools',
  'Production',
  'School Management System | BizBrew',
  'White-label school management product handling students, teachers, attendance, exams, fees, and parent communications.',
  '/project_education.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'hospital-management-system',
  'Hospital Management System',
  'Healthcare',
  '2018–2024',
  'Product for hospital and clinic management including patient records, appointments, doctor schedules, and billing integration.',
  'The Hospital Management System streamlines clinical and administrative operations for healthcare facilities. Patient records, appointment scheduling, doctor availability, and billing are unified in a single platform. The Flutter apps give staff mobile access to patient information and scheduling, while the web dashboard provides administrators with operational oversight, reporting, and billing management. The system is designed with healthcare data sensitivity in mind, implementing role-based access controls and audit logging throughout.',
  '/project_healthcare.jpg',
  '["Flutter","REST APIs","Node.js","Laravel","SQL","NoSQL"]',
  '["iOS","Android","Web"]',
  '["Patient profiles","Appointment booking","Doctor schedules","Billing integration","Role-based access","Audit logging"]',
  '["Unified patient records, appointments, and billing in one platform","Role-based access controls with healthcare-grade data privacy","Mobile staff access to patient information and doctor schedules","Audit logging for compliance and operational transparency"]',
  'Hospitals & clinics',
  'Production',
  'Hospital Management System | BizBrew',
  'Product for hospital and clinic management including patient records, appointments, doctor schedules, and billing integration.',
  '/project_healthcare.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'billing-pos-system',
  'Billing & POS System',
  'Billing & POS',
  '2018–2024',
  'Point-of-sale and billing product for retail and service businesses — invoices, receipts, sales analytics, and tax configuration.',
  'The Billing & POS System is a production-grade product built for retail and service businesses that need reliable invoicing, receipt generation, and sales tracking. The system handles multiple tax configurations, supports various payment methods, and generates detailed sales reports. The Flutter apps work across tablets and phones for in-store use, while the web dashboard provides owners with sales analytics, inventory overview, and financial reporting. The architecture supports offline operation for environments with unreliable connectivity.',
  '/project_restaurant.jpg',
  '["Flutter","Firebase","Node.js","SQL","NoSQL"]',
  '["iOS","Android","Web"]',
  '["Invoice generation","Receipt printing","Sales reports","Tax configuration","Multiple payment methods","Offline support"]',
  '["Configurable tax rules for different business types and jurisdictions","Offline-capable POS working without reliable internet","Multi-device support across tablets and phones for in-store use","Detailed sales reports with analytics and financial summaries"]',
  'Retail & service businesses',
  'Production',
  'Billing & POS System | BizBrew',
  'Point-of-sale and billing product for retail and service businesses — invoices, receipts, sales analytics, and tax configuration.',
  '/project_restaurant.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'car-rental-system',
  'Car Rental System',
  'Car Rental / Transport',
  '2018–2024',
  'Car rental platform for fleet management, booking, scheduling, and rental contract generation.',
  'The Car Rental System manages the complete rental lifecycle: fleet inventory, vehicle availability, customer bookings, and contract generation. Operators can track vehicle status, maintenance schedules, and utilization rates through the web dashboard, while customers browse available vehicles and make reservations through the mobile app. The booking engine handles conflict resolution, pricing rules, and deposit management, ensuring smooth operations for rental companies of varying sizes.',
  '/project_transport.jpg',
  '["Flutter","REST APIs","Node.js","Laravel"]',
  '["iOS","Android","Web"]',
  '["Fleet listing","Booking & scheduling","Customer management","Rental contracts","Vehicle tracking","Maintenance scheduling"]',
  '["End-to-end rental lifecycle: fleet inventory, booking, and contracts","Smart booking engine with conflict resolution and pricing rules","Vehicle utilization tracking and maintenance scheduling","Real-time availability for customer-facing mobile bookings"]',
  'Car rental companies',
  'Production',
  'Car Rental System | BizBrew',
  'Car rental platform for fleet management, booking, scheduling, and rental contract generation.',
  '/project_transport.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'gym-fitness-management',
  'Gym & Fitness Management',
  'Fitness Management',
  '2018–2024',
  'Management system for gyms and fitness centers — member profiles, subscription plans, attendance tracking, and payment processing.',
  'The Gym & Fitness Management System gives fitness centers the tools to manage their entire membership lifecycle. From member onboarding and plan selection to daily check-ins and payment collection, the platform handles it all. The Flutter apps provide members with a self-service portal for checking schedules, tracking attendance, and managing their subscriptions. Gym owners get a dashboard with membership analytics, revenue tracking, and operational insights to make data-driven decisions about their business.',
  '/project_sports.jpg',
  '["Flutter","Firebase","Node.js"]',
  '["iOS","Android","Web"]',
  '["Member profiles","Plans & subscriptions","Attendance tracking","Payment processing","Schedule management","Analytics dashboard"]',
  '["Full membership lifecycle from onboarding to plan renewal","Self-service member portal for schedules and subscriptions","Flexible plan management with automated payment tracking","Owner analytics dashboard with revenue and membership insights"]',
  'Gyms & fitness centers',
  'Production',
  'Gym & Fitness Management | BizBrew',
  'Management system for gyms and fitness centers — member profiles, subscription plans, attendance tracking, and payment processing.',
  '/project_sports.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'connect-app-emplog',
  'Connect App / EmpLog',
  'HR & Attendance',
  '2019–2024',
  'Enterprise attendance and time-logging suite with geolocation, biometric/QR check-in, and project-wise timesheets.',
  'Connect App (also deployed as EmpLog, emaratech T&A, and TEO TimeLog) is an enterprise attendance and workforce management suite. The system supports multiple check-in methods — geofenced GPS, QR codes, and biometric integration — giving organizations flexibility based on their environment. Project-wise timesheets let managers allocate labor costs accurately, while the reporting engine generates compliance-ready attendance records. The platform has been deployed across multiple enterprise clients in Qatar, each with customized policies and approval workflows.',
  '/project_hr.jpg',
  '["Flutter","Dart","REST APIs","Firebase","Node.js"]',
  '["iOS","Android"]',
  '["Clock-in/clock-out","Geofenced attendance","QR & biometric check-in","Project timesheets","Attendance reports","Policy configuration"]',
  '["Multiple check-in methods: GPS geofencing, QR codes, and biometric","Project-wise timesheets for accurate labor cost allocation","Configurable attendance policies and approval workflows","Compliance-ready reporting with full audit trails"]',
  'Enterprise clients — Qatar',
  'Completed',
  'Connect App / EmpLog — Attendance Suite | BizBrew',
  'Enterprise attendance and time-logging suite with geolocation, biometric/QR check-in, and project-wise timesheets.',
  '/project_hr.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'qtamween',
  'QTamween',
  'E-Commerce',
  '2019–2023',
  'E-commerce app for product ordering with delivery tracking and order management — serving the Qatar market.',
  'QTamween is an e-commerce platform built for the Qatar market, providing a seamless shopping experience from product discovery to doorstep delivery. The app features an intuitive product catalog with search and filtering, a streamlined checkout flow, and real-time delivery tracking so customers always know where their order is. The backend handles inventory synchronization, order routing, and delivery logistics, while push notifications keep customers informed at every stage of their order.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs","Firebase","Node.js"]',
  '["iOS","Android"]',
  '["Product catalog","Cart & checkout","Order history","Delivery tracking","Push notifications","Search & filtering"]',
  '["End-to-end shopping flow from browsing to delivery tracking","Real-time order status updates via push notifications","Inventory sync with automated stock management","Search and filtering optimized for product discovery"]',
  'Qatar market',
  'Completed',
  'QTamween — E-Commerce | BizBrew',
  'E-commerce app for product ordering with delivery tracking and order management — serving the Qatar market.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'qvender',
  'QVender',
  'E-Commerce',
  '2019–2023',
  'Vendor-driven e-commerce platform connecting buyers with local sellers in Qatar.',
  'QVender connects buyers with local vendors through a mobile-first marketplace. Each vendor manages their own catalog, pricing, and order fulfillment, while the platform handles user accounts, cart management, and payment processing. The architecture supports multi-vendor operations with independent inventory management, allowing the marketplace to scale as new sellers onboard. The app provides buyers with a unified shopping experience across all vendors, with vendor-specific filtering and ratings.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Vendor catalogs","Cart & checkout","Order management","User accounts","Multi-vendor support","Vendor ratings"]',
  '["Multi-vendor marketplace with independent catalog management per seller","Unified cart and checkout across multiple vendors","Vendor ratings and filtering for buyer confidence","Scalable onboarding flow for adding new sellers"]',
  'Qatar market',
  'Completed',
  'QVender — Vendor Marketplace | BizBrew',
  'Vendor-driven e-commerce platform connecting buyers with local sellers in Qatar.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'mazad-qatar',
  'Mazad Qatar',
  'Classifieds',
  '2019–2023',
  'Classified marketplace app for listing and browsing items in Qatar — with search, filters, favorites, and direct messaging.',
  'Mazad Qatar is a classifieds marketplace serving the Qatar market, enabling users to list items for sale, browse categories, and connect with sellers. The app features advanced search with category and location filters, a favorites system for saving interesting listings, and direct chat for buyer-seller communication. The listing creation flow supports multiple images, detailed descriptions, and pricing options. Firebase powers real-time chat and push notifications, ensuring responsive communication between parties.',
  '/project_classifieds.jpg',
  '["Flutter","REST APIs","Firebase"]',
  '["iOS","Android"]',
  '["Create listings","Search & filter","Favorites","Chat & messaging","Multi-image uploads","Location-based filtering"]',
  '["Real-time buyer-seller chat powered by Firebase","Advanced search with category, location, and price filtering","Multi-image listing creation with rich descriptions","Favorites system for saving and tracking interesting listings"]',
  'Qatar market',
  'Completed',
  'Mazad Qatar — Classifieds | BizBrew',
  'Classified marketplace app for listing and browsing items in Qatar — with search, filters, favorites, and direct messaging.',
  '/project_classifieds.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'flower-markets',
  'Flower Markets',
  'E-Commerce',
  '2019–2023',
  'Flower and gift ordering app with custom arrangements, delivery scheduling, and occasion-based browsing.',
  'Flower Markets brings the floral shopping experience to mobile, letting customers browse arrangements by occasion, customize bouquets, and schedule deliveries for specific dates and times. The app handles the unique challenges of perishable goods — time-sensitive delivery windows, freshness guarantees, and seasonal availability. The order management system coordinates with local florists for fulfillment, while the customer-facing app provides a visually rich catalog optimized for gifting workflows.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs","Firebase","Node.js"]',
  '["iOS","Android"]',
  '["Flower catalog","Custom arrangements","Delivery scheduling","Occasion-based browsing","Gift messaging"]',
  '["Scheduled delivery with date and time-window selection","Occasion-based browsing for birthdays, weddings, and holidays","Custom arrangement builder with gift messaging","Perishable-goods logistics with freshness guarantees"]',
  'Qatar market',
  'Completed',
  'Flower Markets — E-Commerce | BizBrew',
  'Flower and gift ordering app with custom arrangements, delivery scheduling, and occasion-based browsing.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'bab-al-rayyan',
  'Bab Al Rayyan Group',
  'E-Commerce & Management',
  '2019–2023',
  'Combined management, e-commerce, and restaurant ordering platform for a multi-brand business group in Qatar.',
  'Bab Al Rayyan Group is a multi-purpose platform serving a diversified business group in Qatar. The system combines e-commerce for product sales, restaurant ordering for food service operations, and a management dashboard for cross-brand oversight. Each business unit operates semi-independently within the platform while sharing a unified customer base and analytics layer. The architecture handles the complexity of multi-brand operations — separate inventories, pricing, and fulfillment workflows — under one technical umbrella.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["E-commerce storefront","Restaurant ordering","Management dashboard","Multi-brand support","Unified customer accounts"]',
  '["Multi-brand platform combining e-commerce and restaurant ordering","Unified customer accounts and analytics across business units","Independent inventory and pricing per brand","Cross-brand management dashboard for operational oversight"]',
  'Bab Al Rayyan Group — Qatar',
  'Completed',
  'Bab Al Rayyan Group | BizBrew',
  'Combined management, e-commerce, and restaurant ordering platform for a multi-brand business group in Qatar.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  '360-furnitures',
  '360 Furnitures',
  'E-Commerce',
  '2019–2023',
  'Furniture e-commerce app with detailed product pages, high-resolution imagery, and a streamlined purchase flow.',
  '360 Furnitures brings furniture shopping to mobile with a focus on visual presentation and product detail. The app features high-resolution product photography, detailed specifications, dimension information, and material descriptions — everything customers need to make confident purchase decisions for big-ticket items. The catalog is organized by room, style, and price range, with a streamlined checkout flow that handles the complexities of furniture delivery including scheduling and assembly options.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Furniture catalog","Detailed product pages","Cart & checkout","Category browsing","High-res imagery"]',
  '["High-resolution product photography with zoom and gallery views","Detailed specifications including dimensions and materials","Category browsing by room, style, and price range","Delivery scheduling with optional assembly services"]',
  'Qatar market',
  'Completed',
  '360 Furnitures — E-Commerce | BizBrew',
  'Furniture e-commerce app with detailed product pages, high-resolution imagery, and a streamlined purchase flow.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'stores-in-qatar',
  'Stores in Qatar',
  'E-Commerce',
  '2019–2023',
  'Multi-vendor e-commerce app aggregating multiple stores and their product catalogs into a single shopping experience.',
  'Stores in Qatar aggregates multiple retail stores into a single marketplace, giving shoppers access to diverse product catalogs through one app. Each store maintains its own inventory and fulfillment, while the platform provides a unified browsing, search, and cart experience. The multi-store architecture handles independent pricing, promotions, and delivery options per vendor, making it easy for shoppers to discover products across the Qatar retail landscape.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Multi-store listing","Product catalog","Cart & checkout","Store profiles","Search across vendors"]',
  '["Multi-store aggregation with independent vendor inventories","Unified browsing and cart across diverse retailers","Per-vendor pricing, promotions, and delivery options","Cross-store search and product discovery"]',
  'Qatar market',
  'Completed',
  'Stores in Qatar — Marketplace | BizBrew',
  'Multi-vendor e-commerce app aggregating multiple stores and their product catalogs into a single shopping experience.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'gold-market',
  'Gold Market',
  'E-Commerce',
  '2019–2023',
  'Jewellery and gold product e-commerce app with detailed product listings and a secure checkout flow.',
  'Gold Market is a specialized e-commerce app for gold and jewellery products, serving a market where product authenticity and detailed specifications are paramount. The app features high-quality product photography, karat information, weight details, and pricing that reflects current gold rates. The checkout flow is designed for high-value transactions with appropriate security measures. Product discovery is organized by category — rings, necklaces, bracelets — with filtering by karat, weight, and price range.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Jewellery catalog","Detailed product specifications","Cart & checkout","Category browsing","Price filtering"]',
  '["Detailed product specs with karat, weight, and material info","Secure checkout flow designed for high-value transactions","Category browsing: rings, necklaces, bracelets, and more","Advanced filters by karat, weight, and price range"]',
  'Qatar market',
  'Completed',
  'Gold Market — Jewellery E-Commerce | BizBrew',
  'Jewellery and gold product e-commerce app with detailed product listings and a secure checkout flow.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'aada-kada',
  'Aada Kada',
  'E-Commerce',
  '2019–2023',
  'General-purpose e-commerce app for the Qatar market with product browsing, cart, and order management.',
  'Aada Kada is a general-purpose e-commerce app serving the Qatar market with a focus on simplicity and reliability. The app provides a clean product browsing experience with category navigation, search, and filtering. The cart and checkout flow is streamlined for quick purchases, with saved addresses and payment methods for returning customers. Order management lets customers track their purchases from confirmation through delivery.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Product listing","Cart & checkout","Order management","Category browsing","User accounts"]',
  '["Clean product browsing with category navigation and search","Streamlined checkout with saved addresses and payment methods","Full order tracking from confirmation through delivery","User accounts with order history and preferences"]',
  'Qatar market',
  'Completed',
  'Aada Kada — E-Commerce | BizBrew',
  'General-purpose e-commerce app for the Qatar market with product browsing, cart, and order management.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'hayak',
  'Hayak',
  'E-Commerce',
  '2019–2023',
  'E-commerce app tailored for local customers in Qatar — browse products, place orders, and track delivery.',
  'Hayak is an e-commerce app built specifically for local customers in Qatar, with a focus on localized shopping patterns and delivery logistics. The app features product browsing with Arabic and English language support, a cart optimized for quick reorders, and delivery tracking integrated with local logistics providers. The platform handles the nuances of the Qatar market, including local payment methods and delivery address formatting.',
  '/project_ecommerce.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Product browsing","Cart & checkout","Order history","Delivery tracking","Bilingual support"]',
  '["Bilingual interface supporting Arabic and English","Local payment methods and delivery address formatting","Quick reorder flow for returning customers","Delivery tracking integrated with local logistics providers"]',
  'Qatar market',
  'Completed',
  'Hayak — E-Commerce | BizBrew',
  'E-commerce app tailored for local customers in Qatar — browse products, place orders, and track delivery.',
  '/project_ecommerce.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'qasports',
  'QASports',
  'Sports & Booking',
  '2019–2023',
  'Sports booking platform for managing events, facility reservations, and user profiles in Qatar.',
  'QASports is a sports booking platform that connects athletes and sports enthusiasts with facilities and events across Qatar. Users can browse available sports venues, book time slots for courts and fields, and register for organized events and tournaments. The platform handles scheduling conflicts, capacity management, and payment processing for bookings. User profiles track booking history and preferences, making repeat bookings faster and enabling personalized recommendations for upcoming events.',
  '/project_sports.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Sports event listing","Slot booking","User profiles","Facility reservations","Payment processing"]',
  '["Real-time facility availability for courts and fields","Event registration and tournament sign-ups","Scheduling engine with conflict resolution and capacity limits","User profiles with booking history and personalized recommendations"]',
  'Qatar market',
  'Completed',
  'QASports — Sports Booking | BizBrew',
  'Sports booking platform for managing events, facility reservations, and user profiles in Qatar.',
  '/project_sports.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'au-sports',
  'AU Sports',
  'Sports',
  '2019–2023',
  'Sports events and booking app for managing sports activities, registrations, and notifications.',
  'AU Sports is a mobile platform for sports event management and booking. The app provides a central hub for browsing upcoming events, registering for activities, and receiving timely notifications about schedule changes and new opportunities. The booking system handles participant limits, waitlists, and confirmation workflows. Push notifications ensure users never miss registration windows or event updates.',
  '/project_sports.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Event listing","Bookings","Push notifications","Participant management","Schedule tracking"]',
  '["Centralized event discovery with upcoming activities feed","Participant management with capacity limits and waitlists","Push notifications for schedule changes and new events","One-tap registration with instant booking confirmation"]',
  'Qatar market',
  'Completed',
  'AU Sports — Events & Booking | BizBrew',
  'Sports events and booking app for managing sports activities, registrations, and notifications.',
  '/project_sports.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'evo-sports',
  'Evo Sports',
  'Sports & Coaching',
  '2019–2023',
  'Coaching booking app for sports training — browse coaches, book sessions, and track progress.',
  'Evo Sports connects athletes with coaches through a dedicated booking platform. Coach profiles showcase qualifications, specialties, and availability, while athletes can browse, compare, and book training sessions. The scheduling system handles recurring bookings, cancellations, and rescheduling with appropriate notice periods. Session tracking lets athletes and coaches maintain a record of training history and progress, enabling data-informed coaching decisions.',
  '/project_sports.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Coach profiles","Session booking","Slot management","Recurring bookings","Training history"]',
  '["Coach profiles with qualifications, specialties, and availability","Recurring session bookings with cancellation and rescheduling","Training history and progress tracking across sessions","Slot management with real-time coach availability"]',
  'Qatar market',
  'Completed',
  'Evo Sports — Coaching Booking | BizBrew',
  'Coaching booking app for sports training — browse coaches, book sessions, and track progress.',
  '/project_sports.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'limitless',
  'Limitless',
  'Sports & Events',
  '2019–2023',
  'Sports and events booking app for discovering activities, reserving spots, and managing bookings.',
  'Limitless is a sports and events booking platform designed for active lifestyles. The app aggregates sporting events, fitness classes, and recreational activities into a single discovery interface. Users can filter by sport type, location, skill level, and schedule to find the right activity. The booking engine processes reservations with instant confirmation, while user accounts maintain a history of attended events and upcoming bookings.',
  '/project_sports.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Event listing","Spot reservations","User accounts","Activity filtering","Booking history"]',
  '["Aggregated discovery of sports, fitness, and recreational events","Multi-criteria filtering by sport, location, skill level, and schedule","Instant booking confirmation with calendar sync","Activity history tracking for fitness engagement"]',
  'Qatar market',
  'Completed',
  'Limitless — Sports & Events | BizBrew',
  'Sports and events booking app for discovering activities, reserving spots, and managing bookings.',
  '/project_sports.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'turismo',
  'Turismo',
  'Travel & Booking',
  '2019–2023',
  'Tours and events booking app for tourism experiences — browse packages, book trips, and view itineraries.',
  'Turismo brings tourism experiences to mobile, letting travelers browse curated tour packages, book trips, and access detailed itineraries. The app covers the full tourism booking lifecycle: from destination discovery and package comparison to reservation, payment, and day-of itinerary access. Tour operators manage their listings, availability, and pricing through the platform, while travelers get a rich visual experience with photos, reviews, and detailed descriptions of each experience.',
  '/project_booking.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Tour packages","Booking & payment","Itinerary details","Photo galleries","Destination discovery"]',
  '["Curated tour packages with photos, reviews, and descriptions","Full booking lifecycle from discovery to payment","Day-of mobile itinerary access with trip details","Tour operator portal for listings, availability, and pricing"]',
  'Qatar tourism sector',
  'Completed',
  'Turismo — Travel & Tourism | BizBrew',
  'Tours and events booking app for tourism experiences — browse packages, book trips, and view itineraries.',
  '/project_booking.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'q-tables',
  'Q Tables',
  'Booking',
  '2019–2023',
  'Restaurant table reservation app — browse venues, select time slots, and manage bookings in Qatar.',
  'Q Tables simplifies restaurant reservations in Qatar, connecting diners with venues through a mobile-first booking experience. Users browse restaurants by cuisine, location, and availability, then reserve tables for specific dates and party sizes. The app handles real-time availability, confirmation workflows, and reminder notifications. Restaurant partners manage their table inventory, seating capacity, and blackout dates through the platform, ensuring accurate availability for customers.',
  '/project_booking.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Table reservations","Time slot selection","Booking history","Restaurant browsing","Reminder notifications"]',
  '["Real-time table availability across Qatar restaurants","Restaurant discovery by cuisine, location, and party size","Automated booking confirmations and reminder notifications","Restaurant-side table inventory and capacity management"]',
  'Restaurants in Qatar',
  'Completed',
  'Q Tables — Restaurant Reservations | BizBrew',
  'Restaurant table reservation app — browse venues, select time slots, and manage bookings in Qatar.',
  '/project_booking.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'salwa-beach-hilton',
  'Salwa Beach Hilton',
  'Hospitality',
  '2019–2023',
  'Restaurant app for Salwa Beach Hilton resort — menu browsing, table booking, and in-venue ordering.',
  'The Salwa Beach Hilton app enhances the dining experience at the resort by providing guests with digital menu access, table reservations, and in-venue ordering capabilities. Guests can browse restaurant menus before arriving, reserve tables for specific dining venues, and place orders directly from their phones. The app integrates with the resort''s hospitality systems, ensuring orders are routed correctly and table assignments coordinate with the kitchen and service staff.',
  '/project_restaurant.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Menu browsing","Table booking","In-venue ordering","Venue selection","Order routing"]',
  '["Digital menu browsing with full dish details and photos","In-venue ordering directly from guest phones","Table reservations across multiple resort dining venues","Order routing integrated with kitchen and service systems"]',
  'Salwa Beach Hilton',
  'Completed',
  'Salwa Beach Hilton — Restaurant App | BizBrew',
  'Restaurant app for Salwa Beach Hilton resort — menu browsing, table booking, and in-venue ordering.',
  '/project_restaurant.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'secc-employee',
  'SECC Employee App',
  'HR & Employee Management',
  '2019–2023',
  'Employee management app for SECC — profiles, attendance tracking, and core HR workflows.',
  'The SECC Employee App digitizes core HR workflows for the organization, giving employees mobile access to their profiles, attendance records, and leave management. Managers can track team attendance, approve leave requests, and access basic HR reports. The app replaces manual processes with digital workflows, reducing administrative overhead and improving record accuracy. The simple, focused feature set ensures high adoption across the workforce.',
  '/project_hr.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Employee profiles","Attendance tracking","Leave management","Manager approvals","HR reports"]',
  '["Mobile self-service for profiles, attendance, and leave requests","Manager approval workflows for leave and exceptions","Digital attendance logging replacing manual processes","Basic HR reporting and team oversight dashboards"]',
  'SECC',
  'Completed',
  'SECC Employee App | BizBrew',
  'Employee management app for SECC — profiles, attendance tracking, and core HR workflows.',
  '/project_hr.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'al-khor-sports-club',
  'Al Khor Sports Club',
  'HR & Employee Management',
  '2019–2023',
  'Employee management app for Al Khor Sports Club — staff records, attendance, and basic HR workflows.',
  'The Al Khor Sports Club employee app manages staff operations for one of Qatar''s established sports organizations. The platform handles employee profiles, daily attendance logging, and basic HR workflows like leave requests and schedule management. Designed for a sports club environment where staff work across various facilities and schedules, the app provides reliable attendance tracking regardless of check-in location.',
  '/project_hr.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Staff profiles","Attendance records","Leave requests","Schedule management","Multi-location support"]',
  '["Multi-facility attendance tracking across sports club locations","Digital leave request and approval workflows","Staff profiles with schedule and role management","Reliable check-in logging across varied work schedules"]',
  'Al Khor Sports Club',
  'Completed',
  'Al Khor Sports Club — Employee App | BizBrew',
  'Employee management app for Al Khor Sports Club — staff records, attendance, and basic HR workflows.',
  '/project_hr.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'clubsys',
  'ClubSys',
  'HR & Employee Management',
  '2019–2023',
  'Employee management solution for clubs and organizations — profiles, attendance, and role-based access.',
  'ClubSys is an employee management solution designed for clubs and membership organizations. The platform provides role-based access that adapts to different organizational structures — from front-desk staff to management. Employee profiles, attendance tracking, and basic HR workflows are accessible through a clean mobile interface. The role-based access system ensures that sensitive information is only visible to authorized personnel, maintaining appropriate data boundaries within the organization.',
  '/project_hr.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Employee profiles","Attendance tracking","Role-based access","HR workflows","Organizational structure"]',
  '["Role-based access adapting to different organizational levels","Data boundaries ensuring sensitive info is access-controlled","Employee profiles with attendance and HR workflow access","Flexible structure supporting diverse club and organization types"]',
  'Clubs & organizations',
  'Completed',
  'ClubSys — Employee Management | BizBrew',
  'Employee management solution for clubs and organizations — profiles, attendance, and role-based access.',
  '/project_hr.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'alnoor',
  'Alnoor Management',
  'Management',
  '2019–2023',
  'Operations and staff management app for Alnoor — handling staff records, HR flows, and daily operations.',
  'The Alnoor Management App brings operational oversight to mobile, covering staff management, basic HR workflows, and daily operational tracking. The platform is designed for a business that needs visibility into workforce operations without the complexity of an enterprise HR system. Staff profiles, attendance, and operational data are accessible through a straightforward mobile interface, giving management the information they need to run day-to-day operations efficiently.',
  '/project_management.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Staff management","HR workflows","Operational tracking","Daily reports","Management dashboard"]',
  '["Staff management with profiles and attendance tracking","Daily operational reporting and management dashboard","Basic HR workflows for leave and scheduling","Mobile-first interface for on-the-go oversight"]',
  'Alnoor',
  'Completed',
  'Alnoor Management | BizBrew',
  'Operations and staff management app for Alnoor — handling staff records, HR flows, and daily operations.',
  '/project_management.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'smdc-elearning',
  'SMDC E-Learning',
  'E-Learning',
  '2019–2023',
  'E-learning app with structured content delivery, quizzes, and student progress tracking.',
  'SMDC E-Learning delivers structured educational content through mobile, combining lessons, quizzes, and progress tracking in an engaging learning experience. The content management system supports various media types — text, images, and video — while the quiz engine provides immediate feedback and tracks performance over time. Student dashboards show learning progress, completed modules, and areas needing attention, helping both learners and educators understand where to focus effort.',
  '/project_education.jpg',
  '["Flutter","Firebase","REST APIs"]',
  '["iOS","Android"]',
  '["Learning content","Quizzes & assessments","Student tracking","Progress dashboards","Multi-media support"]',
  '["Multi-media content: text, images, and video lessons","Quiz engine with immediate feedback and scoring","Student progress dashboards for learners and educators","Structured modules with completion tracking"]',
  'Education sector',
  'Completed',
  'SMDC E-Learning | BizBrew',
  'E-learning app with structured content delivery, quizzes, and student progress tracking.',
  '/project_education.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'wondered',
  'WonderEd',
  'E-Learning',
  '2019–2023',
  'Interactive e-learning app for children — lessons, quizzes, and progress tracking with an engaging, kid-friendly interface.',
  'WonderEd makes learning fun for children through an interactive mobile app designed with kid-friendly interfaces and engaging content delivery. Lessons are structured as bite-sized modules with interactive elements, followed by quizzes that reinforce concepts through gamified assessment. Progress tracking gives parents and teachers visibility into learning outcomes, while the achievement system keeps young learners motivated. The UI is designed for small hands and developing motor skills, with large touch targets and intuitive navigation.',
  '/project_education.jpg',
  '["Flutter","REST APIs","Firebase"]',
  '["iOS","Android"]',
  '["Interactive lessons","Gamified quizzes","Progress tracking","Achievement system","Parent dashboard"]',
  '["Kid-friendly UI with large touch targets and intuitive navigation","Gamified quizzes with achievement badges and rewards","Parent and teacher dashboards for monitoring progress","Bite-sized lesson modules designed for children\\"]',
  'Education — children''s learning',
  'Completed',
  'WonderEd — Kids E-Learning | BizBrew',
  'Interactive e-learning app for children — lessons, quizzes, and progress tracking with an engaging, kid-friendly interface.',
  '/project_education.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'educate',
  'Educate',
  'Education',
  '2019–2023',
  'Education app providing learning content, user management, and basic assessment capabilities.',
  'Educate is a mobile learning platform that delivers educational content with integrated assessment capabilities. The app provides a structured learning path with content organized by subject and difficulty level. Users progress through lessons at their own pace, with periodic assessments measuring comprehension and retention. The platform supports multiple content formats and includes user account management for tracking individual learning journeys across devices.',
  '/project_education.jpg',
  '["Flutter","REST APIs","Firebase"]',
  '["iOS","Android"]',
  '["Learning content","User accounts","Assessments","Progress tracking","Multi-format content"]',
  '["Structured learning paths with progressive difficulty levels","Integrated assessments measuring comprehension and retention","Self-paced progress with cross-device sync","Multi-format content supporting diverse learning styles"]',
  'Education sector',
  'Completed',
  'Educate — Education App | BizBrew',
  'Education app providing learning content, user management, and basic assessment capabilities.',
  '/project_education.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'qgmd-stock',
  'QGMD Stock Management',
  'Inventory & Logistics',
  '2019–2023',
  'Stock and inventory management app for QGMD — tracking stock levels, movements, and generating reports.',
  'The QGMD Stock Management app digitizes inventory operations, replacing manual stock tracking with a mobile-first solution. The app tracks stock levels in real time, logs all inventory movements (receipts, transfers, and dispatches), and generates reports for management oversight. Barcode scanning integration speeds up stock counts and movement logging, while alerts notify managers when stock levels fall below configured thresholds. The reporting module provides insights into stock turnover, valuation, and movement patterns.',
  '/project_inventory.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Stock listing","Movement tracking","Reporting","Low-stock alerts","Barcode scanning"]',
  '["Real-time stock level tracking with movement logging","Barcode scanning for fast stock counts and transfers","Automated low-stock alerts with configurable thresholds","Reports on stock turnover, valuation, and movement patterns"]',
  'QGMD',
  'Completed',
  'QGMD Stock Management | BizBrew',
  'Stock and inventory management app for QGMD — tracking stock levels, movements, and generating reports.',
  '/project_inventory.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'moder-recycling',
  'Moder Recycling Factory',
  'Booking',
  '2019–2023',
  'Appointment booking app for Moder Recycling Factory — schedule visits, select time slots, and receive confirmations.',
  'The Moder Recycling Factory booking app streamlines the appointment scheduling process for customers needing recycling services. Users browse available time slots, book appointments for material drop-off or collection, and receive automated confirmations and reminders. The system manages facility capacity to prevent overcrowding and ensure efficient operations. Push notifications keep customers informed about their upcoming appointments and any schedule changes.',
  '/project_booking.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Appointment booking","Time slot selection","Push notifications","Capacity management","Booking history"]',
  '["Time slot browsing with real-time availability","Facility capacity management preventing overcrowding","Automated booking confirmations and reminders","Simple self-service booking accessible to all users"]',
  'Moder Recycling Factory',
  'Completed',
  'Moder Recycling Factory — Booking | BizBrew',
  'Appointment booking app for Moder Recycling Factory — schedule visits, select time slots, and receive confirmations.',
  '/project_booking.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'elite-recycling',
  'Elite Recycling',
  'Booking',
  '2019–2023',
  'Appointment booking app for Elite Recycling — manage bookings, time slots, and customer communications.',
  'The Elite Recycling booking app provides customers with a self-service appointment system for recycling services. The app displays available slots based on facility capacity, handles booking confirmations and cancellations, and sends timely reminders. The straightforward interface ensures that customers of all technical abilities can schedule appointments without assistance, reducing phone inquiries and walk-in congestion.',
  '/project_booking.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Appointment booking","Slot management","Confirmations","Reminder notifications"]',
  '["Self-service appointment booking with slot selection","Capacity-aware scheduling preventing overbooking","Accessible interface for all technical ability levels","Automated reminders reducing no-show rates"]',
  'Elite Recycling',
  'Completed',
  'Elite Recycling — Booking | BizBrew',
  'Appointment booking app for Elite Recycling — manage bookings, time slots, and customer communications.',
  '/project_booking.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'qbc-booking',
  'QBC Appointments',
  'Booking',
  '2019–2023',
  'Appointment booking solution for QBC — schedule visits, manage time slots, and receive notifications.',
  'QBC Appointments digitizes the booking process for the organization, providing customers with a mobile-first scheduling experience. The app manages available time slots, handles booking conflicts, and sends automated notifications for confirmations, reminders, and changes. The system integrates with the organization''s operational capacity, ensuring that appointment volumes align with staffing and resource availability.',
  '/project_booking.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Appointment booking","Time slot management","Push notifications","Conflict resolution"]',
  '["Mobile-first booking with available time slot browsing","Capacity-aware slot management aligned with staffing","Automated notifications from confirmation to completion","Conflict resolution preventing double-bookings"]',
  'QBC',
  'Completed',
  'QBC Appointments | BizBrew',
  'Appointment booking solution for QBC — schedule visits, manage time slots, and receive notifications.',
  '/project_booking.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'smaricar',
  'Smaricar',
  'Transport',
  '2019–2023',
  'Community transport app for church taxi booking — ride requests, pickup/drop locations, and status tracking.',
  'Smaricar is a purpose-built transport app for church community taxi services. Members request rides by specifying pickup and drop-off locations, and drivers are matched based on availability and route proximity. The Maps SDK integration provides accurate location services and routing, while ride status tracking keeps passengers informed. The app serves a specific community need, providing reliable transportation for members who may not have access to mainstream ride-hailing services.',
  '/project_transport.jpg',
  '["Flutter","REST APIs","Maps SDK"]',
  '["iOS","Android"]',
  '["Ride booking","Pickup & drop locations","Ride status tracking","Driver matching","Map integration"]',
  '["Ride booking with pickup and drop-off location selection","Map integration for accurate routing and location services","Driver matching based on availability and proximity","Real-time ride status tracking for passengers"]',
  'Church community',
  'Completed',
  'Smaricar — Community Transport | BizBrew',
  'Community transport app for church taxi booking — ride requests, pickup/drop locations, and status tracking.',
  '/project_transport.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'fintech-app',
  'Fintech Dashboard',
  'Fintech',
  '2019–2023',
  'Financial application for managing accounts, viewing transactions, and accessing financial dashboards.',
  'The Fintech Dashboard app provides users with a secure interface for viewing and managing financial data. The dashboard presents account summaries, transaction histories, and financial analytics in an easy-to-understand format. The app prioritizes data security with appropriate authentication and encryption measures. Transaction categorization and spending insights help users understand their financial patterns, while the clean interface makes complex financial data accessible.',
  '/project_fintech.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Financial dashboard","Transaction history","Account management","Spending analytics","Secure authentication"]',
  '["Secure authentication and encrypted data presentation","Transaction categorization with spending pattern insights","Account summaries and financial analytics dashboard","Mobile-first interface for on-the-go financial management"]',
  'Financial sector',
  'Completed',
  'Fintech Dashboard | BizBrew',
  'Financial application for managing accounts, viewing transactions, and accessing financial dashboards.',
  '/project_fintech.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'thahab',
  'Thahab',
  'Auction',
  '2019–2023',
  'Live auction app with real-time bidding — join auctions, place bids, and track bid history.',
  'Thahab brings live auctions to mobile with real-time bidding powered by WebSocket connections. Users browse upcoming and active auctions, join live sessions, and place competitive bids with instant feedback on bid status. The WebSocket architecture ensures sub-second bid updates across all connected participants, maintaining auction integrity. Bid history provides full transparency, while push notifications alert users about auctions of interest and outbid notifications.',
  '/project_auction.jpg',
  '["Flutter","WebSockets","REST APIs"]',
  '["iOS","Android"]',
  '["Auction listing","Live bidding","Bid history","Real-time updates","Outbid notifications"]',
  '["Real-time bidding via WebSockets with sub-second updates","Transparent bid history for full auction integrity","Push notifications for auction alerts and outbid warnings","Live auction sessions with instant bid feedback"]',
  'Qatar market',
  'Completed',
  'Thahab — Live Auction | BizBrew',
  'Live auction app with real-time bidding — join auctions, place bids, and track bid history.',
  '/project_auction.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'analyzer',
  'Analyzer',
  'Real Estate',
  '2019–2023',
  'Real estate app for listing, browsing, and analyzing properties with map integration and advanced filters.',
  'Analyzer is a real estate platform that combines property listings with analytical tools, helping buyers and investors make informed decisions. The app features property browsing with map-based discovery, advanced filters (price, size, location, type), and detailed property pages with photos, specifications, and neighborhood information. The Maps SDK integration provides visual property exploration, while analytics features help users compare properties and assess investment potential.',
  '/project_realestate.jpg',
  '["Flutter","REST APIs","Maps SDK"]',
  '["iOS","Android"]',
  '["Property listings","Map view","Advanced filters","Property analytics","Photo galleries"]',
  '["Map-based property discovery with visual exploration","Advanced filters by price, size, location, and property type","Property comparison and investment analysis tools","Detailed listings with photos, specs, and neighborhood info"]',
  'Real estate sector',
  'Completed',
  'Analyzer — Real Estate | BizBrew',
  'Real estate app for listing, browsing, and analyzing properties with map integration and advanced filters.',
  '/project_realestate.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'gulf-psychology',
  'Gulf Psychology',
  'Healthcare',
  '2019–2023',
  'App for Gulf Psychology providing service information, practitioner profiles, and appointment booking.',
  'The Gulf Psychology app serves as a digital front door for the practice, providing potential and existing clients with service information, practitioner profiles, and appointment booking capabilities. The app presents psychology services in an approachable, non-clinical format, helping reduce barriers to seeking mental health support. Practitioner profiles showcase qualifications and specialties, while the booking system handles scheduling with appropriate privacy measures for healthcare appointments.',
  '/project_healthcare.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Service information","Practitioner profiles","Appointment booking","Contact features","Privacy-aware design"]',
  '["Approachable, non-clinical presentation of psychology services","Privacy-aware appointment booking for sensitive healthcare","Practitioner profiles with qualifications and specialties","Direct contact and booking capabilities from the app"]',
  'Gulf Psychology',
  'Completed',
  'Gulf Psychology | BizBrew',
  'App for Gulf Psychology providing service information, practitioner profiles, and appointment booking.',
  '/project_healthcare.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'tylos-pharmacy',
  'Tylos Pharmacy Group',
  'Healthcare & E-Commerce',
  '2019–2023',
  'Pharmacy app for browsing products, searching medications, and placing orders or inquiries.',
  'The Tylos Pharmacy Group app combines pharmacy product browsing with ordering capabilities, serving customers across the pharmacy group''s locations. The product catalog includes medications, health products, and personal care items with search and category browsing. Customers can check product availability, place orders for pickup, and submit prescription inquiries. The app integrates with the pharmacy''s inventory system to show real-time stock information across locations.',
  '/project_healthcare.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Pharmacy catalog","Product search","Order placement","Prescription inquiries","Multi-location stock"]',
  '["Multi-location product browsing with real-time stock info","Order placement for pickup across pharmacy locations","Prescription inquiry submission for customer convenience","Searchable catalog covering medications and health products"]',
  'Tylos Pharmacy Group',
  'Completed',
  'Tylos Pharmacy Group | BizBrew',
  'Pharmacy app for browsing products, searching medications, and placing orders or inquiries.',
  '/project_healthcare.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'qhr-job-portal',
  'QHR Job Portal',
  'Job Portal',
  '2017–2023',
  'Job portal app connecting employers and job seekers — post vacancies, search jobs, and manage applications.',
  'QHR is a job portal connecting employers with job seekers in the Qatar market. Employers post vacancies with detailed descriptions, requirements, and compensation information, while job seekers browse, filter, and apply to positions that match their skills and experience. The application tracking system gives both parties visibility into the hiring process. Resume management, saved searches, and job alerts help seekers stay on top of opportunities, while employer dashboards provide applicant management and basic hiring analytics.',
  '/project_jobs.jpg',
  '["Flutter","REST APIs","Firebase"]',
  '["iOS","Android"]',
  '["Job listings","Application tracking","Resume management","Employer dashboard","Job alerts","Search & filters"]',
  '["Two-sided marketplace for employers and job seekers","Application tracking with status visibility for both parties","Job alerts and saved searches for proactive discovery","Employer dashboard with applicant management and analytics"]',
  'Qatar market',
  'Completed',
  'QHR Job Portal | BizBrew',
  'Job portal app connecting employers and job seekers — post vacancies, search jobs, and manage applications.',
  '/project_jobs.jpg',
  NULL
);

INSERT INTO projects (slug, name, category, year, summary, description, image, stack, platforms, features, highlights, client, status, seo_title, seo_description, seo_image, seo_keywords) VALUES (
  'top-jobs-in',
  'Top Jobs In',
  'Job Portal',
  '2017–2023',
  'Job portal app for browsing vacancies, submitting applications, and tracking hiring progress.',
  'Top Jobs In is a job portal focused on making the job search process simple and efficient. The app presents job listings in a clean, browsable format with smart filters for industry, location, experience level, and salary range. One-tap applications with stored profiles reduce friction for job seekers, while the notification system keeps users informed about application status changes and new matching positions. The platform serves both active job seekers and passive candidates looking for their next opportunity.',
  '/project_jobs.jpg',
  '["Flutter","REST APIs"]',
  '["iOS","Android"]',
  '["Job browsing","One-tap applications","Application tracking","Smart filters","Job notifications"]',
  '["Smart filters by industry, location, experience, and salary","One-tap applications with stored profile data","Application status notifications for real-time updates","Job matching and alerts for new matching positions"]',
  'Job seekers & employers',
  'Completed',
  'Top Jobs In | BizBrew',
  'Job portal app for browsing vacancies, submitting applications, and tracking hiring progress.',
  '/project_jobs.jpg',
  NULL
);
