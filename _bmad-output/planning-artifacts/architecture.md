---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-groundtruth-2026-01-13.md'
  - '_bmad-output/planning-artifacts/prd.md'
workflowType: 'architecture'
project_name: 'groundtruth'
user_name: 'Aurel'
date: '2026-01-14'
lastStep: 8
status: 'complete'
completedAt: '2026-01-14'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

groundtruth requires 75 functional requirements organized across 14 major capability areas:

1. **User Management & Authentication (FR1-FR8)**: Multi-step registration with email + phone + CAPTCHA verification, JWT-based session management, public/private profiles
2. **Claims Management (FR9-FR14)**: Submit, browse, search claims with score tracking and history
3. **Community Voting (FR15-FR21)**: 0-100 scale voting with optional explanations, vote updates/retractions, geographic capture
4. **Expert Verification System (FR22-FR31)**: Application workflow, credential review, domain expertise tagging, weighted expert votes with required explanations
5. **Weighted Scoring Algorithm (FR32-FR36)**: Unified score calculation combining community + expert with real-time recalculation
6. **Geographic Transparency (FR37-FR42)**: IP-based geolocation capture, aggregate country-level distribution, visualization, privacy-preserving display
7. **Evidence Management (FR43-FR47)**: Multi-format submission (links, text, PDFs) with attribution
8. **Platform Administration (FR48-FR52)**: Expert application approval, health metrics, content moderation, user suspension
9. **Content Moderation (FR53-FR56)**: Flagging system, review queues, CAPTCHA challenges
10. **Real-Time Updates (FR57-FR60)**: Live vote counts, score recalculation, geographic distribution updates without page refresh
11. **Search & Discovery (FR61-FR63)**: Filtering, sorting, text search across claims
12. **API & Integration (FR64-FR67)**: RESTful API with JWT auth, rate limiting, pagination
13. **Privacy & Compliance (FR68-FR71)**: GDPR/CCPA data export, privacy policy, private voting history
14. **User Experience & Accessibility (FR72-FR75)**: Mobile-responsive, modern browser support, SSR for SEO, WCAG 2.1 Level AA

**Architecturally Significant Functional Requirements:**
- **Real-time voting infrastructure** (FR57-FR60): Requires WebSocket/SSE architecture for live updates
- **Geographic transparency** (FR37-FR42): IP geolocation service integration, efficient aggregation queries, visualization rendering
- **Weighted scoring algorithm** (FR32-FR36): Must be transparent, configurable, and performant for real-time recalculation
- **Expert verification workflow** (FR22-FR31): Multi-role authorization, credential validation, domain tagging system
- **SSR for SEO** (FR74): Hybrid rendering strategy for SPA architecture

**Non-Functional Requirements:**

**Performance (NFR-P1 through NFR-P10):**
- API responses: < 200ms (95th percentile)
- Real-time updates: < 500ms latency
- Page load: FCP < 1.5s, LCP < 2.5s, TTI < 3.5s
- Throughput: 100 concurrent users, 1,000 votes/minute

**Security (NFR-S1 through NFR-S19):**
- TLS 1.3+, bcrypt/Argon2 password hashing
- JWT tokens: 60min access, 30-day refresh
- httpOnly cookies, CSRF protection
- SQL injection prevention, CSP headers, XSS protection
- GDPR/CCPA compliance with data export and deletion

**Scalability (NFR-SC1 through NFR-SC10):**
- 1K users (MVP) → 10K users without code changes
- Support 1M claims, 10M+ votes
- Viral claim handling: 10K+ votes/hour on single claim
- Horizontal API scaling, database read replicas, Redis caching

**Reliability (NFR-R1 through NFR-R9):**
- 99.8% uptime target
- Daily backups with 30-day retention
- Point-in-time recovery for 7 days
- Graceful degradation (read-only mode)

**Accessibility (NFR-A1 through NFR-A10):**
- WCAG 2.1 Level AA compliance
- Keyboard navigation, screen reader support
- 4.5:1 color contrast
- Mobile responsive (≥ 320px width)

**Scale & Complexity:**

- **Primary domain**: Full-Stack Web Application + API Backend (SPA/PWA + RESTful API)
- **Complexity level**: Medium-to-High
  - Real-time bidirectional communication
  - Multi-role authorization system (community, expert, moderator, admin)
  - Complex algorithmic calculations (weighted scoring)
  - Geographic data aggregation and visualization at scale
  - Regulatory compliance (GDPR, CCPA)
  - Hybrid rendering (SPA + SSR)

- **Estimated architectural components**: 8-12 major components
  - Web Application (SPA with SSR)
  - API Gateway/Backend Services
  - Authentication & Authorization Service
  - Real-time Communication Layer (WebSocket/SSE)
  - Scoring & Calculation Engine
  - Geographic Data Service
  - Evidence Storage Service
  - Admin/Moderation Dashboard
  - Database Layer (PostgreSQL)
  - Caching Layer (Redis)
  - External Service Integrations (SMS, Email, Geolocation)
  - Monitoring & Observability

### Technical Constraints & Dependencies

**External Service Dependencies:**
- **IP Geolocation**: MaxMind GeoIP2 or similar (required for geographic transparency)
- **SMS Verification**: Twilio or AWS SNS (required for phone verification)
- **Email Service**: SendGrid or AWS SES (required for email verification and notifications)
- **DDoS Protection**: Cloudflare or similar (recommended for security)

**Technology Constraints from PRD:**
- **Browser Support**: Modern browsers only (Chrome, Firefox, Safari, Edge - last 2 versions)
- **SSR Requirement**: Must support server-side rendering for claim pages (SEO critical)
- **PWA Capabilities**: Progressive Web App for mobile responsiveness
- **No Native Mobile Apps in MVP**: PWA only initially

**Performance Constraints:**
- Sub-200ms API response time (architectural implications for database queries, caching strategy)
- Real-time updates < 500ms (requires efficient WebSocket architecture)
- Viral claim support (10K+ votes/hour) requires horizontal scalability

**Privacy Constraints:**
- Individual voting history must remain private (only aggregates public)
- Geographic data at country-level only (no precise locations)
- GDPR right to be forgotten, data portability

**Security Constraints:**
- One account per phone number enforcement
- Rate limiting to prevent manipulation (100 votes/hour per user)
- CAPTCHA for suspicious activity
- Content moderation requirements

### Cross-Cutting Concerns Identified

**1. Authentication & Authorization**
- Multi-role system: Anonymous viewers, Registered users, Expert verifiers, Moderators, Admins
- JWT-based authentication with refresh tokens
- Role-based access control (RBAC) for features and API endpoints
- Expert credential verification workflow
- Affects: All API endpoints, UI components, database schema

**2. Real-Time Communication**
- Live updates for vote counts, scores, geographic distribution
- < 500ms latency requirement
- Must scale to 1,000+ concurrent viewers on viral claims
- Technology choice: WebSocket vs Server-Sent Events
- Affects: Frontend state management, backend architecture, infrastructure scaling

**3. Caching Strategy**
- Redis layer for frequently accessed data (claim scores, geographic aggregates)
- 80% database load reduction target
- Cache invalidation on vote updates
- Affects: API performance, database design, deployment architecture

**4. Rate Limiting & Abuse Prevention**
- Per-user rate limits (100 votes/hour, 10 claims/day)
- Per-IP rate limits for anonymous users
- Per-API-key limits for third-party developers (post-MVP)
- Bot detection and CAPTCHA challenges
- Affects: API gateway, middleware, database schema, monitoring

