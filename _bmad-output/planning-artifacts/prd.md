---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping']
inputDocuments: ['_bmad-output/analysis/brainstorming-session-2026-01-13.md']
workflowType: 'prd'
briefCount: 0
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
classification:
  projectType: 'Web Application + API Backend'
  domain: 'Civic Tech / Information Verification'
  complexity: 'medium'
  projectContext: 'greenfield'
---

# Product Requirements Document - groundtruth

**Author:** Aurel
**Date:** 2026-01-13

## Success Criteria

### User Success

Users experience success when they can quickly assess the truthfulness of claims they encounter. The platform succeeds when:

- Users can submit or discover claims they care about
- Voting activity is sufficient that weighted scores feel legitimate and trustworthy
- The transparency of the scoring methodology (showing community vs expert votes, disagreements, and reasoning) builds user confidence
- Users understand how the multi-factor verification works and trust the results enough to share them

**Ultimate Success Indicator:** When media organizations cite groundtruth as an authoritative source ("according to groundtruth..."), demonstrating that the platform has achieved institutional credibility.

### Business Success

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

### Technical Success

The platform succeeds technically when:

- **Performance:** System handles target user load smoothly without degradation
- **Real-time functionality:** Voting updates and score recalculations happen in real-time as votes are cast
- **Algorithm reliability:** Weighted scoring algorithm consistently produces trustworthy results across different claim types
- **Architecture:** API-first design successfully powers web app and enables future mobile wrappers (iOS/Android via PWA wrapping)
- **Scalability:** Infrastructure supports growth from MVP to 10K+ active users

### Measurable Outcomes

**User Engagement:**
- Active user definition: Users who vote on multiple claims per month
- Claim verification rate: Average time from submission to sufficient voting participation
- Return user rate: Percentage of users who return after first visit

**Platform Quality:**
- Claim coverage: Number of verified claims in database
- Voting depth: Average number of votes per claim
- Expert participation: Number of active expert verifiers
- Score consensus: Percentage of claims where community and expert scores align

**Growth Metrics:**
- Monthly active users (MAU)
- Claims submitted per week
- Votes cast per week
- User retention rates

## Product Scope

### MVP - Minimum Viable Product

**Core Focus:** Prove that multi-factor verification with radical transparency works and produces trusted results.

**Must-Have Features:**
- **Claims Management:** Submit, browse, and search claims
- **Dual Verification System:** Community voting + Expert voting with separate tracks
- **Weighted Scoring Algorithm:** Calculate unified truth scores combining community and expert input
- **Radical Transparency UI:** Show how scores are calculated, display community vs expert disagreements openly, make methodology visible
- **Evidence Submission:** Users can submit supporting or contradicting evidence for claims
- **User Accounts:** Basic registration and authentication for voters
- **Expert Designation:** System to identify and weight expert verifiers differently than community
- **Real-time Updates:** Live score updates as votes come in
- **API Backend:** RESTful API to power all platform functionality
- **Web Application:** Progressive Web App (PWA) for primary user interface, mobile-responsive

**Explicitly NOT in MVP:**
- Gamification systems (RPG progression, achievements, Lie Hunters mode)
- OSINT integration tools (reverse image search, metadata extraction, geolocation)
- Native mobile apps (PWA only for MVP)
- Advanced reputation systems
- Guilds or team-based features

### Growth Features (Post-MVP)

Features to add once core verification system is proven and scaling:

**OSINT Integration:**
- Reverse image search for visual evidence
- Metadata extraction from photos/videos
- Geolocation verification
- Bot detection for automated content
- Historical claim tracking ("Has this been claimed before?")

**Enhanced Evidence Analysis:**
- Multi-format evidence support (text, image, video, links) with strength ratings
- Evidence quality scoring
- Source credibility assessment
- Cross-referencing with existing verified claims

**Mobile Native Apps:**
- iOS native app (App Store)
- Android native app (Google Play)
- Optimized mobile voting experiences
- Push notifications for claim updates

**Advanced Features:**
- Live debate threads on controversial claims
- Following trusted verifiers
- Personalized claim feeds based on interests
- Advanced analytics and trends

### Vision (Future)

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

## User Journeys

### 1. Casual Community Voter - Sarah's Quick Truth Check

**Meet Sarah**, a 32-year-old marketing manager who scrolls social media during her lunch break. She cares about staying informed but doesn't have hours to fact-check everything she sees.

**Opening Scene:** Sarah sees a shocking health claim shared by a friend on social media: "New study proves coffee causes memory loss." She's skeptical but not sure - should she share it? Ignore it? Spend 20 minutes researching?

**The Journey:** She notices a groundtruth link in the comments. Clicking through, she immediately sees the claim with a weighted truth score: 15/100 (Mostly False). The transparency view shows her:
- Community vote: 12/100 (1,247 voters)
- Expert vote: 18/100 (8 medical professionals)
- Top evidence: Original study was misrepresented, actual findings were inconclusive

**Rising Action:** Sarah reads through the top 3 pieces of evidence (takes 90 seconds). She decides to cast her own vote: "Mostly False." As soon as she votes, she sees the score update in real-time, and her vote is now part of the 1,248 community votes.

**Climax:** The "aha!" moment - she can see exactly WHY this claim scores low, with medical experts and community aligned. The transparency gives her confidence. She shares the groundtruth link back to her friend with a quick note: "According to groundtruth, this claim is mostly false - here's why."

**Resolution:** Sarah has her answer in under 3 minutes. She feels empowered - not fooled by misinformation, and able to help others with reliable information. She bookmarks groundtruth for next time.

**Requirements Revealed:**
- Quick claim lookup and browsing
- Clear weighted truth score display (community + expert breakdown)
- Transparency UI showing vote distribution and reasoning
- Evidence presentation (top pieces surfaced first)
- Simple voting interface (one-click voting)
- Real-time score updates
- Social sharing capabilities
- Mobile-responsive design for on-the-go usage

### 2. Serious Investigator - Marcus's Deep Dive

**Meet Marcus**, a 45-year-old retired journalist who now volunteers his time investigating misinformation. He has the skills and time to dig deep into complex claims.

**Opening Scene:** Marcus encounters a complex political claim about government spending that's going viral. He knows this requires serious investigation - multiple sources, cross-referencing data, understanding context. This is what he lives for.

**The Journey:** He submits the claim to groundtruth and immediately starts investigating. He uploads five pieces of evidence:
- Government budget documents (PDF)
- News articles from three sources
- A fact-check from another organization
- Statistical data with his analysis

For each piece of evidence, he rates its strength and writes detailed notes explaining his reasoning.

**Rising Action:** As he works (spending about 45 minutes), he sees other community members adding evidence and voting. He reviews their contributions - some are solid, some need work. He votes on the claim: "Partially True" with detailed explanation about which parts are accurate and which are misleading.

**Climax:** Over the next few days, Marcus checks back and sees expert verifiers have reviewed the claim. Two political science professors and one economist have weighed in. Their analysis aligns with his findings - the claim is partially true with important missing context. The weighted score settles at 45/100 (Partially True), and Marcus's evidence contributions are marked as "helpful" by 127 other users.

