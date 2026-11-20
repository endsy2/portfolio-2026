// All site text lives here. Edit this file to change what the site says.

export const profile = {
  name: "Chin Kong Ming",
  role: "Full Stack Developer",
  location: "Phnom Penh, Cambodia",
  tagline: "builds banking and business systems end to end.",
  stack: "Java 17 · Spring Boot · PostgreSQL · Oracle · Redis · RabbitMQ",
  email: "kongming434@gmail.com",
  github: "https://github.com/endsy2",
  linkedin: "", // TODO: add LinkedIn URL
  intro: "I’m a full-stack developer in Phnom Penh. I build Spring Boot and Next.js apps, secure them with JWT and role-based access, and write the SQL behind banking reports.",
  about: "I speak Khmer (native), Chinese and English (upper intermediate). I taught Chinese for three years and now use it to work directly with our CTO and a core banking vendor. I work closely with frontend developers, DevOps and business teams, review code, and document APIs.",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "java & spring", items: ["Java 17+", "Spring Boot", "Spring MVC", "Spring Data JPA", "Hibernate", "Spring Security"] },
  { group: "apis & security", items: ["REST APIs", "Third-party integrations", "JWT", "RBAC", "Audit logging", "API docs"] },
  { group: "data & messaging", items: ["PostgreSQL", "MySQL", "Oracle SQL", "PL/SQL", "Redis", "RabbitMQ", "Milvus"] },
  { group: "practices", items: ["OOP", "SOLID", "Design patterns", "Code review", "Debugging"] },
  { group: "build & deploy", items: ["Git", "Maven", "Gradle", "Docker", "GitHub Actions", "CI/CD", "Linux", "Postman"] },
  { group: "other stacks", items: ["TypeScript", "Node.js", "Express", "Next.js", "React", "Laravel", "Python", "FastAPI"] },
  { group: "learning", items: ["Kubernetes", "Helm", "Jenkins"] },
];

export const experience = [
  {
    org: "VTECH Co., Ltd.", role: "Software Engineer", period: "Sep 2026 – now",
    points: [
      "Build the internal management system for HR, payroll, finance, procurement and IT assets (~70 staff) in TypeScript, Next.js and PostgreSQL.",
      "Built role-based permissions and approval workflows with separation of duties, plus audit logs and access controls for sensitive employee and financial data.",
      "Implemented payroll calculations, expense and funding records, asset tracking, and employee onboarding and offboarding.",
      "Integrated the Telegram Bot API for notifications, and clarified requirements and design in Chinese with the CTO.",
    ],
  },
  {
    org: "Asia-Pacific Development Bank", role: "Backend Developer", period: "2025 – 2026",
    points: [
      "Designed and built Spring Boot REST APIs for project, board, sprint and issue management, consumed by the web frontend.",
      "Modelled entities with Spring Data JPA and Hibernate, with dynamic filtering and search on JPA Specifications.",
      "Added Spring Security and JWT auth with role-based permissions at project, board and issue level.",
      "Built a RabbitMQ notification service for assignments, comments and due dates, plus configurable custom fields per issue type.",
      "Improved performance with Redis caching and tuned SQL, and connected dashboard statistics APIs to Metabase.",
      "Agreed API contracts with frontend developers, wrote API docs, reviewed teammates' code and worked with DevOps on deployment.",
      "Built a scheduled Java file sender that streams files to an SFTP server.",
    ],
  },
  {
    org: "Asia-Pacific Development Bank", role: "Reporting Developer", period: "2025 · 5 months",
    points: [
      "Wrote and tuned complex SQL and PL/SQL for fixed deposit, loan, banking operations and regulatory reports on Oracle.",
      "Gathered requirements from Finance, Loan Operations and business teams, and clarified core banking tables with the vendor in Chinese.",
      "Prepared deployment scripts, supported releases through UAT, pre-production and production, and resolved production issues.",
    ],
  },
  {
    org: "Mawarid Tech Academy", role: "Full Stack Developer Intern", period: "2025 · 2 months",
    points: ["Designed the MySQL database and built CRUD features, Admin and Teacher authentication, and score reporting for a Laravel school management system."],
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
  flow?: { title: string; steps: string[]; example?: string; note?: string };
  problemGallery?: Gallery;
  bookingDecision?: string;
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
    role: "I worked with VTECH’s CTO in Chinese to turn HR and finance requirements into employee screens, approval rules, and PostgreSQL records.",
    problem:
      "HR and finance kept records in spreadsheets and approved requests in chat. It was hard to trace who had approved a request or control who could see salary details.",
    built: [
      "I built the employee portal in Khmer, English, and Chinese, with Telegram notifications for staff.",
      "I implemented server-side permission checks and an audit trail for approvals and sensitive payroll and finance records.",
      "I automated payroll calculations and built tools to track expenses, funding, and IT assets through onboarding and offboarding.",
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
      example: "Take an expense request. An employee submits it through the portal. Their manager reviews and approves it, then finance verifies it. The system records the outcome and sends a notification. HR handles verification for HR requests.",
      note: "The server checks both the user’s role and who filed the request. Even a manager with approval permission cannot approve their own submission. Each step leaves an audit record.",
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
    role: "I built the backend services, Bakong payment integration, and React admin dashboard. My teammate built the Flutter passenger app using those APIs.",
    summary:
      "Passengers in Cambodia can choose a seat, see live availability, and pay with Bakong KHQR.",
    stack: ["Spring Boot", "Spring Cloud Gateway", "React", "PostgreSQL", "Redis", "RabbitMQ", "MinIO", "WebSocket", "Docker", "Kubernetes"],
    stat: "5 microservices",
    repo: "https://github.com/endsy2/GO-BUS",
    cover: { src: g("m-seat-user1"), caption: "Seat selection" },
    problem:
      "Two passengers can open the same departure while seat A1 is still available. One selects it. The other needs to see the hold, even if their seat map was already open.",
    built: [
      "Five Spring Boot services (registry, gateway, user, bus, booking), each owning its own PostgreSQL schema.",
      "An API gateway that validates RS256 JWTs, rate-limits requests and trips circuit breakers. Clients never call a service directly.",
      "Live seat maps use STOMP over WebSocket to show selections and releases to passengers viewing the same departure.",
      "Bakong KHQR payments with a dedicated circuit breaker and a 5-minute payment poll, plus an in-app wallet with a PIN.",
      "RabbitMQ notifications, Redis caching and token blacklisting, and MinIO image storage.",
      "React admin dashboard with RBAC, and Docker / Kubernetes deployment.",
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
      note: "If a passenger leaves without booking, a cleanup job checks every minute for holds older than five minutes. It releases the seats and broadcasts their availability.",
    },
    bookingDecision: "A seat map can go stale between a tap and checkout. The booking service asks the database to mark a seat booked only if it is still available or held by that passenger. If two booking requests reach the same seat, the later update cannot overwrite a completed booking. The service checks how many seats changed and rejects the request if it could not book them all.",
    problemGallery: {
      title: "One departure, two seat maps",
      device: "phone",
      shots: [
        { src: g("m-seat-user1"), caption: "Passenger A has selected A1 and B1. Both seats appear pink on this phone." },
        { src: g("m-seat-user2"), caption: "On passenger B’s phone, A1 and B1 appear orange. Another passenger is holding them." },
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
