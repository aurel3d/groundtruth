---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments: 
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
epicsApprovedAt: '2026-01-14T15:02:35Z'
storiesCreatedAt: '2026-01-14T15:04:00Z'
validationCompletedAt: '2026-01-14T15:11:57Z'
workflowStatus: 'COMPLETE'
totalEpics: 9
totalStories: 73
requirementsCoverage: '100% (75 FRs)'
---

# groundtruth - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for groundtruth, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

#### User Management & Authentication (FR1-FR8)

- **FR1:** Users can register for an account using email address and phone number
- **FR2:** Users must verify their email address via confirmation link
- **FR3:** Users must verify their phone number via SMS code
- **FR4:** System enforces one account per phone number
- **FR5:** Users can log in with credentials to access authenticated features
- **FR6:** Users can log out to end their session
- **FR7:** Users can view and edit their profile information
- **FR8:** Users can view other users' public profiles

#### Claims Management (FR9-FR14)

- **FR9:** Authenticated users can submit new claims for verification
- **FR10:** Users can browse a list of claims with scores and filters
- **FR11:** Users can search for claims by text
- **FR12:** Users can view detailed information for any claim including transparency data
- **FR13:** Users can view the score evolution history for a claim over time
- **FR14:** System captures submission timestamp and submitter for each claim

#### Community Voting (FR15-FR21)

- **FR15:** Authenticated users can cast a vote on any claim (0-100 scale)
- **FR16:** Users can optionally provide an explanation with their vote
- **FR17:** Users can update their own vote on a claim
- **FR18:** Users can retract their own vote on a claim
- **FR19:** System records geographic origin (country) for each vote cast
- **FR20:** System displays community vote aggregate score for each claim
- **FR21:** System displays total count of community votes for each claim

#### Expert Verification System (FR22-FR31)

- **FR22:** Users can apply for expert verifier status by submitting credentials and domain expertise
- **FR23:** Admins can review expert applications with provided credentials
- **FR24:** Admins can approve expert applications and assign domain expertise tags
- **FR25:** Admins can reject expert applications with reason
- **FR26:** System designates approved users as expert verifiers with visible badge
- **FR27:** Expert verifiers can cast expert votes on claims (0-100 scale with required explanation)
- **FR28:** System displays expert vote aggregate score separately from community score
- **FR29:** System displays total count of expert votes for each claim
- **FR30:** System displays expert credentials and domain expertise on expert profiles
- **FR31:** Individual expert votes and explanations are visible to all users

#### Weighted Scoring Algorithm (FR32-FR36)

- **FR32:** System calculates unified weighted truth score combining community and expert votes
- **FR33:** System weights expert votes more heavily than community votes in unified score
- **FR34:** System displays unified score (0-100) prominently on claim pages
- **FR35:** System shows breakdown of community score vs expert score separately
- **FR36:** System recalculates and updates scores in real-time as new votes arrive

#### Geographic Transparency (FR37-FR42)

- **FR37:** System captures IP address during vote to determine geographic origin (country level)
- **FR38:** System aggregates vote distribution by country
- **FR39:** System displays geographic distribution visualizations on claim pages
- **FR40:** System prevents identification of individual voters through geographic data (aggregate only)
- **FR41:** Admins can view detailed geographic voting patterns for moderation purposes
- **FR42:** Users can filter claims by geographic voting patterns (e.g., "claims with high disagreement between US and EU")

#### Evidence Management (FR43-FR47)

- **FR43:** Users can submit evidence (links, text explanations, PDF documents) supporting their votes
- **FR44:** Evidence submissions are attributed to the submitter with timestamp
- **FR45:** Evidence can be linked to specific votes for transparency
- **FR46:** System supports multiple evidence formats (URLs, text, PDFs up to 10MB)
- **FR47:** Expert users can flag evidence as credible or not credible

#### Platform Administration (FR48-FR52)

- **FR48:** Admins can view dashboard showing platform health metrics
- **FR49:** Admins can manage expert verification applications with approval/rejection workflows
- **FR50:** Admins can suspend or ban users for violating community standards
- **FR51:** Admins can view moderation queues and flagged content
- **FR52:** System logs all admin actions for audit and compliance purposes

#### Content Moderation (FR53-FR56)

- **FR53:** Users can flag claims as potentially misleading or harmful
- **FR54:** Users can flag evidence as spam or inappropriate
- **FR55:** Moderation queue system routes flagged content for human review
- **FR56:** System can require CAPTCHA challenges for suspicious voting patterns

#### Real-Time Updates (FR57-FR60)

- **FR57:** Vote counts update in real-time across all connected clients
- **FR58:** Claim scores recalculate and display in real-time as votes arrive
- **FR59:** Geographic distribution visualizations update in real-time
- **FR60:** System maintains server-side session of active viewers per claim

#### Search & Discovery (FR61-FR63)

- **FR61:** Users can search claims by text content
- **FR62:** Users can filter claims by score range, confidence level, and category
- **FR63:** Results can be sorted by relevance, date, or community consensus

#### API & Integration (FR64-FR67)

- **FR64:** RESTful API provides endpoints for all claim operations (read/write)
- **FR65:** API uses JWT authentication with rate limiting (100 requests per minute per user)
- **FR66:** API responses include pagination support for large result sets
- **FR67:** API documentation is comprehensive and machine-readable (OpenAPI/Swagger)

#### Privacy & Compliance (FR68-FR71)

- **FR68:** Users can request export of all their personal data in machine-readable format
- **FR69:** Users can request deletion of their account and all personal data
- **FR70:** System implements privacy policy compliant with GDPR and CCPA
- **FR71:** System never publicly exposes individual voting history, only aggregates

#### User Experience & Accessibility (FR72-FR75)

- **FR72:** All pages are responsive and optimized for mobile devices (≥ 320px width)
- **FR73:** Application supports modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- **FR74:** Server-side rendering (SSR) implemented for SEO and initial load performance
- **FR75:** Application meets WCAG 2.1 Level AA accessibility standards with keyboard navigation and screen reader support

### Non-Functional Requirements

#### Performance (NFR-P1 to NFR-P10)

- **NFR-P1:** API endpoints respond in under 200ms for 95th percentile of requests
- **NFR-P2:** Claim detail pages load with First Contentful Paint (FCP) under 1.5 seconds
- **NFR-P3:** Largest Contentful Paint (LCP) occurs within 2.5 seconds
- **NFR-P4:** Time to Interactive (TTI) is under 3.5 seconds
- **NFR-P5:** Vote count updates appear to users within 500ms of vote submission
- **NFR-P6:** Score recalculations complete and display within 500ms of triggering vote
- **NFR-P7:** Geographic distribution visualizations update within 1 second of new vote data
- **NFR-P8:** System handles 100 concurrent users voting simultaneously without degradation
- **NFR-P9:** System processes 1,000 votes per minute during peak traffic
- **NFR-P10:** Search queries return results within 1 second for 95% of requests

#### Security (NFR-S1 to NFR-S19)

- **NFR-S1:** All data transmitted over HTTPS/TLS 1.3 or higher
- **NFR-S2:** User passwords hashed using bcrypt or Argon2 with appropriate cost factors
- **NFR-S3:** Database contains no plaintext passwords or sensitive credentials
- **NFR-S4:** Personal data (email, phone) encrypted at rest in database
- **NFR-S5:** JWT access tokens expire within 60 minutes maximum
- **NFR-S6:** JWT refresh tokens expire within 30 days maximum
- **NFR-S7:** Session tokens stored in httpOnly cookies (XSS protection)
- **NFR-S8:** CSRF tokens required for all state-changing operations
- **NFR-S9:** API rate limiting prevents brute-force authentication attacks (max 5 failed attempts per 15 minutes)
- **NFR-S10:** Phone verification required before voting privileges granted
- **NFR-S11:** All user inputs sanitized to prevent SQL injection
- **NFR-S12:** Content Security Policy (CSP) headers prevent XSS attacks
- **NFR-S13:** File uploads (evidence PDFs) scanned for malware before storage
- **NFR-S14:** Maximum file upload size enforced (10MB for evidence)
- **NFR-S15:** Individual voting history never publicly exposed, only aggregates
- **NFR-S16:** Geographic data stored at country-level only (no precise locations)
- **NFR-S17:** Users can request deletion of personal data (GDPR right to be forgotten)
- **NFR-S18:** Users can export their data in machine-readable format (GDPR data portability)
- **NFR-S19:** Privacy policy and consent mechanisms comply with GDPR and CCPA