**Resolution:** Marcus feels satisfied that his deep investigation contributed to a comprehensive truth assessment. The platform gave him tools to do serious work, and the transparency means his contributions are visible and valued. He's already looking for the next complex claim to investigate.

**Requirements Revealed:**
- Claim submission functionality
- Multi-format evidence upload (PDF, images, links, text)
- Evidence strength rating system
- Detailed notes/explanation fields for votes and evidence
- Evidence review and evaluation by other users
- "Helpful" marking or reputation system for quality contributions
- Claim tracking (follow claims over time)
- Notification system for updates on claims being watched
- Expert review integration
- Detailed vote breakdown with reasoning

### 3. Expert Verifier - Dr. Elena's Credentialed Assessment

**Meet Dr. Elena**, a 38-year-old epidemiologist and public health professor. She's concerned about health misinformation and wants to contribute her expertise to help the public.

**Opening Scene:** Dr. Elena applies to become an expert verifier on groundtruth, submitting her credentials (PhD, publications, university affiliation). After verification, she receives her "Expert Verifier" designation with domain expertise: Public Health & Epidemiology.

**The Journey:** She logs into her expert dashboard and sees a queue of health-related claims awaiting expert review. The system has intelligently routed claims about vaccines, COVID-19, and medical studies to her based on her expertise. She sees one claim has 892 community votes already (score: 22/100), but no expert assessment yet.

**Rising Action:** She clicks into a claim about vaccine efficacy. She reviews:
- The community's vote distribution
- Evidence submitted by investigators
- Source materials and citations

She spends 20 minutes doing her own verification, checks the original research paper cited, and identifies a critical misinterpretation. She casts her expert vote: "Mostly False" with a detailed explanation suitable for a lay audience.

**Climax:** As soon as she submits her vote, she sees the weighted score update. Her single expert vote (weighted more heavily than community votes) moves the score from 22/100 to 18/100. The transparency UI shows "1 Expert Vote" alongside "892 Community Votes." Other users can see her credentials and read her detailed explanation.

**Resolution:** Dr. Elena receives notification that her assessment was viewed 1,247 times in the first 24 hours and marked as "helpful" by 89 users. She feels she's making a real impact - her expertise is reaching people who need it. She commits to reviewing 3-5 claims per week.

**Requirements Revealed:**
- Expert application and credential verification system
- Expert designation with domain expertise tags
- Expert dashboard with claim routing/filtering by expertise
- Claim queue management for experts
- Weighted voting algorithm (expert votes weighted higher)
- Expert vote display in transparency UI
- Credential display (show expert qualifications)
- Public-facing expert explanation fields
- Analytics for experts (views, helpfulness ratings)
- Expert notification system for new claims in their domain

### 4. Platform Administrator - James's System Management

**Meet James**, the 29-year-old technical operations lead for groundtruth. He's responsible for keeping the platform running smoothly, managing users, and handling edge cases.

**Opening Scene:** James starts his day checking the admin dashboard. He sees platform health metrics: 4,237 active users yesterday, 347 new claims submitted, 15,289 votes cast. Everything looks good, but there are 3 items in the review queue.

**The Journey:**

**User Management:** He reviews a new expert verifier application from someone claiming to be a climate scientist. He verifies credentials using the built-in verification tools, checks publication history, and approves the application. He assigns domain expertise tags: "Climate Science, Environmental Studies."

**Content Moderation Queue:** He sees a flagged claim - reported as spam/trolling. He reviews the claim, sees it's clearly not legitimate, and archives it with a note explaining why.

**System Configuration:** He needs to adjust the weighted scoring algorithm based on feedback. Expert votes in the "Medical" category should carry slightly more weight due to the high stakes of health misinformation. He updates the configuration, and the change takes effect immediately for future votes (historical scores preserved).

**Rising Action:** James receives an alert - voting activity has spiked on a controversial political claim (10,000 votes in 2 hours). He monitors for bot activity using the bot detection dashboard. He sees patterns suggesting some coordinated voting and temporarily flags 23 suspicious accounts for review.

**Climax:** A major news outlet contacts groundtruth asking for access to verified claim data for a story they're writing. James works with them to provide API access credentials and ensures they understand how to interpret the weighted scores and transparency data.

**Resolution:** By end of day, James has processed all queue items, maintained platform integrity, and helped facilitate media citation - exactly what groundtruth is building toward. The platform ran smoothly with 99.8% uptime.

**Requirements Revealed:**
- Admin dashboard with platform health metrics
- User management system
- Expert credential verification tools
- Expert application approval workflow
- Domain expertise tagging system
- Content moderation queue
- Claim archival/removal capabilities
- Weighted scoring algorithm configuration
- Bot detection and monitoring tools
- Account flagging and suspension capabilities
- API access management
- Media/partner relationship tools
- System configuration interface
- Uptime and performance monitoring

### 5. Moderator/Reviewer - Alex's Quality Control

**Meet Alex**, a 26-year-old community moderator who ensures groundtruth maintains high-quality discussions and evidence submissions. Alex works part-time reviewing flagged content and helping users.

**Opening Scene:** Alex opens the moderation dashboard and sees 12 flagged items awaiting review: 4 claims, 5 pieces of evidence, and 3 user comments that were reported by the community.

**The Journey:**

**Evidence Review:** The first flag is on a piece of evidence that's been reported as "low quality." Alex reviews it - it's a screenshot of a tweet with no source verification. Alex agrees it's weak evidence and marks it with a "Needs Verification" label, which lowers its prominence in the evidence list.

**Claim Quality Check:** A claim was flagged as "duplicate" - someone says this claim was already submitted. Alex searches the database, finds the original claim from 3 weeks ago, and merges the new submission into the existing one. All votes and evidence are preserved.

**User Conduct:** A user comment was flagged as "harassment." Alex reviews the comment - it's aggressive and personal. Alex removes the comment and sends the user a warning message about community guidelines with a 24-hour cooling-off period.

**Rising Action:** Alex notices a pattern - several new claims submitted today are from the same source website known for sensationalized headlines. Alex adds a note to these claims: "Source flagged for sensationalism - verify independently" and ensures they get extra expert review.

**Climax:** A user appeals a decision where their evidence was marked "low quality." Alex reviews the appeal, realizes the evidence is actually solid but was initially misunderstood, and upgrades the quality rating. The user receives notification of the reversal with an apology.

**Resolution:** Alex has maintained quality standards while being fair and responsive. The platform remains a trustworthy source because quality control works. Users feel heard when they appeal, and bad actors are managed appropriately.

**Requirements Revealed:**
- Moderation dashboard with flagged content queue
- Content flagging system (claims, evidence, comments)
- Evidence quality rating and labeling
- Claim search and duplicate detection
- Claim merging functionality
- Comment/discussion moderation
- User warning and cooling-off period system
- Source flagging and annotation
- Appeal submission and review system
- Moderator decision reversal capabilities
- User communication tools (warnings, explanations)
- Pattern detection for problematic behavior
- Quality control workflows

### 6. API Consumer - Dev Team at TruthWatch News