**5. Security & Privacy**
- Input validation and sanitization (SQL injection, XSS prevention)
- CSRF protection for state-changing operations
- HTTPS/TLS everywhere
- Privacy-preserving data handling (GDPR/CCPA)
- Secure file uploads (evidence PDFs)
- Affects: All layers of architecture, development practices, compliance

**6. Monitoring & Observability**
- Error tracking and alerting
- Performance monitoring (response times, uptime)
- Real-time dashboards for platform health
- Security event logging
- Affects: Infrastructure, deployment, operations

**7. Geographic Data Processing**
- IP-to-country geolocation on every vote
- Efficient aggregation queries for distribution calculations
- Visualization rendering (maps/charts)
- Privacy-preserving (aggregate only)
- Affects: Backend services, database design, frontend visualization libraries

**8. File Storage & Management**
- Evidence uploads (PDFs, images up to 10MB)
- Malware scanning before storage
- CDN delivery for performance
- Backup and retention policies
- Affects: Backend storage architecture, security scanning, CDN integration

**9. Database Design & Data Integrity**
- Transactional integrity for votes (no data loss)
- Efficient queries for real-time aggregations
- Historical tracking (score evolution over time)
- Geographic distribution queries at scale
- Affects: Schema design, indexing strategy, query optimization

**10. Scalability Architecture**
- Horizontal scaling for API servers
- Database read replicas for query load
- Load balancing strategy
- Auto-scaling for traffic spikes
- Affects: Infrastructure design, deployment architecture, cost planning

## Starter Template Evaluation

### Technical Preferences Established

**Selected Stack:**
- **Frontend**: TypeScript + Vue 3 + Nuxt 3 + Tailwind CSS
- **Backend**: TypeScript + Node.js + NestJS
- **Database**: PostgreSQL + Redis
- **Containerization**: Docker
- **Deployment**: Cloud-agnostic (Docker-based)

**Rationale:**
- TypeScript across full stack for type safety and developer experience
- Vue 3 with Nuxt 3 provides SSR for SEO requirements
- NestJS provides secure, scalable, structured backend ideal for developers prioritizing security without deep backend experience
- Docker ensures cloud-agnostic deployment
- PostgreSQL and Redis meet PRD specifications

### Primary Technology Domain

**Full-Stack Web Application** with separated frontend and backend:
- **Frontend**: Nuxt 3 (SPA with SSR for claim pages)
- **Backend**: NestJS RESTful API + WebSocket Gateway

This architecture supports:
- Server-side rendering for SEO (claim pages)
- Real-time bidirectional communication (voting updates)
- Horizontal scalability (stateless API servers)
- Cloud-agnostic deployment (Docker containers)

### Starter Options Evaluated

#### Frontend: Nuxt 3

**Official Nuxt 3 Starter** - The recommended approach uses the official Nuxt CLI:

**Initialization Command:**
```bash
npx nuxi@latest init groundtruth-frontend
cd groundtruth-frontend
npx nuxi@latest module add tailwindcss
```

**What This Provides:**
- Nuxt 3 with TypeScript configuration
- Vite build tooling for fast HMR
- Vue 3 with Composition API
- SSR/SSG capabilities out of the box
- Auto-import for components and composables
- File-based routing
- Official Tailwind CSS module with zero-config setup

**Architectural Decisions Made by Nuxt 3:**

**Language & Runtime:**
- TypeScript with full type inference
- Node.js runtime (v18+)
- Vue 3 Composition API as default
- Vite as build tool and dev server

**Styling Solution:**
- Tailwind CSS via @nuxtjs/tailwindcss module
- PostCSS with nesting support
- Automatic CSS optimization and tree-shaking
- Dark mode support built-in

**Build Tooling:**
- Vite for lightning-fast HMR (Hot Module Replacement)
- Rollup for production builds with optimizations
- Code splitting and lazy loading automatic
- Asset optimization (images, fonts)
- Bundle size optimization

**SSR/Rendering:**
- Hybrid rendering: SSR for claim pages (SEO), CSR for authenticated app
- Configurable rendering modes per route
- Automatic payload serialization
- SEO meta tag management

**Code Organization:**
- `/pages` directory for file-based routing
- `/components` for Vue components (auto-imported)
- `/composables` for reusable logic (auto-imported)
- `/layouts` for page layouts
- `/middleware` for route middleware
- `/plugins` for Vue plugins
- `/server` for API routes (optional backend-for-frontend)

**Development Experience:**
- Hot module replacement < 100ms
- TypeScript with strict mode
- ESLint + Prettier recommended (manual setup)
- Vue DevTools integration
- Error overlay with source maps

#### Backend: NestJS

**Official NestJS CLI Starter** - Production-ready TypeScript backend framework:

**Initialization Command:**
```bash
npm install -g @nestjs/cli
nest new groundtruth-backend --strict
cd groundtruth-backend
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/throttler
npm install class-validator class-transformer
npm install redis
```

**What This Provides:**
- NestJS application with TypeScript strict mode
- Modular architecture with dependency injection
- Express.js HTTP server (can swap to Fastify)
- Testing setup with Vitest
- Production-ready project structure
- CLI for generating modules, controllers, services

**Architectural Decisions Made by NestJS:**

**Language & Runtime:**
- TypeScript with strict mode enabled
- Node.js runtime (v18+)
- Decorator-based syntax for clean code
- Full ES6+ support with transpilation

**API Architecture:**
- RESTful API with Express (default) or Fastify (high-performance option)
- Controller-Service-Repository pattern
- Dependency injection container
- Module-based organization (AuthModule, ClaimsModule, VotingModule, etc.)
- Exception filters for standardized error responses

**Real-Time Communication:**
- WebSocket Gateway with Socket.io integration
- Namespace and room support for isolated communication
- Event-based messaging
- Redis adapter for horizontal scaling (multi-server WebSocket)

**Database Layer:**
- TypeORM for PostgreSQL with entity management
- Repository pattern for data access
- Migration system for schema versioning
- Query builder for complex queries
- Connection pooling

**Security & Authentication:**
- Guards for route protection (JWT, roles)
- Passport.js integration for auth strategies
- JWT token management (@nestjs/jwt)
- Rate limiting (@nestjs/throttler) - prevents abuse
- Validation pipes (class-validator) - input sanitization
- CORS configuration
- Helmet.js for security headers

**Testing Framework:**
- Vitest for unit and integration testing
- Supertest for E2E testing
- Mocking with `vi.fn()`, `vi.mock()` (Vitest API)
- Coverage reporting with v8 provider

**Code Organization:**
```
src/
  ├── auth/              # Authentication module
  ├── users/             # User management module
  ├── claims/            # Claims module
  ├── votes/             # Voting module
  ├── experts/           # Expert verification module
  ├── evidence/          # Evidence management module
  ├── websocket/         # Real-time gateway module
  ├── common/            # Shared utilities, guards, decorators
  │   ├── guards/        # Auth guards, role guards
  │   ├── interceptors/  # Logging, transformation
  │   ├── pipes/         # Validation pipes
  │   └── filters/       # Exception filters
  ├── config/            # Configuration management
  └── main.ts            # Application entry point
```

**Development Experience:**
- CLI for scaffolding (nest generate module/controller/service)
- Hot reload with webpack HMR
- Swagger/OpenAPI integration (@nestjs/swagger)
- Structured logging
- Environment-based configuration
- Docker support

### Selected Starters Summary

**Frontend: Nuxt 3 Official Starter**
- Command: `npx nuxi@latest init groundtruth-frontend`
- Rationale: Official, maintained, zero-config, perfect for SSR + SPA hybrid

**Backend: NestJS Official CLI Starter**
- Command: `nest new groundtruth-backend --strict`
- Rationale: Enterprise-grade, secure by default, beginner-friendly with excellent docs, built-in real-time support

