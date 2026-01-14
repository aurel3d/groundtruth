---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-groundtruth-2026-01-13.md"
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/project-context.md"
---

# UX Design Specification groundtruth

**Author:** Aurel
**Date:** 2026-01-14

---

## Executive Summary

### Project Vision

groundtruth is a universal fact-checking platform designed to break through ideological echo chambers by showing **multiple truth scores with radical transparency**—community votes, expert analysis, OSINT verification, and geographic patterns all displayed side-by-side with full provenance. The core insight: instead of *one* verdict (which feels politically biased), users see *all* perspectives and understand the "why" behind each score.

The real problem being solved: political disinformation thrives because vulnerable populations never encounter counter-evidence from their social circles. Existing fact-checkers are fragmented and perceived as biased. groundtruth creates universal trust through radical transparency—when nothing is hidden, users across all ideologies can believe the platform.

### Target Users

**1. Casual Community Voters** (Sarah - 32, Marketing Manager)  
Everyday social media users who encounter dubious claims and want quick, trustworthy verification without spending hours researching. Success = copy/paste claim → see multi-factor score with transparency → understand why → share in under 3 minutes.

**2. Serious Investigators** (Marcus - 45, Retired Journalist)  
Engaged citizens with time and skills for deep-dive investigations who enjoy researching complex claims and contributing quality analysis. Success = submit claim → upload evidence → write detailed explanation → see their work recognized as helpful.

**3. Expert Verifiers** (Dr. Elena - 38, Epidemiologist/Professor)  
Credentialed professionals concerned about misinformation in their domain who want to contribute expertise at scale. Success = apply → get verified and domain-tagged → receive intelligent claim routing → cast weighted expert vote → see impact reaching thousands.

**4. Platform Operators & Moderators**  
Administrators maintaining platform health, managing users, handling expert verification workflows, and ensuring system integrity.

**5. Media & Journalists**  
Professional journalists who need credible fact-checking sources to cite in reporting. Success = evaluate methodology → verify specific claims → cite groundtruth in published articles.

### Key Design Challenges

**1. Communicating Multi-Factor Scoring Simply**  
Challenge: You have multiple score types (community, expert, AI, OSINT) with weighted calculations. How do you display this complexity without overwhelming casual users? A Sarah doesn't want a spreadsheet.  
Opportunity: Create a "trust dashboard" visual hierarchy where the unified score dominates but context is accessible. Complexity revealed progressively, not all at once.

**2. Geographic Transparency Without Privacy Violation**  
Challenge: Showing vote distribution by country is a key differentiator, but privacy must be sacred (aggregate-only, no individual tracking). How do you make this compelling while clearly communicating the privacy-first approach?  
Opportunity: Geographic heat maps that feel like viewing *global consensus patterns* rather than surveillance. Transparent methodology = trust building.

**3. Balancing Expert Authority with Democratic Participation**  
Challenge: Expert votes are weighted differently than community votes. How do you show this weighting clearly without making casual voters feel their voices don't matter?  
Opportunity: Frame expert contributions as "specialized perspective" not "the correct answer." Display both scores separately, let users understand the distinction. Expert opinions add depth, community provides scale.

**4. Evidence Credibility at Scale**  
Challenge: Evidence submission is open (good for participation) but unvetted (risk of manipulation). How do you surface credible evidence first without creating editorial bias?  
Opportunity: Community-vetted evidence (upvoting) with expert flagging signals. Transparent ranking algorithm = trust. Show *why* certain evidence ranks higher.

### Design Opportunities

**1. Real-Time Engagement as Trust Builder**  
Real-time voting updates and geographic patterns changing before users' eyes create transparency in action. Users *see* consensus forming, watch expert votes arrive, observe geographic shifts. This builds trust through visibility.

**2. Expert Profiles as Social Proof**  
Showing expert credentials, domain tags, and public explanations on every vote turns expertise into visible trust signals. A credentialed epidemiologist's vote on health claims = instant credibility. Build expert reputation within the platform.

**3. Geographic Disagreement as Feature**  
When community and experts disagree, or when votes split dramatically by region, that's your strongest transparency moment. Instead of hiding disagreement, make it featured: "This claim splits along geographic/ideological lines—here's why that matters." Users *understand* the claim better through disagreement patterns.

**4. Social Sharing with Context**  
When users share a groundtruth link, they're sharing a specific claim with full transparency view. The link carries proof—evidence, expert credentials, geographic distribution. Sharing becomes credibility transfer.

---

## Core User Experience

### Defining the Experience

The heart of groundtruth is a **single, powerful loop:** User encounters a claim → pastes it into groundtruth → instantly sees multi-factor score with geographic context → drills down into evidence, expert reasoning, and discussion → understands the full transparency landscape → votes, shares, or moves on with confidence.

This is fundamentally different from existing fact-checkers because **transparency is not buried**—it's immediately accessible in layers. Users should never think "I wish I could see the evidence" or "who are the experts here?" The answer is always one tap away.

### Platform Strategy

groundtruth operates as a **web-first platform with mobile-responsive design (PWA).** 

- **Mobile context:** Users voting while scrolling social media, quick claim verification (30 seconds max)
- **Desktop context:** Deep dives into evidence, expert analysis, geographic patterns, writing detailed voting explanations
- **Real-time critical:** Live vote updates and score recalculation as votes arrive
- **Accessibility paramount:** Full transparency architecture must work seamlessly on all devices

### Effortless Interactions

The experience succeeds when users never feel friction accessing deeper understanding:

**1. Claim Entry**
- Copy/paste claim OR search existing claims
- Results appear instantly
- If new claim: created with zero friction, pre-populated with basic info

**2. Score Understanding at a Glance**
- One look reveals consensus: true/false/disputed
- Community vs. expert breakdown visible immediately
- Geographic heat map shows consensus patterns in seconds
- Vote counts transparent (X community, Y expert)

**3. Layered Transparency (Effortless Drilling)**

**Layer 1 - Claim Page (Instant):**
- Unified weighted score (0-100)
- Community score + Expert score (separate)
- Geographic heat map
- Vote counts and timestamps
- Visible tabs: "Evidence" / "Expert Votes" / "Discussion" / "Methodology"

**Layer 2 - Evidence Tab:**
- All submitted evidence listed with metadata
- Sortable: newest, most helpful, credibility score
- Each shows: type (link/PDF/text), who submitted, expert endorsement status
- Expandable preview without leaving page