**Meet the TruthWatch team**, a small independent news organization building a browser extension that shows groundtruth scores next to claims on social media. Sarah (lead developer, 31) and her team want to integrate groundtruth into their product.

**Opening Scene:** Sarah reads groundtruth's API documentation and applies for an API key. She needs to pull verified claim data and display scores in real-time as users browse social media.

**The Journey:**

**Integration Setup:** Sarah receives her API key with rate limits appropriate for their user base (1,000 requests/hour to start). She reviews the API endpoints:
- `GET /api/claims/search` - Search for claims matching text
- `GET /api/claims/{id}` - Get full claim details with scores
- `GET /api/claims/{id}/evidence` - Get evidence for a claim
- `GET /api/scores/history/{id}` - Get score evolution over time

**Development:** Sarah builds the integration:
1. When a user highlights text on social media, her extension searches groundtruth's API
2. If a matching claim is found, display the weighted truth score in a tooltip
3. Clicking the tooltip opens the full groundtruth page with transparency details

**Rising Action:** During testing, Sarah notices some claims return low confidence scores because they have limited votes. She uses the API's metadata to show "Preliminary Score - Limited Data" for claims with fewer than 100 votes.

**Climax:** The browser extension launches. TruthWatch users love it - they're getting real-time fact-checks as they browse. Sarah monitors API performance through the developer dashboard. She sees 15,000 API calls per day, well within rate limits, and the response times are consistently under 200ms.

**Resolution:** Two months later, TruthWatch has 10,000 active extension users. Sarah requests a rate limit increase, which James approves. She's now driving significant traffic to groundtruth, and media citation is growing. The API makes groundtruth's verified data accessible everywhere.

**Requirements Revealed:**
- RESTful API with comprehensive endpoints
- API key generation and management
- API documentation (clear, comprehensive)
- Developer application and approval process
- Rate limiting system with configurable limits
- API search functionality (text matching)
- API response includes: scores, vote breakdown, evidence, metadata
- Confidence/quality indicators in API responses
- Developer dashboard for API usage monitoring
- API performance optimization (sub-200ms responses)
- Webhook support for real-time updates (future consideration)
- API versioning strategy
- Rate limit increase request workflow

### 7. Media/Journalist - Rachel's Citation Source

**Meet Rachel**, a 41-year-old investigative journalist at a major news outlet. She's writing a story about misinformation trends and needs credible data to back up her claims.

**Opening Scene:** Rachel is fact-checking claims for an article about election misinformation. She's heard about groundtruth from colleagues and wants to see if it's credible enough to cite in her reporting.

**The Journey:**

**Evaluation Phase:** Rachel explores groundtruth's methodology. She reads:
- How the weighted scoring algorithm works
- How experts are verified
- How community consensus is reached
- The transparency philosophy (showing disagreements, not hiding them)

She's impressed by the methodological rigor and radical transparency. This isn't a black-box "trust us" system - she can see exactly how conclusions are reached.

**Research Phase:** Rachel searches groundtruth for the specific claims in her story. She finds:
- Claim A: Weighted score 8/100 (Mostly False) - 2,341 community votes, 12 expert votes
- Claim B: Weighted score 89/100 (Mostly True) - 1,876 community votes, 7 expert votes
- Claim C: Not yet in database - she submits it for verification

**Rising Action:** For Claim A, Rachel drills into the transparency view. She reviews:
- How the score evolved over time (started at 15/100, stabilized at 8/100)
- Expert consensus (11 of 12 experts rated it "False" or "Mostly False")
- Top evidence with sources she can verify independently
- No red flags suggesting manipulation or bias

**Climax:** Rachel cites groundtruth in her article: "According to groundtruth, a community-driven fact-checking platform, the claim scored 8 out of 100 based on assessments from 2,341 community members and 12 expert verifiers..." She links to the full transparency view so readers can verify themselves.

**Resolution:** Rachel's article is published, and it includes a prominent citation of groundtruth. Other journalists at her outlet see the citation and start using groundtruth for their own fact-checking. This is exactly the institutional credibility groundtruth is building toward - the moment when media says "according to groundtruth."

Rachel later writes a profile piece on groundtruth itself, explaining how the platform works and why transparency matters in fact-checking.

**Requirements Revealed:**
- Public methodology documentation
- Transparent scoring algorithm explanation
- Expert verification process documentation
- Historical score tracking (score evolution over time)
- Citation-friendly URLs (stable, shareable links to claims)
- Embeddable widgets for media sites
- Press/media resources section
- Academic research access (bulk data for studies)
- Media contact and partnership pathways
- High credibility UX (professional, trustworthy design)
- Export/download functionality for data
- Proper attribution and citation guidelines

### Journey Requirements Summary

The 7 user journeys reveal comprehensive platform capabilities across multiple domains:

**Core Verification System:**
- Claim submission, search, and browsing
- Dual voting system (community + expert with weighted scoring)
- Multi-format evidence submission and evaluation
- Real-time score updates and calculations
- Radical transparency UI (show all vote breakdowns, disagreements, reasoning)

**User Management:**
- Registration and authentication
- Expert credential verification and designation
- Domain expertise tagging
- User roles (community, expert, moderator, admin)
- Reputation/helpfulness tracking

**Quality & Moderation:**
- Content flagging and review queues
- Evidence quality rating
- Claim merging and duplicate detection
- Bot detection and account management
- Appeal and dispute resolution
- Comment/discussion moderation

**Platform Operations:**
- Admin dashboard with platform health metrics
- System configuration (scoring algorithm weights)
- Analytics and monitoring
- User management tools
- API key management

**Integration & Extensibility:**
- RESTful API with comprehensive endpoints
- API documentation and developer resources
- Rate limiting and access control
- Performance optimization (<200ms responses)
- Developer dashboard

**Media & Credibility:**
- Transparent methodology documentation
- Historical score tracking
- Citation-friendly URLs
- Professional, trustworthy design
- Media resources and partnerships

**Technical Architecture:**
- Web application (PWA, mobile-responsive)
- API backend (RESTful)
- Real-time updates
- Scalable to 10K+ active users
- High availability (99.8%+ uptime target)

## Domain-Specific Requirements

### Geographic Voting Transparency

**Core Requirement:** Display geographic provenance of all votes to detect manipulation patterns and state-level influence campaigns.

**Implementation:**
- Capture geolocation data for every vote cast (IP-based geolocation)
- Display geographic distribution on claim detail pages (e.g., "45% votes from US, 23% from France, 18% from China, etc.")
- Visualize geographic patterns (maps, charts showing vote distribution by country/region)
- Enable users to filter/view votes by geographic region
- Show expert verifier geographic distribution separately from community votes

**Privacy Considerations:**
- Geographic data displayed at aggregate level (country/region), not individual voter level
- User voting history remains private, but aggregate geographic patterns are public
- Clear privacy policy explaining geographic data collection and display
- GDPR compliance: geographic data collection with user consent
- Consider VPN detection and handling (users masking location)

**Use Case:** Users can see if a claim about French politics has primarily French voters and experts, or if there's anomalous voting patterns suggesting coordinated manipulation from other regions.

### Content Moderation & Platform Integrity

