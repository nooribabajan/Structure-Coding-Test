IMPERIAL ACADEMY OF EDUCATION — UI ARCHITECTURE MASTER
PERMANENT MERGED BASE FILE — 47-SECTION MASTER + 16-SECTION DETAILED STANDARD + OPERATIONAL MIGRATION STANDARD
Version: 2026-09-02 FINAL — Operational Revision 1.1 — Operational Revision 1.1
Status: AUTHORITATIVE / PERMANENT / MERGED BASE FILE
Scope: Imperial Academy Biology and future IAE academic subjects
Primary practical specimen: Chapter 10 — Lecture 01
Supersedes: All shorter/competing UI-architecture summaries, including the former 16-section summary.

Permanent rule: This is the single operational UI architecture for future IAE composition. The 47-section architecture remains the structural master; the former 16-section standard has been fully absorbed as detailed implementation guidance. Future work must begin from this file, not from a shorter summary or isolated lecture patch.

PART I — 47-SECTION PERMANENT ARCHITECTURE
01. Master Identity & Purpose
This is the single reusable UI architecture for Imperial Academy of Education. It is the permanent starting point for composing future lectures, chapters and academic modules. The architecture exists to make every IAE learning experience feel intentionally part of one Academy while allowing each subject to retain its own academic content.

02. Academic-First Primary Key
Academic quality is the Primary Key; presentation is the Learning Experience. Academic material must first be complete, accurate, logically sequenced and teachable. UI quality can improve comprehension and motivation, but attractive presentation can never compensate for missing or incorrect teaching material.

03. Learning Philosophy & Flow
Approved instructional progression: Learning → Explanation → Visual → Interaction → Practice → Progress → Revision → Mastery Where curriculum requires it, construction may use: Foundation → Concept → Mechanism → Process → Application → Comparison → Integration → Practice → Revision → Test

04. Curriculum & Academic Foundation
Before UI composition, identify official curriculum/chapter scope, textbook teaching material, SLOs/learning outcomes, required concepts and terminology, practicals/exercises/assessment requirements, academic omissions and appropriate international benchmarks. Core curriculum and Academy extension remain distinguishable.

05. Topic-wise Academic Organization
Build a complete inventory of Topic → Subtopic → Concept → Learning Point → Visual Requirement → Practice Requirement → Practical Requirement → Assessment Requirement. Normalize titles, establish topic order and identify integrated/review material before coding.

06. Learning Sequence & Pagination
Topics follow an intentional teaching order. Every learning unit becomes a real lesson/step. Step labels and numbering remain stable. Total steps come from the actual lesson collection rather than duplicated counters. First/last boundaries are explicit.

07. Full-Viewport Global Shell
Every major screen uses 100vw × 100dvh. No unintended body/wrapper margin, destructive horizontal overflow or viewport movement caused by internal content. Content scrolls internally where required.

08. Full-Width Academy Header
The Academy green header is global, not Main Page-only. Its background extends exactly to screen edges. No white/cream strip may appear above, below or beside it because of body margin, wrapper spacing, modal padding or alignment defects.

09. Academy Branding & Header Inner Structure
The header contains Imperial Academy of Education and the IAE Logo in the same visual strip. Green background is full width; brand/logo content may use a centered inner container. Visual Atlas header is the styling reference.

10. Centered Container & Equal Side Spacing
Normal content uses a controlled maximum width and automatic left/right margins. Full-width background/header → centered inner container → equal left/right spacing. Conflicting/default padding must be removed where it creates asymmetry.

11. Global Spacing & Alignment System
Spacing, gaps, card widths, headings and columns remain consistent. Removing an element must not leave an unexplained blank region. Alignment defects are architecture defects, not cosmetic details.

12. Main Page Architecture
Main Page immediately communicates lecture identity and academic purpose. It contains Academy header, lecture identity/title where required, clear topic structure, useful roadmap/outcomes and approved learning-module access. Unnecessary implementation commentary is prohibited.

13. Main Page Commentary Rule
Developer/UI explanation is not student-facing teaching content. Implementation commentary must not consume valuable Main Page/header space. After removal, remaining content pulls upward naturally with no replacement blank gap.

14. Topics Page Architecture
Topics Page is the learner's structural map. Major topics and subtopics are clear, consistently numbered and balanced. Where approved architecture uses two columns, both maintain equivalent spacing and component sizing.

15. Topic & Subtopic View Architecture
Clicking a Topic opens its topic-level teaching view; clicking a Subtopic opens its subtopic-level teaching view. Hierarchy remains visible through title, numbering and navigation.