**Layer 3 - Expert Votes Tab:**
- All expert votes visible with credentials, domain expertise, score cast, written explanation, timestamp
- Filterable by domain (health, politics, science, etc.)
- Expert reputation visible (badges, previous votes)

**Layer 4 - Discussion/Reasoning:**
- How did people arrive at disagreement?
- Geographic patterns explained ("This claim splits left/right by region")
- Expert vs. community divergence explained with context
- Timeline showing score evolution over days/weeks

**Layer 5 - Methodology:**
- Transparent algorithm explanation
- How community and expert votes are weighted
- Criteria for evidence validation
- When/how this claim will be re-scored

**4. Voting**
- One-tap/one-click to cast vote (0-100 scale)
- Optional explanation field (required for experts)
- Confirmation + immediate feedback showing vote impact on live score

**5. Sharing**
- Single-click share button
- Link carries full context (evidence, experts, geographic data)
- Friend sees identical transparent view—credibility transferred

### Critical Success Moments

These are the make-or-break interactions that determine if users trust and return:

**1. First Claim View**
- User pastes claim → score appears in <2 seconds with geographic context
- Tabs show evidence/expert votes are available
- If this is confusing or cluttered, user leaves and never returns
- **Success metric:** User understands the score and sees a path to deeper understanding

**2. Evidence Discovery**
- User taps "Evidence" tab → sees organized, curated evidence (not a dump)
- Evidence is sortable by helpfulness/credibility
- User immediately sees why evidence matters (endorsement by experts, credibility score)
- **Success metric:** User finds evidence more credible than scattered fact-checking links

**3. Expert Credibility Moment**
- User taps expert vote → sees credential, domain expertise, written explanation, timestamp
- Explanation is thoughtful and specific (not generic)
- User immediately understands WHY this expert believes their score
- **Success metric:** User trusts expert perspective and understands their expertise applies

**4. Geographic Insight**
- User sees geographic heat map and has "oh, *that's* why this claim splits" moment
- Explanation contextualizes the pattern (geographic disagreement, ideological split, language barriers)
- User understands that disagreement isn't suspicious—it's informative
- **Success metric:** User gains insight they wouldn't get from single-verdict platforms

**5. Sharing Creates Credibility**
- User shares link → friend sees entire transparent view, not just score
- Friend sees evidence, experts, discussion—full context
- Friend trusts the link because credibility is *visible*, not claimed
- **Success metric:** Sharing becomes trust transfer instead of just "here's a link"

### Experience Principles

These principles guide every UX decision in groundtruth:

**1. Radical Transparency Over Simplification**
Never hide complexity behind a simple score. Show the full landscape. Users trust what they can see. If there's disagreement between community and experts, show it. If geographic patterns are interesting, feature them. Make complexity understandable, not invisible.

**2. Layered Access, Not Fragmented**
Everything a user needs to understand a claim lives in one place, accessible in layers. Never require opening multiple windows, searching different platforms, or cross-referencing sources. Drilling down should be effortless (one tap per layer).

**3. Evidence > Authority**
Don't ask users to trust experts—show them why experts believe what they believe. Every expert vote includes explanation. Every piece of evidence is attributed and rated. Users make informed judgments themselves, not because someone told them to.

**4. Context Defeats Disagreement**
When community and experts disagree, that's the most interesting moment. Surface it. Explain it. Disagreement isn't a bug—it's a feature that shows users the full picture. "Why does this split by geography?" is more valuable than "here's the verdict."

**5. Real-Time Builds Trust**
When users *see* votes arriving in real-time, when they watch scores recalculate as new experts vote, when they observe geographic patterns shift—they believe the platform is alive and fair. Real-time transparency = live credibility.

**6. Frictionless Contribution**
Voting should be easier than scrolling past. Evidence submission should be obvious. Expert applications should be straightforward. Users should *want* to participate because participation feels effortless and valued.

---

## Desired Emotional Response

### Primary Emotional Goals

groundtruth should make users feel **empowered through transparency**. When users encounter a dubious claim and paste it into groundtruth, they should feel:

- **Relief** - "Finally, I don't have to do the detective work myself"
- **Empowerment** - "I can make an informed decision myself, I'm not being told what to think"
- **Clarity** - "I understand this claim now in a way I didn't before"
- **Trust** - "This platform isn't hiding anything from me"

The differentiator: Existing fact-checkers make users feel *"I'm being told what to believe."* groundtruth makes them feel *"I can see everything myself, so I trust this."*

### Emotional Journey Mapping

**First Visit (Discovery → Trust):**
- User arrives skeptical: "Is this actually transparent?"
- Within seconds of seeing evidence, experts, and discussion available: "Oh wow, it really *is* showing everything"
- Transition: Skepticism → Trust

**Core Experience (Uncertainty → Confidence):**
- User encounters claim: "I'm not sure about this"
- User votes and sees their vote impact the score in real-time: "I just contributed to truth-finding"
- Transition: Uncertainty → Confidence

**Returning Users (Habit → Delight):**
- Regular users develop instinct: "I check groundtruth for claims now"
- They discover they enjoy voting and seeing patterns emerge: "I'm part of something bigger"
- Transition: Passive consumption → Active contribution

**Sharing (Burden → Pride):**
- User wants to challenge a friend's claim, normally feels awkward: "How do I explain this without seeming preachy?"
- User shares groundtruth link with full evidence/experts/discussion visible: "Here's proof, judge for yourself"
- Transition: Burden of persuasion → Confidence of sharing credibility

### Micro-Emotions (Critical Success Factors)

**1. Trust Over Skepticism**
Users should feel confident that nothing is hidden. Every interaction whispers transparency: visible methodology, expert credentials shown, evidence attributed with timestamps, scoring algorithm explained.

**2. Empowerment Over Passivity**
Users should feel like they are making informed decisions, not being lectured. They see multiple perspectives, expert reasoning, community consensus—and choose what to believe based on evidence, not authority.

**3. Confidence Over Anxiety**
When users share a groundtruth link, they should feel confident they're not spreading misinformation. The evidence, expert explanations, and geographic context are all there if someone questions them.

**4. Clarity Over Overwhelm**
Yes, there's complexity (community scores, expert votes, weighted algorithms, geographic patterns). But it should *feel* simple because information is organized in digestible layers, not dumped all at once.

**5. Belonging Over Isolation**
When users see real-time voting updates, geographic heatmaps showing global perspective, and expert badges showing credibility—they realize millions of people are wrestling with these same questions. "I'm not crazy—the world sees this too."