**Automated Moderation System:**
- AI-based content moderation for spam, harassment, hate speech
- Automated duplicate claim detection and merging
- Automated bot detection (behavior patterns, voting velocity, account age)
- Automated low-quality evidence filtering
- Clear automated rules with transparency (users see why content was flagged)
- Appeal process for automated decisions (human moderator review)

**Platform Abuse Prevention:**
- Detection of coordinated voting campaigns (timing patterns, account clustering)
- Automated CAPTCHA challenges for suspicious activity
- Rate limiting on voting, claim submission, evidence upload
- Account reputation scoring (new accounts have lower weight initially)

### Identity Verification & Anti-Bot

**MVP Identity Verification (Phone + Email + CAPTCHA):**
- Phone number verification (SMS code)
- Email verification (confirmation link)
- CAPTCHA on registration and high-frequency actions
- One account per phone number enforcement
- Email domain verification (detect disposable email services)

**Future: Advanced Identity Verification:**
- Personal bound credential system for higher trust levels
- Verification tiers (unverified → phone verified → advanced verified)
- Higher verification = higher vote weight or access to specific features
- Integration with identity verification services

**Account Security:**
- Two-factor authentication (2FA) optional for users
- Password security requirements
- Session management and timeout
- Account suspension/ban system for abuse

### Expert Verification System

**Notoriety-Based Expert Status:**
- Expert verification based on public reputation and credentials
- Verification sources:
  - Academic credentials (Google Scholar, ORCID, institutional affiliations)
  - Professional credentials (LinkedIn, professional organizations)
  - Publications and citation metrics
  - Media appearances and public recognition
  - Peer endorsements within the platform

**Expert Designation Process:**
- Application with links to public profiles and credentials
- Admin verification of public notoriety and expertise
- Domain expertise tagging based on verified background
- Ongoing reputation monitoring (experts can lose status for misconduct)
- Community challenge system (users can flag questionable expert status)

### API Access & Security

**API Approval Process:**
- Developer application with use case description
- Admin review and approval workflow
- Terms of service acceptance
- Rate limiting based on approved use case
- Monitoring and abuse detection
- Ability to revoke API access for violations

**API Security:**
- API key authentication
- Rate limiting per key (configurable based on approved usage)
- Request logging and monitoring
- IP-based rate limiting as backup
- DDoS protection
- Abuse detection (unusual patterns, scraping attempts)

### Data Privacy & Compliance

**Global Privacy Compliance:**
- **GDPR (EU):** Right to be forgotten, data portability, consent mechanisms, privacy policy
- **CCPA (California):** Consumer privacy rights, opt-out of data sale
- **General privacy:** Clear data handling policies, user control over data

**Data Handling:**
- **Public data:** Claims, evidence, votes (aggregated), geographic distribution, expert verifications
- **Private data:** Individual voting history, personal contact info (email/phone), IP addresses (stored but not displayed)
- **User controls:** Profile visibility settings, notification preferences
- **Data retention:** Define retention periods for different data types
- **Data export:** Users can export their voting history and contributions

### Platform Liability & Content Policy

**Legal Protections:**
- Section 230 protections (US) - platform not liable for user content
- EU Digital Services Act compliance - content moderation obligations
- Terms of Service clearly defining user responsibilities
- Content policy defining prohibited content (spam, harassment, illegal content, coordinated manipulation)

**Defamation Risk Mitigation:**
- Claims about individuals/organizations: extra scrutiny
- Evidence requirements for sensitive claims
- Appeal process for individuals/organizations claiming defamation
- Cooperation with legal requests while maintaining user privacy

### Platform Security

**Security Requirements:**
- HTTPS everywhere (TLS 1.3+)
- Secure authentication (bcrypt/argon2 for passwords)
- SQL injection prevention
- XSS prevention
- CSRF protection
- Secure session management
- Regular security audits
- Vulnerability disclosure policy
- DDoS protection (Cloudflare or similar)
- Database encryption at rest
- Backup and disaster recovery

### Real-Time & Performance

**Performance Requirements:**
- Sub-200ms API response times
- Real-time vote updates (WebSocket or Server-Sent Events)
- Geographic data aggregation must be efficient (cached)
- Bot detection must run in real-time without impacting UX
- Scalable architecture to handle viral claims (10K+ votes in hours)

### Transparency & Accountability

**Algorithm Transparency:**
- Public documentation of weighted scoring algorithm
- Explanation of how geographic data factors in (if at all)
- Explanation of expert vote weighting
- Explanation of automated moderation rules

**Operational Transparency:**
- Public moderation logs (anonymized)
- Appeal process documentation
- Expert verification criteria published
- Regular transparency reports (platform usage, moderation actions, expert verifications)

### Risk Mitigations

**Key Risks:**

1. **State-level manipulation campaigns**
   - Mitigation: Geographic voting transparency, bot detection, coordinated campaign detection

2. **Expert credential fraud**
   - Mitigation: Notoriety-based verification, community challenge system, ongoing monitoring

3. **Privacy violations (geographic data leakage)**
   - Mitigation: Aggregate-only display, no individual voting history exposed, clear privacy policy

4. **Automated moderation mistakes**
   - Mitigation: Clear appeal process, human review of appeals, continuous model improvement

5. **API abuse (scraping, manipulation)**
   - Mitigation: Approval process, rate limiting, monitoring, revocation capability

6. **DDoS attacks on controversial claims**
   - Mitigation: DDoS protection service, rate limiting, infrastructure scalability

7. **Legal liability for user content**
   - Mitigation: Section 230 protections, clear ToS, content moderation, legal cooperation policy

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Geographic Voting Transparency for Manipulation Detection**

groundtruth introduces a novel transparency layer: displaying the geographic provenance of votes (by country/region) to detect state-level manipulation campaigns and coordinated influence operations.

**What's New:**
- Aggregate geographic distribution visible on every claim (e.g., "45% US, 23% France, 18% China")
- Geographic patterns visualized to reveal anomalies (e.g., suspicious voting concentrations from unexpected regions)
- Separate geographic breakdowns for community vs expert votes
- Users can identify when a claim about one country's politics is being primarily voted on by another country

**Why It Matters:**
Existing fact-checking platforms don't expose geographic voting patterns. This transparency allows the community itself to identify potential manipulation - if 80% of votes on a French political claim come from outside France, users can see that red flag immediately.

**2. Multi-Factor Weighted Truth Verification System**

groundtruth combines three verification sources into one unified, transparent score:
- Community consensus (volume + diversity)
- Expert verification (credentialed specialists)
- Geographic distribution patterns

**What's New:**
No existing platform combines community + expert + geographic transparency into one system with fully visible methodology. Current platforms either:
- Use only editorial fact-checkers (Snopes, PolitiFact) - no community input
- Use only community (Reddit, social media) - no expert weighting
- Use black-box algorithms - no transparency into how conclusions are reached

groundtruth is the "all-in-one" platform - combining multiple verification methods with radical transparency about how they're weighted.

**3. Radical Transparency in Disagreement**