#### Scalability (NFR-SC1 to NFR-SC10)

- **NFR-SC1:** System architecture supports scaling from MVP (1,000 users) to 10,000 active users without code changes
- **NFR-SC2:** Infrastructure plan documented for scaling to 100,000 users
- **NFR-SC3:** Performance degradation under 10% when user load increases 10x
- **NFR-SC4:** Database schema supports 1 million claims without performance degradation
- **NFR-SC5:** Geographic data aggregation remains performant with 10 million+ votes
- **NFR-SC6:** System handles viral claims (10,000+ votes per hour on single claim) without failure
- **NFR-SC7:** Horizontal scaling of API services through load balancing
- **NFR-SC8:** Database read replicas for scaling read operations
- **NFR-SC9:** Redis caching layer for high-traffic queries
- **NFR-SC10:** Async job queue for background processing (evidence scanning, data export)

#### Reliability & Availability (NFR-R1 to NFR-R9)

- **NFR-R1:** Target uptime of 99.8% (approximately 14 minutes downtime per month)
- **NFR-R2:** Daily automated backups with 30-day retention
- **NFR-R3:** Point-in-time recovery capability for 7 days
- **NFR-R4:** Graceful degradation: system operates in read-only mode during database maintenance
- **NFR-R5:** Error monitoring and alerting system for proactive issue detection
- **NFR-R6:** Disaster recovery plan documented with RTO < 4 hours and RPO < 1 hour
- **NFR-R7:** Load balancing and failover mechanisms for API services
- **NFR-R8:** Database connection pooling for efficient resource utilization
- **NFR-R9:** Circuit breaker pattern for external service integrations (geolocation, email)

#### Accessibility (NFR-A1 to NFR-A10)

- **NFR-A1:** WCAG 2.1 Level AA compliance for all pages
- **NFR-A2:** Full keyboard navigation support (no mouse required)
- **NFR-A3:** Screen reader compatible with semantic HTML and ARIA labels
- **NFR-A4:** Minimum 4.5:1 color contrast ratio for text
- **NFR-A5:** Focus indicators clearly visible for keyboard navigation
- **NFR-A6:** Form labels properly associated with input fields
- **NFR-A7:** All images have descriptive alt text
- **NFR-A8:** Videos include captions and transcripts
- **NFR-A9:** Mobile responsive design works on all device sizes
- **NFR-A10:** Font sizes and spacing optimized for readability

### Additional Requirements from Architecture

#### Technical Infrastructure & Implementation

- **Starter Template Not Specified** - Greenfield development approach
- **Real-time Communication Architecture** - WebSocket or Server-Sent Events (SSE) for live vote updates and score recalculation
- **Scoring & Calculation Engine** - Transparent, configurable algorithm for weighted score calculation
- **Geographic Data Service** - IP geolocation integration with efficient country-level aggregation
- **Evidence Storage Service** - Multi-format support (links, text, PDFs) with malware scanning
- **Multi-Role Authorization System** - Community voter, Expert verifier, Moderator, Administrator roles with fine-grained permissions
- **Hybrid Rendering Strategy** - SPA with server-side rendering (SSR) for SEO and initial page load performance
- **Database Read Replicas** - For scaling read-heavy operations
- **Redis Caching Layer** - For high-traffic queries (claim scores, popular claims)
- **Async Job Queue** - For background processing (evidence scanning, data export, report generation)

### Additional Requirements from UX Design

#### User Experience & Interface

- **Trust Dashboard Visual Hierarchy** - Unified score dominates display with progressive detail revelation (expert breakdown, community votes, geographic patterns accessible via interactive elements)
- **Geographic Heat Maps** - Aggregate-only, privacy-first visualization showing country-level voting patterns without identifying individual voters
- **Expert Profile Credibility** - Credentials, domain expertise tags, and public vote explanations visible on expert votes to build trust through social proof
- **Real-Time Engagement Indicators** - Live vote counts, visible score updates, geographic shifts that show consensus forming in real-time
- **Evidence Credibility Signals** - Community-vetted evidence ranking (upvoting) with expert flagging and transparent ranking algorithm
- **Responsive Mobile Design** - Optimized user experience from small phones (320px) to desktops with touch-friendly interactions
- **Accessibility-First Approach** - WCAG 2.1 Level AA with full keyboard navigation, screen reader compatibility, high contrast modes
- **Social Sharing with Context** - Shared links carry full transparency context (evidence, expert credentials, geographic distribution)
- **Disagreement as Feature** - When experts and community disagree or geographic splits occur, surface this as a key transparency moment rather than hiding it

### Requirement Categories for Coverage Tracking

- User Management & Authentication: 8 requirements
- Claims Management: 6 requirements
- Community Voting: 7 requirements
- Expert Verification System: 10 requirements
- Weighted Scoring Algorithm: 5 requirements
- Geographic Transparency: 6 requirements
- Evidence Management: 5 requirements
- Platform Administration: 5 requirements
- Content Moderation: 4 requirements
- Real-Time Updates: 4 requirements
- Search & Discovery: 3 requirements
- API & Integration: 4 requirements
- Privacy & Compliance: 4 requirements
- User Experience & Accessibility: 4 requirements
- **Total Functional Requirements: 75**
- **Total Non-Functional Requirements: 40+**
- **Total Additional Requirements (Architecture/UX): 20+**

---

## Epic List

### Epic 1: Foundation - User Authentication & Profiles
Authenticated users can create secure accounts, verify identity through email and phone, and manage public/private profile information. All subsequent features depend on this foundation.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8

### Epic 2: Core - Claims Discovery & Community Voting
Casual users can discover claims through search and filtering, cast community votes (0-100 scale), update/retract votes, and see real-time community consensus scores. This is the core value loop for Sarah (casual voter) and casual community participants.
**FRs covered:** FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR61, FR62, FR63

### Epic 3: Intelligence - Expert Verification System
Credentialed professionals can apply for expert verifier status, admins review and approve applications with domain expertise tagging, and approved experts cast weighted expert votes with required explanations visible to all users.
**FRs covered:** FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR30, FR31

### Epic 4: Scoring & Transparency - Weighted Algorithm & Geographic Patterns
All users see unified truth scores that transparently combine community and expert votes with clear weighting breakdown. Geographic voting distribution visualizations reveal regional consensus/disagreement patterns at country level, preserving voter privacy while enabling radical transparency.
**FRs covered:** FR32, FR33, FR34, FR35, FR36, FR37, FR38, FR39, FR40, FR41, FR42

### Epic 5: Evidence & Credibility - Evidence Submission & Attribution
Users can submit evidence (links, text, PDFs) backing up votes, evidence is attributed to submitters with timestamps, experts can flag evidence credibility, and evidence ranking uses community signals.
**FRs covered:** FR43, FR44, FR45, FR46, FR47

### Epic 6: Platform Health - Content Moderation & Administration
Platform operators manage user conduct, review expert applications, suspend problematic users, handle moderation queues, view platform health metrics, and maintain audit logs for compliance.
**FRs covered:** FR48, FR49, FR50, FR51, FR52, FR53, FR54, FR55, FR56

### Epic 7: Real-Time Engagement - Live Updates & Consensus Visibility
Users see vote counts, claim scores, and geographic distributions update in real-time as new votes arrive, creating transparency in action and trust through visible consensus formation.
**FRs covered:** FR57, FR58, FR59, FR60

### Epic 8: Integration & API - External Platform Access
External platforms (news organizations, researchers, journalists) integrate groundtruth's fact-checking capability via secure RESTful API with JWT authentication, rate limiting, and comprehensive documentation.
**FRs covered:** FR64, FR65, FR66, FR67

### Epic 9: Privacy, Compliance & Accessibility - Trust Foundation
Users trust groundtruth through sacred privacy (no individual voting history exposed), accessible experience (WCAG 2.1 AA, mobile-responsive, keyboard navigation, screen reader support, SSR for SEO), and compliance baseline (privacy policy, GDPR/CCPA alignment). Data export/deletion capabilities deferred post-MVP.
**FRs covered:** FR68, FR69*, FR70, FR71, FR72, FR73, FR74, FR75

---

## Requirements Coverage Map

### Functional Requirements Mapping to Epics

**Epic 1: User Authentication & Profiles**
- FR1: Users can register for an account using email address and phone number
- FR2: Users must verify their email address via confirmation link
- FR3: Users must verify their phone number via SMS code
- FR4: System enforces one account per phone number
- FR5: Users can log in with credentials to access authenticated features
- FR6: Users can log out to end their session
- FR7: Users can view and edit their profile information
- FR8: Users can view other users' public profiles