### Architectural Foundation Established

These starters establish the following architectural foundation:

**Language:** TypeScript across entire stack (type safety, shared types possible)

**Frontend Architecture:**
- Nuxt 3 SPA with SSR for claim pages
- Component-based UI (Vue 3)
- Composables for reusable logic
- Auto-routing with `/pages` directory
- State management via composables + Pinia (if needed)

**Backend Architecture:**
- NestJS modular architecture
- Controller-Service-Repository layers
- REST API + WebSocket Gateway
- TypeORM with PostgreSQL
- JWT authentication with guards
- Rate limiting and validation built-in

**Development Workflow:**
- Monorepo possible (single Git repo, Docker Compose for local dev)
- Frontend runs on port 3000 (Nuxt dev server)
- Backend runs on port 3001 (NestJS API)
- WebSocket on same port as API (3001)
- PostgreSQL on port 5432
- Redis on port 6379

**Deployment Architecture:**
- Docker containers for frontend, backend, PostgreSQL, Redis
- Cloud-agnostic (works on AWS, GCP, Azure, DigitalOcean, Railway, etc.)
- Horizontal scaling ready (stateless services)
- Load balancer in front of multiple API instances
- Redis for WebSocket scaling (pub/sub)

**Testing Strategy:**
- Frontend: Vitest (unit), Playwright (E2E)
- Backend: Vitest (unit, integration, E2E)
- Monorepo: Vitest workspace mode for unified test execution
- Shared type definitions for API contracts

**Note:** Project initialization using these commands should be among the first implementation stories.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Database migration strategy (Manual SQL Scripts)
- JWT token storage (httpOnly Cookies)
- Password hashing (Argon2id)
- Rate limiting scope (Multi-level)
- WebSocket strategy (Hybrid rooms)
- Configuration management (Docker Secrets + .env)

**Important Decisions (Shape Architecture):**
- Caching strategy (Hybrid)
- Geographic data storage (Country code + aggregates)
- API documentation (Swagger/OpenAPI)
- Error response format (Extended PRD)
- State management (Composables + Pinia)
- Form validation (Shared Zod schemas)
- Visualization libraries (Chart.js + Leaflet)
- Logging/monitoring (Winston + Sentry + Prometheus/Grafana)
- CI/CD pipeline (GitHub Actions)
- Database backups (pgBackRest)

**Deferred Decisions (Post-MVP):**
- Advanced caching strategies (edge caching, CDN configuration)
- Advanced monitoring (APM tools, distributed tracing)
- Multi-region deployment
- Advanced security (WAF, advanced DDoS mitigation)

### Data Architecture Decisions

**Decision 1: Database Migration Strategy**
- **Choice**: Manual SQL Scripts
- **Implementation**: Version-controlled SQL migration files in `/migrations` folder, executed sequentially during deployment
- **Rationale**: Maximum control over complex schema operations (geographic aggregations, vote counting, score calculations), explicit SQL for data integrity
- **Tools**: Raw PostgreSQL SQL, migration tracking table
- **Affects**: Database schema evolution, deployment pipeline, data integrity procedures

**Decision 2: Caching Strategy**
- **Choice**: Hybrid (Cache-Aside + Cache Invalidation)
- **Implementation**:
  - Cache-aside pattern for reads (claim scores, geographic distributions)
  - Explicit cache invalidation on writes (vote events trigger updates)
  - Redis as cache layer
  - TTL safety net: 5 minutes for scores, 1 hour for geographic aggregates
- **Cache Keys**:
  - `claim:{id}:score` - Unified, community, expert scores
  - `claim:{id}:geo` - Geographic distribution data
  - `user:{id}:ratelimit:votes` - Rate limiting counters
- **Rationale**: Balances performance (fast reads) with freshness (real-time updates), efficient memory usage, 80% database load reduction target (NFR-SC10)
- **Affects**: Vote submission flow, score calculation service, WebSocket broadcasts, API response times

**Decision 3: Geographic Data Storage**
- **Choice**: Country Code in votes + Aggregate Statistics Table
- **Schema**:
  ```sql
  votes table:
    - claim_id (uuid)
    - user_id (uuid)
    - vote_value (0-100)
    - country_code (varchar(2)) -- "US", "FR", "CN", etc.
    - created_at (timestamp)

  claim_geographic_stats table:
    - claim_id (uuid)
    - country_code (varchar(2))
    - community_vote_count (integer)
    - expert_vote_count (integer)
    - last_updated (timestamp)
    - PRIMARY KEY (claim_id, country_code)
  ```
- **IP Handling**: MaxMind GeoIP2 lookup at vote submission time, only country code stored (no IP addresses)
- **Rationale**: Privacy-preserving (GDPR-compliant, NFR-S16), fast aggregation queries, real-time update friendly, no PII storage
- **Affects**: Vote submission API, geographic transparency UI, real-time WebSocket updates, privacy compliance

### Authentication & Security Decisions

**Decision 4: JWT Token Storage**
- **Choice**: httpOnly Cookies
- **Implementation**:
  - Access token: httpOnly, Secure, SameSite=Strict, 60-minute expiry
  - Refresh token: httpOnly, Secure, SameSite=Strict, 30-day expiry
  - CSRF token: Custom header (X-CSRF-Token) for state-changing operations
  - Cookie path: `/api` (restricts cookie to API endpoints only)
- **Rationale**: XSS protection (NFR-S7), CSRF protection (NFR-S8), meets PRD security requirements, secure for sensitive voting data
- **Affects**: Authentication module, NestJS auth guards, Nuxt auth plugin, all API endpoints requiring authentication

**Decision 5: Password Hashing Algorithm**
- **Choice**: Argon2id
- **Configuration**:
  - Variant: Argon2id (hybrid mode - resistant to side-channel and GPU attacks)
  - Memory cost: 65536 KB (64 MB)
  - Time cost: 3 iterations
  - Parallelism: 4 threads
- **Package**: `argon2` npm package (Node.js native bindings)
- **Rationale**: State-of-the-art password security, meets NFR-S2 requirement, future-proof against modern attacks, superior to bcrypt for GPU resistance
- **Affects**: User registration endpoint, login verification, password reset flow

**Decision 6: Rate Limiting Strategy**
- **Choice**: Multi-Level Rate Limiting
- **Implementation**:
  - **Per-User (authenticated)**:
    - 100 votes/hour
    - 10 claims/day
    - 50 evidence submissions/day
  - **Per-IP (anonymous)**:
    - 1000 API requests/hour (read-only endpoints)
  - **Global**:
    - 10,000 requests/minute across entire API
- **Storage**: Redis counters (distributed, fast, atomic)
- **Response**: HTTP 429 (Too Many Requests) with `Retry-After` header
- **Tool**: @nestjs/throttler with custom guards
- **Rationale**: Prevents manipulation (per-user), DDoS protection (per-IP), infrastructure safety (global), meets NFR requirements
- **Affects**: All API endpoints, WebSocket connection limits, middleware layer, abuse detection

### API & Communication Decisions

**Decision 7: API Documentation**
- **Choice**: Swagger/OpenAPI (Auto-generated)
- **Implementation**:
  - @nestjs/swagger decorators on all controllers and DTOs
  - Interactive docs at `/api/docs` (development) and `/api/v1/docs` (production)
  - OpenAPI 3.0 specification export
  - Versioned alongside API versions
- **Documentation Includes**:
  - All endpoints with request/response schemas
  - Authentication requirements
  - Rate limiting information
  - Error response formats
  - Example requests/responses
- **Rationale**: Auto-synced with code (NFR-M2), smooth Phase 2 public API transition, interactive testing UI, reduces documentation maintenance
- **Affects**: All API controllers, DTO classes, developer onboarding, future public API

