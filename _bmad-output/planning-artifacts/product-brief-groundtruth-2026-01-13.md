---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - "_bmad-output/analysis/brainstorming-session-2026-01-13.md"
date: 2026-01-13
author: Aurel
---

# Product Brief: groundtruth

## Executive Summary

groundtruth is a universal fact-checking platform designed to combat political disinformation by breaking through ideological echo chambers. Unlike traditional fact-checkers that provide a single verdict from one perspective, groundtruth aggregates multiple truth scores with full provenance transparency - showing community, expert, AI, and OSINT analysis side-by-side in one place. Users can copy/paste any political claim, instantly see if it's been analyzed, and view comprehensive multi-factor scoring that transcends political bias. The mission: build the world's largest fact-checking database and provide universal truth verification that people across all ideologies can trust.

---

## Core Vision

### Problem Statement

Political disinformation spreads unchecked within social media echo chambers. When people encounter dubious claims (especially from figures like Trump), they remain trapped in ideological bubbles where false information goes unchallenged. Their social groups share the same biases, so no one presents counter-evidence. **People who don't expand their social circles are the most vulnerable** - they never encounter perspectives that challenge false claims.

### Problem Impact

Current fact-checking is fragmented and perceived as biased:

- **Fragmentation:** To properly verify a claim, users must check multiple platforms (Snopes, PolitiFact, FactCheck.org, Twitter Community Notes) - each with one perspective
- **Exhaustion:** No one has time to cross-reference multiple sources, so people stay in their bubbles
- **Trust Crisis:** Existing fact-checkers are viewed as politically biased by different ideological groups, limiting their effectiveness
- **Timing:** False information has never been easier to create and spread (AI-generated content, deepfakes, social media virality)

The result: democratic discourse suffers, truth becomes partisan, and vulnerable populations remain trapped in misinformation ecosystems.

### Why Existing Solutions Fall Short

Traditional fact-checking platforms (Snopes, PolitiFact, FactCheck.org) provide **single-source verdicts** that can be dismissed as biased. Twitter Community Notes moves toward community-driven verification but lacks comprehensive scoring, expert integration, and systematic evidence analysis. No platform provides:

1. **Multi-factor scoring** showing community, expert, AI, and OSINT analysis together
2. **Score provenance** that reveals the "why" behind each rating
3. **Universal trust** by transcending single-perspective judgments
4. **Centralized database** aggregating fact-checks in one searchable location

Users must manually aggregate information across platforms - a friction that ensures most people never challenge false claims.

### Proposed Solution

groundtruth is a universal fact-checking platform where users can verify any political claim through transparent multi-score analysis:

**Core User Flow:**
1. User copies/pastes a claim into groundtruth
2. Smart search identifies if similar claims exist
3. **If exists:** Display comprehensive analysis with multiple truth scores and evidence
4. **If new:** Create claim entry and trigger multi-factor analysis process

**Multi-Score Foundation:**
The platform's foundation is **score provenance** - showing multiple independent truth ratings in one place:
- Community voting score
- Expert verification score
- AI analysis score
- OSINT (Open Source Intelligence) verification score

Users see the full spectrum of analysis, understand where each score comes from, and make informed judgments themselves.

**Scale Ambition:**
Build the world's largest fact-checking database - comprehensive, searchable, and continuously growing through community contribution and gamified engagement.

### Key Differentiators

1. **World's Largest Fact-Checking Database:** Comprehensive aggregation and scale that no single platform can match

2. **Multi-Score Transparency:** Unlike platforms with single verdicts, groundtruth shows multiple independent scores with full provenance - building universal trust by letting users see ALL perspectives

3. **Ideologically Neutral:** No single authority makes "the" judgment - the platform presents evidence and multiple analyses, allowing users to evaluate claims themselves

4. **Perfect Timing:** Launching at the intersection of maximum need (Trump disinformation, AI-generated false content) and maximum capability (AI verification, OSINT tools, community-driven verification models)

5. **Non-Replicable by Incumbents:** Existing platforms are branded around THEIR verdict - pivoting to multi-score transparency would undermine their authority model

---

## Target Users

### Primary Users

**1. Casual Community Voter (e.g., Sarah - 32, Marketing Manager)**