**Epic 2: Claims Discovery & Community Voting**
- FR9: Authenticated users can submit new claims for verification
- FR10: Users can browse a list of claims with scores and filters
- FR11: Users can search for claims by text
- FR12: Users can view detailed information for any claim including transparency data
- FR13: Users can view the score evolution history for a claim over time
- FR14: System captures submission timestamp and submitter for each claim
- FR15: Authenticated users can cast a vote on any claim (0-100 scale)
- FR16: Users can optionally provide an explanation with their vote
- FR17: Users can update their own vote on a claim
- FR18: Users can retract their own vote on a claim
- FR19: System records geographic origin (country) for each vote cast
- FR20: System displays community vote aggregate score for each claim
- FR21: System displays total count of community votes for each claim
- FR61: Users can search claims by text content
- FR62: Users can filter claims by score range, confidence level, and category
- FR63: Results can be sorted by relevance, date, or community consensus

**Epic 3: Expert Verification System**
- FR22: Users can apply for expert verifier status by submitting credentials and domain expertise
- FR23: Admins can review expert applications with provided credentials
- FR24: Admins can approve expert applications and assign domain expertise tags
- FR25: Admins can reject expert applications with reason
- FR26: System designates approved users as expert verifiers with visible badge
- FR27: Expert verifiers can cast expert votes on claims (0-100 scale with required explanation)
- FR28: System displays expert vote aggregate score separately from community score
- FR29: System displays total count of expert votes for each claim
- FR30: System displays expert credentials and domain expertise on expert profiles
- FR31: Individual expert votes and explanations are visible to all users

**Epic 4: Scoring & Transparency**
- FR32: System calculates unified weighted truth score combining community and expert votes
- FR33: System weights expert votes more heavily than community votes in unified score
- FR34: System displays unified score (0-100) prominently on claim pages
- FR35: System shows breakdown of community score vs expert score separately
- FR36: System recalculates and updates scores in real-time as new votes arrive
- FR37: System captures IP address during vote to determine geographic origin (country level)
- FR38: System aggregates vote distribution by country
- FR39: System displays geographic distribution visualizations on claim pages
- FR40: System prevents identification of individual voters through geographic data (aggregate only)
- FR41: Admins can view detailed geographic voting patterns for moderation purposes
- FR42: Users can filter claims by geographic voting patterns (e.g., "claims with high disagreement between US and EU")

**Epic 5: Evidence & Credibility**
- FR43: Users can submit evidence (links, text explanations, PDF documents) supporting their votes
- FR44: Evidence submissions are attributed to the submitter with timestamp
- FR45: Evidence can be linked to specific votes for transparency
- FR46: System supports multiple evidence formats (URLs, text, PDFs up to 10MB)
- FR47: Expert users can flag evidence as credible or not credible

**Epic 6: Platform Health**
- FR48: Admins can view dashboard showing platform health metrics
- FR49: Admins can manage expert verification applications with approval/rejection workflows
- FR50: Admins can suspend or ban users for violating community standards
- FR51: Admins can view moderation queues and flagged content
- FR52: System logs all admin actions for audit and compliance purposes
- FR53: Users can flag claims as potentially misleading or harmful
- FR54: Users can flag evidence as spam or inappropriate
- FR55: Moderation queue system routes flagged content for human review
- FR56: System can require CAPTCHA challenges for suspicious voting patterns

**Epic 7: Real-Time Engagement**
- FR57: Vote counts update in real-time across all connected clients
- FR58: Claim scores recalculate and display in real-time as votes arrive
- FR59: Geographic distribution visualizations update in real-time
- FR60: System maintains server-side session of active viewers per claim

**Epic 8: Integration & API**
- FR64: RESTful API provides endpoints for all claim operations (read/write)
- FR65: API uses JWT authentication with rate limiting (100 requests per minute per user)
- FR66: API responses include pagination support for large result sets
- FR67: API documentation is comprehensive and machine-readable (OpenAPI/Swagger)

**Epic 9: Privacy, Compliance & Accessibility**
- FR68: Users can request export of all their personal data in machine-readable format (deferred post-MVP)
- FR69: Users can request deletion of their account and all personal data
- FR70: System implements privacy policy compliant with GDPR and CCPA
- FR71: System never publicly exposes individual voting history, only aggregates
- FR72: All pages are responsive and optimized for mobile devices (≥ 320px width)
- FR73: Application supports modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- FR74: Server-side rendering (SSR) implemented for SEO and initial load performance
- FR75: Application meets WCAG 2.1 Level AA accessibility standards with keyboard navigation and screen reader support

---

## Epic Dependency Flow

```
FOUNDATION:
  Epic 1: Auth & Profiles (all other features depend on this)
  
CORE VALUE LOOP:
  Epic 2: Claims & Community Voting (enables casual users to participate)
  
INTELLIGENCE LAYER (enhance core):
  Epic 3: Expert Verification (credentialed perspectives)
  Epic 4: Scoring & Transparency (the differentiator - weights expertise + shows geographic patterns)
  Epic 5: Evidence (backing up votes with sources)
  
PLATFORM SCALE & OPERATIONS:
  Epic 6: Admin & Moderation (keeps platform healthy)
  Epic 7: Real-Time Engagement (makes all features feel alive)
  Epic 8: API (distribution channel)
  
CONTINUOUS FOUNDATION:
  Epic 9: Privacy & Accessibility (baseline trust + usability - spans all epics)
```

### Execution Priority for MVP

**Phase 1 (Must-Have for Launch):**
1. Epic 1: Authentication & Profiles
2. Epic 2: Claims & Community Voting
3. Epic 4: Scoring & Geographic Transparency (the differentiator)

**Phase 2 (Launch + Few Weeks):**
4. Epic 3: Expert Verification System
5. Epic 5: Evidence Management
6. Epic 6: Content Moderation & Admin

**Phase 3 (Optimize & Scale):**
7. Epic 7: Real-Time Engagement (infrastructure optimization)
8. Epic 8: API & Integration (distribution expansion)
9. Epic 9: Privacy & Accessibility (continuous improvement)

---

## Epic 1: Foundation - User Authentication & Profiles

Authenticated users can create secure accounts, verify identity through email and phone, and manage public/private profile information. All subsequent features depend on this foundation.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8

### Story 1.1: User Registration with Email

As a **new user**,
I want **to register for an account using email address**,
So that **I can create a unique identity on groundtruth**.

**Acceptance Criteria:**

**Given** I am on the registration page
**When** I enter my email address and click "Register"
**Then** the system validates the email format and checks it doesn't already exist
**And** an email verification link is sent to my address
**And** I see a message saying "Check your email to verify your account"

**Given** I receive the verification email
**When** I click the verification link in the email
**Then** my email is marked as verified in the system
**And** I am redirected to set up my phone number

### Story 1.2: User Registration with Phone Number

As a **new user**,
I want **to provide a phone number during registration**,
So that **I can enable phone-based security and voting access**.

**Acceptance Criteria:**

**Given** I am setting up my account after email verification
**When** I enter a phone number and click "Send Code"
**Then** the system validates the phone format and uniqueness (enforces one account per phone)
**And** an SMS code is sent to my phone
**And** I see an input field to enter the code

**Given** I receive the SMS code
**When** I enter the code and click "Verify"
**Then** my phone number is marked as verified
**And** voting privileges are enabled for my account
**And** I can set my password

### Story 1.3: Password Creation and Security

As a **new user**,
I want **to set a secure password for my account**,
So that **my account is protected with strong credentials**.

**Acceptance Criteria:**

**Given** I have verified my email and phone
**When** I enter a password and click "Create Account"
**Then** the system validates password strength (minimum 12 characters, mixed case, numbers, symbols)
**And** the password is hashed using bcrypt (cost factor ≥ 10) before storage
**And** only the hash is stored in the database
**And** my account is created and I can log in

### Story 1.4: User Login

As a **returning user**,
I want **to log in with my email and password**,
So that **I can access my account and participate in voting**.

**Acceptance Criteria:**

**Given** I am on the login page
**When** I enter my email and password and click "Log In"
**Then** the system hashes the provided password and compares it to the stored hash
**And** if credentials are correct, a JWT access token (valid for 60 minutes) is issued
**And** a JWT refresh token (valid for 30 days) is stored in an httpOnly cookie
**And** I am redirected to the claims feed