16. Topic/Subtopic Visual Placement
Where an authoritative visual exists, compact visual thumbnail/entry appears in the approved position and opens the full visual. Established lecture arrangement places the visual thumbnail to the left of the heading block in the LTR visual arrangement while Urdu/English text remains readable.

17. Core Lecture Navigation
Approved navigation includes Start, Previous, current step/total, Next and End where applicable. Boundary states are correct. Go-To/direct-step navigation targets the real lesson collection.

18. Bottom/Sticky Navigation
Approved sticky/natural bottom navigation between learning context and Main/Topics context is preserved unless deliberately revised at master level. It remains reachable on narrow screens.

19. Sidebar & Topic Navigation
Where reference architecture uses sidebar/topic tabs, preserve topic labels, topic-to-step mapping, active state, topic boundaries and separation of tool tabs from academic topic tabs. Dead/missing targets are FAIL conditions.

20. Modal / Full-Screen Function Architecture
Functional screens opened through modal/state mechanisms behave as full-screen pages when required: fixed viewport shell, zero outer padding, full width/height, internal vertical scrolling and hidden uncontrolled horizontal overflow.

21. Fixed Close Control
Full-screen functional screens retain fixed × close control at lower-left. It stays visible while content scrolls and does not move with internal document.

22. Functional Module Architecture
First-class modules: Dictionary, Visual Atlas, Search, Practice, Practical Work, Revision, Mastery, Readiness Test and Examination. They must behave as one Academy system.

23. Visual Atlas — Single Source of Truth
Visual Atlas is the central diagram/visual bank. Authoritative visuals are referenced rather than duplicated. Visual IDs, titles and mappings remain consistent with the central Atlas.

24. Visual Detail & Responsive Containment
Visual detail preserves Academy shell and contains diagrams within available space. WebP/SVG/approved assets scale without clipping or destructive overflow. Broken optional visual must not block core lesson.

25. Dictionary — Learning Tool
Dictionary is a first-class learning aid. Difficult/scientific terms may be interactive. Selecting a linked term opens correct dictionary detail while preserving learning context.

26. Dictionary Data & Link Integrity
Where available, dictionary detail exposes term, Urdu meaning, English definition, identifier, related subtopic and related Visual Atlas visual. Search supports normalization. Automatic term-link decoration must never modify buttons, links, inputs, scripts, styles or other interactive content.

27. Global Search Architecture
Search indexes relevant lesson titles/body content, Dictionary terms and approved searchable resources. Results provide meaningful metadata/snippets and route to correct target.

28. Search State & Mobile Safety
Search safely handles empty/no-result states, partial/fuzzy matching where implemented, repeated opening/closing and narrow screens without corrupting lecture state or stale modal state.

29. Practice System
Practice is distinct from Readiness Test and Examination. Where appropriate: Foundation → Conceptual → Comparison → Application. Questions map to taught concepts; scoring, feedback, retry/reset are correct.

30. Practical Work System
Practical Work is first-class where curriculum requires it. It uses Academy shell/navigation/responsive behavior while preserving practical instructions, observations, variables, procedure and conclusions.

31. Readiness Test System
Readiness Test independently evaluates preparedness. Requires coherent bank, correct answer mapping, safe answer handling, accurate scoring, feedback, explanations, retry/reset and revision recommendations.

32. Examination System
Examination is independent from Practice and Readiness Test. It covers curriculum-relevant and higher-order material, uses defensible answer keys, prevents duplicate scoring, provides feedback and closes/reopens safely.

33. Revision System
Revision identifies concept clusters and points back to actual taught steps. It reinforces weak areas where assessment state exists and must not contradict lecture/assessment content.

34. Mastery System
Mastery is distinct from Revision and reflects actual learning outcomes. Opening Mastery is not evidence of mastery. Learner receives a clear next academic action based on mastery state.

35. Progress & State Engine
Progress represents actual state. Step count equals real lesson count; active topic matches current lesson; progress bars reflect real step; modal interactions preserve state; reset/close/reopen cycles clear stale data.

36. Learning Outcomes & Pedagogy
Learning outcomes are observable and traceable to teaching and assessment. Explanations support understanding, comparison, application and integration. Learning checks occur at meaningful points.

37. Academic Completeness — Zero Missing / Zero Partial
Required curriculum follows Zero Missing / Zero Partial. Definitions, concepts, mechanisms, processes, classifications, examples, comparisons, diagrams, tables, examination points and practical requirements cannot be reduced to misleading fragments.

38. Assessment Quality & Answer Integrity
Objective items require unambiguous wording and defensible keys. Distractors are plausible without being misleading. Difficulty matches taught material. Feedback explains correctness/incorrectness. Untaught dependencies are prohibited unless clearly signposted.

