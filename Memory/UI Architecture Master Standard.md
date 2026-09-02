# Imperial Academy of Education — UI Architecture Master Standard

**Status:** FINAL MASTER UI ARCHITECTURE
**Updated:** 02 September 2026
**Primary specimen:** Chapter 10 — Lecture 01
**Purpose:** One reusable UI system for all future IAE Biology lectures and later subjects.

## 1. Core Principle

**Academic quality is the Primary Key. Presentation is the Learning Experience.**

The lecture must first be academically complete, accurate, logically sequenced and teachable. The UI must then make that material clear, attractive, calm, discoverable and motivating so the student remains engaged rather than overwhelmed.

Learning flow:

**Learning → Explanation → Visual → Interaction → Practice → Progress → Revision → Mastery**

## 2. Global Screen Architecture

Every page/screen uses the same structural shell:

1. Full viewport shell: `100vw × 100dvh`.
2. No unintended outer margin around the screen.
3. Top Academy Header is edge-to-edge: `left:0; right:0; top:0; width:100%`.
4. Header height is centrally defined and reused everywhere.
5. Main content scrolls internally; the viewport itself must not jump or resize unexpectedly.
6. Horizontal overflow is prohibited unless a component explicitly requires controlled internal scrolling.
7. Bottom navigation remains part of the approved lecture architecture where applicable.
8. Close `×` controls for full-screen modal/function screens remain fixed at the lower-left edge.

## 3. Academy Header — Mandatory Global Component

The Academy Header is NOT a Main Page-only component. It is a global component and must appear at the top of every major page/screen.

Required content:

- **Imperial Academy of Education**
- **IAE Logo**

Visual reference: authoritative Visual Atlas header styling.

Reference styling:

```css
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
```

### Edge rule

The green strip itself must touch the screen borders. Any outer `body` margin, wrapper margin, unintended padding, or modal padding that creates white/cream space above, left or right of the strip is a defect.

The inner brand/logo alignment may use a controlled content width, but the **green background must remain full screen width**.

## 4. Pages/Screens Covered by the Global Header

The same Academy Header system applies to:

- Main Page
- Topics Page
- Topic page/view
- Every Subtopic page/view
- Dictionary
- Dictionary word/detail screen
- Visual Atlas
- Visual detail screen
- Practice
- Practical Work
- Revision
- Mastery
- Chapter Readiness Test
- Examination
- Search
- Any future functional learning screen

No screen may receive a visually unrelated header merely because it is opened through a modal or JavaScript state.

## 5. Main Page Standard

The Main Page must be visually clean and immediately understandable.

Required:

- Academy Header at the very top.
- Lecture identity/title below it where required.
- Topic structure presented clearly, normally in balanced columns.
- Functional learning modules presented as purposeful learning tools.
- Existing approved navigation retained unless deliberately changed in a later architecture revision.

### Prohibited Main Page commentary

Do NOT place explanatory implementation commentary such as:

> دونوں Major Topics دو columns میں منظم ہیں۔ ہر subtopic کے لیے بنیادی، معیاری اور Mastery learning layers موجود ہیں، جبکہ Dictionary، Visual Atlas، Practice، Exam، Practical Work، Revision اور Mastery الگ functional modules کے طور پر دستیاب ہیں۔

This is UI commentary, not student-facing teaching content. It must not consume vertical space in the Main Page green/header area.

After removing such commentary, the Main Page content must pull upward naturally. No replacement blank gap is permitted.

## 6. Topics and Subtopics

Topics and Subtopics are navigation/learning structures, not decorative text blocks.

Rules:

- Clear hierarchy.
- Consistent numbering.
- Balanced columns where the approved lecture architecture calls for two columns.
- Same spacing and component sizing across both columns.
- Topic and Subtopic cards/tabs must remain visually consistent.
- Clicking a Topic opens its topic-level teaching view.
- Clicking a Subtopic opens its subtopic-level teaching view.
- Every subtopic must have its relevant dictionary and Visual Atlas connections available where applicable.