**Given** invalid credentials are provided
**When** I click "Log In"
**Then** after 5 failed attempts in 15 minutes, a CAPTCHA is required for the next attempt

### Story 1.5: User Logout

As a **logged-in user**,
I want **to log out from my account**,
So that **I can end my session on shared devices**.

**Acceptance Criteria:**

**Given** I am logged in and on the application
**When** I click the "Logout" button
**Then** my JWT tokens are invalidated
**And** my session is cleared
**And** I am redirected to the login page

### Story 1.6: View and Edit Own Profile

As a **logged-in user**,
I want **to view and edit my profile information**,
So that **I can manage my public identity and preferences**.

**Acceptance Criteria:**

**Given** I am logged in and visit my profile page
**When** I view the page
**Then** I see my username, profile picture, and any public information (bio)
**And** I see an "Edit Profile" button

**Given** I click "Edit Profile"
**When** I update my information and click "Save"
**Then** the system validates and updates my profile
**And** I see a confirmation message
**And** changes are visible immediately on my profile page

### Story 1.7: View Public Profiles

As a **any user (authenticated or guest)**,
I want **to view other users' public profiles**,
So that **I can assess their credibility and verify their expertise**.

**Acceptance Criteria:**

**Given** I click on a user's name or avatar (from a vote, comment, or direct link)
**When** I view their profile page
**Then** I see their public information: username, profile picture, contribution count
**And** if they are an expert verifier, I see their domain expertise tags and verification badge
**And** I do NOT see private information (email, phone, personal data)

### Story 1.8: Session Management with JWT Tokens

As a **the system**,
I want **to manage user sessions using JWT tokens with secure expiration and refresh**,
So that **user sessions are secure and seamlessly refreshed**.

**Acceptance Criteria:**

**Given** a user logs in
**When** they receive tokens
**Then** the access token expires after 60 minutes
**And** the refresh token is stored in httpOnly cookie (inaccessible to JavaScript)
**And** the refresh token remains valid for 30 days

**Given** a user's access token has expired
**When** they make a request
**Then** the system automatically uses the refresh token to issue a new access token (transparent to user)

---

## Epic 2: Core - Claims Discovery & Community Voting

Casual users can discover claims through search and filtering, cast community votes (0-100 scale), update/retract votes, and see real-time community consensus scores.

**FRs covered:** FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR61, FR62, FR63

### Story 2.1: Submit a New Claim

As a **authenticated user**,
I want **to submit a new claim for verification**,
So that **the community can investigate and vote on its truth**.

**Acceptance Criteria:**

**Given** I am logged in and on the "Submit Claim" page
**When** I enter claim text and click "Submit"
**Then** the system captures my claim, timestamp, and my user ID
**And** the claim is assigned a unique ID and stored in the database
**And** the claim appears on the feed with a score of "No votes yet"
**And** I see a confirmation message with a link to my claim

### Story 2.2: Browse Claims with Pagination

As a **user (authenticated or guest)**,
I want **to browse a list of all claims with their scores**,
So that **I can quickly see what claims the community is investigating**.

**Acceptance Criteria:**

**Given** I am on the claims feed page
**When** the page loads
**Then** I see a list of claims, newest first, with:
  - Claim text (truncated to 200 chars)
  - Community vote score (0-100)
  - Vote count
  - Submitter name
  - Submission date

**Given** I scroll to the bottom
**When** I reach the end of the current page
**Then** the next 20 claims load automatically (infinite scroll) OR a "Load More" button appears

### Story 2.3: Search Claims by Text

As a **user**,
I want **to search for specific claims by text**,
So that **I can find claims relevant to topics I care about**.

**Acceptance Criteria:**

**Given** I am on the claims feed
**When** I type keywords in the search box and press Enter
**Then** the system searches claim text for matching keywords
**And** results are returned within 1 second
**And** matching terms are highlighted in the results
**And** results are sorted by relevance (full match > partial match > word stem match)

### Story 2.4: Filter and Sort Claims

As a **user**,
I want **to filter claims by score range, category, and sort by date or popularity**,
So that **I can focus on claims that matter to me**.

**Acceptance Criteria:**

**Given** I am viewing the claims feed
**When** I click the filter button
**Then** I see filter options for:
  - Score range (slider from 0-100)
  - Category (politics, health, science, etc.)
  - Sort options: Newest, Most Votes, Trending, Controversial

**Given** I apply filters
**When** the feed refreshes
**Then** only claims matching my filters are displayed
**And** filters persist as I scroll

### Story 2.5: View Claim Detail Page

As a **user**,
I want **to see complete information about a claim including voting data**,
So that **I can understand the full context before voting**.

**Acceptance Criteria:**

**Given** I click on a claim
**When** the claim detail page loads
**Then** I see:
  - Full claim text
  - Unified score (0-100) prominently displayed
  - Community vote count and distribution (as a histogram)
  - Submitter name and timestamp
  - Score history chart (showing how score evolved over time)
  - List of top evidence submissions

**And** the page loads with FCP < 1.5s, LCP < 2.5s, TTI < 3.5s

### Story 2.6: View Claim Score History

As a **user**,
I want **to see how a claim's score has changed over time**,
So that **I can understand if consensus is converging or diverging**.

**Acceptance Criteria:**

**Given** I am on a claim detail page
**When** I view the score history chart
**Then** I see a line graph showing score changes over time (last 24 hours, 7 days, or all-time)
**And** I can hover over data points to see exact scores and vote counts at that time
**And** the chart updates in real-time as new votes arrive

### Story 2.7: Cast a Community Vote

As a **authenticated user**,
I want **to cast a vote on a claim (0-100 scale)**,
So that **I contribute to the community consensus score**.

**Acceptance Criteria:**

**Given** I am on a claim detail page and haven't voted yet
**When** I drag a slider to select a score (0 = false, 100 = true) and click "Vote"
**Then** my vote is recorded with:
  - My user ID
  - My vote value (0-100)
  - Timestamp
  - IP geolocation (country level only)

**And** the unified score recalculates and displays the new result (within 500ms)
**And** the vote count increments
**And** I see a confirmation: "Your vote has been recorded"

### Story 2.8: Vote with Optional Explanation

As a **authenticated user**,
I want **to optionally add an explanation with my vote**,
So that **I can show others why I voted this way**.

**Acceptance Criteria:**

**Given** I am casting a vote on a claim
**When** I add text in the "Explanation" field (optional, max 500 chars)
**And** I click "Vote"
**Then** my explanation is saved with my vote
**And** when other users view the claim, they can see my vote explanation
**And** explanations are sorted by helpfulness (upvotes)

### Story 2.9: Update or Retract My Vote

As a **authenticated user who has voted**,
I want **to change my vote or remove it entirely**,
So that **I can correct my vote if my opinion changes**.

**Acceptance Criteria:**

**Given** I have already voted on a claim
**When** I view the claim detail page
**Then** I see my current vote highlighted on the slider
**And** I can drag the slider to a new value and click "Update Vote"

**Or**

**Given** I want to remove my vote
**When** I click "Retract Vote"
**Then** my vote is deleted from the system
**And** the unified score recalculates
**And** I see a confirmation: "Your vote has been removed"

### Story 2.10: View Community Vote Distribution

As a **user**,
I want **to see how community votes are distributed across the 0-100 scale**,
So that **I can understand if consensus is strong or polarized**.

**Acceptance Criteria:**

**Given** I am on a claim detail page
**When** I view the community voting section
**Then** I see:
  - A histogram showing vote distribution (e.g., how many votes at 0-10, 10-20, ... 90-100)
  - Total vote count
  - Median score
  - Mode (most common vote)

**And** the histogram updates in real-time as votes arrive

### Story 2.11: Geographic Vote Capture

As a **the system**,
I want **to capture the geographic origin (country) of each vote**,
So that **users can see geographic consensus patterns**.

**Acceptance Criteria:**

**Given** a user casts a vote
**When** their vote is submitted
**Then** the system performs IP geolocation to determine their country
**And** the country (not precise location) is stored with their vote
**And** no user personally identifiable information is captured
**And** the user is informed that "Country-level geolocation data is captured to show global consensus"

---

## Epic 3: Intelligence - Expert Verification System

Credentialed professionals can apply for expert verifier status, admins review and approve applications with domain expertise tagging, and approved experts cast weighted expert votes with required explanations visible to all users.

**FRs covered:** FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR30, FR31

### Story 3.1: Expert Application Submission

