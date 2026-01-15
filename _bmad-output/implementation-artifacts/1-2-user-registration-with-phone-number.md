# Story 1.2: User Registration with Phone Number

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a new user,
I want to provide a phone number during registration,
so that I can enable phone-based security and voting access.

## Acceptance Criteria

### Scenario 1: Phone Number Submission
**Given** I am setting up my account after email verification
**When** I enter a phone number and click "Send Code"
**Then** the system validates the phone format and uniqueness (enforces one account per phone - FR4)
**And** an SMS code is sent to my phone
**And** I see an input field to enter the code

### Scenario 2: SMS Verification
**Given** I receive the SMS code
**When** I enter the code and click "Verify"
**Then** my phone number is marked as verified
**And** voting privileges are enabled for my account
**And** I can proceed to password creation (Story 1.3)

## Functional Requirements Covered
- **FR1:** Users can register for an account using email address and phone number
- **FR3:** Users must verify their phone number via SMS code
- **FR4:** System enforces one account per phone number

## Non-Functional Requirements
- **NFR-S10:** Phone verification required before voting privileges granted
- **NFR-S9:** Rate limiting to prevent brute-force attacks (5 failed attempts per 15 minutes)
- **NFR-P1:** API endpoints respond in under 200ms for 95th percentile
- **NFR-S1:** All data transmitted over HTTPS/TLS 1.3 or higher

## Tasks / Subtasks

### Backend Tasks
- [ ] Create phone verification entity and migration (AC: Scenario 1)
  - [ ] Create `phone-verification.entity.ts` following email-verification pattern
  - [ ] Create migration `002_phone_verifications_table.sql` for token storage table
  - [ ] Add indexes for phone number and expiry lookups

- [ ] Create PhoneVerificationService (AC: Scenario 1, 2)
  - [ ] Generate 6-digit numeric SMS codes with 10-minute expiry
  - [ ] Implement SMS sending via Twilio Verify API
  - [ ] Implement code verification logic with rate limiting
  - [ ] Mock SMS in development (log codes to console like email service)
  - [ ] Unit tests with mocked Twilio client

- [ ] Add phone verification endpoints to AuthController (AC: Scenario 1, 2)
  - [ ] `POST /api/v1/auth/send-sms-code` - Send verification SMS
  - [ ] `POST /api/v1/auth/verify-phone` - Verify SMS code
  - [ ] Apply ThrottlerGuard (5 attempts per 15 min)
  - [ ] Add Swagger documentation

- [ ] Update AuthService with phone verification flow (AC: Scenario 2)
  - [ ] Check phone uniqueness before sending SMS
  - [ ] Update user `phoneVerified` and `verificationStatus` after successful verification
  - [ ] Handle phone already exists error

- [ ] Update UsersRepository with phone queries (AC: Scenario 1)
  - [ ] findByPhone method with JSDoc
  - [ ] updatePhoneVerified method

- [ ] Write E2E tests for phone verification flow (AC: Scenario 1, 2)
  - [ ] Test successful flow: send SMS → verify code → phone_verified = true
  - [ ] Test duplicate phone number (conflict error)
  - [ ] Test invalid phone format
  - [ ] Test expired code
  - [ ] Test wrong code
  - [ ] Test rate limiting (6th attempt blocked)

### Shared Package Tasks
- [ ] Create PhoneVerificationSchema in user.schema.ts (AC: Scenario 1)
  - [ ] PhoneNumberSchema with libphonenumber-js validation
  - [ ] VerifySmsCodeSchema with 6-digit numeric validation
  - [ ] Export TypeScript types: `SendSmsCodeDto`, `VerifyPhoneDto`

- [ ] Add phone error codes to error-codes.ts (AC: Scenario 1, 2)
  - [ ] PHONE_ALREADY_EXISTS
  - [ ] INVALID_PHONE_FORMAT
  - [ ] SMS_CODE_EXPIRED
  - [ ] SMS_CODE_INVALID
  - [ ] SMS_SEND_FAILED
  - [ ] PHONE_VERIFICATION_RATE_LIMIT_EXCEEDED