Most fact-checking platforms hide disagreements or smooth them into a single editorial verdict. groundtruth intentionally exposes divergence:
- Show when community and experts disagree
- Display individual expert reasoning alongside their votes
- Make the weighted scoring formula public and documented
- Show score evolution over time as more data comes in

**What's New:**
The philosophy of showing disagreements openly rather than forcing false consensus. Users can see "community scores this 30/100, but experts score it 75/100" and draw their own conclusions with full context.

**4. API-First Architecture for Ubiquitous Fact-Checking**

groundtruth treats verified truth scores as public infrastructure that should be accessible everywhere via API, not locked in a single website.

**What's New:**
Most fact-checking platforms are destination sites - you have to go to them. groundtruth's API-first design enables third parties to embed truth scores anywhere: browser extensions, news sites, social media overlays, mobile apps. The goal is ubiquitous access to verification data.

### Market Context & Competitive Landscape

**Current Fact-Checking Landscape:**

**Editorial Platforms (Snopes, PolitiFact, FactCheck.org):**
- Strengths: Expert analysis, thorough research
- Limitations: Can't scale to millions of claims, single editorial voice, slow turnaround, no community input

**Community Platforms (Wikipedia, Reddit):**
- Strengths: Scale, diverse perspectives, fast
- Limitations: No expert verification, vulnerable to brigading, no formal methodology

**Social Platform Fact-Checking (Twitter/X Community Notes, Facebook):**
- Strengths: Integrated into platforms where misinformation spreads
- Limitations: Platform-locked, limited transparency, algorithmic black boxes

**The Gap groundtruth Fills:**
No platform combines expert verification + community consensus + geographic transparency + open methodology + API access. groundtruth is positioned as the comprehensive, transparent, infrastructure-level solution.

### Validation Approach

**Prove by Practice - Learning Through Real-World Use**

Rather than extensive upfront validation, groundtruth will validate its innovations through production use and real-world data:

**Phase 1: MVP Validation (3-6 months)**
- Launch with core features (community + expert voting, geographic transparency)
- Collect data on first 100-500 verified claims
- Analyze: Do geographic patterns reveal actual manipulation? Do expert + community scores align or diverge in meaningful ways?
- Iterate based on actual usage patterns

**Phase 2: Scale Validation (6-12 months)**
- Scale to 5,000-10,000 verified claims with 5,000-10,000 active users
- Compare groundtruth assessments against other fact-checking platforms
- Measure: Do users trust the multi-factor scores? Do they find geographic data useful?
- Refine weighted scoring algorithm based on real data

**Phase 3: Authority Validation (12-24 months)**
- Achieve 10,000+ active users, 10,000+ verified claims
- Early media citations begin
- Validation metric: Are journalists citing groundtruth as credible?
- Ultimate validation: "According to groundtruth..." becomes standard media practice

**Key Metrics to Watch:**
- Score consensus rates (how often do community and experts align?)
- Geographic pattern detection (how often do suspicious patterns emerge?)
- User trust indicators (return rates, social sharing, API adoption)
- Media citation rates (the ultimate credibility signal)

**Fallback Strategy:**
If specific innovations don't prove valuable through practice:
- Geographic transparency not used → Can be deprioritized in UI, kept as data layer
- Expert/community divergence too confusing → Simplify UI presentation while keeping methodology transparent
- Weighted scoring doesn't feel trustworthy → Publish research, refine algorithm, increase transparency documentation

### Risk Mitigation

**Innovation Risk 1: Geographic data misinterpretation**
- Risk: Users misinterpret geographic patterns (e.g., claiming bias when none exists)
- Mitigation: Clear documentation explaining what geographic data does/doesn't mean, education in UI, aggregate-only display
- Fallback: Make geographic view optional/advanced feature if it causes more confusion than clarity

**Innovation Risk 2: Multi-factor scoring perceived as too complex**
- Risk: Users don't understand or trust weighted scoring combining multiple sources
- Mitigation: Progressive disclosure (simple score prominent, detailed breakdown available on click), clear methodology documentation, visual explanations
- Fallback: Simplify to simpler community/expert separate scores if unified score doesn't resonate

**Innovation Risk 3: Radical transparency backfires**
- Risk: Showing disagreements undermines trust rather than building it
- Mitigation: Frame disagreements as healthy part of truth-seeking, provide context for why divergence happens
- Fallback: Can adjust UI to emphasize consensus areas while still showing full data

**Innovation Risk 4: API abuse or misrepresentation**
- Risk: Third parties misuse API data or misrepresent scores
- Mitigation: Approval process, usage monitoring, terms of service, citation requirements, ability to revoke access
- Fallback: Tighter API controls, whitelist approach for integrations

**Innovation Risk 5: Prove-by-practice approach delays validation**
- Risk: Waiting for real-world data means longer before knowing if innovations work
- Mitigation: Start small, iterate fast, collect feedback continuously, be willing to pivot quickly
- Fallback: Conduct user research studies in parallel with production learning

## Web Application + API Backend Technical Requirements

### Project-Type Overview

groundtruth is built as a **Single Page Application (SPA)** powered by a **RESTful API backend**. The architecture separates concerns: the API handles all business logic, data storage, and authentication, while the web app provides the interactive user interface. This API-first design enables future mobile apps and third-party integrations.

### Web Application Technical Requirements

**Architecture:**
- Single Page Application (SPA) with client-side routing
- Progressive Web App (PWA) capabilities for mobile responsiveness and future app wrapping
- Real-time updates using WebSockets or Server-Sent Events for live voting
- State management for complex UI (claim details, voting state, geographic visualizations)

**Browser Support:**
- Modern browsers only (last 2 versions):
  - Chrome/Chromium
  - Firefox
  - Safari
  - Edge
- No legacy browser support (no IE11)
- Progressive enhancement for older browsers (graceful degradation)

**SEO Requirements:**
- **Critical Challenge:** SPAs traditionally struggle with SEO
- **Solution Required:** Server-Side Rendering (SSR) or Static Site Generation (SSG) for claim pages
  - Claim detail pages must be indexable by Google
  - Users should be able to find verified claims via search engines
  - Meta tags (title, description, Open Graph) dynamically generated per claim
  - Structured data (Schema.org) for rich search results
- **Implementation Options:**
  - Next.js (React with SSR/SSG)
  - Nuxt.js (Vue with SSR/SSG)
  - SvelteKit (Svelte with SSR/SSG)
  - Or: Hybrid approach (SPA for app, SSR for public claim pages)

**Performance Targets:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- API response rendering: < 200ms from API response to UI update
- Real-time vote updates: < 500ms latency

**Responsive Design:**
- Mobile-first approach
- Breakpoints: Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px)
- Touch-optimized for mobile voting
- Geographic visualization charts responsive to screen size

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements met
- ARIA labels for interactive elements
- Focus management for modals and dynamic content

**Real-Time Functionality:**
- Live vote count updates as votes are cast
- Real-time score recalculation display
- Geographic distribution updates in real-time
- Notification system for claim updates (for users watching claims)

### API Backend Technical Requirements

**Architecture:**
- RESTful API design
- Stateless authentication (JWT tokens)
- Microservices consideration for future scaling (monolith acceptable for MVP)
- Caching layer (Redis) for frequently accessed data (claim scores, geographic aggregates)