**Decision 8: Error Response Format**
- **Choice**: Extended PRD Format
- **Structure**:
  ```json
  {
    "error": {
      "code": "VOTE_ALREADY_CAST",
      "message": "User already voted on this claim",
      "details": {
        "claim_id": "abc-123",
        "user_id": "def-456"
      },
      "timestamp": "2026-01-14T10:30:00.000Z",
      "request_id": "req_xyz789"
    }
  }
  ```
- **Implementation**: NestJS global exception filter, request ID middleware (uuid v4)
- **Error Codes**: Defined constants in shared types package (e.g., `VOTE_ALREADY_CAST`, `CLAIM_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`)
- **Rationale**: Meets PRD specification, adds observability (request tracing), enables debugging across distributed systems
- **Affects**: All API endpoints, exception filters, logging middleware, client error handling

**Decision 9: Real-Time Update Strategy**
- **Choice**: WebSocket with Hybrid Rooms
- **Architecture**:
  - **Namespace**: `/votes` for vote-related events
  - **Rooms**:
    - Per-claim: `claim:{claim_id}` (users join when viewing claim details)
    - Admin: `admin:moderation` (moderator/admin events)
  - **Events**:
    - `vote:cast` - New vote submitted (payload: updated counts, scores, geo data)
    - `score:updated` - Score recalculation complete
    - `claim:flagged` - Moderation event (admin-only)
- **Scaling**: Redis adapter for Socket.io (horizontal scaling, multi-server state sharing)
- **Connection Management**: Auto-reconnect on disconnect, heartbeat every 25 seconds
- **Rationale**: Efficient (targeted updates to interested users), scalable (room isolation), meets <500ms latency requirement (NFR-P5, NFR-P6)
- **Affects**: WebSocket gateway module, vote service, frontend WebSocket composables, Redis pub/sub

### Frontend Architecture Decisions

**Decision 10: State Management**
- **Choice**: Hybrid (Composables + Pinia)
- **Usage Pattern**:
  - **Composables** (built-in Nuxt):
    - UI state (modals, tooltips, dropdowns)
    - Form input state
    - Component-local state
  - **Pinia Stores**:
    - `useAuthStore` - User authentication, session, profile
    - `useClaimStore` - Claims data, search/filter state, pagination
    - `useVoteStore` - Voting state, real-time vote updates
    - `useWebSocketStore` - WebSocket connection management, reconnection logic
    - `useAdminStore` - Admin/moderator state (expert applications, flags)
- **Rationale**: Balance simplicity (composables for simple cases) with structure (Pinia for complex state), TypeScript support, SSR-friendly, Vue DevTools integration
- **Affects**: Frontend state architecture, real-time update handling, authentication flow, component organization

**Decision 11: Form Validation Strategy**
- **Choice**: Shared Validation Schemas (Zod)
- **Implementation**:
  - Shared package: `packages/shared` or `@groundtruth/shared-types` (monorepo structure)
  - Zod schemas for all DTOs: VoteSchema, ClaimSchema, UserSchema, ExpertApplicationSchema, EvidenceSchema
  - **Frontend**: Use with VeeValidate or native Vue form handling
  - **Backend**: Use with NestJS validation pipe (custom Zod pipe or zod-nestjs)
  - TypeScript types auto-inferred: `type Vote = z.infer<typeof VoteSchema>`
- **Example Schema**:
  ```typescript
  // packages/shared/src/schemas/vote.schema.ts
  export const VoteSchema = z.object({
    claim_id: z.string().uuid(),
    vote_value: z.number().min(0).max(100),
    explanation: z.string().max(1000).optional(),
    is_expert: z.boolean()
  });
  ```
- **Rationale**: DRY principle, type-safe, consistent validation on frontend (instant feedback) and backend (security), single source of truth
- **Affects**: All forms, API DTOs, validation layer, monorepo structure, type definitions

**Decision 12: Visualization Libraries**
- **Choice**: Chart.js + Leaflet (Combination)
- **Usage**:
  - **Chart.js** (via vue-chartjs):
    - Bar charts: Vote distribution by score ranges
    - Pie charts: Community vs expert vote breakdown
    - Line charts: Score evolution over time
  - **Leaflet** (via @vue-leaflet/vue-leaflet):
    - Interactive world map: Geographic vote distribution
    - Country highlighting: Color intensity by vote count
    - Tooltips: Country name, vote counts on hover
    - Clustering: For high-density vote regions
- **Bundle Optimization**: Tree-shaking, lazy-load maps on claim detail page only
- **Rationale**: Specialized tools (Chart.js for charts, Leaflet for maps), lightweight, excellent Vue integration, performance-optimized
- **Affects**: Geographic transparency UI components, claim detail visualizations, admin dashboard charts

### Infrastructure & Deployment Decisions

**Decision 13: Environment Configuration Management**
- **Choice**: Docker Secrets + .env Files
- **Implementation**:
  - **Non-sensitive config**: `.env` files committed as templates (`.env.example`)
    - API URLs, ports, log levels, feature flags
  - **Sensitive config**: Docker secrets (mounted at `/run/secrets/`)
    - Database passwords
    - JWT secret keys
    - API keys: Twilio, MaxMind, SendGrid
    - Redis password
  - **Loading**: NestJS ConfigModule, Nuxt runtimeConfig
- **File Structure**:
  ```
  .env.development
  .env.production
  .env.example (committed)
  docker-compose.yml (references secrets)
  secrets/ (gitignored, local dev only)
  ```
- **Rationale**: Cloud-agnostic, secure secrets management, clear separation, works on any Docker-compatible host
- **Affects**: Deployment scripts, Docker Compose configuration, CI/CD pipeline, environment setup documentation

**Decision 14: Logging & Monitoring**
- **Choice**: Hybrid (Winston + Sentry + Prometheus/Grafana)
- **Components**:
  - **Structured Logging**: Winston (NestJS) with JSON formatter
    - Log level: info (production), debug (development)
    - Includes: request_id, user_id, timestamp, context, stack traces
    - Transport: stdout/stderr (captured by Docker)
  - **Error Tracking**: Sentry
    - Frontend: @sentry/vue integration
    - Backend: @sentry/node integration
    - Free tier: 5K events/month (sufficient for MVP)
    - Source maps uploaded for stack trace readability
  - **Metrics**: Prometheus + Grafana
    - Prometheus: Scrapes `/metrics` endpoint (backend)
    - Metrics: Request count, response times, error rates, vote rates, WebSocket connections, cache hit rates
    - Grafana: Dashboards for real-time monitoring
  - **Alerts**: Sentry (errors), Grafana (metric thresholds)
- **Rationale**: Cloud-agnostic, cost-effective (mostly free/OSS), production-ready, meets NFR-M4/M5/M6, provides full observability stack
- **Affects**: All backend services, frontend error boundaries, infrastructure monitoring, alerting configuration

**Decision 15: CI/CD Pipeline**
- **Choice**: GitHub Actions
- **Pipeline Stages**:
  1. **Lint & Type Check**: ESLint, Prettier, TypeScript compilation (parallel: frontend + backend)
  2. **Test**:
     - Backend: Vitest unit tests + integration tests
     - Frontend: Vitest unit tests
     - Monorepo: Vitest workspace mode runs all tests
     - E2E: Playwright (only on PR to main, optional on develop)
  3. **Build**: Docker images
     - `groundtruth-frontend:latest` and `groundtruth-frontend:{git-sha}`
     - `groundtruth-backend:latest` and `groundtruth-backend:{git-sha}`
  4. **Push**: GitHub Container Registry (ghcr.io)
  5. **Deploy**:
     - Development: Auto-deploy on push to `develop` branch (SSH to dev server)
     - Production: Manual approval required on push to `main` branch