### Frontend Tasks
- [ ] Replace phone-setup.vue placeholder with full implementation (AC: Scenario 1, 2)
  - [ ] Phone number input with libphonenumber-js formatting
  - [ ] Country code selector or auto-detect
  - [ ] Real-time validation feedback (green checkmark / red X)
  - [ ] "Send Code" button with loading state
  - [ ] SMS code input (6-digit, auto-focus, paste support)
  - [ ] "Verify" button with loading state
  - [ ] Success message and redirect to password creation
  - [ ] Error handling (invalid format, duplicate phone, wrong code, expired code)
  - [ ] "Resend code" link with cooldown timer
  - [ ] WCAG 2.1 AA compliance (ARIA labels, focus indicators, screen reader support)
  - [ ] Mobile-responsive (≥ 320px, touch targets ≥ 44px)

- [ ] Update useAuth.ts composable (AC: Scenario 1, 2)
  - [ ] `sendSmsCode(phone: string)` method
  - [ ] `verifyPhone(phone: string, code: string)` method
  - [ ] Error handling with standardized error codes

- [ ] Write E2E tests for phone setup UI (AC: Scenario 1, 2)
  - [ ] Test successful flow (enter phone → receive code → verify → redirect)
  - [ ] Test invalid phone format (shows error)
  - [ ] Test duplicate phone (shows error)
  - [ ] Test wrong code (shows error)
  - [ ] Test resend code functionality

## Dev Notes

### Critical Infrastructure Already Exists

**Database Schema (DO NOT CREATE NEW MIGRATION):**
- Users table already has phone fields: `phone VARCHAR(20) UNIQUE`, `phone_verified BOOLEAN DEFAULT FALSE`
- Unique constraint with partial index: `idx_users_phone ON users(phone) WHERE phone IS NOT NULL`
- Verification status enum: `'unverified'`, `'phone_verified'`, `'advanced_verified'`
- TypeORM entity (`user.entity.ts`) already maps: `phone`, `phoneVerified`, `verificationStatus`

**Frontend Placeholder Page Exists:**
- File: `packages/frontend/pages/register/phone-setup.vue` (current: "Coming Soon" message)
- **Must replace entire component** with functional implementation
- Email verification already redirects to this page after success

**Libraries Already Installed:**
- `libphonenumber-js` - Use for phone validation and E.164 formatting
- Twilio SDK will need to be installed: `pnpm add twilio`

### Architecture Patterns & Constraints

**SMS Provider Integration:**
- **Decision:** Use Twilio Verify API (recommended for 2FA/OTP)
- Install: `pnpm --filter backend add twilio`
- Pattern: Follow `email-verification.service.ts` structure
- Development mode: Log codes to console (no actual SMS sent)
- Production: Use Twilio Verify API with environment variables

**Phone Number Format:**
- **Storage:** E.164 international format (e.g., "+33612345678")
- **Validation:** Use `isValidPhoneNumber(phone)` from libphonenumber-js
- **Formatting:** Use `parsePhoneNumber(phone).format('E.164')` before storage
- **Display:** Use `parsePhoneNumber(phone).formatInternational()` for UI

**Verification Code:**
- **Format:** 6-digit numeric code (e.g., "123456")
- **Expiry:** 10 minutes (600 seconds)
- **Generation:** Random 6-digit number: `Math.floor(100000 + Math.random() * 900000)`
- **Storage:** Hash code before storing (same as email tokens - use crypto.createHash)

**Rate Limiting:**
- **Endpoint:** `@Throttle({ default: { limit: 5, ttl: 900000 } })` on send-sms-code
- **Purpose:** Prevent SMS spam (5 attempts per 15 minutes per phone)
- **Implementation:** ThrottlerGuard with Redis storage (already configured)

**Error Response Format:**
```json
{
  "error": {
    "code": "PHONE_ALREADY_EXISTS",
    "message": "This phone number is already registered",
    "details": { "phone": "+33612345678" },
    "timestamp": "2026-01-15T10:30:00.000Z",
    "request_id": "req_xyz789"
  }
}
```