**Core API Endpoints:**

**Claims Management:**
- `POST /v1/claims` - Submit new claim
- `GET /v1/claims` - List/search claims (pagination, filtering)
- `GET /v1/claims/{id}` - Get claim details with scores
- `PUT /v1/claims/{id}` - Update claim (admins/moderators only)
- `DELETE /v1/claims/{id}` - Archive claim (admins only)
- `GET /v1/claims/{id}/history` - Get score evolution over time

**Voting:**
- `POST /v1/claims/{id}/votes` - Cast vote on claim
- `GET /v1/claims/{id}/votes` - Get vote aggregates (community/expert breakdown)
- `GET /v1/claims/{id}/votes/geographic` - Get geographic vote distribution
- `PUT /v1/votes/{id}` - Update own vote
- `DELETE /v1/votes/{id}` - Retract own vote

**Evidence:**
- `POST /v1/claims/{id}/evidence` - Submit evidence
- `GET /v1/claims/{id}/evidence` - List evidence for claim
- `GET /v1/evidence/{id}` - Get specific evidence details
- `POST /v1/evidence/{id}/rate` - Rate evidence quality/helpfulness
- `PUT /v1/evidence/{id}` - Update evidence (submitter only)
- `DELETE /v1/evidence/{id}` - Remove evidence (submitter/moderator)

**Users & Authentication:**
- `POST /v1/auth/register` - User registration (phone + email + CAPTCHA)
- `POST /v1/auth/login` - User login (returns JWT)
- `POST /v1/auth/logout` - Logout (invalidate token)
- `POST /v1/auth/refresh` - Refresh JWT token
- `GET /v1/users/me` - Get current user profile
- `PUT /v1/users/me` - Update user profile
- `GET /v1/users/{id}` - Get public user profile
- `GET /v1/users/{id}/contributions` - Get user's votes and evidence (privacy-controlled)

**Expert Verification:**
- `POST /v1/experts/apply` - Apply for expert status
- `GET /v1/experts` - List verified experts
- `GET /v1/experts/{id}` - Get expert profile and credentials
- `PUT /v1/admin/experts/{id}/approve` - Approve expert application (admin)
- `PUT /v1/admin/experts/{id}/reject` - Reject expert application (admin)
- `DELETE /v1/admin/experts/{id}` - Revoke expert status (admin)

**Moderation & Admin:**
- `GET /v1/admin/queue/flags` - Get flagged content queue
- `POST /v1/flags` - Flag content (claim/evidence/comment)
- `PUT /v1/admin/flags/{id}/resolve` - Resolve flag
- `GET /v1/admin/users/{id}` - Admin user management
- `PUT /v1/admin/users/{id}/suspend` - Suspend user
- `GET /v1/admin/metrics` - Platform health metrics
- `PUT /v1/admin/config/scoring` - Update scoring algorithm weights

**API Access (Developers):**
- `POST /v1/api-keys/apply` - Apply for API access
- `GET /v1/api-keys` - Manage own API keys
- `GET /v1/api-keys/{key}/usage` - View API usage stats
- `DELETE /v1/api-keys/{key}` - Revoke API key

**Authentication Model:**

**For Web App Users:**
- JWT (JSON Web Tokens) for session management
- Access token (short-lived, 15-60 minutes)
- Refresh token (long-lived, 7-30 days)
- Token stored in httpOnly cookies (XSS protection)
- CSRF protection for state-changing operations

**For Third-Party Developers:**
- API key authentication (Header: `X-API-Key`)
- API keys issued after admin approval
- Keys tied to specific approved use cases
- Rate limits enforced per API key

**For Future Integrations:**
- OAuth2 support for third-party app integrations
- Scope-based permissions (read-only, write, admin)

**Data Formats:**
- All requests/responses in JSON
- Error responses follow standard format:
  ```json
  {
    "error": {
      "code": "ERROR_CODE",
      "message": "Human-readable message",
      "details": {}
    }
  }
  ```
- Pagination format:
  ```json
  {
    "data": [],
    "pagination": {
      "page": 1,
      "per_page": 20,
      "total": 156,
      "total_pages": 8
    }
  }
  ```

**Rate Limiting Strategy:**

**Per-User Rate Limits (Authenticated Web App Users):**
- Voting: 100 votes per hour (prevent rapid-fire manipulation)
- Claim submission: 10 claims per day
- Evidence submission: 50 evidence pieces per day
- API read operations: 1000 requests per hour

**Per-API-Key Rate Limits (Third-Party Developers):**
- Default tier: 1,000 requests per hour
- Approved tier: 10,000 requests per hour (after review)
- Enterprise tier: 100,000 requests per hour (custom agreements)
- Rate limit headers included in responses:
  ```
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 847
  X-RateLimit-Reset: 1642434000
  ```

**Verification Level Adjustments:**
- Unverified accounts: Reduced limits (50% of base)
- Phone verified: Standard limits
- Advanced verified (future): Increased limits (150% of base)
- Expert verifiers: No voting rate limits (trusted users)

**API Versioning:**
- URL-based versioning: `/v1/`, `/v2/`, etc.
- Current version: `/v1/`
- Version included in all endpoint paths
- Breaking changes require new version
- Non-breaking changes can be added to existing version
- Deprecation policy: 6-12 month notice before version sunset
- Version documented in API response headers: `X-API-Version: 1`

**Error Codes & Handling:**

**Standard HTTP Status Codes:**
- 200 OK - Success
- 201 Created - Resource created
- 400 Bad Request - Invalid input
- 401 Unauthorized - Authentication required
- 403 Forbidden - Insufficient permissions
- 404 Not Found - Resource doesn't exist
- 429 Too Many Requests - Rate limit exceeded
- 500 Internal Server Error - Server error

**Custom Error Codes:**
- `CLAIM_NOT_FOUND` - Claim ID doesn't exist
- `VOTE_ALREADY_CAST` - User already voted on this claim
- `INVALID_EXPERT_CREDENTIALS` - Expert application missing required credentials
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `BOT_DETECTED` - Automated behavior detected
- `GEOGRAPHIC_DATA_UNAVAILABLE` - Cannot determine user location
- `EVIDENCE_TOO_LARGE` - Evidence file exceeds size limit

**API Documentation:**
- REST API documentation only (no SDK initially)
- OpenAPI 3.0 specification
- Interactive documentation (Swagger UI or similar)
- Code examples in common languages (JavaScript, Python, cURL)
- Authentication guide for developers
- Rate limiting documentation
- Best practices and usage guidelines
- Public documentation site: `https://docs.groundtruth.com/api`

### Data Schemas

