---
project_name: 'groundtruth'
user_name: 'Aurel'
date: '2026-01-14'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 85
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

### Core Stack
- **Runtime**: Node.js 18+
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm (workspaces)

### Frontend
- **Framework**: Nuxt 3 (latest)
- **UI**: Vue 3 Composition API
- **Styling**: Tailwind CSS
- **State**: Pinia
- **Build**: Vite

### Backend
- **Framework**: NestJS (latest, strict mode)
- **ORM**: TypeORM
- **WebSocket**: Socket.io with Redis adapter
- **Validation**: Zod (shared schemas)
- **API Docs**: Swagger/OpenAPI

### Data Layer
- **Database**: PostgreSQL
- **Cache**: Redis
- **Backup**: pgBackRest

### Auth & Security
- **Tokens**: JWT (httpOnly cookies, 60min access, 30-day refresh)
- **Hashing**: Argon2id
- **Rate Limiting**: @nestjs/throttler + Redis

### Visualization
- **Charts**: Chart.js + vue-chartjs
- **Maps**: Leaflet + @vue-leaflet

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Monitoring**: Winston + Sentry + Prometheus/Grafana

## Critical Implementation Rules

### TypeScript Rules

**Strict Mode Requirements:**
- `strict: true` in all tsconfig.json files
- No `any` types - use `unknown` and narrow with type guards
- All functions must have explicit return types
- All parameters must have explicit types

**Import/Export Patterns:**
- Use named exports (not default exports) for better tree-shaking
- Import order: external packages → internal modules → relative imports
- Use path aliases: `@/` for src root in each package

**Async/Await Patterns:**
- Always use async/await over raw Promises
- Never use `.then()` chains - use async/await
- Always handle errors with try/catch, never ignore Promise rejections

**Shared Types:**
- All DTOs defined in `packages/shared/src/schemas/` using Zod
- TypeScript types inferred: `type Vote = z.infer<typeof VoteSchema>`
- Never duplicate type definitions between frontend and backend

### Nuxt 3 (Frontend) Rules

**Composition API:**
- Always use `<script setup lang="ts">` syntax
- Use composables for reusable logic: `composables/useXxx.ts`
- Components auto-import - no manual imports needed

**State Management:**
- Pinia stores: `useAuthStore`, `useClaimStore`, `useVoteStore`, `useWebSocketStore`
- Composables for UI state (modals, forms, local state)
- Never mutate store state directly outside actions

**Rendering:**
- SSR enabled for claim detail pages (SEO)
- CSR for authenticated dashboard pages
- Use `useFetch()` for data fetching, not raw `fetch()`

**Component Organization:**
- Feature folders: `components/users/`, `components/claims/`, `components/votes/`
- Shared components: `components/common/`
- File naming: `PascalCase.vue` (e.g., `UserCard.vue`)

### NestJS (Backend) Rules

**Module Organization:**
- One module per domain: `users/`, `claims/`, `votes/`, `experts/`
- Each module contains: entity, service, controller, module, spec files
- Shared code in `common/` folder (guards, pipes, filters, decorators)

**Dependency Injection:**
- Always use constructor injection
- Never instantiate services with `new` - let DI container handle it
- Use `@Injectable()` decorator on all services

**Controllers:**
- Use `@ApiTags()` and `@ApiOperation()` for Swagger docs
- Validation with Zod pipes (shared schemas)
- Return DTOs, not entities directly

**Guards & Interceptors:**
- `JwtAuthGuard` for authenticated routes
- `RolesGuard` for role-based access (user, expert, moderator, admin)
- `ThrottlerGuard` for rate limiting

### Testing Rules

**Test Organization (Hybrid):**
- Unit tests: Co-located with source files (`*.spec.ts` next to `*.ts`)
- Integration tests: Co-located in backend modules (`*.integration.spec.ts`)
- E2E tests: Separate directories
  - Backend: `test/e2e/*.e2e-spec.ts`
  - Frontend: `tests/e2e/*.spec.ts` (Playwright)

**Test Frameworks:**
- Backend: Vitest (unit, integration, E2E)
- Frontend: Vitest (unit), Playwright (E2E)
- Monorepo: Vitest workspace mode for unified test execution

**Test Naming:**
- Describe blocks: Feature or function name
- Test cases: "should [expected behavior] when [condition]"
- Example: `it('should return 401 when token is expired')`

**Mocking Rules:**
- Mock external services (Redis, PostgreSQL) in unit tests
- Use real database in integration tests (Docker test container)
- Never mock the code under test

**Coverage Requirements:**
- Minimum 80% coverage for new code
- All public API endpoints must have integration tests
- All Zod schemas must have validation tests

**What to Test:**
- Business logic in services (unit tests)
- API contracts and error responses (integration tests)
- Critical user flows (E2E tests)
- Do NOT test framework internals or trivial getters/setters