### Source Tree Components to Touch

**Backend:**
- `packages/backend/src/auth/entities/phone-verification.entity.ts` (NEW)
- `packages/backend/src/auth/phone-verification.service.ts` (NEW)
- `packages/backend/src/auth/phone-verification.service.spec.ts` (NEW)
- `packages/backend/src/auth/auth.controller.ts` (MODIFY - add endpoints)
- `packages/backend/src/auth/auth.service.ts` (MODIFY - add phone flow)
- `packages/backend/src/users/users.repository.ts` (MODIFY - add phone queries)
- `packages/backend/src/migrations/002_phone_verifications_table.sql` (NEW)
- `packages/backend/test/e2e/auth.e2e-spec.ts` (MODIFY - add phone tests)

**Frontend:**
- `packages/frontend/pages/register/phone-setup.vue` (REPLACE entire component)
- `packages/frontend/composables/useAuth.ts` (MODIFY - add phone methods)
- `packages/frontend/tests/e2e/phone-verification.spec.ts` (NEW)

**Shared:**
- `packages/shared/src/schemas/user.schema.ts` (MODIFY - add phone schemas)
- `packages/shared/src/constants/error-codes.ts` (MODIFY - add phone errors)

### Testing Standards Summary

**Testing Framework:** Vitest (NOT Jest)
- Import: `import { describe, it, expect, vi } from 'vitest';`
- Mock: `vi.fn()`, `vi.mock()`, `vi.spyOn()`
- Config: `vitest.config.ts` and `vitest.workspace.ts`

**Test Organization:**
- Unit tests: Co-located with source (`.spec.ts`)
- Integration tests: Co-located in modules (`.integration.spec.ts`)
- E2E tests: `packages/backend/test/e2e/` and `packages/frontend/tests/e2e/`

**Test Naming Convention:**
```typescript
describe('PhoneVerificationService', () => {
  it('should generate 6-digit numeric code when generateCode is called', () => {
    // test implementation
  });

  it('should throw PHONE_ALREADY_EXISTS error when phone number is duplicate', () => {
    // test implementation
  });
});
```

**Mocking Strategy:**
- Mock Twilio client in unit tests: `vi.mock('twilio')`
- Use real database in integration tests (Docker test container)
- Never mock code under test

**Coverage Requirements:**
- Minimum 80% coverage for new code
- All endpoints must have integration tests
- All Zod schemas must have validation tests

### Project Structure Notes

**Naming Conventions:**
- Database: `snake_case` (columns: `phone_verified`, `created_at`)
- API endpoints: `kebab-case` (`/api/v1/auth/send-sms-code`)
- JSON fields: `camelCase` (`phoneNumber`, `verificationCode`, `createdAt`)
- TypeScript: `camelCase` (variables), `PascalCase` (classes, types)
- Files: `kebab-case.ts`, `PascalCase.vue`

**Dependency Injection Pattern (NestJS):**
- Always use constructor injection
- Never instantiate services with `new`
- Use `@Injectable()` decorator on all services
- Follow pattern from Story 1.1 services

**Swagger Documentation Pattern:**
```typescript
@ApiTags('Authentication')
@ApiOperation({ summary: 'Send SMS verification code' })
@ApiResponse({ status: 200, description: 'SMS code sent successfully' })
@ApiResponse({ status: 409, description: 'Phone number already exists' })
@ApiResponse({ status: 429, description: 'Rate limit exceeded' })
@Post('send-sms-code')
async sendSmsCode(@Body(new ZodValidationPipe(SendSmsCodeSchema)) body: SendSmsCodeDto) {
  // implementation
}
```

**Vue 3 Composition API Pattern:**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

const phoneNumber = ref('');
const verificationCode = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const isValidPhone = computed(() => {
  return phoneNumber.value && isValidPhoneNumber(phoneNumber.value);
});