39. Cross-Component Data Integrity
Topic titles, subtopics, steps, Dictionary terms, Visual Atlas IDs, Practice, Readiness, Examination, Revision and Mastery references must agree. Deleted/renamed/nonexistent references are defects.

40. HTML / DOM / Accessibility Integrity
Use valid HTML5, required charset/viewport metadata, unique critical IDs, closed scripts, meaningful headings and semantic controls. Interactive controls need labels, keyboard reachability, valid ARIA references where used and adequate touch targets.

41. JavaScript & Event Logic
Referenced core functions must exist before invocation. Handlers call intended functions. Dynamic rendering targets real containers. Assessment functions use correct banks/keys. Reset functions clear claimed state. Critical syntax/runtime errors are FAIL.

42. Responsive / Mobile Architecture
Desktop and mobile are the same architecture at different widths. No destructive horizontal page scroll. Header stays full width; logo and heading do not overlap; topic columns collapse where necessary; buttons remain touch-friendly; mixed Urdu/English remains legible; modals fit viewport.

43. Security, Robustness & Error Handling
User-entered search/test text must not break DOM. Dynamic insertion avoids unsafe interpolation of untrusted input. Empty/missing optional data, repeated clicks, incomplete assessment input and repeated modal operations fail gracefully.

44. Performance & Runtime Cleanliness
Avoid duplicated UI systems, uncontrolled rendering, unnecessary layout work and obsolete code. Initialization is reliable. Release builds contain no obsolete patches, duplicate headers, dead controls or conflicting legacy metadata.

45. Reference Architecture Inheritance & Change Control
Approved previous lecture/master is the reference architecture for each new implementation. Compare structure, UI, navigation, functionality, behavior, learning flow and shared components. Academic content may differ. Deliberate architectural changes require master-level revision and documentation.

46. Unified Audit & Release Gate
Use INSPECT → DETAIL CHECK → IMPLEMENT → RE-CHECK → AUDIT → PASS → FINALIZE. Any failure triggers FAIL → REPAIR → RE-CHECK → PASS. No “almost pass.” If later repairs may affect earlier domains, re-audit affected domains or restart complete audit where isolation is uncertain.

47. Permanent Base-File / Forever Rule
This document is the PERMANENT OPERATIONAL BASE FILE for future IAE UI composition. It is dated 02 September 2026. Future upgrades retain its authoritative role, update version/date, record material changes, re-check affected implementations and prevent competing architecture standards.

One Academy. One reusable UI architecture. One permanent BASE. Every future lecture inherits it.

PART II — INTEGRATED DETAILED IMPLEMENTATION STANDARD
A. Global Screen Rules
html, body occupy the controlled viewport and have no unintended default margin.
The main shell is 100vw × 100dvh.
Internal pages scroll; the browser viewport must not be used as an accidental page scroller.
Horizontal overflow is hidden at the page/shell level unless a component explicitly requires controlled internal scrolling.
Academy Header is edge-to-edge.
Header height and core spacing are centrally defined rather than reinvented per screen.
Bottom navigation remains part of approved lecture architecture where applicable.
Full-screen function screens use fixed lower-left close control.
B. Canonical Academy Header
Authoritative Visual Atlas reference:

<header class="header">
  <div class="header-inner">
    <div class="brand">
      <h1>Imperial Academy of Education</h1>
      <p>Biology · Central Visual Atlas</p>
    </div>
    <div class="seal">
      <img src="IAE-Logo-Transparent.png" alt="Imperial Academy of Education logo">
    </div>
  </div>
</header>
Copy
Reference CSS baseline:

.header{
  background:linear-gradient(135deg,var(--green),var(--green2));
  color:#fff;
  padding:22px 18px;
  border-bottom:4px solid var(--gold);
}
.header-inner{
  width:100%;
  max-width:1180px;
  margin:0 auto;
  display:flex;
  align-items:center;
  gap:20px;
  box-sizing:border-box;
}
.brand{flex:1;}
.brand h1{
  margin:0;
  color:#f2d46f;
  font-size:clamp(22px,4vw,34px);
  line-height:1.25;
}
.seal{
  width:140px;
  height:95px;
  flex:0 0 auto;
}
.seal img{
  width:100%;
  height:100%;
  object-fit:contain;
}
Copy
Header edge rule
The green strip itself must touch screen borders. Any outer body margin, wrapper margin, unintended padding or modal padding creating white/cream space above/left/right is a defect. Inner brand/logo may be centered, but the green background remains full width.