As a **credentialed professional**,
I want **to apply for expert verifier status**,
So that **my specialized knowledge contributes more weight to scores**.

**Acceptance Criteria:**

**Given** I am a logged-in user
**When** I click "Apply to be an Expert Verifier"
**Then** I see a form asking for:
  - Professional credentials (credentials document/PDF upload or URL)
  - Domain of expertise (select from list: health, science, politics, law, technology, etc.)
  - Brief biography (max 500 chars)

**Given** I complete the form and click "Submit Application"
**When** the system processes my submission
**Then** my application is stored in the database with status "Pending Review"
**And** I see: "Your application has been submitted. We'll review it within 5 business days"

### Story 3.2: Credential Verification Document Storage

As a **the system**,
I want **to securely store expert credential documents**,
So that **admins can verify expert qualifications**.

**Acceptance Criteria:**

**Given** an expert uploads a credential document (PDF, image)
**When** the file is submitted
**Then** the file is scanned for malware
**And** stored securely (encrypted at rest)
**And** file size is limited to 10MB
**And** only the filename and storage reference are linked to the application

### Story 3.3: Admin Review Expert Applications

As a **platform administrator**,
I want **to review pending expert applications and verify credentials**,
So that **only qualified experts gain verification**.

**Acceptance Criteria:**

**Given** I am an admin viewing the expert applications queue
**When** I click on a pending application
**Then** I see:
  - Applicant's name, email, and public profile
  - Their credential document(s)
  - Domain of expertise claimed
  - Their biography

**Given** I review the credentials
**When** I click "Approve" or "Reject"
**Then** the application status updates
**And** if approved, the user is marked as an expert verifier
**And** if rejected, the applicant receives an email with the rejection reason

### Story 3.4: Expert Domain Expertise Tagging

As a **platform administrator**,
I want **to assign domain expertise tags to approved experts**,
So that **system can route relevant claims to the right experts**.

**Acceptance Criteria:**

**Given** I am approving an expert application
**When** I click "Approve"
**Then** I see checkboxes for domain expertise tags (Health, Science, Technology, Politics, Law, etc.)
**And** I can select multiple tags if the expert has interdisciplinary expertise
**And** when I confirm approval, the tags are saved to their expert profile

### Story 3.5: Expert Profile with Visible Badge

As a **any user**,
I want **to see when a voter is an expert and what their domain is**,
So that **I can weight their opinion appropriately**.

**Acceptance Criteria:**

**Given** I am viewing a claim or any vote
**When** I see a voter's name
**Then** if they are an expert verifier, I see:
  - A "✓ Expert Verified" badge
  - Their domain expertise tags (Health, Science, etc.)
  - A link to their public expert profile showing credentials summary

### Story 3.6: Expert Vote with Weighted Scale and Explanation

As a **expert verifier**,
I want **to cast expert votes on claims with a required explanation**,
So that **my weighted opinion contributes to the truth score with full transparency**.

**Acceptance Criteria:**

**Given** I am an approved expert viewing a claim detail page
**When** I want to vote
**Then** I see a voting interface specifically for expert votes:
  - A 0-100 scale slider (same as community, but labeled "Expert Assessment")
  - A required explanation field (minimum 50 chars, max 500 chars)

**Given** I select a score and add an explanation, then click "Cast Expert Vote"
**When** the system processes my vote
**Then** my expert vote is recorded with:
  - My expert user ID
  - My score (0-100)
  - My explanation text
  - Timestamp
  - Domain of expertise tag (for weighting)

**And** my vote does NOT require geographic location (expert reputation matters, not location)

### Story 3.7: Expert Vote Aggregation and Display

As a **the system**,
I want **to aggregate expert votes separately from community votes**,
So that **users can see both perspectives clearly**.

**Acceptance Criteria:**

**Given** multiple experts have voted on a claim
**When** the claim detail page renders
**Then** I display:
  - "Expert Assessment" score (weighted aggregate of expert votes)
  - Count of expert votes (separate from community count)
  - A breakdown showing which domains weighed in (e.g., "3 Health experts, 2 Science experts")

**And** the expert score updates in real-time as new expert votes arrive

### Story 3.8: Expert Votes with Visible Explanations

As a **any user**,
I want **to see expert explanations for their votes**,
So that **I understand the reasoning behind expert assessments**.

**Acceptance Criteria:**

**Given** I am on a claim detail page
**When** I view the expert votes section
**Then** I see a list of expert votes:
  - Expert name with verification badge and domain tags
  - Their vote score
  - Their explanation text
  - Vote timestamp

**And** explanations are displayed in a way that's easy to scan (summary first, full text on click)

### Story 3.9: Expert Vote Transparency and Accountability

As a **the system**,
I want **to ensure expert votes are fully transparent and can be audited**,
So that **the platform maintains integrity and experts are held accountable**.

**Acceptance Criteria:**

**Given** an expert has voted on a claim
**When** any user views the expert vote
**Then** they see:
  - The expert's name (not anonymous)
  - Their credentials summary and domain tags
  - Their full explanation
  - Timestamp of their vote
  - Count of how many users found this explanation helpful

**And** no expert votes are hidden or anonymized

### Story 3.10: Expert Verification Badge Lifetime

As a **the system**,
I want **to maintain expert verifier status until revoked**,
So that **verified experts don't lose status arbitrarily**.

**Acceptance Criteria:**

**Given** a user is approved as an expert verifier
**When** they are approved
**Then** their expert status is permanent (verified badge, voting weight)

**Unless** the admin revokes their status (for violating platform policies), in which case:
**Then** their badge is removed
**And** future votes carry normal community weight
**And** they receive an email explaining the revocation

---

## Epic 4: Scoring & Transparency - Weighted Algorithm & Geographic Patterns

All users see unified truth scores that transparently combine community and expert votes with clear weighting breakdown. Geographic voting distribution visualizations reveal regional consensus/disagreement patterns at country level, preserving voter privacy while enabling radical transparency.

**FRs covered:** FR32, FR33, FR34, FR35, FR36, FR37, FR38, FR39, FR40, FR41, FR42

### Story 4.1: Unified Score Calculation Algorithm

As a **the system**,
I want **to calculate a unified truth score combining community and expert votes**,
So that **users see a single clear score while understanding the composition**.

**Acceptance Criteria:**

**Given** a claim has community votes and expert votes
**When** the system calculates the unified score
**Then** the algorithm:
  - Averages community votes (CR_avg = sum of community votes / count)
  - Averages expert votes (ER_avg = sum of expert votes / count)
  - Calculates unified score = (0.35 × CR_avg) + (0.65 × ER_avg)
    - Expert votes weighted 1.86x heavier than community
    - Experts can influence outcome significantly but not override community

**And** the calculation is transparent and documented in the help section

### Story 4.2: Weighted Score Display on Claim Pages

As a **any user**,
I want **to see the unified score prominently displayed**,
So that **the primary truth assessment is immediately visible**.

**Acceptance Criteria:**

**Given** I view a claim detail page
**When** the page loads
**Then** I see:
  - A large, prominent score display (0-100 with color coding):
    - 0-30: Red ("Likely False")
    - 31-50: Orange ("Mixed Evidence")
    - 51-70: Yellow ("Partially True")
    - 71-85: Light Green ("Likely True")
    - 86-100: Dark Green ("Very Likely True")
  - Score updates in real-time as votes arrive

### Story 4.3: Score Breakdown Display

As a **user wanting deeper understanding**,
I want **to see the breakdown of community vs expert scores**,
So that **I understand what's driving the unified score**.

**Acceptance Criteria:**

**Given** I am on a claim detail page
**When** I look below the unified score
**Then** I see:
  - "Community Assessment: 62 (based on 240 votes)"
  - "Expert Assessment: 58 (based on 8 votes from Health & Science experts)"
  - A visual comparison (side-by-side bar charts or similar)
  - "How is this calculated?" link that explains the weighting

### Story 4.4: Real-Time Score Recalculation

As a **the system**,
I want **to recalculate and display the unified score in real-time**,
So that **users see consensus forming before their eyes**.

**Acceptance Criteria:**

**Given** a new vote is submitted on a claim
**When** the vote is recorded
**Then** the system:
  - Recalculates the unified score
  - Updates all connected clients within 500ms
  - Shows the new score with a subtle animation (brief highlight)
  - Preserves vote history for the history chart

### Story 4.5: Geographic Data Capture (Country Level Only)

As a **the system**,
I want **to capture country-level geolocation for each vote**,
So that **geographic patterns can be aggregated and visualized**.