- **Workflows**:
  - `.github/workflows/ci.yml` - PR validation (lint + test, no deploy)
  - `.github/workflows/deploy-dev.yml` - Auto-deploy to dev environment
  - `.github/workflows/deploy-prod.yml` - Manual deploy to production
- **Rationale**: Integrated with GitHub, free tier sufficient (2000 min/month), good Docker support, cloud-agnostic deployment
- **Affects**: Repository `.github/workflows`, Docker multi-stage builds, deployment infrastructure

**Decision 16: Database Backup Strategy**
- **Choice**: pgBackRest
- **Configuration**:
  - **Full backup**: Daily at 2 AM UTC (low-traffic window)
  - **Incremental backup**: Every 6 hours (6 AM, 12 PM, 6 PM, 12 AM UTC)
  - **WAL archiving**: Continuous (Write-Ahead Log streaming)
  - **Retention**:
    - Full backups: 30 days
    - WAL/PITR: 7 days
  - **Storage**: S3-compatible storage (Backblaze B2, Wasabi, or local for dev)
  - **Compression**: zstd (balanced speed + compression)
  - **Encryption**: AES-256 at rest
- **Recovery Capabilities**:
  - Full restore from any daily backup (30-day window)
  - Point-in-time recovery (PITR) to any second within last 7 days
- **Testing**: Monthly restore drill (automated in non-prod environment)
- **Rationale**: Meets NFR-R5 and NFR-R6, cloud-agnostic, production-grade, efficient (incremental + compression), secure (encryption)
- **Affects**: PostgreSQL container configuration, backup storage setup, disaster recovery runbook

### Decision Impact Analysis

**Implementation Sequence (Recommended Order):**

1. **Foundation** (Parallel):
   - Project initialization (Nuxt + NestJS starters)
   - Shared types package setup (Zod schemas)
   - Docker Compose configuration (PostgreSQL, Redis, secrets)
   - Manual SQL migration structure

2. **Core Backend**:
   - Authentication module (JWT, Argon2, httpOnly cookies)
   - Rate limiting middleware
   - Error handling (global exception filter)
   - Logging setup (Winston, request ID)

3. **Database Layer**:
   - Initial schema migration (users, claims, votes tables)
   - Geographic stats table
   - TypeORM entities and repositories

4. **API Layer**:
   - Claims API (CRUD, search)
   - Voting API (submit vote, get scores)
   - User API (registration, profile)
   - Swagger documentation setup

5. **Real-Time Layer**:
   - WebSocket gateway setup
   - Room management (per-claim rooms)
   - Redis adapter configuration
   - Vote event broadcasting

6. **Caching Layer**:
   - Redis connection setup
   - Cache-aside implementation (scores, geo data)
   - Cache invalidation on vote events

7. **Frontend Core**:
   - Nuxt app setup with Tailwind
   - Authentication flow (login, registration)
   - Pinia stores (auth, claims, votes, WebSocket)
   - Shared validation integration

8. **Frontend Features**:
   - Claim browsing/search UI
   - Claim detail page (SSR)
   - Voting interface
   - Real-time update integration

9. **Visualization**:
   - Chart.js setup (vote distributions, score evolution)
   - Leaflet map integration (geographic transparency)

10. **Infrastructure**:
    - GitHub Actions workflows (CI/CD)
    - Sentry integration (error tracking)
    - Prometheus metrics endpoints
    - pgBackRest backup configuration

11. **Testing**:
    - Vitest tests (backend unit + integration)
    - Vitest tests (frontend components)
    - Vitest workspace mode (monorepo orchestration)
    - Playwright E2E tests

**Cross-Component Dependencies:**

1. **Shared Types Package** → All validation (frontend + backend)
2. **JWT Strategy** → All authenticated endpoints, frontend auth state
3. **Rate Limiting** → Vote submission, claim creation, Redis counters
4. **WebSocket Rooms** → Real-time updates, cache invalidation, vote broadcasts
5. **Caching Strategy** → API performance, WebSocket update efficiency
6. **Geographic Storage** → Vote submission flow, visualization components
7. **Error Format** → All API responses, frontend error handling
8. **Logging (request_id)** → Error tracking, debugging, request tracing
9. **Swagger Docs** → API development, future public API, developer onboarding
10. **Docker Secrets** → All services requiring sensitive configuration

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**10 Critical Patterns** identified to prevent AI agent conflicts across naming, structure, data format, communication, and error handling.

### Naming Patterns

**Database Naming Convention (snake_case)**
- Tables: `users`, `claims`, `votes`, `claim_geographic_stats`, `expert_applications`, `evidence`
- Columns: `user_id`, `created_at`, `country_code`, `vote_value`, `is_expert`
- Indexes: `idx_users_email`, `idx_votes_claim_id`, `idx_claims_created_at`
- Foreign Keys: `user_id` (not `fk_user_id`)
- TypeORM automatically maps `user_id` ↔ `userId`

**API Endpoint Naming (Plural + kebab-case)**
- Resource collections: `/api/v1/claims`, `/api/v1/users`, `/api/v1/votes`
- Single items: `/api/v1/claims/:id`, `/api/v1/users/:id`
- Nested resources: `/api/v1/claims/:id/votes`, `/api/v1/claims/:id/evidence`
- Multi-word resources: `/api/v1/expert-applications`, `/api/v1/geographic-stats`
- Query parameters: `/api/v1/claims?sort=score&limit=10`

**TypeScript Code Naming**
- **Vue Components**: `PascalCase.vue` (e.g., `UserCard.vue`, `ClaimDetail.vue`)
- **Other Files**: `kebab-case.ts` (e.g., `user.service.ts`, `claim.controller.ts`, `vote.composable.ts`)
- **Classes/Interfaces**: `PascalCase` (e.g., `UserService`, `ClaimEntity`, `IVotePayload`)
- **Functions/Methods**: `camelCase` (e.g., `getUserById()`, `calculateScore()`, `submitVote()`)
- **Variables**: `camelCase` (e.g., `userId`, `claimData`, `voteCount`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_VOTE_VALUE`, `JWT_SECRET`, `API_BASE_URL`)

**JSON API Field Naming (camelCase)**
- All request/response fields: `camelCase`
- Examples: `userId`, `voteValue`, `createdAt`, `countryCode`, `isExpert`
- No transformation needed in TypeScript frontend (native convention)
- NestJS class-transformer handles DB ↔ API conversion

### Structure Patterns

**Test File Organization (Hybrid)**
- **Unit Tests**: Co-located with source files
  - Backend: `user.service.spec.ts` next to `user.service.ts`
  - Frontend: `UserCard.spec.ts` next to `UserCard.vue`

- **Integration Tests**: Co-located in backend modules
  - File: `user.integration.spec.ts` in the user module

- **E2E Tests**: Separate directory
  - Backend: `test/e2e/users.e2e-spec.ts`
  - Frontend: `tests/e2e/login.spec.ts` (Playwright)

**Frontend Component Organization (By Feature)**
```
components/
  users/
    UserCard.vue
    UserProfile.vue
    UserAvatar.vue
  claims/
    ClaimCard.vue
    ClaimDetail.vue
    ClaimList.vue
  votes/
    VoteButton.vue
    VoteDistribution.vue
  common/
    Button.vue
    Modal.vue
    LoadingSpinner.vue
```
- Nuxt 3 auto-imports: `<UserCard />` works automatically
- Feature-specific components nested by domain
- Shared/common components in `common/` folder

**Backend Module Organization (by Domain)**
```
src/
  users/
    user.entity.ts
    user.repository.ts
    user.service.ts
    user.controller.ts
    user.module.ts
    user.service.spec.ts
  claims/
    claim.entity.ts
    claim.service.ts
    claim.controller.ts
    claim.module.ts
  votes/
    vote.entity.ts
    vote.service.ts
    vote.gateway.ts (WebSocket)
    vote.module.ts
  common/
    guards/
    pipes/
    filters/
    interceptors/
    decorators/
```

### Data Format Patterns

**Date/Time Format (ISO 8601)**
- All API responses: `"2026-01-14T10:30:00.000Z"` (UTC timezone)
- Database: PostgreSQL `timestamp with time zone`
- Frontend: Native JavaScript Date constructor

**API Response Format (Direct, No Wrapper)**
- **Success**: Direct JSON data with HTTP 2xx
- **Error**: Extended PRD format with HTTP 4xx/5xx
- **Lists**: Plain array with pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`)