**6. Delight Over Routine**
Real-time score updates, surprising expert commentary, geographic patterns that challenge assumptions—these moments should feel *alive*, not mechanical.

### Design Implications

| Emotional Goal | UX Design Approach |
|---|---|
| **Trust** | Radical transparency in UI: show methodology, visible expert credentials with domain tags, timestamps on all content, clear evidence attribution |
| **Empowerment** | Present multiple perspectives without declaring a winner; let data speak louder than authority; show reasoning, not verdicts |
| **Confidence** | Make sharing effortless and context-rich; shared link carries full proof (evidence, experts, discussion); no broken context on share |
| **Clarity** | Aggressive use of visual hierarchy; layered disclosure (score dominates, details on demand); progressive complexity |
| **Belonging** | Real-time voting updates visible to all users; geographic heatmaps showing "global perspective"; expert badges building credibility; vote counts creating scale awareness |
| **Delight** | Surprising expert insights; real-time score shifts when key votes arrive; geographic patterns that reveal ideological splits; moments where disagreement becomes educational |

### Emotional Design Principles

**1. Transparency is the Highest Form of Respect**
Treat users as intelligent. Show them everything. Don't hide complexity—make it understandable. Hidden agenda kills trust; visible methodology builds it.

**2. Evidence > Authority**
Never ask users to trust someone—show them *why* to trust. Every expert vote includes reasoning. Every piece of evidence is attributed and contextualized. Users make decisions based on what they *see*, not who says it.

**3. Disagreement is a Feature**
When community and experts disagree, or when geographic patterns split—that's the most valuable moment. Surface it. Explain it. Users learn more from disagreement than from consensus. Make disagreement feel like insight, not confusion.

**4. Confidence Through Visibility**
Users trust what they can see and understand. Real-time updates, visible voting, transparent algorithms—all of these build confidence that the platform is fair and alive, not manipulating scores behind the scenes.

**5. Participation Over Consumption**
Every interaction (voting, adding evidence, writing explanations) should feel valued and impactful. Seeing your vote update the live score, seeing other users upvote your evidence—these moments of contribution fuel ongoing engagement and deeper emotional connection.

**6. Share Credibility, Not Just Links**
When users share, they're transferring trust. The link should carry proof—full context visible immediately, no need to explain, no broken narrative. Sharing becomes an extension of the user's credibility.

---

## UX Pattern Analysis & Inspiration

### Core Pain Points in Current Fact-Checking

Existing fact-checking platforms suffer from three critical failures:

1. **Opacity** - Single verdict feels biased; users can't see the reasoning or evidence
2. **Bias** - Editorial gatekeeping; one organization decides what gets verified
3. **Delay** - Manual analysis means claims sit unverified for days or weeks before publication
4. **Fragmentation** - Users must check multiple platforms (Snopes, PolitiFact, Community Notes) for different perspectives
5. **Paywalls** - Expertise and access often monetized, limiting reach

groundtruth solves these simultaneously through instant publication, radical transparency, democratic verification, unified platform, and free participation.

### Transferable UX Patterns

**Pattern 1: Real-Time Crowdsourcing (Twitter Community Notes Model)**
Community signals false information immediately; updates are live. We adapt this by starting vote collection instantly—no gatekeeping delay—with score updating live as votes arrive. Users see participation happening in real-time, which builds trust that the system is working.

**Pattern 2: Transparent Voting + Credibility Signals (Reddit, Hacker News)**
Upvotes are visible; user reputation is earned through community trust. We adapt this by making vote counts transparent, showing expert badges with credentials, and building reputation publicly. You see *why* something is trusted, not just *that* it's trusted.

**Pattern 3: Expert Credibility Without Gatekeeping (Stack Overflow)**
Experts earn badges through community validation and write explanations, not verdicts. We adapt this by verifying expert credentials upfront but allowing anyone to contribute; experts explain their reasoning publicly. Authority is earned and visible, not imposed.

**Pattern 4: Geographic & Demographic Context (Google Trends, Election Data)**
Shows how patterns vary by region and demographic. We adapt this with heat maps showing vote distribution by country, featured regional disagreement (not hidden), and educational insights about *why* claims split geographically.

**Pattern 5: Progressive Disclosure (Wikipedia, Detailed Product Pages)**
Summary first, details on demand; complexity revealed in layers. We adapt this with score dominance on first view, evidence/experts/methodology accessible one tap away. Casual users get clarity fast; researchers can dig as deep as they want.

**Pattern 6: Speed Over Perfection (Social Media vs. Traditional News)**
Publish fast and iterate based on feedback; don't wait for perfection. We adapt this by publishing claims and votes immediately, with scores updating in real-time as participation grows. Users see the system working, not gatekeeping.

### Anti-Patterns to Avoid

**1. Opacity Masquerading as Authority**
Traditional fact-checkers hide methodology; users must trust because they say so. Instead: show everything, make algorithm visible, display reasoning transparently, attribute all evidence clearly.

**2. Single-Source Verdict**
One platform declares truth; users distrust because it feels biased. Instead: display multiple perspectives simultaneously, feature disagreement, let users decide based on evidence.

**3. Slow Manual Gatekeeping**
Claims wait days/weeks for expert review; only "important" claims get verified; expertise is paywalled. Instead: instant publication, community verification starts immediately, expert participation incentivized and free.

**4. Fragmentation**
Users must check multiple platforms to see different perspectives. Instead: everything in one place, layered accessibility, no cross-reference needed.

**5. "Trust Us" Design**
Dark patterns hiding information; credibility claims without proof. Instead: radical transparency, visible methodology, live consensus, timestamps everywhere, attribution always clear.

### Design Inspiration Strategy

**What to Adopt (Proven Patterns):**

- **Real-time voting architecture** - Live vote updates visible, score recalculates instantly, creates sense of system actively working
- **Expert credibility signaling** - Visible badges with domain tags, earned through verification, reputation visible but not gatekeeping
- **Geographic heat maps** - Vote distribution by country, consensus patterns at a glance, disagreement becomes insight
- **Progressive disclosure** - Summary layer (score), detail layer (evidence/experts), deep layer (methodology), users choose depth
- **Transparent attribution** - Every vote, evidence, explanation credited with timestamps, traceability builds trust

**What to Adapt (Modify for groundtruth):**