## 7. Visual System

Visual Atlas is the single-source diagram bank.

Where a Topic/Subtopic has an authoritative Visual Atlas asset, the lecture interface should show a compact visual thumbnail/visual entry in the approved position and allow the student to open the full visual.

Do not duplicate or invent alternate diagram assets when an authoritative Visual Atlas visual exists.

## 8. Dictionary System

Dictionary is a learning tool, not a separate dead-end page.

Rules:

- Difficult/technical terms in lecture content can be interactive.
- Selecting a linked term opens its dictionary definition/detail.
- Dictionary detail should expose term, Urdu meaning, English definition, identifier, related subtopic and related visual when available.
- Dictionary search remains available.
- Dictionary links must not interfere with buttons, links, inputs, scripts or other interactive controls.

## 9. Functional Learning Modules

The following are first-class learning modules:

- Practice
- Practical Work
- Revision
- Mastery
- Readiness Test
- Examination
- Search
- Visual Atlas
- Dictionary

They must look like parts of one coherent Academy system, not unrelated pop-ups.

## 10. Modal / Full-Screen Function Screens

Functional screens that open through a modal mechanism must still behave as full-screen pages when the approved architecture requires it.

Required shell:

```css
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
```

The fixed lower-left close button remains available and must never move with internal scrolling.

## 11. Responsive Standard

Desktop and mobile are the same architecture at different widths.

Required:

- No horizontal page overflow.
- Header remains full width.
- Logo scales without overlapping the Academy heading.
- Topic columns collapse to one column where screen width requires it.
- Buttons remain touch-friendly.
- Text remains readable without forcing viewport zoom.
- Internal content scrolls inside the screen shell.

## 12. Visual Design Rules

Presentation must support concentration.

Use:

- Strong but restrained hierarchy.
- Consistent green/gold Academy identity.
- Comfortable typography and line spacing.
- Clear cards/tabs.
- Predictable placement of controls.
- Visual emphasis where it improves comprehension.
- Enough density to feel complete, but not so much density that the student becomes visually overloaded.

Avoid:

- unexplained decorative elements,
- large empty regions,
- inconsistent margins between screens,
- sudden changes in header style,
- unnecessary implementation commentary,
- duplicated controls,
- crowded paragraphs without hierarchy.

## 13. Student Experience Rule

Every visible element should answer at least one useful student question:

- What am I learning?
- Where am I?
- What should I read next?
- What does this difficult term mean?
- What does this visual show?
- What should I do now?
- How well did I understand it?
- What should I revise?

If an element answers none of these questions, it should not occupy valuable screen space.

## 14. Architecture Inheritance Rule

Future chapters/lectures inherit the UI architecture; they do not redesign the shell independently.

Academic content may change:

- topic count,
- subtopic count,
- terminology,
- visuals,
- questions,
- practical activities.

The following must remain architecturally consistent unless a deliberate master-architecture revision is approved:

- Academy Header
- full-screen shell
- page dimensions
- navigation behavior
- modal behavior
- close-button position
- Topic/Subtopic hierarchy
- Dictionary interaction
- Visual Atlas integration
- functional-module presentation
- responsive rules
- spacing/alignment system

## 15. Final Quality Gate

Before an architecture-based lecture is finalized:

**Inspect → Detail Check → Implement → Re-check → Audit → PASS → Finalize**

No "almost pass" state exists.

Any failure requires:

**FAIL → REPAIR → RE-CHECK → PASS**

Academic completeness remains mandatory. Beautiful presentation can never compensate for missing or incorrect teaching material.

## 16. Current Master Baseline

Chapter 10 — Lecture 01 is the current practical specimen for this architecture. Its final UI should be used to test the architecture, while the architecture itself remains the reusable standard for subsequent lectures.

The objective is a system in which every future IAE lecture looks intentionally designed as part of the same Academy, while each lecture remains academically strong and visually engaging.