async function sendCode() {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    await useAuth().sendSmsCode(phoneNumber.value);
    // show code input
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>
```

### References

**Architecture Decisions:**
- [Source: architecture.md#External Service Dependencies (Line 110)] - SMS Verification via Twilio
- [Source: architecture.md#Rate Limiting (Lines 556-569)] - Multi-level rate limiting with Redis
- [Source: architecture.md#Shared Validation (Lines 643-662)] - Zod schemas with libphonenumber-js
- [Source: architecture.md#Error Handling (Lines 700+)] - Standard error format with codes

**Previous Story Implementation:**
- [Source: 1-1-user-registration-with-email.md] - Service patterns, controller patterns, testing patterns
- [Source: packages/backend/src/auth/email-verification.service.ts] - Verification service architecture
- [Source: packages/backend/src/auth/auth.controller.ts] - Controller endpoint patterns

**Project Context:**
- [Source: project-context.md#TypeScript Rules] - Strict mode, no any types, explicit return types
- [Source: project-context.md#NestJS Rules] - Module organization, DI patterns, Swagger docs
- [Source: project-context.md#Testing Rules] - Vitest framework, co-located tests, coverage requirements
- [Source: project-context.md#Naming Conventions] - Database snake_case, API kebab-case, JSON camelCase

**External Resources:**
- [Twilio Verify API Documentation](https://www.twilio.com/docs/verify/api) - SMS verification best practices
- [libphonenumber-js NPM Package v1.12.34](https://www.npmjs.com/package/libphonenumber-js) - Phone validation API
- [NestJS Twilio Integration](https://github.com/nest-modules/twilio) - Injectable Twilio client for NestJS

### Latest Tech Information

**Twilio SDK (January 2026):**
- **Supported Node.js Versions:** 14, 16, 18, 20, 22 LTS
- **Recommended:** Node.js v20 LTS or v22 LTS for new projects
- **Verify API:** Preferred for OTP/2FA (handles SMS routing automatically)
- **Installation:** `pnpm add twilio`
- **NestJS Integration:** Use `nestjs-twilio` package for DI-friendly client OR direct initialization in service
- **Security Best Practices:**
  - Short OTP expiration (5-10 minutes)
  - Rate limiting on OTP generation/verification
  - Signature validation for webhooks
- **Development Mode:** Use Twilio Test Credentials (no actual SMS sent, codes logged)

**libphonenumber-js (Latest v1.12.34, published Jan 2026):**
- **Size:** 145 kB (65 kB code + 80 kB metadata) - much smaller than Google's 550 kB library
- **Installation:** Already installed in project
- **Key APIs:**
  ```typescript
  import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

  // Validation
  isValidPhoneNumber('+33612345678') // true
  isValidPhoneNumber('0612345678', 'FR') // true (with country hint)

  // Formatting
  parsePhoneNumber('+33612345678').format('E.164') // "+33612345678" (for storage)
  parsePhoneNumber('+33612345678').formatInternational() // "+33 6 12 34 56 78" (for display)
  parsePhoneNumber('+33612345678').formatNational() // "06 12 34 56 78" (local format)

  // Parsing
  const phone = parsePhoneNumber('+33612345678');
  phone.country // "FR"
  phone.nationalNumber // "612345678"
  phone.countryCallingCode // "33"
  ```
- **Documentation:** [GitHub Repository](https://github.com/catamphetamine/libphonenumber-js)

**Additional Context from Story 1.1:**
- **Password Hashing:** Use Argon2id (NOT bcrypt!) - configured: `{ type: argon2.argon2id, memoryCost: 65536, timeCost: 3, parallelism: 4 }`
- **JWT Tokens:** httpOnly cookies (60min access, 30-day refresh) - NEVER localStorage
- **Rate Limiting:** @nestjs/throttler with Redis backend (already configured)
- **Database:** PostgreSQL with TypeORM migrations (NOT synchronize: true in production)

## Dev Agent Record

### Agent Model Used

_To be completed by dev agent_

### Debug Log References

_To be completed by dev agent_

### Completion Notes List

_To be completed by dev agent_

### File List

_To be completed by dev agent_