**Acceptance Criteria:**

**Given** a user casts a vote
**When** the vote is submitted
**Then** the system:
  - Captures the voter's IP address
  - Uses IP geolocation service to determine country (not precise location)
  - Stores: vote_id, user_id, claim_id, score, timestamp, country
  - Does NOT store precise location, ISP name, or other identifying geolocation data

**And** users are informed: "We capture your country to show global voting patterns"

### Story 4.6: Geographic Vote Aggregation

As a **the system**,
I want **to aggregate votes by country efficiently**,
So that **geographic visualizations render quickly even with millions of votes**.

**Acceptance Criteria:**

**Given** votes have been cast from multiple countries
**When** the system receives a request for geographic distribution
**Then** it:
  - Queries vote counts per country for a specific claim (or aggregate)
  - Returns results in <1 second even for claims with 10K+ votes
  - Caches results to optimize repeated queries
  - Updates cache when new votes arrive

### Story 4.7: Geographic Distribution Visualization

As a **user**,
I want **to see a heat map showing voting patterns by country**,
So that **I understand global consensus and regional disagreement**.

**Acceptance Criteria:**

**Given** I view a claim detail page
**When** I scroll to the "Global Consensus" section
**Then** I see:
  - An interactive world heat map showing countries colored by their average score:
    - Red zones: Countries where votes lean "False"
    - Green zones: Countries where votes lean "True"
    - Gray zones: No votes from that country yet
  - Hover to see exact: "Country: 45 votes, avg score 68"
  - Click a country to see vote count and distribution

**And** the visualization updates in real-time as votes arrive

### Story 4.8: Geographic Privacy Assurance

As a **the system**,
I want **to ensure individual voter privacy while showing geographic patterns**,
So that **users trust the platform's privacy commitments**.

**Acceptance Criteria:**

**Given** geographic data is displayed
**When** users view the heat map or filters
**Then** the system:
  - Shows ONLY country-level aggregates (never city, region, or precise location)
  - Never identifies individual voters by location
  - If a country has < 5 votes on a claim, aggregate the votes into a broader region
  - Makes privacy policy visible: "Individual votes are never exposed, only country aggregates"

### Story 4.9: Geographic Disagreement Highlighting

As a **user**,
I want **to see when geographic regions disagree significantly**,
So that **I understand ideological or regional patterns**.

**Acceptance Criteria:**

**Given** a claim has votes from multiple regions with divergent opinions
**When** I view the geographic visualization
**Then** I see:
  - Highlighted "disagreement hot zones" where community and regional patterns diverge
  - A note: "This claim shows interesting geographic patterns - US and EU voters disagree"
  - An option to "Compare regions" showing side-by-side averages

**Example:**
- Overall score: 60 (mixed)
- US average: 45 (lean false)
- EU average: 72 (lean true)
- System highlights this pattern as interesting/notable

### Story 4.10: Admin Geographic Viewing for Moderation

As a **platform administrator**,
I want **to view detailed geographic voting patterns for moderation**,
So that **I can detect coordinated voting or manipulation**.

**Acceptance Criteria:**

**Given** I am an admin viewing a claim's analytics
**When** I click "Geographic Details"
**Then** I see:
  - Per-country vote counts and average scores
  - Timestamp ranges (when did votes arrive from each country)
  - Flags for suspicious patterns:
    - Sudden spike of votes from one country
    - Unusual time-of-day patterns per region
    - Potential bot detection (multiple accounts from same IP)

**Note:** Individual user data is not exposed; only aggregated patterns

### Story 4.11: User Filter by Geographic Voting Patterns

As a **user**,
I want **to filter or sort claims by geographic consensus patterns**,
So that **I can find claims with interesting regional disagreement**.

**Acceptance Criteria:**

**Given** I am on the claims feed
**When** I click the filter button
**Then** I see filter options including:
  - "High US-EU disagreement"
  - "Regional consensus" (claims where all regions agree)
  - "Trending in [specific country]" (claims with recent vote spikes from a region)

**Given** I apply a geographic filter
**When** the feed refreshes
**Then** only claims matching that filter are shown

---

## Epic 5: Evidence & Credibility - Evidence Submission & Attribution

Users can submit evidence (links, text, PDFs) backing up votes, evidence is attributed to submitters with timestamps, experts can flag evidence credibility, and evidence ranking uses community signals.

**FRs covered:** FR43, FR44, FR45, FR46, FR47

### Story 5.1: Submit Evidence with Multiple Formats

As a **authenticated user**,
I want **to submit evidence (links, text, PDFs) supporting my vote or claim**,
So that **the community has credible sources to evaluate**.

**Acceptance Criteria:**