The everyday social media user who encounters dubious claims and wants quick, trustworthy verification without spending hours researching. They're not fact-checking experts, but they care about truth and don't want to spread misinformation.

**Problem Experience:** Sees shocking claims on social media, feels skeptical but uncertain. Current approach requires checking multiple platforms (Snopes, PolitiFact, news sources) which takes too long. Usually just scrolls past or shares without verification.

**Success with groundtruth:** Copy/paste claim → See multi-factor score with transparency → Understand why it's rated true/false → Vote if desired → Share groundtruth link back to friends. Complete verification in under 3 minutes.

**Key Needs:** Mobile-responsive, fast load times, clear score display, simple voting interface, social sharing

---

**2. Serious Investigator (e.g., Marcus - 45, Retired Journalist)**

The engaged citizen or former professional with time and skills to do deep-dive investigations. They enjoy researching complex claims, cross-referencing sources, and contributing quality analysis to help others.

**Problem Experience:** Sees complex political or policy claims that require serious investigation. Current platforms don't provide tools for collaborative investigation or ways to showcase detailed analysis.

**Success with groundtruth:** Submit claim → Upload multiple evidence pieces (PDFs, links, analysis) → Rate evidence strength → Write detailed voting explanation → Track claim over days as others contribute → See their work recognized as "helpful" by community.

**Key Needs:** Multi-format evidence upload, detailed explanation fields, evidence quality rating, contribution tracking, notification system

---

**3. Expert Verifier (e.g., Dr. Elena - 38, Epidemiologist/Professor)**

Credentialed professionals concerned about misinformation in their domain who want to contribute expertise to help the public. They have limited time but high-value knowledge.

**Problem Experience:** Sees rampant health/science misinformation but no efficient way to contribute expert perspective at scale. Current platforms either don't weight expert opinions or hide them behind editorial processes.

**Success with groundtruth:** Apply with credentials → Get verified and domain-tagged → Receive intelligent claim routing (health claims come to her) → Review community evidence → Cast weighted expert vote with public explanation → See impact (expertise reaches thousands, builds public reputation).

**Key Needs:** Credential verification system, domain expertise tagging, expert dashboard with claim queue, public expert profiles, weighted voting algorithm

---

### Secondary Users

**4. Platform Administrator (e.g., James - 29, Technical Operations Lead)**

Maintains platform health, manages users, handles edge cases, and ensures system integrity. Critical for platform trust and smooth operation.

**Responsibilities:** Approve expert applications with credential verification → Handle flagged content moderation queue → Monitor platform health metrics → Detect and handle bot/manipulation attempts → Manage API access for partners → System configuration

**Key Needs:** Admin dashboard, user management tools, expert verification workflow, content moderation queue, bot detection monitoring, system configuration interface

---

**5. Moderator/Reviewer (e.g., Alex - 26, Community Moderator)**

Ensures quality control for discussions, evidence, and user conduct. Maintains community standards while being fair and responsive.

**Responsibilities:** Review flagged content (claims, evidence, comments) → Handle duplicate claim detection and merging → Manage user conduct violations → Review appeals → Identify patterns of abuse

**Key Needs:** Moderation dashboard, content flagging system, evidence quality rating, claim merging functionality, appeal review system, user communication tools

---

**6. API Consumer / Third-Party Developer (e.g., TruthWatch News Team)**

Independent developers and organizations building integrations that embed groundtruth scores into other platforms (browser extensions, news sites, social media overlays).

**Use Case:** Build browser extension that shows groundtruth scores as users browse social media → Search API for matching claims → Display scores in tooltips → Drive traffic back to groundtruth for full transparency view

**Key Needs:** RESTful API with comprehensive endpoints, API documentation, developer application/approval process, rate limiting management, performance optimization (sub-200ms responses)

---

**7. Media/Journalist (e.g., Rachel - 41, Investigative Journalist)**

Professional journalists who need credible fact-checking sources to cite in reporting. They evaluate methodological rigor before trusting any platform.

**Use Case:** Research claims for investigative article → Evaluate groundtruth's methodology and transparency → Verify specific claims through platform → Cite groundtruth in published article: "According to groundtruth..." → Drive institutional credibility