C. Screens Covered by the Global Header
The same header system applies to:

Main Page
Topics Page
Topic view
Subtopic views
Dictionary
Dictionary detail
Visual Atlas
Visual detail
Practice
Practical Work
Revision
Mastery
Chapter Readiness Test
Examination
Search
Any future functional learning screen
No screen receives a visually unrelated header because it is opened through modal or JavaScript state.

D. Main Page Student-Facing Standard
The Main Page must be immediately understandable. It may contain lecture identity, topic structure, roadmap, outcomes and purposeful module access. It must not contain implementation commentary. Removing commentary must cause remaining content to pull upward naturally.

E. Topics/Subtopics Standard
Topics/Subtopics are navigation and learning structures, not decorative text. Preserve clear hierarchy, numbering, balanced columns where approved, consistent card sizing and available Dictionary/Visual Atlas connections.

F. Visual Design Standard
Presentation must support concentration:

restrained green/gold Academy identity;
comfortable typography and line spacing;
clear cards/tabs;
predictable controls;
visual emphasis where it improves comprehension;
enough density to feel complete without overload.
Avoid unexplained decoration, large empty regions, inconsistent margins, sudden header changes, duplicated controls and crowded paragraphs without hierarchy.

G. Student Experience Test
Every visible element should answer at least one useful question:

What am I learning?
Where am I?
What should I read next?
What does this difficult term mean?
What does this visual show?
What should I do now?
How well did I understand it?
What should I revise?
If an element answers none of these, it should not consume valuable screen space.

H. Canonical Modal / Full-Screen Baseline
Where functional screens use the modal architecture, the shell baseline is:

.modal{
  position:fixed;
  inset:0;
  width:100vw;
  height:100dvh;
  max-width:100vw;
  max-height:100dvh;
  padding:0;
  overflow:hidden;
}
.dialog{
  width:100vw;
  max-width:100vw;
  height:100dvh;
  max-height:100dvh;
  margin:0;
  border-radius:0;
  overflow-y:auto;
  overflow-x:hidden;
  box-sizing:border-box;
}
Copy
The close control remains fixed at lower-left and never moves with internal scrolling.

I. Responsive Standard
Desktop and mobile are one architecture at different widths. Requirements:

no horizontal page overflow;
full-width Academy header;
logo scales without overlap;
topic columns collapse where needed;
touch-friendly controls;
readable text without forced viewport zoom;
internal content scrolling inside the shell.
J. Architecture Inheritance Rule
Future chapters/lectures inherit the architecture and do not independently redesign the shell. Academic content may change in topic count, subtopic count, terminology, visuals, questions and practical activities. The following remain consistent unless an approved master revision changes them:

Academy Header
full-screen shell
page dimensions
navigation behavior
modal behavior
close-button position
Topic/Subtopic hierarchy
Dictionary interaction
Visual Atlas integration
functional-module presentation
responsive rules
spacing/alignment system
K. Page Migration Protocol — Mandatory Operational Workflow
When an existing IAE page/lecture is migrated, rebuilt or carried forward into this architecture, the migration is not a visual copy exercise. It is a controlled preservation-and-verification process.

Mandatory sequence:

1. IDENTIFY → 2. INSPECT → 3. MAP → 4. PRESERVE → 5. MIGRATE → 6. INTEGRATE → 7. VERIFY → 8. AUDIT → 9. PASS/REPAIR → 10. FINALIZE

K1. Identify the reference
Identify the approved reference architecture/master implementation.
Identify the exact source page/file and its version or commit where available.
Identify the academic source material and required scope separately from the UI source.
K2. Inspect before changing
Read the source implementation completely enough to understand its DOM, CSS, JavaScript, navigation, state, assets and data structures.
Identify existing functionality, dependencies, IDs, event handlers, page/step collections and integration points.
Do not begin a redesign before this inspection is complete.
K3. Build a migration map
Map every source component to its destination component before implementation:

Source Page → Target Architecture → Component → Data/ID → Function/Event → Asset/Reference → Verification Check

No required source component may disappear without an explicit architectural or academic reason.

K4. Preserve first; improve only by rule
Preserve approved academic content unless the academic task explicitly requires correction or replacement.
Preserve approved navigation, behavior, functional modules and integration points unless the master architecture requires their correction.
Apply current master corrections centrally rather than creating one-off visual patches.
Do not silently remove working features merely because a new page has fewer visible elements.
K5. Migrate the UI shell
Apply the canonical Academy shell, full-width header, heading/logo arrangement, centered content system, navigation architecture, modal behavior, responsive rules and fixed close control exactly as required by this master.