### Code Quality & Style Rules

**Naming Conventions (Critical):**
- Database: `snake_case` (tables: `users`, columns: `user_id`, `created_at`)
- API endpoints: `kebab-case`, plural (`/api/v1/claims`, `/api/v1/expert-applications`)
- TypeScript: `camelCase` (variables, functions), `PascalCase` (classes, interfaces, Vue components)
- JSON API fields: `camelCase` (`userId`, `voteValue`, `createdAt`)
- Constants: `SCREAMING_SNAKE_CASE` (`MAX_VOTE_VALUE`, `JWT_SECRET`)
- Files: `kebab-case.ts` for TS files, `PascalCase.vue` for Vue components

**Linting & Formatting:**
- ESLint + Prettier must pass before commit
- No `console.log` in production code (use Winston logger)
- No commented-out code in commits
- Maximum line length: 100 characters

**Code Organization:**
- One class/component per file
- Keep files under 300 lines - split if larger
- Group imports: external → internal → relative
- Alphabetize imports within groups

**Documentation:**
- JSDoc for all public functions and methods
- Swagger decorators on all API endpoints
- README in each package explaining purpose and usage
- No inline comments for obvious code

### Development Workflow Rules

**Git Branching:**
- `main` - production-ready code (protected)
- `develop` - integration branch for features
- Feature branches: `feature/description-kebab-case`
- Bug fixes: `fix/description-kebab-case`
- Hotfixes: `hotfix/description-kebab-case`

**Commit Messages:**
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Scope: module name (`auth`, `claims`, `votes`, `frontend`)
- Example: `feat(votes): add geographic distribution caching`
- Keep subject line under 72 characters

**Pull Request Requirements:**
- All CI checks must pass (lint, test, build)
- At least one approval required
- No merge conflicts
- Descriptive title and description
- Link to related issue/story if applicable

**Environment Configuration:**
- Never commit `.env` files (use `.env.example` as template)
- Sensitive values in Docker secrets (not environment variables)
- Use `runtimeConfig` in Nuxt, `ConfigModule` in NestJS
- All config values must have defaults or fail fast on missing

**Local Development:**
- `docker-compose up` starts PostgreSQL, Redis
- Frontend: `pnpm --filter frontend dev` (port 3000)
- Backend: `pnpm --filter backend start:dev` (port 3001)
- Shared package changes require rebuild: `pnpm --filter shared build`

### Critical Don't-Miss Rules

**Anti-Patterns to AVOID:**
```typescript
// ❌ WRONG: Mixed naming conventions
POST /api/v1/ClaimList           // Should be /api/v1/claims
{ "vote_value": 75 }             // Should be { "voteValue": 75 }

// ❌ WRONG: Wrapped API responses
{ "success": true, "data": {...} }  // Return data directly

// ❌ WRONG: camelCase WebSocket events
socket.emit('voteCast', {...})   // Should be 'vote:cast'

// ❌ WRONG: Storing JWT in localStorage
localStorage.setItem('token')    // Use httpOnly cookies

// ❌ WRONG: Direct entity exposure
return this.userRepository.findOne(id);  // Return DTO instead
```

**Security Rules (Critical):**
- NEVER store passwords in plain text - always Argon2id
- NEVER store JWT in localStorage - use httpOnly cookies only
- NEVER log sensitive data (passwords, tokens, PII)
- NEVER trust client input - validate with Zod on backend
- ALWAYS use parameterized queries (TypeORM handles this)
- ALWAYS sanitize user-generated content before display
- ALWAYS use HTTPS in production (TLS 1.3+)

**Performance Rules:**
- ALWAYS use Redis cache for claim scores and geographic data
- NEVER fetch all records - use pagination (`limit`, `offset`)
- NEVER N+1 queries - use TypeORM relations or query builder joins
- ALWAYS lazy-load Leaflet maps (only on claim detail page)
- ALWAYS debounce search inputs (300ms minimum)

**WebSocket Rules:**
- Join room on entering claim page: `socket.join(\`claim:${claimId}\`)`
- Leave room on exit: `socket.leave(\`claim:${claimId}\`)`
- Always include `timestamp` in event payloads
- Handle reconnection gracefully (re-fetch current state)

**Database Rules:**
- NEVER use `synchronize: true` in production TypeORM config
- ALWAYS use migrations for schema changes
- ALWAYS add indexes for frequently queried columns
- NEVER store IP addresses - only country codes (GDPR)

**Error Handling:**
- ALWAYS include `request_id` in error responses for tracing
- NEVER expose stack traces to clients in production
- ALWAYS return appropriate HTTP status codes (not just 200/500)
- ALWAYS log errors with Winston before responding

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Reference the architecture.md for detailed decisions

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

---

**Last Updated:** 2026-01-14