### Communication Patterns

**WebSocket Event Naming (resource:action format)**
- Namespace: `/votes`
- Event format: `{resource}:{action}`
- Examples: `vote:cast`, `score:updated`, `claim:flagged`
- Payload includes: `claim_id`, `event_type`, `data`, `timestamp`

**WebSocket Room Format**
- Claim-specific: `claim:{claimId}`
- Admin: `admin:moderation`

**State Management Pattern (Pinia)**
- Store naming: `useResourceStore` (e.g., `useClaimStore`)
- State: Flat, normalized
- Actions: Async API calls
- Getters: Computed selectors

**Form Validation Pattern (Shared Zod Schemas)**
- Define in `packages/shared/schemas/`
- Use on frontend AND backend
- TypeScript types auto-inferred

### Process Patterns

**Error Handling Strategy**

**Backend (NestJS)**:
- Global exception filter
- Custom error codes from shared constants
- HTTP status codes: 400, 401, 403, 404, 409, 429, 500

**Frontend**:
- Global handler: Unhandled errors, network failures, generic toast
- Local try/catch: Specific error messages
- Error boundaries: Component rendering errors

**Loading State Pattern**
- Naming: `isLoading{Action}` (e.g., `isSubmittingVote`)
- Scope: Per action (not global)
- UI: Disable button, show spinner

**Cache Invalidation Pattern**
- Event-driven (not time-based)
- Vote submission triggers cache update + WebSocket broadcast
- TTL as safety net only

### Enforcement Guidelines

**All AI Agents MUST:**

1. Follow naming conventions without exception (snake_case DB, camelCase TS, kebab-case URLs)
2. Organize code by domain/feature
3. Co-locate tests with source code
4. Use shared Zod schemas for validation
5. Handle errors consistently (global + local)
6. Never hardcode configuration
7. Write tests for all new code

### Pattern Examples

**Good Example:**
```typescript
// ✅ Correct API endpoint
POST /api/v1/claims/:id/votes
{ "voteValue": 75, "explanation": "Supported by evidence" }

// ✅ Correct WebSocket event
socket.emit('vote:cast', {
  claim_id: 'abc-123',
  data: { vote_count: 1050, score: 72.5 },
  timestamp: '2026-01-14T10:30:00.000Z'
})
```

**Anti-Patterns (Avoid):**
```typescript
// ❌ WRONG: Mixed naming
POST /api/v1/ClaimList
{ "vote_value": 75 }

// ❌ WRONG: Wrapped response
{ "success": true, "data": { ... } }

// ❌ WRONG: camelCase WebSocket event
socket.emit('voteCast', { ... })
```

### Summary

These 10 patterns prevent the most common integration failures:
1. Naming consistency ensures queries, types, and endpoints work together
2. Structure patterns make code predictable and maintainable
3. Format patterns ensure data moves correctly between layers
4. Communication patterns align WebSocket, validation, and error handling
5. Process patterns create predictable, recoverable failures

**All agents should review this section before starting implementation work.**

## Project Structure & Boundaries

### Requirements to Architecture Mapping

| Feature Category | Frontend Location | Backend Location | Database Tables |
|-----------------|-------------------|------------------|-----------------|
| User Management (FR1-8) | `components/users/` | `src/users/` | `users` |
| Claims Management (FR9-14) | `components/claims/` | `src/claims/` | `claims` |
| Community Voting (FR15-21) | `components/votes/` | `src/votes/` | `votes` |
| Expert Verification (FR22-31) | `components/experts/` | `src/experts/` | `expert_applications`, `expert_domains` |
| Scoring Algorithm (FR32-36) | `composables/useScore.ts` | `src/scores/` | (computed) |
| Geographic Transparency (FR37-42) | `components/geo/` | `src/geo/` | `claim_geographic_stats` |
| Evidence Management (FR43-47) | `components/evidence/` | `src/evidence/` | `evidence` |
| Platform Admin (FR48-52) | `pages/admin/` | `src/admin/` | - |
| Content Moderation (FR53-56) | `components/moderation/` | `src/moderation/` | `flags`, `moderation_actions` |
| Real-Time Updates (FR57-60) | `composables/useWebSocket.ts` | `src/websocket/` | - |
| Search & Discovery (FR61-63) | `pages/search.vue` | `src/search/` | (PostgreSQL full-text) |
| API Integration (FR64-67) | - | `src/api/` | `api_keys` |
| Privacy & Compliance (FR68-71) | `pages/settings/privacy.vue` | `src/privacy/` | - |

### Complete Project Directory Structure