K6. Integrate dependent systems
Re-connect and verify all relevant:

Dictionary terms and IDs;
Visual Atlas IDs/assets;
Topic/Subtopic mappings;
lesson/step navigation;
Practice, Readiness Test and Examination banks;
Practical Work;
Revision and Mastery references;
Search indexes and targets;
progress/state data.
K7. Verify before calling it complete
Verify both preservation and implementation:

no missing mandatory component;
no broken target;
no duplicate header or obsolete UI layer;
no stale ID/reference;
no navigation mismatch;
no content loss;
no responsive regression;
no runtime/syntax failure.
K8. Audit and release
Migration is complete only after the Unified Master Audit requirements are satisfied. A repair must be re-checked. “Migrated” or “built” is not equivalent to “PASS.”

L. Master Screen Inventory & Coverage Rule
The architecture covers the following screen families. Each future implementation must explicitly account for every applicable screen rather than assuming that only the Main Page and Topics Page need migration.

Screen family	Mandatory architectural coverage
Main Page	Academy Header, lecture identity, roadmap/outcomes, approved module access, navigation
Topics Page	Major Topics, Subtopics, hierarchy, numbering, balanced layout, navigation
Topic View	Topic identity, teaching content, visual connection, navigation
Subtopic View	Subtopic identity, teaching layers, dictionary/visual connections, navigation
Dictionary	Search, term list/detail, related academic references
Dictionary Detail	Term, Urdu meaning, English definition, ID, related subtopic/visual where available
Visual Atlas	Central visual bank, authoritative IDs/assets, Academy shell
Visual Detail	Full visual, responsive containment, related metadata/navigation
Practice	Learning-aligned questions, scoring, feedback, retry/reset
Practical Work	Procedure, variables, observations, conclusions and relevant visuals
Revision	Concept clusters, weak-area references where state exists, return targets
Mastery	Mastery state, outcome interpretation, next academic action
Readiness Test	Independent readiness assessment, scoring, feedback, retry/reset
Examination	Independent examination, answer integrity, scoring and feedback
Search	Lesson/topic/dictionary/resource indexing, safe state, correct routing
Future functional screen	Must inherit the same Academy shell and be added to this inventory when introduced
M. Source Priority & Conflict Resolution Rule
When two references appear to disagree, implementation must follow this precedence unless a deliberate master revision is approved:

1. Explicit user-approved/current task requirement
2. This Permanent Merged Master Architecture
3. The designated approved reference implementation for the specific lecture/chapter
4. Authoritative Visual Atlas / Dictionary source-of-truth data
5. Existing implementation details not contradicted by the above

Conflict rules
Academic source material governs academic truth; UI architecture governs interface structure and behavior.
A newer approved master correction overrides an older local patch.
A central Visual Atlas ID/title mapping overrides an invented or duplicated lecture visual reference.
If two sources conflict and the conflict cannot be safely resolved from the hierarchy above, STOP implementation at that point and mark the item for resolution rather than guessing.
Never silently choose an arbitrary interpretation and present it as verified.
N. No-Assumption / No-Silent-Redesign Rule
The implementation agent must not invent missing architecture rules merely to make a page look complete.

Do not assume an unverified ID, asset path, page count, question count, function name or navigation target.
Do not silently redesign an inherited component because another layout appears visually attractive.
Do not claim a feature exists because its button or label exists; verify its underlying behavior.
Do not claim PASS from static appearance alone when functionality, integration or academic completeness remains unverified.
If a required fact is unavailable, inspect the authoritative source or mark the item unresolved; do not fabricate it.
O. Component Preservation & Allowed-Change Matrix
Every migration separates what must remain stable from what may legitimately change.

Architecturally stable unless master revision is approved
Academy Header and heading/logo treatment;
full-screen shell and viewport behavior;
centered-container and equal-spacing system;
core navigation behavior;
Topic/Subtopic hierarchy;
modal/full-screen behavior;
fixed lower-left close control;
Dictionary interaction model;
Visual Atlas integration model;
functional-module presentation;
responsive/mobile architecture;
shared spacing/alignment rules.
May change according to academic task
lecture title and academic text;
topic/subtopic count and names;
learning sequence when curriculum requires it;
Visual Atlas selections and IDs that genuinely belong to the new content;
Dictionary vocabulary and mappings;
practice/readiness/examination questions;
practical activities;
revision/mastery content;
learning outcomes.
Any change outside the second group is treated as an architectural change and requires the change-control rules in Section 47/Part VI.

P. Completion Contract — What “Done” Means
For IAE work under this architecture, the words built, updated, migrated, fixed or completed do not mean final release status by themselves.