**Key Needs:** Public methodology documentation, historical score tracking, citation-friendly URLs, embeddable widgets, media resources, high credibility UX

---

### User Journey Highlights

**Discovery → First Use → Ongoing Engagement:**

1. **Discovery:** User encounters dubious claim on social media → Searches Google or sees groundtruth link in comments → Clicks through

2. **First Use:** Sees claim with multi-factor score and geographic transparency → Reads top evidence → Understands methodology through transparency UI → Registers to vote or just shares link

3. **"Aha!" Moment:** Realizes they can see ALL perspectives (community, experts, geographic patterns) in one place with full transparency → Trust builds because nothing is hidden

4. **Ongoing Engagement:**
   - Casual users: Return when they encounter new claims, build habit of checking groundtruth first
   - Investigators: Become regular contributors, find satisfaction in quality research recognized by community
   - Experts: Integrate into routine (review 3-5 claims per week), build public credibility through visible expertise

**Core Value Delivery:**

groundtruth serves users across the spectrum from passive consumers to active contributors, with clear value propositions for each:
- **Casual users:** Fast, trustworthy verification without research burden
- **Investigators:** Tools for deep analysis and community recognition
- **Experts:** Efficient way to scale expertise and build public credibility
- **Platform operators:** Systems to maintain trust and quality
- **Third parties:** API access to embed truth scores everywhere
- **Media:** Credible source for citations that enhances reporting

---

## Success Metrics

### User Success

Users experience success when they can quickly assess the truthfulness of claims they encounter. The platform succeeds when:

- Users can submit or discover claims they care about
- Voting activity is sufficient that weighted scores feel legitimate and trustworthy
- The transparency of the scoring methodology (showing community vs expert votes, disagreements, and reasoning) builds user confidence
- Users understand how the multi-factor verification works and trust the results enough to share them

**Ultimate Success Indicator:** When media organizations cite groundtruth as an authoritative source ("according to groundtruth..."), demonstrating that the platform has achieved institutional credibility.

---

### Business Objectives

**MVP Success (3 months post-launch):**
- **500-1,000 active users** voting regularly on claims
- **100-500 verified claims** in the database with meaningful participation
- Proof of concept validated: weighted scoring produces consistent, trustworthy results
- Core verification workflow functions smoothly (claim submission → voting → score generation)

**6-Month Milestone:**
- **5,000 active users** per month
- **2,500-5,000 verified claims** in database
- Growing user engagement with return visitors
- Community + expert verification patterns established

**12-Month Milestone:**
- **10,000+ active users** per month (key target)
- **10,000+ verified claims** in database
- Early media mentions and citations beginning to appear
- Platform recognized in fact-checking and civic tech communities

**Long-term Vision (2-3 years):**
- Scale toward **1 million verified claims** - comprehensive database of truth
- Routine media citation as authoritative reference
- Platform becomes the standard for multi-factor truth verification

---

### Key Performance Indicators

**User Engagement:**
- **Active user definition:** Users who vote on multiple claims per month
- **Claim verification rate:** Average time from submission to sufficient voting participation
- **Return user rate:** Percentage of users who return after first visit

**Platform Quality:**
- **Claim coverage:** Number of verified claims in database
- **Voting depth:** Average number of votes per claim
- **Expert participation:** Number of active expert verifiers
- **Score consensus:** Percentage of claims where community and expert scores align

**Growth Metrics:**
- Monthly active users (MAU)
- Claims submitted per week
- Votes cast per week
- User retention rates

**Technical Success:**
- **Performance:** System handles target user load smoothly without degradation
- **Real-time functionality:** Voting updates and score recalculations happen in real-time as votes are cast
- **Algorithm reliability:** Weighted scoring algorithm consistently produces trustworthy results across different claim types
- **Scalability:** Infrastructure supports growth from MVP to 10K+ active users

---

## MVP Scope

### Core Focus

Prove that multi-factor verification with radical transparency works and produces trusted results.

---

### Must-Have Features

**Claims Management:**
- Submit, browse, and search claims
- View claim details with full transparency UI
- Track claim score evolution over time

**Dual Verification System:**
- Community voting (0-100 scale with optional explanation)
- Expert voting (0-100 scale with required explanation)
- Weighted scoring algorithm combining community + expert input
- Separate vote counts and scores displayed (community vs expert)

