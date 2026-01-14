# Story 1.1: User Registration with Email

Status: ready-for-dev

## Story

As a **new user**,
I want **to register for an account using email address**,
So that **I can create a unique identity on groundtruth**.

## Acceptance Criteria

**Given** I am on the registration page
**When** I enter my email address and click "Register"
**Then** the system validates the email format and checks it doesn't already exist
**And** an email verification link is sent to my address
**And** I see a message saying "Check your email to verify your account"

**Given** I receive the verification email
**When** I click the verification link in the email
**Then** my email is marked as verified in the system
**And** I am redirected to set up my phone number

## Tasks / Subtasks

- [ ] Task 1: Database Schema & Migrations (AC: All)
  - [ ] Create initial migration file `001_users_table.sql`
  - [ ] Define `users` table with snake_case columns: `id`, `email`, `email_verified`, `phone`, `phone_verified`, `password_hash`, `verification_status`, `is_expert`, `reputation_score`, `created_at`, `updated_at`
  - [ ] Add indexes: `idx_users_email` (unique), `idx_users_phone` (unique)
  - [ ] Add `email_verifications` table: `id`, `user_id`, `token`, `expires_at`, `verified_at`
  - [ ] Test migration rollback

- [ ] Task 2: Backend - User Entity & Repository (AC: All)
  - [ ] Create `packages/backend/src/users/entities/user.entity.ts` using TypeORM
  - [ ] Map entity fields using camelCase → snake_case transformation
  - [ ] Create `users.repository.ts` with methods: `findByEmail()`, `create()`, `findById()`
  - [ ] Exclude password_hash from default selections
  - [ ] Write unit tests for repository methods

- [ ] Task 3: Backend - Email Verification Service (AC: All)
  - [ ] Create `packages/backend/src/auth/email-verification.service.ts`
  - [ ] Implement `generateVerificationToken()` - secure random token (32 bytes, hex)
  - [ ] Implement `sendVerificationEmail()` using SendGrid or AWS SES
  - [ ] Create email template with verification link format: `{FRONTEND_URL}/verify-email?token={token}`
  - [ ] Token expires in 24 hours
  - [ ] Store token in `email_verifications` table
  - [ ] Write unit tests mocking email service

- [ ] Task 4: Backend - Registration API Endpoint (AC: 1-4)
  - [ ] Create `packages/backend/src/auth/auth.controller.ts`
  - [ ] Add `POST /api/v1/auth/register` endpoint
  - [ ] Use Zod validation pipe for request body (shared schema from `packages/shared`)
  - [ ] Validate email format using shared `RegistrationSchema`
  - [ ] Check email uniqueness (return 409 Conflict if exists)
  - [ ] Hash password using Argon2id (NOT bcrypt - see project-context.md)
  - [ ] Create user record with `verification_status: 'unverified'`
  - [ ] Generate and send verification email
  - [ ] Return 201 Created with message: "Check your email to verify your account"
  - [ ] Handle errors with standard format (error codes: `EMAIL_ALREADY_EXISTS`, `INVALID_EMAIL_FORMAT`)
  - [ ] Add Swagger/OpenAPI documentation using @nestjs/swagger decorators
  - [ ] Write integration tests

- [ ] Task 5: Backend - Email Verification Endpoint (AC: 5-6)
  - [ ] Add `GET /api/v1/auth/verify-email?token={token}` endpoint
  - [ ] Validate token exists and not expired
  - [ ] Mark email as verified in `users` table: `email_verified: true`
  - [ ] Update `email_verifications` table: `verified_at: timestamp`
  - [ ] Return redirect URL to frontend: `/register/phone-setup`
  - [ ] Handle invalid/expired tokens with clear error messages
  - [ ] Write integration tests

- [ ] Task 6: Shared Validation Schemas (AC: 1-2)
  - [ ] Create `packages/shared/src/schemas/user.schema.ts`
  - [ ] Define `RegistrationSchema` using Zod:
    - `email`: z.string().email()
    - `password`: z.string().min(12) with complexity rules (mixed case, numbers, symbols)
  - [ ] Export TypeScript type: `type Registration = z.infer<typeof RegistrationSchema>`
  - [ ] Write validation tests