A page is FINAL / PASS / LOCKED only when all applicable stages have been completed:

Architecture conformity → Academic completeness → Functional verification → Cross-component integration → Responsive/mobile verification → Accessibility/usability verification → Runtime/cleanliness verification → 228-checkpoint audit → PASS

If any mandatory stage fails:

FAIL → REPAIR → RE-CHECK → PASS

Q. Autonomous Execution Rule
Once the user gives a sufficiently defined implementation instruction, the implementation should proceed against this master without repeatedly asking for decisions that are already specified here.

The execution agent must:

inspect the authoritative references;
resolve applicable architecture and academic constraints;
implement the required work;
verify the result;
repair discovered failures;
re-check affected areas;
report only the verified status and remaining blockers, if any.
Questions are required only when a genuinely unresolved choice would change academic correctness, authoritative source selection, security, or the approved architecture.

R. Final Pre-Release Self-Check
Before reporting PASS, perform a final internal consistency check across the complete implementation:

Header/heading/logo present and correctly inherited;
all applicable pages/screens covered;
page migration map accounted for;
navigation and step counts are real;
Dictionary and Visual Atlas references resolve;
functional modules actually work;
no duplicate/legacy UI remains;
no missing academic material remains;
no destructive mobile/layout defect remains;
no unresolved mandatory audit finding remains.
Only after this self-check may the 228-checkpoint release gate be declared PASS.

PART III — AUTHORITATIVE REFERENCES
Visual Atlas
Commit: 42f1039cc274ac2fff852e14fc9d4e2f3b90255a
Reference: Academy green full-width strip + centered inner brand/logo.

Chapter 06 Lecture 02 Layout Source of Truth
Preserve layout, UI, navigation, functionality, behavior and topic-tab numbering style. Academic content/tab count may vary; architecture must not drift without authorization.

Chapter 10 Lecture 01
Current practical specimen for the updated centered-container standard: full-width Academy header + centered inner content + equal left/right spacing.

Unified Master Audit
22 domains → 228 mandatory checkpoints → Repair → Re-check → PASS → Proceed. Every checkpoint must be individually verified. All failures must be repaired and re-checked before final PASS/LOCK.

PART IV — 22 AUDIT DOMAINS
Reference Architecture & Structural Conformity
HTML Document Integrity & Semantic Structure
CSS, Layout & Responsive UI
Navigation & Learning Flow
Topic Organization & Academic Sequencing
Academic Content Completeness & Accuracy
Learning Objectives, Outcomes & Pedagogy
Visual Atlas & Diagram System
Dictionary & Terminology System
Search & Findability
Practice System
Readiness Test System
Examination System
Revision & Mastery System
Progress, State & Feedback
JavaScript Functionality & Event Logic
Accessibility & Usability
Mobile, Screen & Responsive Behavior
Cross-Component Integration & Data Consistency
Academic Assessment Quality & Answer Integrity
Security, Robustness & Error Handling
Final Regression, Release & Lock
PART V — FINAL EVIDENCE GATE
 All 228 mandatory checkpoints individually audited.
 All failures repaired.
 Every repair re-checked.
 All 22 domains independently verified PASS.
 Final architecture/reference comparison complete.
 Final functional verification complete.
 Final academic verification complete.
 Final responsive/accessibility verification complete.
 No unresolved mandatory finding remains.
 No unverified mandatory checkpoint remains.
FINAL RESULT: ☐ PASS / LOCKED ☐ FAIL / REPAIR REQUIRED

FAIL is not a stopping point; FAIL triggers REPAIR. REPAIR is not PASS; REPAIR triggers RE-CHECK. Only verified PASS permits progression.

PART VI — PERMANENT CHANGE CONTROL
This file is the sole operational architecture base dated 2026-09-02.
The former 16-section architecture is not a competing standard; its unique implementation rules are incorporated above.
The 47-section architecture remains the numbered structural master.
Future changes must be intentional, documented and propagated rather than introduced as isolated patches.
A material architecture change requires version/date update and re-check of affected implementations.
If a change may affect previously audited domains and impact cannot be confidently isolated, the complete 228-checkpoint audit must be restarted.
No future lecture may silently establish a second architecture standard.
ONE ACADEMY. ONE REUSABLE UI ARCHITECTURE. ONE PERMANENT BASE. EVERY FUTURE LECTURE INHERITS IT.

PART VII — OPERATIONAL COMPOSITION & PAGE MIGRATION PROTOCOL
48. Operational Purpose
This architecture is not only a visual reference. It is the operational specification to be used when composing, migrating, repairing, reviewing and finalizing IAE pages. Future implementation work must follow the rules in this file as executable design/architecture requirements, not as optional suggestions.

