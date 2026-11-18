// All site text lives here. Edit this file to change what the site says.

export const profile = {
  name: "Chin Kong Ming",
  role: "Full Stack Developer",
  location: "Phnom Penh, Cambodia",
  tagline: "builds banking and business systems end to end.",
  stack: "Java · Spring Boot · Next.js · PostgreSQL · Oracle",
  email: "kongming434@gmail.com",
  github: "https://github.com/endsy2",
  linkedin: "", // TODO: add LinkedIn URL
  langs: ["km", "en", "中文"],
  intro: "I’m a full-stack developer with commercial experience since 2025.",
  about: [
    "I'm Kong Ming, a full stack developer from Phnom Penh. I like building the systems a business runs on every day: approval flows, permissions, payroll and reports that have to be right every time.",
    "Since 2025 I've worked across the whole stack. At Asia-Pacific Development Bank I built Spring Boot APIs for a task tracking system and wrote Oracle SQL and PL/SQL for regulatory reports. At VTECH I build the internal platform the company uses for HR, payroll, finance and assets, in Next.js and PostgreSQL.",
    "I speak Khmer, English and Chinese. I taught Chinese for three years, and today I use it to work directly with a Chinese CTO and a core banking vendor. Outside work I'm learning machine learning, starting with image search.",
  ],
  facts: [
    { k: "based in", v: "Phnom Penh, Cambodia" },
    { k: "languages", v: "Khmer · English · 中文" },
    { k: "focus", v: "Banking and enterprise systems" },
    { k: "learning", v: "Machine learning, image search" },
    { k: "open to", v: "Full stack and backend roles" },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: "frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { group: "backend", items: ["Java", "Spring Boot", "JPA / Hibernate", "Node.js", "Express", "Laravel"] },
  { group: "data", items: ["PostgreSQL", "Oracle PL/SQL", "MySQL", "Drizzle", "Prisma", "Redis", "RabbitMQ"] },
  { group: "security", items: ["JWT", "RBAC", "Approval workflows", "Audit logging"] },
  { group: "devops", items: ["Docker", "Kubernetes", "GitHub Actions", "Linux", "MinIO"] },
  { group: "ml", items: ["Python", "PyTorch", "CLIP", "FastAPI", "Milvus"] },
];

export const experience = [
  {
    org: "VTECH Co., Ltd.", role: "Software Engineer", period: "Sep 2026 – now",
    points: [
      "Build the company's internal platform for HR, payroll, finance, procurement and IT assets, end to end in Next.js and PostgreSQL.",
      "Designed role-based permissions, approval workflows with separation of duties, and audit logs for sensitive data.",
      "Work directly with the company's Chinese CTO, in Chinese, to clarify requirements.",
    ],
  },
  {
    org: "Asia-Pacific Development Bank", role: "Backend Developer", period: "2025 – 2026",
    points: [
      "Built Spring Boot REST APIs for a task tracking system: projects, boards, sprints and issues.",
      "Added JWT auth with permissions at three levels, RabbitMQ notifications and Redis caching.",
      "Built a scheduled Java file sender that streams files to an SFTP server.",
    ],
  },
  {
    org: "Asia-Pacific Development Bank", role: "Reporting Developer", period: "2025 · 5 months",
    points: [
      "Wrote and tuned SQL and PL/SQL for fixed deposit, loan and regulatory reports on Oracle.",
      "Clarified core banking tables with the vendor in Chinese, and supported releases from UAT to production.",
    ],
  },
  {
    org: "Mawarid Tech Academy", role: "Full Stack Developer Intern", period: "2025 · 2 months",
    points: ["Built a Laravel and MySQL school management system: classes, teachers, timetables and score reports."],
  },
];

export const education = [
  { name: "Bachelor of IT Engineering", org: "Royal University of Phnom Penh", period: "2022 – 2026", icon: "🎓" },
  { name: "Techpreneur Bootcamp", org: "Dichi Academic", period: "2026 – now", icon: "🚀" },
];

// ---- Projects -------------------------------------------------------------

export type Layer = string[]; // boxes side by side
export type Shot = { src: string; caption: string };
export type Gallery = { title: string; device: "phone" | "browser"; shots: Shot[] };

export type Project = {
  slug: string;
  kind: "work" | "personal";
  title: string;
  org: string;
  period?: string;
  summary: string;
  stat?: string;
  stack: string[];
  repo?: string;
  cover?: Shot; // card image
  role?: string; // what I did on a team project
  problem: string;
  built: string[];
  architecture: { title: string; layers: Layer[]; note?: string };
  flow?: { title: string; steps: string[]; note?: string };
  problemGallery?: Gallery;
  galleries?: Gallery[];
  confidential?: boolean;
};

const g = (f: string) => `/projects/gobus/${f}.jpg`;
const p = (f: string) => `/projects/phoneshop/${f}.jpg`;

export const projects: Project[] = [
  {
    slug: "vtech-management-system",
    kind: "work",
    title: "Internal Management System",
    org: "VTECH Co., Ltd.",
    period: "2026 – now",
    summary:
      "One platform for HR, attendance, leave, payroll, finance, procurement and IT assets.",
    stat: "~70 staff on the system",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Telegram Bot"],
    problem:
      "HR, payroll, finance and asset records lived in separate spreadsheets and chats. Approvals were informal, and sensitive salary data had no access control or audit trail.",
    built: [
      "Built features end to end, from the Next.js interface to backend logic and PostgreSQL with Drizzle ORM.",
      "Role-based permissions and approval workflows with separation of duties: nobody can approve their own request.",
      "Audit logs and access controls for sensitive employee and financial data.",
      "Automated payroll calculations, expense and funding records, asset tracking, and onboarding and offboarding workflows.",
      "Employee portal in Khmer, English and Chinese, with Telegram notifications.",
      "Clarified requirements and technical details directly with the company's Chinese CTO, in Chinese.",
    ],
    architecture: {
      title: "System overview",
      layers: [
        ["Employee portal · KH / EN / 中文", "Admin and finance screens"],
        ["Next.js server logic · RBAC check on every action"],
        ["PostgreSQL via Drizzle ORM", "Audit log", "Telegram notifications"],
      ],
    },
    flow: {
      title: "Approval workflow",
      steps: ["Employee submits request", "Manager approves", "Finance / HR verifies", "Recorded and notified"],
      note: "Separation of duties: the requester can never approve their own request. Every step is written to the audit log.",
    },
    confidential: true,
  },
  {
    slug: "apdb-task-tracking",
    kind: "work",
    title: "Task Tracking System",
    org: "Asia-Pacific Development Bank",
    period: "2025 – 2026",
    summary:
      "A Jira-style project, board, sprint and issue tracker for bank teams, plus a scheduled SFTP file sender and Oracle regulatory reports.",
    stack: ["Java", "Spring Boot", "Spring Data JPA", "PostgreSQL", "RabbitMQ", "Redis", "JWT", "Metabase", "Oracle PL/SQL"],
    problem:
      "Bank teams needed an internal tool to plan and track work, with permissions strict enough for a regulated environment and dashboards for management.",
    built: [
      "REST APIs in Java and Spring Boot for project, board, sprint and issue management.",
      "Entity model with Spring Data JPA and Hibernate, with dynamic filtering and search built on JPA Specifications.",
      "JWT authentication, with role-based permissions at project, board and issue level.",
      "RabbitMQ notification service for assignments, comments and due-date reminders.",
      "Configurable custom fields for each issue type.",
      "Redis caching, tuned SQL, and dashboard statistics APIs connected to Metabase.",
      "Also at the bank: a scheduled Java file sender that streams files to SFTP, and complex SQL / PL-SQL for fixed deposit, loan and regulatory reports, released through UAT and pre-production to production.",
    ],
    architecture: {
      title: "System overview",
      layers: [
        ["Web frontend (agreed API contract)", "Metabase dashboards"],
        ["Spring Boot REST API · JWT · project / board / issue RBAC"],
        ["PostgreSQL · JPA Specifications", "Redis cache", "RabbitMQ"],
        ["Notification consumer · assignments, comments, due dates"],
      ],
    },
    flow: {
      title: "Permission model",
      steps: ["Project role", "Board role", "Issue permission", "Allowed action"],
      note: "Each request is checked at three levels, so a user can manage one board without seeing another team's issues.",
    },
    confidential: true,
  },
  {
    slug: "go-bus",
    kind: "personal",
    title: "GoBus Express",
    org: "Final-year thesis · team project",
    role: "My part: backend microservices, payments and the React admin. The Flutter app was built by a teammate on top of my APIs.",
    summary:
      "Bus booking for Cambodia: real-time seat locking so two people can never book the same seat, and payment with Bakong KHQR.",
    stack: ["Spring Boot", "Spring Cloud Gateway", "React", "PostgreSQL", "Redis", "RabbitMQ", "MinIO", "WebSocket", "Docker", "Kubernetes"],
    stat: "5 microservices",
    repo: "https://github.com/endsy2/GO-BUS",
    cover: { src: g("m-seat-user1"), caption: "Seat selection" },
    problem:
      "Many people book the same popular routes at the same moment. Without locking, two customers can pay for one seat. Payments also need to work with Cambodia's national KHQR standard.",
    built: [
      "Five Spring Boot services (registry, gateway, user, bus, booking), each owning its own PostgreSQL schema.",
      "An API gateway that validates RS256 JWTs, rate-limits requests and trips circuit breakers. Clients never call a service directly.",
      "Real-time seat booking with pessimistic locks and a seat state machine, broadcast to every open app over STOMP WebSockets.",
      "Bakong KHQR payments with a dedicated circuit breaker and a 5-minute payment poll, plus an in-app wallet with a PIN.",
      "RabbitMQ notifications, Redis caching and token blacklisting, and MinIO image storage.",
      "React admin dashboard with RBAC, and Docker / Kubernetes deployment.",
      "The Flutter customer app was built by a teammate on top of these APIs.",
    ],
    architecture: {
      title: "Architecture",
      layers: [
        ["Flutter mobile app (teammate)", "React admin dashboard"],
        ["API Gateway :8080 · JWT RS256 · rate limit · circuit breaker"],
        ["User service", "Bus service", "Booking service"],
        ["PostgreSQL", "Redis", "RabbitMQ", "MinIO"],
      ],
      note: "Eureka handles service discovery. The gateway injects user id, roles and permissions as headers for downstream services.",
    },
    flow: {
      title: "Seat state machine",
      steps: ["AVAILABLE", "PENDING · 5 min hold", "BOOKED"],
      note: "A pessimistic lock guards the AVAILABLE → PENDING step. An unpaid PENDING seat expires back to AVAILABLE, and every change is pushed to all clients over WebSocket.",
    },
    problemGallery: {
      title: "Two users, same route, same moment",
      device: "phone",
      shots: [
        { src: g("m-seat-user1"), caption: "User 1 selects A1, B1, C1 (yellow)" },
        { src: g("m-seat-user2"), caption: "User 2 sees them as pending (pink)" },
      ],
    },
    galleries: [
      {
        title: "Booking with Bakong KHQR",
        device: "phone",
        shots: [
          { src: g("m-home"), caption: "Home" },
          { src: g("m-route"), caption: "Pick a route" },
          { src: g("m-payment"), caption: "Trip summary" },
          { src: g("m-khqr"), caption: "Scan KHQR" },
          { src: g("m-success"), caption: "Paid" },
        ],
      },
      {
        title: "Wallet and refunds",
        device: "phone",
        shots: [
          { src: g("m-wallet"), caption: "Wallet top-ups" },
          { src: g("m-pin"), caption: "Pay with PIN" },
          { src: g("m-refund-confirm"), caption: "Request refund" },
          { src: g("m-refund-detail"), caption: "Refund approved" },
        ],
      },
      {
        title: "Admin dashboard",
        device: "browser",
        shots: [
          { src: g("a-dashboard"), caption: "Operational overview" },
          { src: g("a-bookings"), caption: "Bookings" },
          { src: g("a-create-booking"), caption: "Book seats for a customer" },
          { src: g("a-layout"), caption: "Seat layout editor" },
          { src: g("a-fleet"), caption: "Bus fleet" },
          { src: g("a-routes"), caption: "Routes" },
          { src: g("a-customers"), caption: "Customers" },
          { src: g("a-reports"), caption: "Reports and Excel export" },
          { src: g("a-rbac"), caption: "Roles and permissions" },
        ],
      },
    ],
  },
  {
    slug: "genius-store",
    kind: "personal",
    title: "Genius Store",
    org: "Personal project",
    summary:
      "A full e-commerce platform for phones and gadgets: storefront, admin panel and REST API, with Bakong KHQR payments and live chat.",
    stack: ["React", "Redux Toolkit", "Tailwind CSS", "Express 5", "Prisma", "MySQL", "Docker"],
    repo: "https://github.com/endsy2/PhoneShop-website",
    cover: { src: p("storefront"), caption: "Storefront" },
    problem:
      "A phone shop needs more than a product list: variants by colour and storage, time-limited promotions, payment checks and order tracking, all managed by staff without touching code.",
    built: [
      "Storefront with categories, brands, search, colour and storage variants, and live deal prices.",
      "Cart, favourites, and compare up to 3 phones side by side with the differences highlighted.",
      "Checkout with cash on delivery or Bakong KHQR, plus order history, receipts and cancellation.",
      "Reviews with helpful votes, live chat with the store, and notifications.",
      "Admin panel: revenue dashboard, products and variants, orders, payment confirmation, promotions with start and end dates, and RBAC.",
      "JWT access and refresh tokens in HTTP-only cookies with automatic refresh, and a one-command Docker setup.",
    ],
    architecture: {
      title: "Architecture",
      layers: [
        ["Storefront · React + Redux", "Admin panel · React"],
        ["Express 5 REST API · Prisma · JWT in HTTP-only cookies"],
        ["MySQL 8", "Bakong KHQR", "Uploads"],
      ],
    },
    galleries: [
      {
        title: "Shopping",
        device: "browser",
        shots: [
          { src: p("storefront"), caption: "Storefront" },
          { src: p("product-detail"), caption: "Pick storage and colour" },
          { src: p("product-reviews"), caption: "Reviews" },
          { src: p("compare"), caption: "Compare up to 3 phones" },
          { src: p("checkout"), caption: "Checkout with KHQR" },
          { src: p("my-orders"), caption: "My orders" },
        ],
      },
      {
        title: "Running the store",
        device: "browser",
        shots: [
          { src: p("admin-dashboard"), caption: "Dashboard" },
          { src: p("admin-orders"), caption: "Orders" },
          { src: p("admin-order-detail"), caption: "Order detail and payment check" },
          { src: p("admin-promotions"), caption: "Promotions" },
        ],
      },
    ],
  },
  {
    slug: "clip-fashion-search",
    kind: "personal",
    title: "Fashion Search with CLIP",
    org: "Personal project",
    summary:
      "Search fashion products by typing a description or uploading a photo, using CLIP embeddings and a Milvus vector index.",
    stat: "44,441 products indexed",
    stack: ["Python", "PyTorch", "Hugging Face", "pandas", "FastAPI", "Milvus", "Docker", "pytest"],
    repo: "https://github.com/endsy2/image-searching",
    problem:
      "Keyword search fails when shoppers can't name what they want. The goal was to search by meaning or by image, on a messy real-world catalogue.",
    built: [
      "An audited cleaning pipeline that repaired malformed CSV rows, quarantined invalid records and checked that no records were lost.",
      "SHA-256 image hashes found 1,431 products with duplicate images.",
      "Frozen CLIP ViT-B/32 encoded the catalogue into an 88,875-row index of image and title embeddings.",
      "Measured CLIP's modality gap: title scores spread about 3× wider than image scores, so a naive 50/50 sum lets titles dominate. Per-modality score normalisation fixes it.",
      "Three fusion strategies to compare: normalised weighted sum, reciprocal rank fusion and raw sum. Build manifests block stale indexes from being served.",
      "Exact NumPy and Milvus backends behind one interface, with identical top-10 results on all 32 evaluation queries.",
      "A validated FastAPI REST API, deployed with Docker Compose and covered by 85 automated tests.",
      "Measured on CPU only: text queries in about 37 ms, image queries in about 56 ms, and a cold start in 8.8 s.",
    ],
    architecture: {
      title: "Pipeline",
      layers: [
        ["Raw CSV + images"],
        ["Clean · quarantine · SHA-256 dedupe"],
        ["CLIP ViT-B/32 · 88,875 embeddings"],
        ["NumPy exact search", "Milvus vector index"],
        ["FastAPI · text or image query"],
      ],
    },
    flow: {
      title: "How a query is ranked",
      steps: ["Encode query with CLIP", "Score all 88,875 vectors", "Group by product", "Fuse image + title scores", "Top 10 products"],
      note: "No ANN index is needed: scoring the whole table is one 88,875 × 512 matrix-vector product, a few milliseconds. Most of the latency is the CLIP forward pass.",
    },
  },
];