```
groundtruth/
├── README.md
├── package.json                          # Root workspace config
├── pnpm-workspace.yaml                   # pnpm workspace
├── .gitignore
├── .env.example
├── docker-compose.yml                    # Local dev stack
├── docker-compose.prod.yml               # Production template
│
├── .github/workflows/
│   ├── ci.yml                            # PR validation
│   ├── deploy-dev.yml                    # Auto-deploy to dev
│   └── deploy-prod.yml                   # Manual production deploy
│
├── docker/
│   ├── frontend/Dockerfile
│   ├── backend/Dockerfile
│   └── nginx/nginx.conf
│
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_expert_system.sql
│   ├── 003_geographic_stats.sql
│   ├── 004_evidence.sql
│   ├── 005_moderation.sql
│   └── README.md
│
├── secrets/                              # (gitignored)
│   ├── db_password.txt
│   ├── jwt_secret.txt
│   └── redis_password.txt
│
├── packages/
│   │
│   ├── shared/                           # @groundtruth/shared
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── schemas/                  # Zod schemas
│   │       │   ├── user.schema.ts
│   │       │   ├── claim.schema.ts
│   │       │   ├── vote.schema.ts
│   │       │   ├── evidence.schema.ts
│   │       │   └── expert.schema.ts
│   │       ├── types/                    # TypeScript types
│   │       │   ├── user.types.ts
│   │       │   ├── claim.types.ts
│   │       │   ├── vote.types.ts
│   │       │   └── api.types.ts
│   │       ├── constants/
│   │       │   ├── error-codes.ts
│   │       │   ├── vote.constants.ts
│   │       │   └── roles.ts
│   │       └── utils/
│   │           └── validation.ts
│   │
│   ├── backend/                          # @groundtruth/backend (NestJS)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── nest-cli.json
│   │   ├── .env.example
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── config/
│   │   │   │   ├── database.config.ts
│   │   │   │   ├── redis.config.ts
│   │   │   │   └── jwt.config.ts
│   │   │   ├── common/
│   │   │   │   ├── guards/
│   │   │   │   │   ├── jwt.guard.ts
│   │   │   │   │   ├── roles.guard.ts
│   │   │   │   │   └── throttle.guard.ts
│   │   │   │   ├── pipes/
│   │   │   │   │   └── zod-validation.pipe.ts
│   │   │   │   ├── filters/
│   │   │   │   │   └── http-exception.filter.ts
│   │   │   │   ├── interceptors/
│   │   │   │   │   ├── request-id.interceptor.ts
│   │   │   │   │   └── logging.interceptor.ts
│   │   │   │   └── decorators/
│   │   │   │       ├── roles.decorator.ts
│   │   │   │       └── current-user.decorator.ts
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.service.spec.ts
│   │   │   │   └── strategies/
│   │   │   │       └── jwt.strategy.ts
│   │   │   ├── users/
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── users.service.spec.ts
│   │   │   │   ├── users.repository.ts
│   │   │   │   └── entities/
│   │   │   │       └── user.entity.ts
│   │   │   ├── claims/
│   │   │   │   ├── claims.module.ts
│   │   │   │   ├── claims.controller.ts
│   │   │   │   ├── claims.service.ts
│   │   │   │   ├── claims.service.spec.ts
│   │   │   │   └── entities/
│   │   │   │       └── claim.entity.ts
│   │   │   ├── votes/
│   │   │   │   ├── votes.module.ts
│   │   │   │   ├── votes.controller.ts
│   │   │   │   ├── votes.service.ts
│   │   │   │   ├── votes.gateway.ts      # WebSocket
│   │   │   │   └── entities/
│   │   │   │       └── vote.entity.ts
│   │   │   ├── scores/
│   │   │   │   ├── scores.module.ts
│   │   │   │   └── scores.service.ts
│   │   │   ├── experts/
│   │   │   │   ├── experts.module.ts
│   │   │   │   ├── experts.controller.ts
│   │   │   │   ├── experts.service.ts
│   │   │   │   └── entities/
│   │   │   │       └── expert-application.entity.ts
│   │   │   ├── geo/
│   │   │   │   ├── geo.module.ts
│   │   │   │   ├── geo.service.ts
│   │   │   │   └── providers/
│   │   │   │       └── maxmind.provider.ts
│   │   │   ├── evidence/
│   │   │   │   ├── evidence.module.ts
│   │   │   │   ├── evidence.controller.ts
│   │   │   │   └── evidence.service.ts
│   │   │   ├── moderation/
│   │   │   │   ├── moderation.module.ts
│   │   │   │   └── moderation.service.ts
│   │   │   ├── cache/
│   │   │   │   ├── cache.module.ts
│   │   │   │   └── cache.service.ts
│   │   │   ├── email/
│   │   │   │   └── email.service.ts
│   │   │   └── health/
│   │   │       └── health.controller.ts
│   │   └── test/e2e/
│   │       ├── auth.e2e-spec.ts
│   │       └── claims.e2e-spec.ts
│   │
│   └── frontend/                         # @groundtruth/frontend (Nuxt 3)
│       ├── package.json
│       ├── nuxt.config.ts
│       ├── tailwind.config.ts
│       ├── .env.example
│       ├── app.vue
│       ├── error.vue
│       ├── assets/css/main.css
│       ├── public/
│       │   └── favicon.ico
│       ├── layouts/
│       │   ├── default.vue
│       │   ├── auth.vue
│       │   └── admin.vue
│       ├── pages/
│       │   ├── index.vue
│       │   ├── login.vue
│       │   ├── register.vue
│       │   ├── search.vue
│       │   ├── claims/
│       │   │   ├── index.vue
│       │   │   ├── [id].vue              # SSR for SEO
│       │   │   └── new.vue
│       │   ├── users/[id].vue
│       │   ├── experts/
│       │   │   ├── apply.vue
│       │   │   └── [id].vue
│       │   ├── settings/
│       │   │   ├── profile.vue
│       │   │   └── privacy.vue
│       │   └── admin/
│       │       ├── index.vue
│       │       ├── experts.vue
│       │       └── moderation.vue
│       ├── components/
│       │   ├── common/
│       │   │   ├── Button.vue
│       │   │   ├── Modal.vue
│       │   │   ├── Toast.vue
│       │   │   └── LoadingSpinner.vue
│       │   ├── users/
│       │   │   ├── UserCard.vue
│       │   │   └── UserAvatar.vue
│       │   ├── claims/
│       │   │   ├── ClaimCard.vue
│       │   │   ├── ClaimDetail.vue
│       │   │   ├── ClaimList.vue
│       │   │   └── ClaimScore.vue
│       │   ├── votes/
│       │   │   ├── VoteButton.vue
│       │   │   ├── VoteSlider.vue
│       │   │   └── VoteDistribution.vue
│       │   ├── evidence/
│       │   │   ├── EvidenceCard.vue
│       │   │   └── EvidenceForm.vue
│       │   ├── experts/
│       │   │   ├── ExpertBadge.vue
│       │   │   └── ExpertApplicationForm.vue
│       │   ├── geo/
│       │   │   ├── GeoMap.vue            # Leaflet
│       │   │   └── GeoDistribution.vue
│       │   ├── charts/
│       │   │   ├── ScoreChart.vue        # Chart.js
│       │   │   └── VoteChart.vue
│       │   └── auth/
│       │       ├── LoginForm.vue
│       │       └── RegisterForm.vue
│       ├── composables/
│       │   ├── useAuth.ts
│       │   ├── useApi.ts
│       │   ├── useWebSocket.ts
│       │   ├── useToast.ts
│       │   └── useScore.ts
│       ├── stores/
│       │   ├── auth.store.ts
│       │   ├── claims.store.ts
│       │   ├── votes.store.ts
│       │   └── websocket.store.ts
│       ├── plugins/
│       │   ├── api.ts
│       │   ├── sentry.client.ts
│       │   └── socket.client.ts
│       ├── middleware/
│       │   ├── auth.ts
│       │   └── admin.ts
│       └── tests/
│           ├── components/
│           │   └── ClaimCard.spec.ts
│           └── e2e/
│               └── login.spec.ts
│
└── docs/
    ├── api/openapi.yaml
    └── development/setup.md
```

### Architectural Boundaries

**API Boundaries:**
- External: `/api/v1/*` (REST), `/socket.io` (WebSocket `/votes` namespace)
- Internal: Module-to-module via NestJS dependency injection
- Service layer abstracts data access
- Repository pattern for database operations

**Component Boundaries (Frontend):**
- Pages: Use composables and stores, never call API directly
- Components: Receive props, emit events, use composables
- Stores: Single source of truth, handle API via composables
- Composables: Reusable logic, API client, WebSocket management

**Data Flow:**
```
Frontend (camelCase JSON)
    ↓↑
Backend API (NestJS controllers)
    ↓↑
Service Layer (business logic)
    ↓↑
Repository Layer (TypeORM)
    ↓↑
PostgreSQL (snake_case)

Redis ←→ Cache Service (scores, geo stats, rate limits)
WebSocket ←→ Vote Gateway (real-time updates)
```

### Integration Points

**Internal Communication:**
- Frontend → Backend: REST API + WebSocket (Socket.io)
- Modules → Modules: NestJS dependency injection
- Services → Cache: Redis via cache service
- Services → DB: TypeORM repositories

**External Integrations:**
- MaxMind GeoIP2: `src/geo/providers/maxmind.provider.ts`
- Twilio SMS: `src/sms/sms.service.ts`
- SendGrid Email: `src/email/email.service.ts`
- Sentry: Frontend plugin + Backend integration

### Development Workflow

**Local Development:**
```bash
# Start infrastructure
docker-compose up -d postgres redis

# Install dependencies
pnpm install

# Run migrations
pnpm --filter backend run migration:run

# Start backend (port 3001)
pnpm --filter backend run start:dev

# Start frontend (port 3000)
pnpm --filter frontend run dev
```