- **Community moderation** - Start with community voting for evidence quality, layer in expert flagging as platform grows, show moderation process
- **Expert involvement** - Simplified credentialing (LinkedIn, research profiles), weighted voting not gatekeeping, make participation easier
- **Voting mechanics** - 0-100 scale vs binary, optional explanation for community/required for experts, confidence levels matter

**What to Avoid:**

- Hidden algorithms (show the weighting)
- Paywalled expertise (incentivize free participation)
- Slow publication (go live instantly)
- Editorial gatekeeping (let data decide)
- Single-source verdicts (display all perspectives)
- Generic trust messaging (let visible systems build trust, not claims)

### Design Strategy Synthesis

These patterns address groundtruth's core positioning:

| Problem | Solution | Pattern |
|---------|----------|---------|
| **Opacity** | Radical Transparency | Show everything, visible methodology |
| **Bias** | Multiple Perspectives | Display all scores simultaneously |
| **Delay** | Real-Time Publication | Instant feedback, live score updates |
| **Fragmentation** | Unified Platform | Everything in one place, layered access |
| **Paywalls** | Democratic Access | Free participation, incentivized contribution |

Every design decision should ask: *"Does this reduce opacity, bias, or delay? Does it build trust through visibility?"*

---

## Design System Foundation

### Design System Choice: Tailwind CSS + Headless Components

**Selected Approach:** Tailwind CSS for utility-first styling, paired with Headless UI components and custom component development for groundtruth-specific visualizations.

### Rationale for Selection

groundtruth's design needs demand flexibility, lightweight performance, and visual distinctiveness. Tailwind CSS was chosen because:

1. **Custom Visualizations Excellence**
   - Flexible foundation for building custom score displays, heat maps, and voting interfaces
   - Progressive disclosure patterns (collapsed/expanded states) easy to implement
   - Real-time updates and animations perform well
   - Geographic heat maps and vote distribution charts fully customizable

2. **Mobile Performance Priority**
   - PWA-critical lightweight bundle size
   - Fast load times essential for on-demand claim verification
   - Utility-first approach = no unused CSS in production
   - Excellent Nuxt 3 integration

3. **Visual Distinctiveness**
   - Complete freedom to build groundtruth's unique brand personality
   - Avoid "all products look the same" problem of opinionated systems
   - Design tokens enable consistent theming while maintaining uniqueness
   - Transparency-focused design (clean, open, spacious) easier to achieve

4. **Development Flexibility**
   - Works seamlessly with Nuxt 3, Vue 3 Composition API, TypeScript
   - Component libraries (Headless UI, Radix) provide accessible foundations
   - Custom components for groundtruth-specific needs (vote buttons, score displays, evidence cards)
   - Strong community support and documentation

5. **Accessibility Built-In**
   - Headless UI components provide semantic HTML and ARIA attributes
   - Utility classes make accessibility patterns (focus states, keyboard navigation) consistent
   - Easy to audit and improve accessibility across the product

### Implementation Approach

**Phase 1 - Foundation Setup:**
- Configure Tailwind CSS in Nuxt 3 project
- Define design tokens: color palette, typography, spacing, shadows
- Create base utilities for groundtruth's specific needs (transparency layers, vote states, score colors)

**Phase 2 - Core Components:**
- Build reusable components using Headless UI as base:
  - Score display card (primary component)
  - Vote button and counter
  - Evidence card with attribution
  - Expert badge and credential display
  - Geographic heat map wrapper
  - Modal/drawer for layered transparency access
  - Tab system for Evidence/Experts/Discussion tabs

**Phase 3 - Complex Interactions:**
- Real-time score update animations
- Progressive disclosure patterns (expand/collapse evidence)
- Geographic visualization integration (Leaflet wrapper)
- Evidence sorting and filtering UI
- Expert application form

**Phase 4 - Admin/Moderator Tools:**
- Dashboard layouts using Tailwind grid
- Content moderation queue interface
- User management tables
- Expert verification workflows

### Customization Strategy

**Design Tokens (Centralized):**
- Color palette: Brand colors for trust (deep blues, clean whites, accent greens for positive signals)
- Typography: Clear hierarchy emphasizing readability (body text 16px+, headlines bold)
- Spacing: Generous whitespace supporting transparency feeling
- Shadows: Subtle depth, not dark/heavy
- Animations: Fast, purposeful (0.2s-0.3s transitions)

**Component Library:**
- Reusable Tailwind component classes (@apply for complex patterns)
- Heading, body text, button variants
- Card, modal, drawer, panel components
- Form inputs with clear focus/error states
- Badge system for expert credentials, vote states

**Brand Voice Through Design:**
- Clarity over decoration (minimal ornamentation)
- Transparency through whitespace and visibility of all information
- Confidence through strong typography and clear hierarchy
- Trust through careful use of color (green = consensus, gray = neutral, orange = disagreement)
- Playfulness through real-time animations and micro-interactions (score updates, vote confirmations)

---

## Core User Experience Definition

### Defining Experience

groundtruth's defining interaction is: **Paste claim → Instantly see multi-factor truth landscape → Understand in 10 seconds.**

This single moment, if perfected, determines product success. When a user pastes a dubious claim and instantly sees multi-perspective consensus with full transparency (evidence, experts, geographic distribution, discussion), they experience the core value: finally understanding the whole picture instead of fragments across multiple platforms.

This is not an incremental improvement—it's a fundamentally different way of accessing truth. Instead of visiting 4 fact-checking sites (Snopes, PolitiFact, Community Notes, news search), users get everything in one interface, instantly, with radical transparency about *why* the score is what it is.

### User Mental Model

When Sarah encounters a dubious claim on social media, her mental model is:

*"Is this true? I need proof, not someone telling me what to believe. I want to see what experts think AND what regular people think. I want to know if this divides people geographically. Then I can decide."*

Currently she solves this by:
1. Googling the claim (slow, scattered results)
2. Checking Snopes (one verdict, feels biased)
3. Checking PolitiFact (different verdict, confusing)
4. Scrolling Twitter (scattered, contradictory comments)
5. Still confused, gives up

**What she WANTS:**
- One place to paste the claim
- Instant answer: true/false/disputed
- See why (evidence, experts, reasoning)
- Understand the landscape globally
- Make her own informed judgment

**Current frustrations:**
- Having to click through multiple sites
- Not understanding *why* fact-checkers disagree
- Feeling lectured instead of informed
- No sense that other people are wrestling with this too
- Slow, gatekept publication (claims wait days for verification)

### Success Criteria

The core experience succeeds when users experience these indicators:

**1. Speed**
- User pastes claim → Score visible in <2 seconds
- No loading spinners or "analyzing..." messaging
- Feel: instant, snappy, responsive, live

**2. Clarity**
- Score dominates the screen (can't miss it)
- One glance tells the story: true/false/disputed
- Visual hierarchy makes it obvious where to look next
- Vote counts visible (creates scale awareness)

**3. Context Available Immediately**
- Tabs for Evidence / Experts / Discussion visible (not hidden)
- Geographic heat map accessible at a glance
- Timestamps showing data is current
- User knows deeper info is one tap away

**4. Trust-Building**
- No hidden algorithms or mystery verdicts
- Visible timestamps (data is current, not outdated)
- Expert credentials shown immediately (not generic "experts agree")
- Evidence attributed with sources
- Methodology transparent (how are votes weighted?)

**5. Emotional Response**
- User feels: "Finally, I can see the whole picture"
- Relief: no more detective work across multiple sites
- Empowerment: I can decide for myself based on evidence
- Confidence: everything's transparent, nothing is hidden

### Novel vs. Established Patterns

The core interaction is **established patterns executed with novel integration:**

**Established Components:**
- Voting mechanism (Reddit, Twitter, prediction markets)
- Multi-perspective display (Wikipedia, news comparison tools)
- Expert credentialing (Stack Overflow, academic platforms)
- Geographic visualization (election maps, Google Trends)

**The Innovation:**
Combining ALL of these seamlessly in ONE interface, instantly, with radical transparency about reasoning. Traditional fact-checkers do ONE thing (provide one verdict). groundtruth shows multiple perspectives simultaneously—not sequentially across different sites.

**User Education Needed:** Minimal. Users already understand voting (like/upvote), expert badges (Stack Overflow), heat maps (election results). We're combining familiar patterns in an elegant, unified interface.

**The Metaphor:** Think of groundtruth like a "control room" where you can see *all* the data streams (community voting, expert input, geographic patterns, evidence) in one place, instead of tuning different channels (Snopes, PolitiFact, Community Notes) separately.

### Experience Mechanics - Step-by-Step

#### 1. Initiation - Getting the Claim In

**What triggers action:**
- User lands on homepage (prominent input visible)
- OR searches existing claim
- OR copy/pastes from clipboard
- OR follows link from friend

**The interface:** Large, inviting input field: "Paste or search a claim..."

**Success:** User immediately knows what to do; no confusion about next step

#### 2. Interaction - Search or Create

**User action:** Pastes claim (e.g., "Joe Biden is 45 years old") or searches

**System response:**
- Smart search identifies similar existing claims (deduplication)
- If exists: Navigate to existing claim page (already has votes, evidence)
- If new: Create claim entry instantly, start voting immediately

**Critical detail:** No delay. Claim goes LIVE instantly. Voting starts NOW. No gatekeeping.

**Success:** Results appear in <2 seconds; system feels alive and responsive

#### 3. Feedback - The Score Reveal

**What appears immediately (visual layout):**

```
┌─────────────────────────────────────────┐
│  Claim: "Joe Biden is 45 years old"     │
├─────────────────────────────────────────┤
│                                          │
│     ✓ TRUE  [████████░░░] 78/100        │
│                                          │
│   Community: 72 | Expert: 84             │
│   3,402 votes | 47 expert votes          │
│                                          │
│   🌍 Global: 78% agree · 15% disagree    │
│       [See geographic distribution]      │
│                                          │
│   ─────────────────────────────────────  │
│   [Evidence]  [Expert Votes] [Discussion]│
│   [Methodology]                          │
│   ─────────────────────────────────────  │
│                                          │
│   [👍 Vote]  [📤 Share]  [💬 Comment]   │
│                                          │
└─────────────────────────────────────────┘
```

**What the user sees instantly:**
- Dominant: Large score and verdict (✓ TRUE in green = clear)
- Sub-layer: Community vs Expert split (build confidence)
- Invite to explore: Tabs showing Evidence/Experts/Discussion/Methodology visible and tappable
- Scale awareness: Vote counts (3,402 votes shows this is real participation)
- Geographic context: Summary statement with tap to expand

**Feedback tells them:** "This claim is verified as true. Here's why (multi-perspective). Want to dig deeper?"

**Success:** User instantly understands the claim and knows they can access full reasoning

#### 4. Completion & Next Action

**After viewing the score, user can:**
- **Casual path:** View score, read top evidence, share link, done (2 minutes)
- **Investigator path:** Dive into evidence tab, read expert explanations, vote themselves, write detailed explanation (15+ minutes)
- **Expert path:** Review community evidence, cast weighted vote with explanation, build reputation (10+ minutes)
- **Return path:** Search another claim or see personalized feed of claims they care about

**The virtuous loop:**
- Casual users keep returning because verification is instant and trustworthy
- Investigators contribute because their work is valued (evidence quality voting)
- Experts participate because they can reach thousands (weighted vote visibility)
- Platform grows because each interaction builds data and trust

**Success:** Every user path feels natural; no friction regardless of engagement depth

### The Integration of Pain Points to Solutions

This core experience directly solves groundtruth's positioning:

| Problem | How Core Experience Solves It |
|---------|------------------------------|
| **Opacity** | Everything visible: score, evidence breakdown, expert credentials, methodology, timestamps |
| **Bias** | Multiple perspectives (community + expert) shown simultaneously, not hidden behind single verdict |
| **Delay** | Claims published instantly; voting starts immediately; no manual gatekeeping; real-time updates |
| **Fragmentation** | Everything in one place; no cross-referencing multiple sites; layered access to all context |
| **Paywalls** | Free participation; no gatekept expertise; community voices matter equally to algorithmic boost |

If we nail this ONE interaction perfectly—*paste → instant multi-perspective clarity → accessible reasoning*—everything else follows naturally. Users return because they trust the system. They share because the link carries credibility. They vote because participation feels valued. They become advocates.

This is the heartbeat of groundtruth.

---

## Visual Design Foundation

### Color System

groundtruth's color system is built around **trust, transparency, and data clarity**. Colors communicate truth intuitively while maintaining accessibility.

**Primary Colors:**

- **Deep Blue (#1F3A93)** - Trust, authority, primary UI elements, confidence signals
- **Clean White (#FFFFFF)** - Openness, clarity, breathing room, honesty
- **Neutral Gray (#6B7280 - #F3F4F6 range)** - Balance, secondary content, structure without noise

**Semantic/Functional Colors:**

- **Green (#10B981)** - ✓ TRUE verdicts, consensus, agreement, positive signals, helpful contributions
- **Orange/Amber (#F59E0B)** - ⚠ DISPUTED, disagreement, caution, mixed signals, debates
- **Red (#EF4444)** - ✗ FALSE, error states, false claims, validation errors
- **Blue (#3B82F6)** - ℹ INFO, expert badges, credentials, trust indicators, helpful signals

**Geographic Visualization (Heat Map Gradient):**

- Deep Blue → Light Gray → Warm Orange/Red
- Visualizes consensus patterns: complete agreement (blue), neutral (gray), complete disagreement (red)
- Enables instant geographic pattern recognition without reading text

**Color Accessibility:**

- All color combinations meet WCAG AAA contrast ratios (7:1 minimum)
- Never rely on color alone (always pair with icons, labels, or patterns)
- Tested for color blindness compatibility
- Light theme primary (dark theme respects `prefers-color-scheme` preference)

**Color Usage by Context:**

| Context | Color | Meaning |
|---------|-------|---------|
| Verdict True | Green | Clear consensus, trustworthy |
| Verdict Disputed | Orange | Mixed signals, nuance required |
| Verdict False | Red | Strong consensus against |
| Expert Vote | Blue | Credentialed perspective |
| Community Vote | Deep Blue | Collective participation |
| Geographic Agreement | Blue to Red | Consensus to disagreement |
| Evidence Quality | Green (upvotes) | Community-validated |
| Error/Alert | Red | Requires attention |
| Success | Green | Action completed |

### Typography System

groundtruth uses **Inter** (or equivalent modern sans-serif) as the primary typeface—designed for screens, highly readable, accessible, and data-friendly.

**Typography Rationale:**

- Modern without being trendy (longevity)
- Excellent on-screen readability (clear character distinction)
- Dyslexia-friendly (thoughtful letterforms)
- Numerals are highly distinctive (critical for displaying scores)
- Free and performant (no licensing constraints)

**Type Scale & Hierarchy:**

```
Heading 1 (h1): 32px, Bold (700), 1.2 line-height
  Used for: Page titles, claim verdicts

Heading 2 (h2): 24px, Semi-Bold (600), 1.3 line-height
  Used for: Section headers (Evidence, Experts, Discussion)

Heading 3 (h3): 20px, Semi-Bold (600), 1.4 line-height
  Used for: Subsection headers, card titles

Body Text: 16px, Regular (400), 1.6 line-height
  Used for: Main content, evidence descriptions, explanations

Small Text: 14px, Regular (400), 1.5 line-height
  Used for: Metadata, captions, voting explanations

Tiny/Caption: 12px, Regular (400), 1.4 line-height
  Used for: Timestamps, helper text, labels
```

**Font Weight Strategy:**

- **Bold (700)**: Page titles, critical information (verdicts), emphasis
- **Semi-Bold (600)**: Headers, important labels, expert credentials
- **Regular (400)**: Body text, explanations, long-form content

**Line Height Strategy:**

- Generous line heights (1.4-1.6) for readability and accessibility
- Dyslexia-friendly (extra whitespace between lines)
- Especially generous (1.6+) for body text and long explanations

**Text Contrast:**

- Primary text on white: Deep Blue or Dark Gray (#111827)
- Secondary text: Medium Gray (#6B7280)
- Helper/caption text: Light Gray (#9CA3AF)
- All combinations meet WCAG AAA (7:1 minimum)

### Spacing & Layout Foundation

groundtruth's layout is **airy and spacious**, reflecting the "transparency" core value. Generous whitespace prevents cognitive overload and signals that nothing is hidden.

**Spacing Scale (8px base unit):**

```
xs: 4px   - Micro interactions, icon spacing
sm: 8px   - Input padding, small gaps, icon margins
md: 16px  - Standard component padding, section gaps
lg: 24px  - Section spacing, card gaps
xl: 32px  - Major section breaks, top-level spacing
```

**Layout Grid:**

- **12-column responsive grid** (standard, flexible)
- **Max content width: 1200px** (prevents stretched reading on ultrawide screens)
- **Generous margins:**
  - Desktop: 24px left/right (breathing room)
  - Tablet: 20px left/right
  - Mobile: 16px left/right

**Component Spacing Relationships:**

- **Cards/Containers:** 16px internal padding (md), 24px gap between cards (lg)
- **Forms/Inputs:** 8px gaps between inputs (sm), 16px label to input (md)
- **Lists:** 12px gap between items (balanced, not too tight)
- **Sections:** 32px top/bottom spacing (xl) to visually separate major sections
- **Buttons:** 8px vertical, 16px horizontal padding (clickable, not cramped)

**Mobile Optimization:**

- Stack vertical (single column) on screens <768px
- Reduce xl spacing to lg on tablet
- Maintain minimum 16px padding on mobile (avoid edge crowding)
- Touch targets minimum 44x44px (accessibility)

**Visual Breathing Room Principle:**

Whitespace is not wasted space—it's *intentional design*. Because groundtruth shows everything (votes, evidence, experts, geographic data), layout must be generous to prevent overwhelm. A user should never feel crowded or confused about information hierarchy.

### Accessibility Considerations

Accessibility is foundational, not an afterthought. Every visual decision supports WCAG 2.1 Level AA compliance (targeting AAA where feasible).

**Color & Contrast:**

- All text combinations minimum 7:1 contrast ratio (WCAG AAA)
- Color not sole indicator (always pair with icons, text, or patterns)
- Tested with color blindness simulation tools
- Color palette chosen for deuteranopia (red-green colorblind) visibility

**Typography Accessibility:**

- Minimum 16px body text (readability for vision impairments)
- Line height 1.5+ (dyslexia-friendly spacing)
- Clear letter distinction (avoid fonts with confusing i/l/1 or o/0)
- Proper semantic heading hierarchy (h1, h2, h3—not jumps)

**Motion & Animation:**

- Respect `prefers-reduced-motion` (disable animations for users with vestibular disorders)
- Animations 0.2-0.3s duration (quick but not disorienting)
- No infinite loops or autoplay (distracting)
- Focus on purposeful micro-interactions (feedback when voting, score updates)

**Interactive Elements:**

- Minimum 44x44px touch targets (mobile accessibility)
- Visible keyboard focus states (not just mouse hover)
- Tab order logical and predictable
- Form labels always associated with inputs
- Error messages clear and instructive

**Visual Hierarchy:**

- Size, weight, and spacing establish priority (not color alone)
- Critical information (verdicts, scores) dominate visually
- Supporting information (timestamps, vote counts) secondary
- Metadata tertiary (always available, never required to understand)

### Design System Implementation in Tailwind

With Tailwind CSS, these principles are implemented as:

**Color Variables (theme.colors):**
```
primary: Deep Blue (#1F3A93)
success: Green (#10B981)
warning: Orange (#F59E0B)
error: Red (#EF4444)
info: Blue (#3B82F6)
gray: Neutral scale
```

**Typography (theme.fontFamily, theme.fontSize):**
```
font-sans: Inter
text-xs: 12px
text-sm: 14px
text-base: 16px
text-lg: 20px
text-xl: 24px
text-2xl: 32px
leading-relaxed: 1.6 (body)
font-bold: 700 (h1)
font-semibold: 600 (h2/h3)
```

**Spacing (theme.spacing):**
```
p-2: 8px (sm)
p-4: 16px (md)
p-6: 24px (lg)
p-8: 32px (xl)
gap-2, gap-4, gap-6, gap-8: Consistent spacing
```

**Accessibility (built into components):**
```
Focus states: ring-2 ring-primary (visible keyboard focus)
High contrast mode: Respected automatically
Reduced motion: Custom media query support
Touch targets: min-h-11 min-w-11 (44x44px)
```

---

## Design Direction Decision

### Chosen Direction: Hybrid (Direction 1 + Direction 4)

**Selected Approach:** Minimalist Clean (Direction 1) for individual claim pages combined with Card-Based Modular (Direction 4) for discovery/homepage layout. This hybrid approach provides:

- **Homepage:** Card-based grid for browsing claims, progressive disclosure, excellent mobile scalability
- **Claim Detail Pages:** Minimalist clean layout with clear verdict, layered information access, tabs for Evidence/Experts/Discussion
- **Philosophy:** "Get in, understand fast, explore as deep as you want"

### Rationale

1. **Instant Clarity on Homepage** - Card grid shows multiple claims at a glance; each card is discoverable and tappable
2. **Focused Detail on Claim Pages** - Minimalist approach keeps verdict dominant while all context remains one tap away
3. **Mobile Excellence** - Cards scale beautifully from mobile (single column) to desktop (multi-column grid)
4. **Radical Transparency** - Clean whitespace and minimal decoration let data speak for itself
5. **Progressive Disclosure** - Both layouts naturally encourage deep dives without overwhelming casual browsers

### Key Visual Decisions

- **Homepage:** Card grid layout showing claim title, current score, vote count, last updated timestamp
- **Claim Detail:** Centered, focused layout with score card top, tabs below for Evidence/Experts/Discussion/Methodology
- **Color Application:** Green/orange/red semantic colors for verdicts; deep blue for primary elements; generous whitespace
- **Typography:** Inter sans-serif, bold headlines, 1.6 line-height for readability, clear hierarchy
- **Spacing:** 8px base unit, generous padding supporting "transparency feels open" philosophy
- **Mobile:** Responsive breakpoints at 768px; mobile-first stacked layout for claim details

### Implementation Foundation

This hybrid approach directly supports groundtruth's core interaction: **"Paste claim → See instant score + list of related claims → Drill into details → Access full transparency (evidence, experts, discussion)"**

The design enables effortless progression from casual discovery to deep investigation without changing layouts—responsive design scales the same components across all devices.

---

## User Journey Flows

### Journey 1: Sarah's Casual Verification (5-10 minutes)

**User Profile:** Sarah, 32, marketing manager. Encounters claims on social media, wants quick verification without research burden.

**The Journey:**

1. **Entry Point:** Sarah sees dubious claim on Twitter ("Global temperature rose 1.1°C since 1880")
2. **Action:** Pastes claim into groundtruth search bar
3. **Instant Moment:** Score appears in <2 seconds
   - Green checkmark: ✓ TRUE
   - Score: 78/100
   - Vote breakdown: "Community: 72 | Expert: 84"
   - Participation: "3,402 community votes | 47 expert votes"
   - Freshness: "Updated 18 hours ago"
4. **User Decision Point:**
   - **Shallow path:** "Good enough, I'll share this" → Clicks Share → Copies link → Shares on Twitter → **Ends** (Success: credible share)
   - **Moderate path:** "Let me see why experts agree" → Taps "Expert Votes" tab → Sees 2-3 expert votes with credentials → Reads one brief explanation (50 words) → Shares with context → **Ends** (Success: informed sharing)
   - **Deep path:** "I want to understand fully" → Taps "Evidence" tab → Browses curated evidence pieces → Reads expert explanations → Maybe votes herself → **Ends** (Success: expert-level understanding)

**Key Success Moments:**
- **Clarity (t=2s):** Score appears instantly, immediate relief ("I can decide now")
- **Trust (t=30s):** Sees expert credentials and brief explanation, builds confidence
- **Action (t=2m):** Share button always visible, frictionless contribution to spreading verified information

**Emotional Arc:** Skepticism → Curiosity → Clarity → Confidence → Advocacy

---

### Journey 2: Marcus's Deep Investigation (30+ minutes)

**User Profile:** Marcus, 45, retired journalist. Wants deep-dive research, contributes quality evidence, seeks recognition for work.

**The Journey:**

1. **Entry Point:** Marcus browses homepage, interested in election integrity claims
2. **Claim Discovery:** Clicks claim card: "2020 election was legitimate" (currently 65/100 DISPUTED)
3. **Claim Detail Analysis:**
   - Reviews score breakdown: Community 62, Expert 68 (slight expert agreement)
   - Sees geographic heatmap showing regional disagreement patterns
   - Reads top evidence pieces
   - Analyzes expert vote explanations
4. **Contribution Decision:** "I have evidence on this topic"
5. **Evidence Submission:**
   - Clicks [SUBMIT EVIDENCE] button
   - Form fields:
     - Evidence type (link, document, text upload)
     - Brief explanation: "Why this evidence matters"
     - Confidence rating (1-5 stars)
   - Evidence posted live immediately
6. **Participation:**
   - Submits vote: 70/100 (shifts claim from DISPUTED toward TRUE)
   - Adds optional explanation: "Here's my analysis..."
   - Sees score recalculate in real-time: 65 → 67/100
   - **Realizes:** His contribution directly impacted the score
7. **Engagement Loop:**
   - Next day: Notification "Your evidence has 12 helpful votes"
   - Returns to see: His evidence now has 45 upvotes
   - Claim score now 72/100 (shifted by 7 points with his input)
   - Expert comment on his evidence ("Great research, well-sourced")
   - **Feels:** Like he contributed to truth-finding

**Key Success Moments:**
- **Discovery:** Finding claims that match his interests (card grid discovery works)
- **Contribution:** Easy evidence submission (3 clear fields, not bloated form)
- **Impact:** Watching score change in real-time (immediate feedback = dopamine)
- **Recognition:** His name attached to evidence, notifications showing impact
- **Return Trigger:** Notifications + reputation building = habit formation

**Emotional Arc:** Curiosity → Research → Empowerment → Recognition → Advocacy

---

### Journey 3: Dr. Elena's Expert Verification (10-15 minutes)

**User Profile:** Dr. Elena, 38, epidemiologist/professor. Wants to contribute expertise at scale, build public credibility, reach thousands with evidence-based analysis.

**The Journey:**

1. **Entry Point:** Email notification: "5 health claims in your domain need expert review"
2. **Expert Dashboard:**
   - Queue of 5 claims requiring expert perspective
   - Each shows: current score, vote count, time since submitted
   - Claims: "Vitamin D prevents COVID", "mRNA vaccines alter DNA", "Long COVID is psychosomatic", etc.
3. **Claim Selection:** Selects "mRNA vaccines alter DNA" (currently 45/100 DISPUTED)
4. **Claim Analysis:**
   - Reviews community votes and reasoning
   - Reviews previous expert votes and explanations
   - Examines evidence pieces
   - Identifies: Major disagreement between community (40/100) and current experts (52/100)
5. **Expert Decision:** "This is clearly FALSE—basic molecular biology"
6. **Expert Vote Submission:**
   - Score: 15/100 (FALSE, with high confidence)
   - Required explanation:
     ```
     "mRNA vaccines cannot alter DNA because mRNA does not integrate 
     into the genome. This is established molecular biology. 
     [Links 2 peer-reviewed studies]"
     ```
   - Domain tags: [Epidemiology] [Public Health] [Molecular Biology]
7. **Expert Vote Posted Live:**
   - Vote visible with:
     - Name: Dr. Elena Martinez, PhD
     - Title: Assistant Professor, Epidemiology
     - Verified expert badge
     - Domain expertise tags
     - Her full explanation visible
     - Link to public profile (127 expert votes, 89% community agreement rate)
   - Score updates: 45 → 38/100 (expert weighted vote applied)
8. **Community Response:**
   - Community upvotes her explanation
   - Notification: "Your expert vote is helping people understand this claim"
9. **Continued Contribution:**
   - Reviews remaining 4 claims
   - Posts 5 expert votes total (30 minutes total)
   - Monthly notification: "Your expertise reached 5,842 people this month"
   - Sees institutional credibility building

**Key Success Moments:**
- **Efficient Entry:** Expert dashboard shows what needs review (no hunting, pre-filtered)
- **Credibility Display:** Her credentials, institution, domain expertise visible on every vote
- **Impact Communication:** "Your vote reached 5,842 people this month"
- **Public Recognition:** Reputation score (89% helpful), public profile, monthly impact
- **Motivation Cycle:** Institutional credibility + helping public + measured impact = expertise motivation

**Emotional Arc:** Expertise → Invitation → Contribution → Impact → Recognition → Purpose

---

## Journey Patterns & Shared Principles

### Pattern 1: Instant Clarity + Progressive Deepening

All three journeys start with the **same critical moment**: instant score visibility and verdict. What differs is how deep users go:

- **Sarah:** Stops at score (success: 2 seconds, immediate decision)
- **Marcus:** Goes deep into evidence (success: 30 minutes, comprehensive understanding)
- **Elena:** Provides expert context (success: 10 minutes, credible contribution)

**One interface serves all engagement levels.** No separate views, no complexity—just progressive information architecture.

### Pattern 2: Real-Time Feedback Builds Engagement

Every action triggers visible, immediate change:

- Vote updates the score **live** (users see impact)
- Evidence gets upvotes **instantly** (contributions feel valued)
- Notifications show **immediate impact** (motivation to return)
- Score evolution chart shows **how thinking changed** (transparency of process)

Users feel like they're affecting truth *in real-time*, not submitting into a black box.

### Pattern 3: Transparent Credibility Over Hidden Algorithms

Rather than obscuring voting mechanics:

- **Vote counts visible** → Proves real participation, not artificial consensus
- **Expert credentials prominent** → Proves expertise applies to claim
- **Geographic distribution shown** → Proves global consensus or regional split
- **Timestamps everywhere** → Proves freshness, not stale analysis
- **Methodology linked** → Shows how scores are calculated

Transparency itself is the differentiator from competitors.

### Pattern 4: Frictionless Contribution

Getting involved requires minimal effort:

- **Sarah:** One click to vote (no form, no commitment)
- **Marcus:** 3-field evidence form (title, link, explanation)
- **Elena:** Required explanation but structured, not essay
- **No approval delays** → Post, then moderation, not gatekeeping

Friction is the enemy of participation.

### Pattern 5: Reputation Through Visible Participation

Users are motivated by seeing their impact:

- **Vote counts** on contributions show community reception
- **Notifications** ("Your evidence has 45 helpful votes") create dopamine loops
- **Public profiles** showing reputation scores and history
- **Monthly impact summaries** ("Reached 5,842 people")
- **Expert badges** and credibility displays on every interaction

Reputation is both internal (personal achievement) and external (social proof).

---

## Core Flow Optimizations

**Speed to Understanding:** Users should understand a claim's status in <2 seconds without friction.

**Depth on Demand:** All context available through tabs/layers, not front-loaded information overload.

**Real-Time Participation:** Voting/evidence posting should show immediate impact on the score (within 1-2 seconds).

**Credential Prominence:** Expert votes and credentials should dominate over generic community votes—weighted voting visible in UI.

**Evidence Curation:** Top evidence (by helpfulness) shows first; users don't wade through low-quality submissions.

**Error Recovery:** If a user makes a mistake (wrong vote, wrong evidence), they can edit/delete easily without friction.

**Mobile Optimization:** All journeys work seamlessly on mobile—stacked layout, touch-friendly buttons, readable text.

---

This specification document captures groundtruth's complete user experience vision, from core emotional goals through detailed interaction flows. Your engineering team now has clear guidance on what users will experience and why every design decision matters.
