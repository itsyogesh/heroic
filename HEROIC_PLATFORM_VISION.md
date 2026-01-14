# Heroic: Open Source Full-Stack Learning Platform

> From Zero to Hero - Learn modern full-stack development by building real projects

---

## The Vision

**Heroic** is an open-source, interactive learning platform that teaches modern full-stack web development through project-based learning. Unlike traditional tutorials, learners build a real application (a game library tracker) from scratch while mastering JavaScript, React, and backend development.

### What Makes Heroic Different

| Existing Platforms | Heroic |
|-------------------|--------|
| Outdated curriculum (jQuery, class components) | Modern stack (React 19, TypeScript, Tailwind) |
| Isolated exercises | Build one cohesive project |
| Text-heavy, read and copy | Interactive, edit and run in browser |
| One path fits all | Choose your stack (Prisma OR Mongoose, Clerk OR Better Auth) |
| Closed source or legacy codebase | Open source, built with what we teach |

### The Gap We Fill

- **freeCodeCamp**: Great community, but curriculum feels dated
- **The Odin Project**: Excellent structure, but text-heavy and less interactive
- **Exercism**: Language-focused, not full-stack project-based
- **Codecademy**: Interactive but closed source, freemium model
- **Scrimba**: Video-first, not open source

**Heroic fills the gap**: A modern, open-source, interactive, project-based platform for learning full-stack JavaScript.

---

## Core Principles

### 1. Learn by Building
You don't learn to cook by reading recipes. You learn by cooking. Every concept is taught in the context of building a real application.

### 2. Interactive First
Code runs in the browser. Edit, experiment, break things, fix them. No local setup required to start learning.

### 3. Modern & Relevant
Teach what developers actually use in 2025: React 19, TypeScript, Tailwind, shadcn/ui, TanStack Query, Prisma/Drizzle.

### 4. Choose Your Path
Learn the concepts, then choose your stack. Want PostgreSQL instead of MongoDB? We have a path for that.

### 5. Open Source & Community-Driven
Anyone can contribute lessons, translations, improvements. The community owns the curriculum.

### 6. Built With What We Teach
The platform itself is built with the same stack we teach. It's a living example.

---

## Platform Architecture

### Tech Stack (The Platform Itself)

```
Frontend:
├── Next.js 15 (App Router)
├── React 19
├── TypeScript
├── Tailwind CSS 4
├── shadcn/ui
├── Sandpack (interactive code)
└── TanStack Query

Backend:
├── Next.js API Routes (or separate Express)
├── PostgreSQL + Prisma
├── Better Auth
└── Redis (progress/sessions)

Infrastructure:
├── Vercel (hosting)
├── Neon/Supabase (database)
├── GitHub (content as code)
└── Plausible (privacy-friendly analytics)
```

### Content Architecture

```
heroic/
├── platform/                    # The learning platform itself
│   ├── app/
│   │   ├── (marketing)/        # Landing, about, etc.
│   │   ├── (learning)/         # Learning experience
│   │   │   ├── paths/          # Learning paths
│   │   │   ├── lessons/[id]/   # Individual lessons
│   │   │   └── playground/     # Free-form sandbox
│   │   └── (dashboard)/        # User progress
│   ├── components/
│   │   ├── editor/             # Sandpack wrapper
│   │   ├── lesson/             # Lesson components
│   │   └── progress/           # Progress tracking
│   └── lib/
│       ├── content/            # Content loading
│       └── progress/           # Progress logic
│
├── content/                     # Learning content (MDX)
│   ├── paths/
│   │   ├── foundations/        # JS + HTML/CSS basics
│   │   ├── react/              # React fundamentals
│   │   ├── fullstack/          # Full-stack with Heroic project
│   │   └── advanced/           # Testing, DevOps, etc.
│   ├── guides/                  # Technology guides
│   │   ├── using-prisma/
│   │   ├── using-clerk/
│   │   └── deploying-vercel/
│   └── challenges/              # Standalone coding challenges
│
└── reference/                   # Reference implementations
    ├── heroic-final/           # Complete Heroic app
    ├── heroic-prisma/          # Prisma variation
    └── heroic-nextjs/          # Next.js variation
```

---

## Learning Experience

### The Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEROIC JOURNEY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FOUNDATIONS          REACT             FULL-STACK             │
│  ───────────          ─────             ──────────             │
│  ○ JS Basics          ○ Components      ○ Project Setup        │
│  ○ Functions          ○ State & Props   ○ Styling              │
│  ○ Arrays/Objects     ○ Effects         ○ Routing              │
│  ○ Async/Promises     ○ Forms           ○ Backend Basics       │
│  ○ ES6+ Features      ○ Patterns        ○ Database             │
│       ↓                    ↓            ○ Authentication       │
│       └────────────────────┴───────────→○ API Integration      │
│                                         ○ Data Fetching        │
│                                         ○ Forms & Validation   │
│                                         ○ Polish & Deploy      │
│                                              ↓                 │
│                                         🎉 HERO STATUS         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  CHOOSE YOUR STACK (after Full-Stack)                          │
│  ─────────────────                                             │
│  □ MongoDB → PostgreSQL/Prisma                                 │
│  □ Better Auth → Clerk                                         │
│  □ Vite React → Next.js                                        │
│  □ Express → Hono                                              │
│  □ Vercel → Railway/Fly.io                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Lesson Structure