**Geographic Transparency (Key Differentiator):**
- Capture geolocation (IP-based) for every vote cast
- Display aggregate geographic distribution on claim pages
- Visualizations: Maps and/or charts showing vote distribution by country
- Separate geographic breakdowns for community vs expert votes
- Privacy-preserving (aggregate only, no individual locations shown)

**Radical Transparency UI:**
- Clear display of weighted unified score (0-100)
- Breakdown: Community score + Expert score shown separately
- Vote counts visible (X community votes, Y expert votes)
- Geographic distribution prominent and easy to understand
- Show when community and experts disagree
- Score evolution chart (how score changed over time)
- Individual expert explanations visible (with credentials)

**Evidence System:**
- Submit evidence for claims (links, text, PDFs)
- View evidence on claim detail pages
- Evidence attribution (who submitted)

**User Authentication & Verification:**
- Registration with email + phone + CAPTCHA
- Email verification (confirmation link)
- Phone verification (SMS code)
- One account per phone number enforcement
- JWT-based session management

**Expert Verification System:**
- Expert application form (credentials, links to publications/profiles)
- Admin review and approval workflow
- Domain expertise tagging (health, politics, science, etc.)
- Expert badge/designation visible on votes
- Expert credentials displayed on profile

**Admin Dashboard:**
- Review and approve/reject expert applications
- View platform health metrics (users, claims, votes)
- Handle flagged content (manual review queue)
- Archive/remove spam claims
- Suspend abusive users

**Real-Time Updates:**
- Live vote count updates as votes are cast
- Real-time score recalculation display
- Real-time geographic distribution updates
- WebSocket or Server-Sent Events implementation

**Web Application:**
- Single Page Application (SPA) with client-side routing
- Server-Side Rendering (SSR) for claim pages (SEO requirement)
- Mobile-responsive design (PWA capabilities)
- Modern browser support (Chrome, Firefox, Safari, Edge - last 2 versions)
- WCAG 2.1 Level AA accessibility compliance

**Internal API:**
- RESTful API powers web app
- Not publicly accessible to third parties in MVP
- Rate limiting for abuse prevention
- Authentication via JWT tokens

---

### Explicitly NOT in MVP

- Gamification systems (RPG progression, achievements, Lie Hunters mode)
- OSINT integration tools (reverse image search, metadata extraction, geolocation)
- Native mobile apps (PWA only for MVP)
- Advanced reputation systems
- Guilds or team-based features
- Public API for third-party developers
- Advanced moderation tools (AI-based, automated)
- Evidence quality rating system
- User reputation/helpfulness scores
- Claim merging and duplicate detection
- Comment/discussion threads
- Following users or claims
- Push notifications

---

### Post-MVP Growth Features

**Phase 2: Platform & Integration (6-12 months)**
- Public API with comprehensive documentation
- Developer application and API key approval process
- Advanced moderation & quality control (AI-based spam/bot detection, duplicate claim detection)
- Enhanced evidence system (strength ratings, quality voting)
- User experience enhancements (follow claims, personalized feeds, discussions)
- Native mobile apps (iOS, Android)

**Phase 3: Scale & Authority (12-24+ months)**
- Media & partnership tools (embeddable widgets, citation guidelines)
- Advanced analytics & insights (trending claims, pattern analysis)
- OSINT integration (reverse image search, metadata extraction, geolocation verification, bot detection)

---

### Future Vision (2-3+ years)

**Long-term Dream Features:**

**Gamification Layer:**
- RPG-style progression (Novice → Expert → Master → Truth Guardian)
- Achievement systems and badges
- Lie Hunters mode (Among Us-style imposter detection for coordinated misinformation)
- Guild systems for team-based fact-checking
- Daily quests and missions
- Battle pass/season systems

**Scale and Authority:**
- 1 million verified claims database
- Routine media citation as authoritative source
- Platform becomes industry standard for multi-factor verification
- B2B offerings (journalism fact-checking backend)

**Expanded Applications:**
- Research paper verification
- Product review authenticity
- Medical claim verification
- Historical fact database
- Political debate real-time referee

---