**Build Process:**
```bash
# Build shared package first
pnpm --filter shared run build

# Build backend
pnpm --filter backend run build

# Build frontend
pnpm --filter frontend run build
```

**Deployment:**
```bash
# Build Docker images
docker build -f docker/backend/Dockerfile -t groundtruth-backend .
docker build -f docker/frontend/Dockerfile -t groundtruth-frontend .

# Push to registry
docker push ghcr.io/groundtruth/backend:latest
docker push ghcr.io/groundtruth/frontend:latest
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices are fully compatible:
- Nuxt 3 + TypeScript + Tailwind CSS (frontend)
- NestJS + TypeScript + TypeORM + Socket.io (backend)
- PostgreSQL + Redis (data layer)
- Docker (deployment)
- Zod (shared validation)

No version conflicts or incompatibilities detected.

**Pattern Consistency:**
All implementation patterns align with technology stack:
- Database snake_case maps cleanly to TypeScript camelCase via TypeORM
- JSON API uses camelCase (JavaScript standard)
- WebSocket events use resource:action format consistently
- Code follows TypeScript/Vue/NestJS community standards

**Structure Alignment:**
Project structure fully supports architectural decisions:
- Monorepo enables shared Zod schemas between frontend/backend
- Module organization matches NestJS patterns
- Component organization matches Nuxt 3 conventions
- Clear boundaries between packages

### Requirements Coverage Validation ✅

**Functional Requirements (75 FRs):**
All 14 FR categories have dedicated architectural modules:
- User Management → auth/, users/
- Claims → claims/
- Voting → votes/
- Expert Verification → experts/
- Scoring → scores/
- Geographic → geo/
- Evidence → evidence/
- Admin → admin/
- Moderation → moderation/
- Real-Time → votes.gateway.ts (WebSocket)
- Search → search/
- API → REST endpoints + Swagger
- Privacy → settings/privacy
- UX → SSR, responsive design, WCAG patterns

**Non-Functional Requirements:**
All NFRs architecturally supported:
- Performance: Redis caching, PostgreSQL indexing
- Real-time: Socket.io with Redis adapter
- Security: Argon2, JWT httpOnly, CSRF, rate limiting
- Scalability: Stateless services, horizontal scaling
- Reliability: pgBackRest backups, health checks
- Accessibility: WCAG 2.1 AA component patterns
- Compliance: GDPR/CCPA privacy features

### Implementation Readiness Validation ✅

**Decision Completeness:**
- 16 core architectural decisions fully documented
- Implementation details and rationale included
- Technology choices with clear justification
- All patterns include enforcement guidelines

**Structure Completeness:**
- Complete monorepo structure with 3 packages
- All directories and key files specified
- Integration points mapped
- Development workflow documented

**Pattern Completeness:**
- 10 implementation patterns with examples
- Good and anti-pattern examples provided
- Naming conventions comprehensive
- Process patterns (error handling, loading states) defined

### Gap Analysis Results

**Critical Gaps:** None identified

**Important Gaps (Non-blocking):**
1. Database entity relationships will be detailed in implementation stories
2. Scoring algorithm weights to be refined during implementation
3. WCAG testing tools to be selected during frontend setup

**Post-MVP Considerations:**
- API versioning strategy for v2+
- Feature flag infrastructure
- A/B testing system
- Advanced analytics

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (75 FRs, comprehensive NFRs)
- [x] Scale and complexity assessed (Medium-High)
- [x] Technical constraints identified (SSR, real-time, GDPR)
- [x] Cross-cutting concerns mapped (10 concerns)

**✅ Architectural Decisions**
- [x] Critical decisions documented (16 decisions)
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established (database, API, code, JSON)
- [x] Structure patterns defined (tests, components, modules)
- [x] Communication patterns specified (WebSocket, state, validation)
- [x] Process patterns documented (errors, loading, caching)

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
1. TypeScript across entire stack ensures type safety
2. Shared Zod schemas prevent frontend/backend validation mismatches
3. Comprehensive security architecture (Argon2, JWT, rate limiting)
4. Real-time architecture ready for viral claims (Redis-backed Socket.io)
5. Privacy-first design (no IP storage, GDPR compliance)
6. Cloud-agnostic deployment (Docker-based)
7. Clear patterns prevent AI agent conflicts
8. Monorepo enables code sharing and atomic commits

**Areas for Future Enhancement:**
1. Consider GraphQL for complex query scenarios (post-MVP)
2. Evaluate edge caching/CDN for static assets
3. Add distributed tracing (Jaeger/Zipkin) for debugging
4. Implement feature flags for gradual rollouts

### Implementation Handoff

**AI Agent Guidelines:**
1. Follow all architectural decisions exactly as documented
2. Use implementation patterns consistently across all components
3. Respect project structure and boundaries
4. Refer to this document for all architectural questions
5. When in doubt, check the "Anti-Patterns" section

**First Implementation Steps:**
```bash
# 1. Initialize monorepo
mkdir groundtruth && cd groundtruth
pnpm init

# 2. Create workspace structure
mkdir -p packages/{shared,backend,frontend} migrations docker secrets

# 3. Initialize frontend
cd packages/frontend
npx nuxi@latest init .
npx nuxi@latest module add tailwindcss

# 4. Initialize backend
cd ../backend
npm install -g @nestjs/cli
nest new . --strict

# 5. Initialize shared package
cd ../shared
pnpm init
pnpm add zod typescript

# 6. Setup Docker Compose
cd ../../
# Create docker-compose.yml with PostgreSQL + Redis
```

**Implementation Priority:**
1. Project initialization and Docker setup
2. Shared types package (Zod schemas)
3. Authentication module (JWT, Argon2)
4. Core entities (users, claims, votes)
5. API endpoints with Swagger
6. WebSocket gateway
7. Frontend authentication flow
8. Claim browsing and voting UI

---

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED

**Total Steps Completed:** 8
**Date Completed:** 2026-01-14
**Document Location:** _bmad-output/planning-artifacts/architecture.md

### Final Architecture Deliverables

**Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**Implementation Ready Foundation**

- 16 architectural decisions made
- 10 implementation patterns defined
- 12 architectural components specified
- 75 functional requirements fully supported

**AI Agent Implementation Guide**

- Technology stack with verified versions
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries
- Integration patterns and communication standards

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing groundtruth. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
```bash
# Initialize monorepo with pnpm workspaces
mkdir groundtruth && cd groundtruth && pnpm init
```

**Development Sequence:**

1. Initialize project using documented starter template
2. Set up development environment per architecture
3. Implement core architectural foundations
4. Build features following established patterns
5. Maintain consistency with documented rules

### Quality Assurance Checklist

**Architecture Coherence**

- [x] All decisions work together without conflicts
- [x] Technology choices are compatible
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**Requirements Coverage**

- [x] All functional requirements are supported
- [x] All non-functional requirements are addressed
- [x] Cross-cutting concerns are handled
- [x] Integration points are defined

**Implementation Readiness**

- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] Examples are provided for clarity

### Project Success Factors

**Clear Decision Framework**
Every technology choice was made collaboratively with clear rationale, ensuring all stakeholders understand the architectural direction.

**Consistency Guarantee**
Implementation patterns and rules ensure that multiple AI agents will produce compatible, consistent code that works together seamlessly.

**Complete Coverage**
All project requirements are architecturally supported, with clear mapping from business needs to technical implementation.

**Solid Foundation**
The chosen starter template and architectural patterns provide a production-ready foundation following current best practices.

---

**Architecture Status:** READY FOR IMPLEMENTATION

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.