Each lesson follows this pattern:

```
┌──────────────────────────────────────────────────────────────┐
│  LESSON: useState - Managing Component State                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  📍 You are here: React → State & Props → useState          │
│  ⏱️ ~15 minutes                                              │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  CONCEPT                                               │ │
│  │  State lets components "remember" information          │ │
│  │  between renders, like user input or API data.        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  INTERACTIVE EXAMPLE                    [Reset] [Run]  │ │
│  │  ┌─────────────────────┬──────────────────────────┐   │ │
│  │  │ function Counter() {│  ┌──────────────────┐    │   │ │
│  │  │   const [count, set │  │                  │    │   │ │
│  │  │   Count] = useState │  │  Count: 0        │    │   │ │
│  │  │   (0);              │  │  [+] [-]         │    │   │ │
│  │  │   return (...)      │  │                  │    │   │ │
│  │  │ }                   │  └──────────────────┘    │   │ │
│  │  └─────────────────────┴──────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  🎯 TRY IT: Add a "Reset" button that sets count to 0  │ │
│  │  [Show Hint] [Show Solution] [Mark Complete]           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  💡 IN THE HEROIC PROJECT                              │ │
│  │  We'll use useState to track which games are in       │ │
│  │  the user's library and their play status.            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [← Previous: Props]                    [Next: useEffect →] │
└──────────────────────────────────────────────────────────────┘
```

### Gamification Elements

| Element | Implementation |
|---------|----------------|
| **Progress Bar** | Visual journey through each path |
| **XP Points** | Earned for completing lessons and challenges |
| **Badges** | "React Rookie", "API Architect", "Deploy Master" |
| **Streaks** | Daily learning streak counter |
| **Milestones** | "Built your first component", "Connected to database" |
| **Hero Level** | Beginner → Apprentice → Developer → Hero |

### Progress Tracking

```typescript
interface UserProgress {
  id: string

  // Path progress
  completedLessons: string[]      // Lesson IDs
  currentPath: string             // Current learning path
  currentLesson: string           // Where they left off

  // Gamification
  xp: number
  level: 'beginner' | 'apprentice' | 'developer' | 'hero'
  badges: Badge[]
  streak: {
    current: number
    longest: number
    lastActivity: Date
  }

  // Time tracking
  totalTimeSpent: number          // Minutes
  lessonsThisWeek: number

  // Code snapshots (optional)
  savedCode: Record<string, string>  // Lesson ID → user's code
}
```

---

## Content Types

### 1. Lessons (Core Learning)

Interactive lessons with explanations, code editors, and mini-challenges.

```mdx
---
id: react-usestate
title: "useState - Managing Component State"
path: react
section: state-and-props
order: 1
duration: 15
xp: 50
prerequisites: [react-components, react-props]
---

# useState - Managing Component State

<Concept>
State lets components "remember" information between renders.
</Concept>

<InteractiveCode
  template="react"
  files={{
    '/App.js': starterCode,
  }}
  solution={solutionCode}
/>

<Challenge>
Add a "Reset" button that sets the count back to 0.
</Challenge>

<InHeroic>
We'll use useState to track which games are in the user's library.
</InHeroic>
```

### 2. Project Checkpoints

Guided sections where learners build parts of Heroic.

```mdx
---
id: heroic-game-card
title: "Building the Game Card Component"
path: fullstack
section: styling
order: 2
duration: 30
xp: 100
starterBranch: checkpoint-2-start
solutionBranch: checkpoint-2-complete
---

# Building the Game Card Component

<ProjectContext>
Every game in our library needs a card to display its cover,
title, and status. Let's build this reusable component.
</ProjectContext>

<StarterCode branch="checkpoint-2-start" />

<Steps>
1. Create the GameCard component structure
2. Add Tailwind styling
3. Handle the cover image
4. Display the game status badge
</Steps>

<InteractiveCode
  template="react-ts"
  files={gameCardFiles}
/>

<Checkpoint>
Your game card should now display the cover image, title,
and a colored badge showing the game's status.
</Checkpoint>
```

### 3. Technology Guides

Standalone guides for using different technologies.