**Given** I am on a claim detail page and have voted
**When** I click "Submit Evidence"
**Then** I see a form with options to:
  - Paste a URL (validates it's a valid URL)
  - Type text explanation (max 1000 chars)
  - Upload a PDF document (max 10MB)

**Given** I submit evidence
**When** the system processes it
**Then** the evidence is stored with:
  - My user ID and name
  - Timestamp
  - The content (URL, text, or file reference)
  - Linked to the specific claim

**And** I see confirmation: "Thank you! Your evidence has been submitted"

### Story 5.2: Evidence Attribution and Transparency

As a **any user**,
I want **to see who submitted evidence and when**,
So that **I can evaluate credibility based on source**.

**Acceptance Criteria:**

**Given** I view evidence submissions on a claim
**When** I see each evidence item
**Then** I see:
  - Submitter's name with link to their profile
  - Timestamp of submission
  - Evidence content (URL, excerpt of text, or PDF viewer)
  - Community voting on evidence (helpful/not helpful)

### Story 5.3: Evidence Format Support

As a **the system**,
I want **to support and validate multiple evidence formats**,
So that **users can submit diverse types of sources**.

**Acceptance Criteria:**

**Given** a user submits evidence
**When** they upload:
  - A URL: System validates it's a valid URL, makes it clickable and previewable (via URL preview)
  - Text: Accept and store as-is (max 1000 chars)
  - PDF: Accept file, scan for malware, store securely, provide viewer for access

**And** all file types are handled securely with no risk of code injection

### Story 5.4: Evidence Credibility Flagging by Experts

As a **expert verifier**,
I want **to flag evidence as credible or unreliable**,
So that **credible sources are surfaced and misinformation is identified**.

**Acceptance Criteria:**

**Given** I am an expert viewing evidence on a claim
**When** I see an evidence submission
**Then** I can click "Flag as Credible" or "Flag as Unreliable"

**Given** I flag evidence
**When** I submit my flag
**Then** my flag is recorded with my expert tag (which domain I'm expert in matters)
**And** the evidence shows aggregated credibility signals: "✓ Flagged credible by 2 Health experts, ✗ Flagged unreliable by 1 Science expert"

### Story 5.5: Evidence Ranking by Community Signals

As a **the system**,
I want **to rank evidence based on community and expert signals**,
So that **the most credible evidence appears first**.

**Acceptance Criteria:**

**Given** multiple evidence submissions exist for a claim
**When** the system displays evidence
**Then** it ranks by:
  1. Expert credibility flags (expert consensus matters most)
  2. Community helpfulness votes (upvotes/downvotes)
  3. Submission timestamp (newer evidence with similar signals)

**And** ranking is transparent: "Evidence ranked by expert verification + community helpfulness"

---

## Epic 6: Platform Health - Content Moderation & Administration

Platform operators manage user conduct, review expert applications, handle moderation queues, view platform health metrics, and maintain audit logs for compliance.

**FRs covered:** FR48, FR49, FR50, FR51, FR52, FR53, FR54, FR55, FR56

### Story 6.1: Community Flagging of Problematic Content

As a **any user**,
I want **to flag claims or evidence as misleading or harmful**,
So that **moderation team can review and take action**.

**Acceptance Criteria:**

**Given** I see a claim or evidence submission I think is problematic
**When** I click the "Flag" button
**Then** I see options:
  - "Misleading or false"
  - "Harmful content (violence, hate)"
  - "Spam"
  - "Other (please describe)"

**Given** I select a reason and optionally add context
**When** I click "Submit Flag"
**Then** the flag is recorded with:
  - Flagger's user ID
  - Content ID (claim or evidence)
  - Reason
  - Timestamp
  - Flag status = "Pending Review"

**And** I see confirmation: "Thank you for helping keep groundtruth healthy"

### Story 6.2: Moderation Queue Dashboard

As a **content moderator**,
I want **to see a queue of flagged claims and evidence for review**,
So that **I can prioritize and address problematic content**.

**Acceptance Criteria:**

**Given** I am a moderator viewing the dashboard
**When** I click "Moderation Queue"
**Then** I see:
  - A list of all flagged items sorted by:
    - Priority: Number of flags (more flags = higher priority)
    - Recent flags first
  - For each item:
    - The flagged content (claim or evidence)
    - Number of flags and reasons
    - Flag submitter identities
    - Actions: "Approve" (no action needed), "Remove", "Suspend User"

### Story 6.3: Moderator Actions on Flagged Content

As a **content moderator**,
I want **to take action on flagged content (approve/remove)**,
So that **harmful content is removed and innocuous content is approved**.

**Acceptance Criteria:**

**Given** I am reviewing a flagged item in the moderation queue
**When** I click "Approve"
**Then** the flag is closed with status "No action needed"
**And** the item remains visible on the platform

**When** I click "Remove"
**Then** I must select a reason and can optionally add a comment
**And** the content is deleted/hidden from the platform
**And** the submitter is notified: "Your submission was removed because: [reason]"

### Story 6.4: User Suspension for Policy Violations

As a **content moderator or admin**,
I want **to suspend or ban users who violate platform policies**,
So that **repeat bad actors are prevented from causing harm**.

**Acceptance Criteria:**

**Given** a user has multiple flagged contributions or is engaging in manipulation
**When** I click "Suspend User" on their content or profile
**Then** I see options:
  - Temporary suspension (specify duration: 1 day, 1 week, 1 month)
  - Permanent ban

**Given** I confirm suspension
**When** the action is applied
**Then** the user:
  - Cannot log in during suspension period
  - Cannot vote or submit new content
  - Cannot apply for expert verification (if banned)
**And** they receive an email: "Your account has been suspended because: [reason]"

### Story 6.5: Platform Health Metrics Dashboard

As a **platform administrator**,
I want **to view real-time health metrics of the platform**,
So that **I can monitor system health and detect issues**.

**Acceptance Criteria:**

**Given** I am an admin viewing the dashboard
**When** I click "Platform Health"
**Then** I see:
  - System uptime (% and time since last outage)
  - Active users (right now, last 24 hours, last 7 days)
  - Vote throughput (votes per minute, trending)
  - API response time (average latency)
  - Error rate (% of failed requests)
  - Database query performance (slow queries alert)
  - Real-time metrics refreshing every 10 seconds

### Story 6.6: Admin Moderation Queue Management

As a **platform administrator**,
I want **to review expert applications and manage the moderation queue**,
So that **expert verification and content moderation workflows are controlled**.

**Acceptance Criteria:**

**Given** I am an admin
**When** I view the dashboard
**Then** I see sections for:
  - Expert applications awaiting review (with application count)
  - Flagged content awaiting moderation (with count)
  - Suspended users (with suspension status and expiration)

**And** I can click each section to take action (approve/reject experts, approve/remove content, lift suspensions)

### Story 6.7: Audit Logging for Compliance

As a **the system**,
I want **to log all admin actions for audit and compliance**,
So that **platform activity is traceable and compliant with regulations**.

**Acceptance Criteria:**

**Given** an admin takes an action (suspend user, remove content, approve expert)
**When** the action is executed
**Then** the system logs:
  - Admin user ID
  - Action type (suspend, remove, approve, etc.)
  - Target content/user ID
  - Timestamp
  - Reason/notes provided by admin
  - Result (success/failure)

**And** audit logs are:
  - Stored separately from main database
  - Searchable by action type, date range, admin user
  - Accessible only to super-admins
  - Never deletable (write-once)

### Story 6.8: CAPTCHA for Suspicious Voting Patterns

As a **the system**,
I want **to challenge suspicious voting patterns with CAPTCHA**,
So that **bot voting and coordinated manipulation are prevented**.

**Acceptance Criteria:**

**Given** the system detects suspicious voting:
  - Multiple votes from same IP in short time
  - Voting on unrelated claims with identical voting pattern
  - Voting immediately after account creation

**When** suspicious pattern is detected
**Then** before the user can vote, they must:
  - Complete a CAPTCHA challenge
  - Verify their phone number (if not already verified)

**And** the vote is processed normally if CAPTCHA is passed

---

## Epic 7: Real-Time Engagement - Live Updates & Consensus Visibility

Users see vote counts, claim scores, and geographic distributions update in real-time as new votes arrive, creating transparency in action and trust through visible consensus formation.

**FRs covered:** FR57, FR58, FR59, FR60

### Story 7.1: Real-Time Vote Count Updates

As a **user viewing a claim**,
I want **to see vote counts update in real-time**,
So that **I witness the community building consensus**.

**Acceptance Criteria:**

**Given** I am viewing a claim detail page
**When** other users cast votes
**Then** within 500ms, I see:
  - Vote count increments: "45 votes → 46 votes"
  - The histogram/distribution updates
  - No page refresh required (uses WebSocket or SSE)

**And** the update is smooth and doesn't interrupt my reading

### Story 7.2: Real-Time Score Recalculation and Display

As a **user**,
I want **to see the unified score update in real-time**,
So that **I can see how expert input shifts the consensus**.

**Acceptance Criteria:**

**Given** I am viewing a claim with a score of 62
**When** an expert votes, changing the weighted average
**Then** within 500ms:
  - The score updates to the new value (e.g., 64)
  - I see a brief highlight/animation to show the change
  - I understand what triggered the change (expert vote, community vote, etc.)

### Story 7.3: Real-Time Geographic Distribution Updates

As a **user**,
I want **to see the geographic heat map update in real-time**,
So that **I understand how global consensus is forming**.

**Acceptance Criteria:**

**Given** I am viewing a claim's geographic visualization
**When** votes arrive from new countries or vote distributions change
**Then** within 1 second:
  - Heat map colors update to reflect new country data
  - Vote counts per country update
  - No page refresh required

**And** the update is visually obvious but doesn't disrupt the experience

### Story 7.4: Server-Side Session Management for Active Viewers

As a **the system**,
I want **to track active viewers on each claim**,
So that **the platform knows when to prioritize real-time updates**.

**Acceptance Criteria:**

**Given** I open a claim detail page
**When** the page loads
**Then** the system:
  - Establishes a WebSocket connection (or falls back to SSE)
  - Registers me as an active viewer on that claim
  - Broadcasts "Claim X now has 47 active viewers" (visible to viewers)

**Given** I close the page or navigate away
**When** my session ends
**Then** the viewer count decrements
**And** I am unregistered from that claim

### Story 7.5: WebSocket/SSE Infrastructure

As a **the system**,
I want **to use WebSocket or Server-Sent Events for real-time delivery**,
So that **updates are pushed to users efficiently without polling**.

**Acceptance Criteria:**

**Given** the system handles real-time updates
**When** a vote is submitted
**Then** instead of users polling, the system:
  - Establishes WebSocket connection for connected clients
  - Falls back to SSE if WebSocket not supported
  - Broadcasts vote/score/geographic updates to all viewers of a claim
  - Updates deliver within 500ms

**And** connections are managed efficiently (connection pooling, heartbeat)

---

## Epic 8: Integration & API - External Platform Access

External platforms (news organizations, researchers, journalists) integrate groundtruth's fact-checking capability via secure RESTful API with JWT authentication, rate limiting, and comprehensive documentation.

**FRs covered:** FR64, FR65, FR66, FR67

### Story 8.1: RESTful API for Claim Operations

As a **external developer**,
I want **to query and retrieve claim data via a RESTful API**,
So that **I can integrate groundtruth into my application**.

**Acceptance Criteria:**

**Given** I have API credentials
**When** I make a request to: `GET /api/v1/claims/{claim_id}`
**Then** I receive JSON response with:
  - Claim text
  - Unified score, community score, expert score
  - Vote counts
  - Submission date and submitter
  - Geographic distribution data (aggregated)
  - Evidence list (with credibility signals)

**And** response includes links to related resources (submitter profile, evidence details)

### Story 8.2: API Authentication with JWT

As a **external platform**,
I want **to authenticate to the API using JWT tokens**,
So that **my API calls are secure and attributable**.

**Acceptance Criteria:**

**Given** I am a registered API consumer
**When** I obtain API credentials (client_id + client_secret)
**Then** I can:
  - Exchange credentials for a JWT access token
  - Include the JWT in the Authorization header of API requests
  - Token expires after 60 minutes, then I refresh using a refresh token

**And** all API calls are logged with my client ID for audit

### Story 8.3: API Rate Limiting

As a **the system**,
I want **to rate limit API consumers**,
So that **API abuse and DDoS attacks are prevented**.

**Acceptance Criteria:**

**Given** an external developer is using the API
**When** they make requests
**Then** they are limited to:
  - 100 requests per minute per API key
  - Burst limit: 500 requests per hour

**Given** they exceed the limit
**When** they make a request
**Then** they receive a 429 (Too Many Requests) response
**And** the response includes: "Retry-After" header with wait time

### Story 8.4: API Pagination Support

As a **external developer querying large result sets**,
I want **API responses to support pagination**,
So that **I can efficiently retrieve large amounts of data**.

**Acceptance Criteria:**

**Given** I query for a list of claims: `GET /api/v1/claims?limit=50&offset=0`
**When** I receive the response
**Then** it includes:
  - An array of up to 50 claim objects
  - Metadata: total_count, limit, offset, next_url, prev_url
  - Links to retrieve next/previous pages

**And** default limit is 20, max limit is 100

### Story 8.5: Comprehensive API Documentation

As a **external developer**,
I want **complete API documentation with examples**,
So that **I can understand and implement the API quickly**.

**Acceptance Criteria:**

**Given** I visit the API documentation portal
**When** I browse the docs
**Then** I see:
  - OpenAPI/Swagger specification (machine-readable)
  - Human-readable documentation with:
    - All endpoints listed with HTTP method, path, description
    - Request/response examples for each endpoint
    - Error codes and meanings
    - Rate limiting policy
    - Authentication flow
    - Sample client code (JavaScript, Python, etc.)

**And** documentation is hosted at: `https://api.groundtruth.com/docs`

---

## Epic 9: Privacy, Compliance & Accessibility - Trust Foundation

Users trust groundtruth because their privacy is sacred (no individual voting history exposed), accessible experience (WCAG 2.1 AA, mobile-responsive, keyboard navigation, screen reader support, SSR for SEO), and compliance baseline is met (privacy policy, GDPR/CCPA alignment). Data export/deletion capabilities deferred post-MVP.

**FRs covered:** FR68, FR69*, FR70, FR71, FR72, FR73, FR74, FR75

### Story 9.1: Privacy Policy with Transparency

As a **user**,
I want **to see a clear privacy policy explaining data collection**,
So that **I trust how my data is used**.

**Acceptance Criteria:**

**Given** I visit the privacy policy page
**When** I read the policy
**Then** it clearly explains:
  - What data we collect: email, phone, voting behavior (aggregate), country-level geolocation
  - What data we DON'T collect: precise location, browser history, external account info
  - How we use data: improving fact-checking, platform health, showing geographic patterns
  - How long we retain data: votes retained indefinitely for scoring, personal data retained while account active
  - User rights: ability to delete account (FR69)
  - GDPR & CCPA compliance statement

**And** policy is accessible, plain-language, not legal jargon

### Story 9.2: Privacy Protection - No Individual Vote Exposure

As a **the system**,
I want **to ensure individual voting history is never publicly exposed**,
So that **voters can't be tracked or pressured**.

**Acceptance Criteria:**

**Given** I am any user
**When** I view data about voting:
  - I can see aggregate scores and counts
  - I can see geographic distributions (country-level only)
  - I can see expert votes with names (experts choose public accountability)

**But I CANNOT see:**
  - Who specific users voted for (only visible to the voter themselves and admins)
  - How many claims a user voted on (not exposed)
  - Voting history by country for individuals (only aggregates exposed)

**And** this privacy is enforced at the database level (no queries can expose individual history)

### Story 9.3: Account Deletion (Basic Implementation)

As a **user**,
I want **to delete my account and associated data**,
So that **I can remove my presence from the platform**.

**Acceptance Criteria:**

**Given** I am logged in
**When** I go to Settings → Privacy → "Delete Account"
**Then** I see a warning: "This action is permanent"

**Given** I confirm deletion
**When** I provide my password to verify
**Then** the system:
  - Deletes my user account record
  - Removes my personal data (email, phone, profile)
  - Anonymizes my votes (preserves vote data for scoring, but removes user link)
  - Removes my submitted claims/evidence

**And** I receive confirmation: "Your account has been deleted"

*Note: Data export (FR68) deferred to post-MVP*

### Story 9.4: Mobile-Responsive Design

As a **mobile user**,
I want **all pages to work perfectly on my phone**,
So that **I can fact-check claims on the go**.

**Acceptance Criteria:**

**Given** I visit groundtruth on a mobile device (≥ 320px width)
**When** I view any page
**Then** I see:
  - Responsive layout that adapts to screen size
  - Touch-friendly buttons (≥ 44px minimum tap target)
  - Text readable without zooming
  - Form inputs properly sized for mobile keyboards
  - Images scaled appropriately

**And** the mobile experience is tested on: iOS Safari, Android Chrome, and responsive design breakpoints

### Story 9.5: Modern Browser Support

As a **user with a modern browser**,
I want **the application to work on all modern browsers**,
So that **I'm not locked into a specific browser**.

**Acceptance Criteria:**

**Given** I use a modern browser
**When** I access groundtruth
**Then** it works on:
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)

**And** it gracefully degrades on older browsers (shows friendly message)

### Story 9.6: Server-Side Rendering for SEO

As a **search engine**,
I want **to crawl groundtruth pages and index their content**,
So that **fact-checking data is discoverable**.

**Acceptance Criteria:**

**Given** I am a search engine crawler
**When** I request a claim page
**Then** I receive:
  - Fully rendered HTML with claim content, score, metadata
  - Open Graph meta tags (title, description, image for social sharing)
  - Structured data (JSON-LD) for claim data

**And** the page serves SSR content first (< 1.5s FCP), then hydrates with interactive features

### Story 9.7: WCAG 2.1 Level AA Compliance - Keyboard Navigation

As a **keyboard-only user**,
I want **to navigate the entire application using only the keyboard**,
So that **I can use groundtruth without a mouse**.

**Acceptance Criteria:**

**Given** I use only keyboard to navigate
**When** I press Tab
**Then** I can:
  - Tab through all interactive elements (links, buttons, form fields) in logical order
  - Access all functionality without needing a mouse
  - See visible focus indicators on every element
  - Use Enter/Space to activate buttons
  - Use Arrow keys in dropdowns and sliders

**And** all keyboard shortcuts are documented (e.g., "/" to jump to search)

### Story 9.8: WCAG 2.1 Level AA Compliance - Screen Reader Support

As a **screen reader user**,
I want **all content to be readable by screen readers**,
So that **I can use groundtruth independently**.

**Acceptance Criteria:**

**Given** I use a screen reader (JAWS, NVDA, VoiceOver)
**When** I navigate the application
**Then** I hear:
  - Page titles and headings (properly nested h1, h2, h3)
  - Form labels associated with inputs
  - Button purposes and states (enabled/disabled, pressed/unpressed)
  - Link text that describes the link destination
  - Alt text for all images
  - ARIA labels for complex components (sliders, heat maps)
  - Table captions and headers for data

**And** semantic HTML is used throughout (nav, main, article, etc.)

### Story 9.9: Color Contrast and Visual Accessibility

As a **user with low vision or color blindness**,
I want **sufficient contrast and non-color-dependent indicators**,
So that **I can read text and understand information**.

**Acceptance Criteria:**

**Given** I view the application
**When** I assess color contrast
**Then** I see:
  - All text has ≥ 4.5:1 contrast ratio against background (WCAG AA standard)
  - Headings and large text have ≥ 3:1 contrast
  - Color is NOT the only way to convey information (e.g., error states have icons + color)
  - Interactive elements are visually distinct beyond color (e.g., buttons have borders/outlines)

**And** a high-contrast mode is available for users who need it

### Story 9.10: Accessibility Testing and Compliance Verification

As a **the system**,
I want **to continuously verify accessibility compliance**,
So that **accessibility isn't a one-time effort**.

**Acceptance Criteria:**

**Given** the application is deployed
**When** accessibility testing runs
**Then** automated tests check:
  - Color contrast (using axe-core or similar)
  - Semantic HTML structure
  - Form label associations
  - ARIA usage

**And** manual testing is performed:
  - Keyboard navigation full walkthrough
  - Screen reader testing (NVDA)
  - Responsive design testing across devices

**And** accessibility audit is performed quarterly by accessibility specialist

---

**All Epics and Stories Complete** ✅

**Epic Structure Approved** ✅