**Claim Schema:**
```json
{
  "id": "uuid",
  "text": "string",
  "submitted_by": "user_id",
  "submitted_at": "timestamp",
  "status": "enum: pending|verified|archived",
  "scores": {
    "unified": 0-100,
    "community": 0-100,
    "expert": 0-100
  },
  "vote_counts": {
    "community": integer,
    "expert": integer,
    "total": integer
  },
  "geographic_distribution": {
    "by_country": {"US": 45.2, "FR": 23.1, ...}
  },
  "evidence_count": integer,
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

**Vote Schema:**
```json
{
  "id": "uuid",
  "claim_id": "uuid",
  "user_id": "uuid",
  "vote_value": 0-100,
  "is_expert": boolean,
  "explanation": "string (optional)",
  "geographic_origin": "country_code",
  "cast_at": "timestamp"
}
```

**Evidence Schema:**
```json
{
  "id": "uuid",
  "claim_id": "uuid",
  "submitted_by": "user_id",
  "type": "enum: link|pdf|image|text",
  "content": "string or URL",
  "strength_rating": "enum: weak|moderate|strong",
  "helpful_count": integer,
  "notes": "string",
  "submitted_at": "timestamp"
}
```

**User Schema:**
```json
{
  "id": "uuid",
  "email": "string",
  "phone": "string",
  "verification_status": "enum: unverified|phone_verified|advanced_verified",
  "is_expert": boolean,
  "expert_domains": ["string"],
  "reputation_score": integer,
  "joined_at": "timestamp"
}
```

### Implementation Considerations

**Technology Stack Recommendations:**

**Backend:**
- Node.js with Express or Fastify (JavaScript/TypeScript)
- Or: Python with FastAPI or Django REST Framework
- Or: Go with Gin or Echo (performance-critical paths)
- PostgreSQL for primary data store
- Redis for caching and real-time features
- WebSocket server (Socket.io or native WebSockets)

**Frontend:**
- React with Next.js (SSR for SEO)
- Or: Vue with Nuxt.js
- Or: Svelte with SvelteKit
- State management: Redux/Zustand/Pinia
- Real-time: Socket.io client or native WebSockets
- Charts: Chart.js or D3.js for geographic visualizations

**Infrastructure:**
- Cloud hosting (AWS, Google Cloud, Azure, or Vercel/Netlify)
- CDN for static assets
- Load balancing for API
- Geolocation service (MaxMind GeoIP2 or IP2Location)
- SMS service for phone verification (Twilio, AWS SNS)
- Email service (SendGrid, AWS SES)
- DDoS protection (Cloudflare)

**Security Considerations:**
- HTTPS/TLS 1.3 everywhere
- Rate limiting at API gateway level
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention (Content Security Policy)
- CSRF protection for state-changing operations
- Bot detection (CAPTCHA, behavior analysis)
- API key rotation capability
- Security headers (HSTS, X-Frame-Options, etc.)
- Regular dependency updates and security audits

**Scalability Considerations:**
- Horizontal scaling of API servers
- Database read replicas for query performance
- Caching layer (Redis) for frequently accessed data
- CDN for static content and media
- Queue system for async operations (claim scoring, notifications)
- Geographic data aggregation cached and updated periodically
- Real-time updates via WebSocket clusters

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach: Experience MVP**

groundtruth's MVP focuses on delivering a polished, delightful user experience that demonstrates the core innovation: multi-factor truth verification with geographic transparency. Rather than rushing to launch a platform or API, the MVP prioritizes perfecting the user experience that makes people say "wow, this actually works."

**Why Experience MVP:**
- The innovation (geographic voting transparency + weighted scoring) needs to be viscerally understood, not just technically available
- Beautiful visualization of geographic patterns is the key differentiator that sells the concept
- Polished UX builds trust faster than feature breadth for a credibility-focused product
- Real-time voting and transparency UI must feel seamless to gain user confidence

**MVP Success Metric:**
- 500-1,000 active users consistently voting on claims
- 100-500 verified claims with meaningful vote depth
- Proof that weighted scoring (community + expert) produces trusted results
- Demonstration that geographic transparency reveals manipulation patterns

**Resource Requirements:**

**Team Size:** 2-4 people for MVP
- 1 Full-stack developer (frontend + backend + infrastructure)
- 1 Frontend specialist (UI/UX implementation, real-time features, visualizations)
- 1 Part-time admin/moderator (expert verification, content moderation)
- Optional: 1 Designer (if not handled by frontend specialist)

**Timeline Estimate:** 3-6 months to MVP launch

**Technology Decisions:**
- Frontend: React with Next.js (SSR for SEO, large ecosystem)
- Backend: Node.js with Express/Fastify or Python with FastAPI
- Database: PostgreSQL + Redis
- Infrastructure: Cloud hosting (AWS/GCP/Azure or Vercel)
- Geolocation: MaxMind GeoIP2
- Real-time: Socket.io or native WebSockets

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**

1. **Casual Voter (Sarah):** Finds claim → sees transparency UI with geographic patterns → votes → sees real-time update → shares
2. **Serious Investigator (Marcus):** Submits claim → uploads evidence → votes with explanation → tracks claim over time
3. **Expert Verifier (Dr. Elena):** Applies for expert status → gets approved → reviews claims in domain → casts weighted expert vote
4. **Platform Admin (James):** Approves expert applications → handles flagged content → monitors platform health

**Must-Have Capabilities:**

**Claims Management:**
- Submit new claims (authenticated users)
- Browse claims (list view with scores, filters)
- Search claims (text search)
- View claim details (full transparency UI)
- Track claim score evolution over time

**Dual Verification System:**
- Community voting (0-100 scale with optional explanation)
- Expert voting (0-100 scale with required explanation)
- Weighted scoring algorithm combining community + expert votes
- Expert votes weighted more heavily than community votes
- Separate vote counts and scores displayed (community vs expert)

**Geographic Transparency (Key Differentiator):**
- Capture geolocation (IP-based) for every vote cast
- Store geographic origin (country-level) with each vote
- Display aggregate geographic distribution on claim pages
- Visualizations: Maps and/or charts showing vote distribution by country
- Separate geographic breakdowns for community vs expert votes
- Privacy-preserving (aggregate only, no individual voter locations shown)

**Radical Transparency UI:**
- Clear display of weighted unified score (0-100)
- Breakdown: Community score + Expert score shown separately
- Vote counts visible (X community votes, Y expert votes)
- Geographic distribution prominent and easy to understand
- Show when community and experts disagree
- Score evolution chart (how score changed over time)
- Individual expert explanations visible (with credentials)

**Evidence System (Basic):**
- Submit evidence for claims (links, text, PDFs)
- View evidence on claim detail pages
- Evidence attribution (who submitted)
- Evidence ordering (most recent first in MVP)

**User Authentication & Verification:**
- Registration with email + phone + CAPTCHA
- Email verification (confirmation link)
- Phone verification (SMS code via Twilio/AWS SNS)
- One account per phone number enforcement
- JWT-based session management
- Basic user profiles

**Expert Verification System:**
- Expert application form (credentials, links to publications/profiles)
- Admin review and approval workflow
- Domain expertise tagging (health, politics, science, etc.)
- Expert badge/designation visible on votes
- Expert credentials displayed on profile

**Admin Dashboard (Basic):**
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

**Web Application (Polished Experience):**
- Single Page Application (SPA) with client-side routing
- Server-Side Rendering (SSR) for claim pages (SEO requirement)
- Mobile-responsive design (PWA capabilities)
- Modern browser support only (Chrome, Firefox, Safari, Edge - last 2 versions)
- WCAG 2.1 Level AA accessibility compliance
- Performance targets met (FCP < 1.5s, LCP < 2.5s, TTI < 3.5s)

**Internal API Only:**
- RESTful API powers web app
- Not publicly documented or accessible to third parties in MVP
- Rate limiting in place for abuse prevention
- Authentication via JWT tokens

**Explicitly NOT in MVP:**
- Public API for third-party developers
- Native mobile apps (PWA wrapping only)
- Advanced moderation tools (AI-based, automated)
- Evidence quality rating system
- User reputation/helpfulness scores
- Claim merging and duplicate detection
- Comment/discussion threads
- Following users or claims
- Push notifications

### Post-MVP Features

**Phase 2: Growth & Platform (6-12 months post-MVP)**

**Goal:** Scale to 5,000-10,000 active users and enable third-party integrations

**Public API Platform:**
- Public API with comprehensive documentation
- Developer application and API key approval process
- API rate limiting (tiered: free, approved, enterprise)
- OpenAPI 3.0 specification
- Developer portal and interactive documentation
- Code examples and integration guides
- Webhook support for real-time updates

**Advanced Moderation & Quality Control:**
- AI-based spam and bot detection
- Automated duplicate claim detection and merging
- Evidence quality rating system (helpful votes)
- User reputation and helpfulness scoring
- Coordinated manipulation campaign detection
- Separate moderator role with dedicated dashboard
- Appeal system for moderation decisions

**Enhanced Evidence System:**
- Evidence strength rating (weak/moderate/strong)
- Multi-format evidence (images, videos, structured data)
- Evidence quality voting by community
- Source credibility assessment
- Cross-referencing with existing verified claims

**User Experience Enhancements:**
- Follow claims for updates
- Follow trusted verifiers
- Personalized claim feeds based on interests
- Push notifications (web push for claim updates)
- Comment/discussion threads on claims
- User contribution history and statistics

**Mobile Native Apps:**
- iOS native app (App Store)
- Android native app (Google Play)
- Optimized mobile voting experience
- Push notifications for mobile

**Phase 3: Expansion & Authority (12-24+ months)**

**Goal:** Reach 10,000+ active users, 10,000+ verified claims, establish media authority

**Media & Partnership Tools:**
- Embeddable widgets for news sites
- Media partnership program
- Citation guidelines and attribution tools
- Bulk data export for academic research
- Press/media resources section
- API features specific to journalism use cases

**Advanced Analytics & Insights:**
- Comprehensive analytics dashboard
- Trending claims detection
- Misinformation pattern analysis
- Geographic manipulation reports
- Expert consensus tracking
- Platform health and trust metrics

**Scale & Performance:**
- Support for viral claims (100K+ votes)
- Advanced caching and CDN optimization
- Database sharding for geographic data
- Microservices architecture (if needed)
- Multi-region deployment for global performance

**OSINT Integration (Future Enhancement):**
- Reverse image search for visual evidence
- Metadata extraction from photos/videos
- Geolocation verification tools
- Bot detection for submitted content
- Historical claim tracking ("has this been claimed before?")

**Gamification Layer (Long-term Vision):**
- RPG-style progression system
- Achievement badges and missions
- Lie Hunters mode (Among Us-style imposter detection)
- Guild systems for team-based fact-checking
- Leaderboards and competitions

**Expanded Applications:**
- Research paper verification
- Product review authenticity checking
- Medical claim verification
- Historical fact database
- B2B offerings (journalism fact-checking backend)

### Risk Mitigation Strategy

**Technical Risks:**

**Risk 1: Geographic data visualization complexity**
- Challenge: Building beautiful, performant maps/charts for voting patterns
- Mitigation: Use established charting library (Chart.js, D3.js), start simple (bar charts), iterate to maps
- Fallback: Launch with simple visualizations (bar/pie charts), add interactive maps post-MVP

**Risk 2: Real-time infrastructure scaling**
- Challenge: WebSocket connections for thousands of concurrent users
- Mitigation: Use battle-tested library (Socket.io), implement connection pooling, plan for horizontal scaling
- Fallback: Start with polling (5-10 second refresh), migrate to WebSockets post-MVP if needed

**Risk 3: Weighted scoring algorithm**
- Challenge: Getting the expert/community weighting right, avoiding gaming
- Mitigation: Start with simple weighting (expert votes = 10x community votes), adjust based on data, document transparently
- Fallback: Show separate scores if unified score doesn't resonate, let users interpret

**Risk 4: SSR for SEO complexity**
- Challenge: SPA with SSR adds architectural complexity
- Mitigation: Use framework with built-in SSR (Next.js, Nuxt.js, SvelteKit), follow best practices
- Fallback: Hybrid approach (SPA for app, static pages for public claims), or accept reduced SEO initially

**Market Risks:**

**Risk 1: User acquisition and critical mass**
- Challenge: Need voting volume to make scores credible
- Mitigation: Seed with high-profile claims, targeted outreach to fact-checking communities, early expert recruitment
- Fallback: Focus on quality over quantity initially, prove concept with smaller claim set

**Risk 2: Expert verifier recruitment**
- Challenge: Getting credentialed experts to participate
- Mitigation: Personal outreach to academic networks, highlight impact/visibility, start with friendly domains
- Fallback: Start with community-only voting, add experts gradually as platform gains credibility

**Risk 3: Geographic data misinterpretation**
- Challenge: Users misunderstand or misuse geographic voting patterns
- Mitigation: Clear documentation, contextual help in UI, education about what patterns mean/don't mean
- Fallback: Make geographic view optional/advanced feature if causes confusion

**Risk 4: Competition from established platforms**
- Challenge: Snopes, PolitiFact, Twitter Community Notes are established
- Mitigation: Focus on unique differentiator (geographic transparency + multi-factor), target API-first integration use cases
- Validation: Prove by practice - let real-world usage demonstrate value

**Resource Risks:**

**Risk 1: MVP takes longer than 6 months**
- Challenge: Complex features (real-time, geographic viz, expert system) might take longer
- Mitigation: Aggressive prioritization, consider simplifications (polling vs WebSockets, simpler visualizations)
- Fallback: Soft launch with limited features, iterate publicly

**Risk 2: Smaller team than planned**
- Challenge: If only 1-2 developers available instead of 3-4
- Mitigation: Use more managed services (Vercel/Netlify for hosting, reduce infrastructure work), simplify visualizations
- Fallback: Extend timeline to 9-12 months, or cut real-time updates initially

**Risk 3: Infrastructure costs higher than expected**
- Challenge: Geolocation services, SMS verification, hosting costs add up
- Mitigation: Use free tiers initially (MaxMind free tier, Twilio credits), optimize early for cost
- Fallback: Reduce phone verification requirement (email-only), use less expensive geolocation service

**Risk 4: User growth too fast (good problem)**
- Challenge: Viral claim overwhelms infrastructure
- Mitigation: Plan scalability from start (horizontal scaling, caching, CDN), use cloud auto-scaling
- Fallback: Rate limiting, queue management, temporarily throttle new claim submissions if needed