```mdx
---
id: guide-prisma
title: "Using PostgreSQL with Prisma"
type: guide
category: database
duration: 45
prerequisites: [fullstack-database]
---

# Using PostgreSQL with Prisma

<GuideIntro>
This guide shows how to swap MongoDB/Mongoose for PostgreSQL/Prisma
in your Heroic project. You'll learn when to choose SQL vs NoSQL
and how Prisma's type generation improves developer experience.
</GuideIntro>

<WhenToUse>
- You need complex relationships between data
- You want type-safe database queries
- You're deploying to platforms with great Postgres support
</WhenToUse>

...
```

### 4. Coding Challenges

Standalone exercises to practice specific skills.

```mdx
---
id: challenge-array-methods
title: "Array Method Olympics"
difficulty: medium
xp: 75
topics: [javascript, arrays]
---

# Array Method Olympics

<ChallengeDescription>
Given an array of game objects, use array methods to:
1. Filter to only completed games
2. Sort by rating (highest first)
3. Map to just the titles
4. Find the total hours played
</ChallengeDescription>

<InteractiveChallenge
  starterCode={starterCode}
  tests={testCases}
  hints={hints}
  solution={solution}
/>
```

---

## Open Source Strategy

### Repository Structure

```
github.com/heroicdev/
├── heroic                    # Main platform (Next.js app)
├── heroic-content            # Learning content (MDX)
├── heroic-reference          # Reference implementations
├── heroic-challenges         # Community challenges
└── heroic-translations       # i18n content
```

### Contribution Types

| Contribution | Difficulty | Impact |
|--------------|------------|--------|
| Fix typos/bugs | Easy | Quick wins |
| Add challenges | Medium | Expands practice |
| Improve explanations | Medium | Better learning |
| Add translations | Medium | Global reach |
| New technology guides | Hard | More paths |
| New learning paths | Hard | Major expansion |
| Platform features | Hard | Core improvement |

### Content as Code

All content lives in MDX files in the `heroic-content` repo:
- Version controlled
- PR-based review
- Community contributions
- Automatic deployment on merge

---

## Monetization (Optional, Future)

Heroic is **free and open source**. Potential sustainability models:

| Model | Description |
|-------|-------------|
| **Donations** | GitHub Sponsors, Open Collective |
| **Pro Features** | Progress sync, certificates (platform stays free) |
| **Corporate Training** | White-label for companies |
| **Swag** | Heroic merchandise |

The core learning experience remains **100% free**.

---

## Development Roadmap

### Phase 1: Foundation (Months 1-2)
- [ ] Platform MVP (Next.js + basic auth)
- [ ] Sandpack integration
- [ ] First 10 lessons (JS basics)
- [ ] Basic progress tracking (localStorage)
- [ ] Deploy to heroic.dev (or similar)

### Phase 2: Core Content (Months 3-4)
- [ ] Complete Foundations path
- [ ] Complete React path
- [ ] User accounts + progress sync
- [ ] Basic gamification (XP, streaks)

### Phase 3: Full Stack (Months 5-6)
- [ ] Complete Full-Stack path
- [ ] Heroic project checkpoints
- [ ] First technology guides
- [ ] Badges and milestones

### Phase 4: Community (Months 7+)
- [ ] Community challenges
- [ ] Contribution guidelines
- [ ] Translations infrastructure
- [ ] More technology guides
- [ ] Advanced paths

---

## Success Metrics

### Platform Health
- Monthly active learners
- Lesson completion rates
- Time spent learning
- Return visitor rate

### Community Health
- GitHub stars
- Contributors count
- PRs merged
- Discord/community activity

### Learning Outcomes
- Users who complete paths
- Projects deployed
- Jobs landed (self-reported)

---

## Why This Aligns With Your Goals

| Your Goal | How Heroic Helps |
|-----------|------------------|
| **Founder identity** | You're building a product, not writing blog posts |
| **Personal brand** | "Creator of Heroic" is a strong identity |
| **Teaching** | Teaching at scale through the platform |
| **Time constraints** | Community can contribute; doesn't all fall on you |
| **Impact** | Could help thousands learn to code |

---

## Competitive Positioning

```
                    Interactive ↑
                                │
              Codecademy   ★ HEROIC
                    ●          │
                               │
    Scrimba ●                  │
                               │
    ───────────────────────────┼───────────────────────→ Modern Stack
                               │
           freeCodeCamp ●      │
                               │
    The Odin Project ●         │
                               │
                    Traditional ↓
```

Heroic occupies the "modern + interactive" quadrant that's currently empty in the open-source space.

---

## Next Steps

1. **Validate the idea** - Share the vision, gauge interest
2. **Secure domain** - heroic.dev, heroicdev.com, or similar
3. **Build MVP** - Platform with 5-10 lessons
4. **Soft launch** - Share with small group, get feedback
5. **Iterate** - Improve based on feedback
6. **Public launch** - Announce broadly

---

*Heroic: Where everyone can become a full-stack hero.*