49. Standard Page Migration Protocol
When an existing IAE page or lecture is migrated into this architecture, use this sequence:

INSPECT → MAP → PRESERVE → MIGRATE → INTEGRATE → VERIFY → AUDIT → PASS → FINALIZE

49.1 INSPECT
Read the complete source page before changing it.
Identify its academic content, page/step collection, navigation, UI components, functions, assets, IDs and external/internal references.
Identify the approved reference architecture that governs the migration.
Record existing defects before repair.
49.2 MAP
Map the existing implementation into the Master Architecture:

Page → Screen → Topic → Subtopic → Learning Step → Component → Data → Asset → Function → Navigation → State

No major existing component may be discarded merely because it is inconvenient to migrate. Its purpose must first be identified and classified as required, replaceable, obsolete or defective.

49.3 PRESERVE
Academic teaching material is preserved unless an explicit academic revision is authorized.
Existing valid questions, dictionary entries, Visual Atlas mappings, practical content and learning outcomes are preserved and reconnected.
Existing working functionality is not removed without architectural or functional justification.
IDs and references are preserved where they remain authoritative; renamed/replaced identifiers must be deliberately remapped.
49.4 MIGRATE
Apply the Master Architecture to the page:

Academy Header and logo system
Full-viewport shell
Centered content/equal side-spacing system
Topic/Subtopic hierarchy
approved navigation
modal/full-screen behavior
fixed close control
functional modules
responsive behavior
Dictionary and Visual Atlas integration
Migration must produce one coherent architecture, not a mixture of old and new shells.

49.5 INTEGRATE
Reconnect every migrated component to the authoritative data sources and cross-references. Verify that navigation targets, Visual Atlas IDs, Dictionary IDs, question banks, assessment keys, revision links, mastery state and assets point to real targets.

49.6 VERIFY
Before audit, verify:

DOM/HTML integrity
CSS/layout integrity
JavaScript/event integrity
navigation/state behavior
asset/path integrity
academic completeness
responsive/mobile behavior
accessibility/usability
cross-component consistency
49.7 AUDIT
Run the established 22-domain / 228-checkpoint audit. A migration is not complete merely because the page opens or looks correct.

49.8 PASS / FINALIZE
Only a verified PASS permits finalization. Any failure follows:

FAIL → REPAIR → RE-CHECK → PASS

50. Master Screen Inventory & Page Coverage
The following screen classes are governed by this architecture:

Main Page
Topics Page
Topic View
Subtopic View
Core Lecture/Learning Step
Dictionary
Dictionary Word/Detail
Visual Atlas
Visual Detail
Search
Practice
Practical Work
Revision
Mastery
Chapter Readiness Test
Examination
Progress/Result/Feedback screens where applicable
Any future functional learning screen introduced by IAE
Every screen must inherit the Academy identity, approved shell, responsive rules, navigation/state model and functional integration appropriate to its role.

51. Mandatory Academy Identity Component
Every major page/screen must carry the same Academy identity system unless a deliberate master-architecture revision explicitly changes it:

Imperial Academy of Education + IAE Logo + Full-Width Academy Header

The green header background is edge-to-edge. The heading/logo inner alignment may use the controlled centered container. A screen must never lose the Academy identity merely because it is opened through JavaScript, a modal, a functional module or another navigation state.

52. Component Preservation & Variation Matrix
Must remain architecturally consistent
Academy Header and logo placement system
Full-screen shell dimensions
centered-container/equal-spacing system
core navigation behavior
Topic/Subtopic hierarchy
modal/full-screen behavior
fixed close control position
Dictionary interaction model
Visual Atlas integration model
functional-module presentation language
responsive/mobile principles
accessibility expectations
audit/release gate
May vary by academic requirement
lecture title and subject
topic/subtopic count
academic text and examples
learning outcomes
visuals and authoritative Visual Atlas mappings
practice/question counts
practical activities
assessment coverage
revision and mastery content
Variation in academic content must not become an accidental UI redesign.

53. Reference Priority & Conflict Resolution
When sources disagree, apply this priority order:

Current Permanent Master Architecture — UI architecture, shell, shared behavior and change-control rules.
Explicitly approved authoritative reference implementation — for the specific lecture/page being inherited.
Authoritative Visual Atlas / Dictionary source — for visual and terminology identity data.
Approved academic source/curriculum material — for teaching content and assessment requirements.
Current implementation file — useful evidence of existing behavior, but not authority when it conflicts with a higher source.
Older patches, screenshots, temporary fixes or informal examples — lowest priority and never silently authoritative.
If two authoritative sources genuinely conflict and the conflict cannot be resolved from their stated scope, do not invent a solution. Flag the conflict for explicit resolution or use the higher-priority source according to this hierarchy.