- [ ] Task 7: Frontend - Registration Page Component (AC: 1-4)
  - [ ] Create `packages/frontend/pages/register.vue`
  - [ ] Use Tailwind CSS with clean, minimal design
  - [ ] Email input field with validation feedback
  - [ ] Password input field with strength indicator
  - [ ] "Register" button (disabled until valid)
  - [ ] Client-side validation using shared `RegistrationSchema`
  - [ ] On submit: call `/api/v1/auth/register` via composable `useAuth()`
  - [ ] Show success message: "Check your email to verify your account"
  - [ ] Handle errors with inline messages (email exists, invalid format, server errors)
  - [ ] Accessible (WCAG 2.1 AA): keyboard navigation, ARIA labels, screen reader support
  - [ ] Mobile-responsive (≥ 320px width)

- [ ] Task 8: Frontend - Email Verification Page (AC: 5-6)
  - [ ] Create `packages/frontend/pages/verify-email.vue`
  - [ ] Extract `token` from query parameter
  - [ ] Automatically call `/api/v1/auth/verify-email?token={token}` on page load
  - [ ] Show loading state while verifying
  - [ ] On success: redirect to `/register/phone-setup`
  - [ ] On failure: show error with link to request new verification email
  - [ ] Handle expired tokens gracefully

- [ ] Task 9: Frontend - Auth Composable (AC: All)
  - [ ] Create `packages/frontend/composables/useAuth.ts`
  - [ ] Implement `register(email, password)` method
  - [ ] Implement `verifyEmail(token)` method
  - [ ] Handle API responses and errors
  - [ ] Use Nuxt's `useFetch()` or custom API client
  - [ ] Return loading states and error messages
  - [ ] Write composable unit tests

- [ ] Task 10: Integration & E2E Testing (AC: All)
  - [ ] Backend integration test: Full registration flow (register → email sent → verify → user record updated)
  - [ ] Frontend E2E test (Playwright): Navigate to register → fill form → submit → see success message
  - [ ] Test error cases: duplicate email, invalid format, expired token
  - [ ] Test email service failure graceful handling

## Dev Notes

### Critical Architecture Requirements

**Authentication Foundation (Decision 4, 5 from Architecture):**
- **Password Hashing:** Use Argon2id (NOT bcrypt)
  - Configuration: variant=Argon2id, memory=65536KB, time=3, parallelism=4
  - Package: `argon2` npm package (native bindings)
  - Rationale: State-of-the-art security, GPU-attack resistant (Architecture Decision 5)
- **JWT Tokens:** Will be implemented in Story 1.4 (User Login)
  - httpOnly cookies for storage
  - Access token: 60min expiry
  - Refresh token: 30-day expiry

**Email Service Integration:**
- Use SendGrid or AWS SES (both options acceptable)
- Verification link format: `{FRONTEND_URL}/verify-email?token={token}`
- Token security: 32 bytes random hex
- Token expiry: 24 hours
- Store in separate `email_verifications` table for audit trail

**Database Design (Architecture: Data Architecture):**
- Table: `users` (snake_case columns)
- Columns: `id` (uuid primary key), `email` (varchar unique), `email_verified` (boolean), `phone` (varchar unique nullable), `phone_verified` (boolean), `password_hash` (varchar), `verification_status` (enum: 'unverified'|'phone_verified'|'advanced_verified'), `is_expert` (boolean default false), `reputation_score` (integer default 0), `created_at` (timestamp), `updated_at` (timestamp)
- Indexes: `idx_users_email` (unique), `idx_users_phone` (unique)
- Table: `email_verifications` for token tracking

**API Design Patterns (Architecture: API & Communication Decisions):**
- Endpoint: `POST /api/v1/auth/register` (plural `auth`, kebab-case)
- Request body: JSON with camelCase fields `{ "email": "user@example.com", "password": "SecurePass123!" }`
- Response: 201 Created with message OR 4xx with error object
- Error format (Decision 8):
  ```json
  {
    "error": {
      "code": "EMAIL_ALREADY_EXISTS",
      "message": "An account with this email already exists",
      "details": { "email": "user@example.com" },
      "timestamp": "2026-01-14T10:30:00.000Z",
      "request_id": "req_xyz789"
    }
  }
  ```
- Rate Limiting: 5 failed registration attempts per 15 minutes per IP (NFR-S9)