54. No-Assumption & No-Silent-Redesign Rule
The implementer must not invent or silently assume:

page/step counts
topic or subtopic IDs
Visual Atlas IDs
Dictionary IDs
asset filenames or paths
question-bank structure
answer keys
navigation targets
missing functions
undocumented UI behavior
replacement academic content
Where evidence exists, use the evidence. Where an implementation decision is explicitly permitted by this architecture, apply the architecture. Where neither exists, identify the uncertainty rather than fabricating a value.

A visual improvement is not permission to change approved behavior. A coding shortcut is not permission to remove an approved component.

55. Single-Architecture Composition Rule
Every future lecture must be composed as one integrated system. Do not combine unrelated legacy headers, competing navigation systems, duplicate modals, parallel CSS shells or one-off screen architectures.

If a legacy component is retained for compatibility, it must be deliberately integrated into the current architecture and must not create a second visual or behavioral standard.

56. Autonomous Execution Contract
When the architecture and authoritative references already determine a decision, implementation may proceed without repeatedly requesting user clarification.

The implementer should independently:

inspect the available authoritative references;
preserve approved architecture;
apply the migration protocol;
repair defects discovered during implementation;
perform required re-checks;
run the applicable audit;
and report only the verified state.
User clarification is required only when a decision cannot be determined safely from the authoritative sources or when it would constitute a new architectural/academic decision outside the existing specification.

57. Completion Definition — “Done” Means PASS
The following do not constitute completion by themselves:

file created
file opens in a browser
page visually resembles the reference
one screen works
code has no obvious syntax error
a partial audit passes
A page is DONE / FINAL only when:

Architecture Conformity + Academic Completeness + Functional Integrity + Cross-Component Integrity + Responsive/Accessibility Verification + 228-Checkpoint Audit = VERIFIED PASS

Until then, the correct state is IN PROGRESS or FAIL / REPAIR REQUIRED.

58. Final Self-Check Before Reporting PASS
Before reporting a final PASS, the implementer must ask internally:

Did I use the correct Master Architecture?
Did I use the correct approved reference implementation?
Is the Academy Header present and structurally correct on every required screen?
Is the logo present and correctly contained?
Is the green header truly full width with no unintended outer strip?
Is the centered content/equal-spacing system correct?
Did I preserve all required academic content?
Did I preserve or correctly reconnect all required functions?
Are all navigation/state targets real?
Are Visual Atlas and Dictionary references valid?
Are responsive/mobile states safe?
Did I remove obsolete/duplicate architecture rather than layering another patch?
Did every failure receive repair and re-check?
Has the applicable 228-checkpoint audit actually passed?
Can every claim of completion be supported by verification evidence?
If any answer is NO or UNVERIFIED, do not report PASS.

59. Operational Evidence Rule
Final status reports must distinguish between:

Implemented — the change was made.
Verified — the change was checked.
Audited — the relevant mandatory audit checkpoints were checked.
PASS / LOCKED — all required verification and audit gates passed.
Never use “final” merely to mean “latest file.” Final means verified PASS under the governing architecture and audit requirements.

PART VIII — FINAL OPERATIONAL LOCK
60. Permanent Operational Contract
This file is the authoritative source for future IAE UI composition, migration, repair, verification and release decisions.

The governing relationship is:

MASTER ARCHITECTURE → REFERENCE IMPLEMENTATION → PAGE MIGRATION/COMPOSITION → INTEGRATION → VERIFICATION → 228-CHECKPOINT AUDIT → PASS → LOCK

No future lecture should require rediscovery of these rules. New work should inherit them directly.

61. Future Architecture Change Rule
If a future requirement genuinely cannot be satisfied within this architecture, do not create a local exception and do not silently patch the lecture. Propose a master-level architecture revision, document the reason, update this file, identify affected screens/lectures, and re-check the affected audit domains before adoption.

62. Permanent Final Statement
This file is the single operational UI architecture for Imperial Academy of Education. It defines the shared Academy identity, page/screen structure, migration method, component preservation rules, source priority, no-assumption discipline, autonomous execution contract, verification standard and final PASS/LOCK gate. Every future IAE lecture inherits this architecture unless a deliberate, documented master-level revision is approved.

ONE ACADEMY. ONE ARCHITECTURE. ONE OPERATIONAL BASE. ONE VERIFIED STANDARD. EVERY FUTURE LECTURE INHERITS IT.