**Security Requirements (NFRs S1-S19):**
- HTTPS/TLS 1.3+ for all communication (NFR-S1)
- Argon2id password hashing (NFR-S2)
- No plaintext passwords in database (NFR-S3)
- Email stored encrypted at rest (NFR-S4)
- Input sanitization to prevent SQL injection (NFR-S11)
- Content Security Policy headers (NFR-S12)
- Email validation both client and server side

**Performance Requirements (NFRs P1-P10):**
- API response < 200ms for 95th percentile (NFR-P1)
- Email sending should be async (don't block response)
- Database queries optimized with proper indexes

### Project Structure Notes

**Backend Module Organization (Architecture: Project Structure):**
```
packages/backend/src/
  auth/
    auth.module.ts
    auth.controller.ts
    auth.service.ts
    email-verification.service.ts
    auth.service.spec.ts
  users/
    users.module.ts
    users.repository.ts
    entities/
      user.entity.ts
  common/
    pipes/
      zod-validation.pipe.ts
    filters/
      http-exception.filter.ts
    interceptors/
      request-id.interceptor.ts
```

**Frontend Component Organization (Architecture: Project Structure):**
```
packages/frontend/
  pages/
    register.vue
    verify-email.vue
  composables/
    useAuth.ts
  components/
    auth/
      RegisterForm.vue (optional extraction)
```

**Shared Package Structure:**
```
packages/shared/src/
  schemas/
    user.schema.ts
  types/
    user.types.ts
  constants/
    error-codes.ts
```

### Technology Stack Specifics

**Backend (NestJS):**
- TypeScript strict mode enabled
- Use `@Injectable()` decorator on services
- Constructor injection for dependencies
- NestJS validation pipes for request validation
- TypeORM for database access
- Argon2 for password hashing: `import * as argon2 from 'argon2';`
- Email service: SendGrid client or AWS SDK SES
- Swagger decorators: `@ApiTags()`, `@ApiOperation()`, `@ApiResponse()`

**Frontend (Nuxt 3):**
- Vue 3 Composition API with `<script setup lang="ts">`
- Tailwind CSS for styling
- Composables auto-imported (no manual imports needed)
- Use `useFetch()` or `$fetch` for API calls
- Zod for client-side validation
- Form handling: native or VeeValidate (optional)

**Shared Validation:**
- Zod schemas exported from `packages/shared`
- Use same schema on frontend and backend
- TypeScript types inferred from Zod: `z.infer<typeof Schema>`

### Testing Requirements

**Backend Testing (Jest):**
- Unit tests co-located: `auth.service.spec.ts` next to `auth.service.ts`
- Integration tests: `test/e2e/auth.e2e-spec.ts`
- Mock external services (email, database in unit tests)
- Use real database in integration tests (Docker test container)
- Coverage target: 80% for new code

**Frontend Testing (Vitest + Playwright):**
- Component tests: `register.spec.ts` next to `register.vue`
- E2E tests: `tests/e2e/registration.spec.ts` (Playwright)
- Mock API calls in unit tests
- Use real API in E2E tests (test environment)

**Test Naming Convention:**
- Describe blocks: Feature or function name
- Test cases: "should [expected behavior] when [condition]"
- Example: `it('should return 409 when email already exists')`

### References

- [Source: architecture.md#Authentication & Security Decisions - Decision 4, 5]
- [Source: architecture.md#API & Communication Decisions - Decision 7, 8]
- [Source: architecture.md#Data Architecture Decisions - Decision 1]
- [Source: project-context.md#TypeScript Rules]
- [Source: project-context.md#NestJS Backend Rules]
- [Source: project-context.md#Testing Rules]
- [Source: project-context.md#Security Rules]
- [Source: project-context.md#Critical Don't-Miss Rules]
- [Source: epics.md#Epic 1: Story 1.1 - User Registration with Email]
- [Source: prd.md#Functional Requirements FR1, FR2]
- [Source: prd.md#Non-Functional Requirements NFR-S1 through NFR-S19]
- [Source: ux-design-specification.md#Design System Foundation - Tailwind CSS]

## Dev Agent Record

### Agent Model Used

_To be filled by dev agent_

### Debug Log References

_To be filled by dev agent_

### Completion Notes List

_To be filled by dev agent_

### File List

_To be filled by dev agent_
