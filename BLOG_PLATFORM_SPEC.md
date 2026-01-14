# yogesh.fyi - Technical Specification

## Overview

A modern developer blog and learning platform built with Next.js 15, MDX, and interactive code playgrounds.

---

## Tech Stack

```
Framework:      Next.js 15 (App Router)
Language:       TypeScript
Content:        MDX (with @next/mdx or Contentlayer/Velite)
Styling:        Tailwind CSS 4 + shadcn/ui
Code Highlight: Shiki (via rehype-pretty-code)
Code Sandbox:   Sandpack (CodeSandbox)
Deployment:     Vercel
Analytics:      Vercel Analytics / Plausible
Comments:       Giscus (GitHub Discussions)
Search:         Pagefind or Algolia (future)
```

---

## Project Structure

```
yogesh.fyi/
├── app/
│   ├── (marketing)/              # Marketing pages group
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx        # About
│   │   └── layout.tsx
│   ├── (content)/                # Content pages group
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   ├── learn/
│   │   │   ├── page.tsx          # Learning tracks
│   │   │   └── [track]/
│   │   │       ├── page.tsx      # Track overview
│   │   │       └── [part]/page.tsx # Tutorial part
│   │   ├── guides/
│   │   │   ├── page.tsx          # Guides listing
│   │   │   └── [slug]/page.tsx   # Guide page
│   │   └── layout.tsx            # Content layout with TOC
│   ├── api/
│   │   └── og/route.tsx          # OG image generation
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── not-found.tsx             # 404 page
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── mdx/                      # MDX components
│   │   ├── CodeBlock.tsx         # Syntax highlighted code
│   │   ├── Playground.tsx        # Sandpack wrapper
│   │   ├── Callout.tsx           # Tip/Warning/Note boxes
│   │   ├── Steps.tsx             # Step-by-step instructions
│   │   └── ExerciseBlock.tsx     # Exercise with solution
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx           # Tutorial sidebar
│   │   └── TableOfContents.tsx   # Auto-generated TOC
│   └── blog/
│       ├── PostCard.tsx
│       ├── SeriesNav.tsx         # Prev/Next navigation
│       └── ProgressTracker.tsx   # Completion tracking
├── content/
│   ├── blog/                     # Blog posts (.mdx)
│   ├── learn/                    # Tutorial content (.mdx)
│   │   ├── javascript-essentials/
│   │   │   ├── _meta.json        # Track metadata
│   │   │   ├── 01-your-first-javascript.mdx
│   │   │   ├── 02-making-decisions.mdx
│   │   │   └── ...
│   │   ├── react-fundamentals/
│   │   └── full-stack-heroic/
│   └── guides/                   # Standalone guides (.mdx)
├── lib/
│   ├── content.ts                # Content fetching utilities
│   ├── mdx.ts                    # MDX configuration
│   └── utils.ts                  # General utilities
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── code-theme.css            # Code highlighting theme
├── contentlayer.config.ts        # Content schema (if using Contentlayer)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Core Components

### 1. Code Block with Shiki

```tsx
// components/mdx/CodeBlock.tsx
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  lang: string
  filename?: string
  highlight?: string // e.g., "1,3-5"
  showLineNumbers?: boolean
}

export async function CodeBlock({
  code,
  lang,
  filename,
  highlight,
  showLineNumbers = true,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    transformers: [
      // Add line highlighting, line numbers, etc.
    ],
  })

  return (
    <div className="code-block">
      {filename && (
        <div className="code-filename">{filename}</div>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <CopyButton code={code} />
    </div>
  )
}
```

### 2. Interactive Playground with Sandpack

```tsx
// components/mdx/Playground.tsx
'use client'

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'

interface PlaygroundProps {
  files: Record<string, string>
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts'
  showConsole?: boolean
  editorHeight?: number
}

export function Playground({
  files,
  template = 'react-ts',
  showConsole = false,
  editorHeight = 300,
}: PlaygroundProps) {
  return (
    <SandpackProvider
      template={template}
      files={files}
      theme="auto" // Respects system theme
      options={{
        showNavigator: false,
        showTabs: Object.keys(files).length > 1,
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor
          style={{ height: editorHeight }}
          showLineNumbers
          showInlineErrors
        />
        <SandpackPreview style={{ height: editorHeight }} />
      </SandpackLayout>
      {showConsole && <SandpackConsole />}
    </SandpackProvider>
  )
}
```

### 3. Callout Component

```tsx
// components/mdx/Callout.tsx
import { cn } from '@/lib/utils'

type CalloutType = 'tip' | 'warning' | 'note' | 'key' | 'troubleshoot'

const icons: Record<CalloutType, string> = {
  tip: '💡',
  warning: '⚠️',
  note: '📝',
  key: '🎯',
  troubleshoot: '🔧',
}

const styles: Record<CalloutType, string> = {
  tip: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900',
  warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900',
  note: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900',
  key: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-900',
  troubleshoot: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900',
}

interface CalloutProps {
  type: CalloutType
  title?: string
  children: React.ReactNode
}

export function Callout({ type, title, children }: CalloutProps) {
  return (
    <div className={cn('p-4 rounded-lg border my-4', styles[type])}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{icons[type]}</span>
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}
```

### 4. Exercise Block with Solution

```tsx
// components/mdx/ExerciseBlock.tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Difficulty = 'easy' | 'medium' | 'hard'

const difficultyIcons: Record<Difficulty, string> = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴',
}

interface ExerciseBlockProps {
  title: string
  difficulty: Difficulty
  children: React.ReactNode
  hints?: React.ReactNode[]
  solution?: React.ReactNode
}

export function ExerciseBlock({
  title,
  difficulty,
  children,
  hints = [],
  solution,
}: ExerciseBlockProps) {
  const [showSolution, setShowSolution] = useState(false)
  const [visibleHints, setVisibleHints] = useState<number[]>([])

  return (
    <div className="border rounded-lg p-4 my-6 bg-card">
      <div className="flex items-center gap-2 mb-3">
        <span>{difficultyIcons[difficulty]}</span>
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs text-muted-foreground capitalize">
          {difficulty}
        </span>
      </div>

      <div className="prose dark:prose-invert">{children}</div>

      {hints.length > 0 && (
        <div className="mt-4 space-y-2">
          {hints.map((hint, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                💡 Hint {i + 1}
              </summary>
              <div className="mt-2 pl-4 text-sm">{hint}</div>
            </details>
          ))}
        </div>
      )}

      {solution && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium text-primary">
            View Solution
          </summary>
          <div className="mt-2 p-4 bg-muted rounded">{solution}</div>
        </details>
      )}
    </div>
  )
}
```

### 5. Series Navigation

```tsx
// components/blog/SeriesNav.tsx
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SeriesNavProps {
  series: {
    title: string
    slug: string
    parts: { title: string; slug: string }[]
    currentIndex: number
  }
}

export function SeriesNav({ series }: SeriesNavProps) {
  const { parts, currentIndex } = series
  const prev = currentIndex > 0 ? parts[currentIndex - 1] : null
  const next = currentIndex < parts.length - 1 ? parts[currentIndex + 1] : null

  return (
    <nav className="flex justify-between items-center py-6 border-t mt-12">
      {prev ? (
        <Link
          href={`/learn/${series.slug}/${prev.slug}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft size={16} />
          <div>
            <div className="text-xs">Previous</div>
            <div className="font-medium">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/learn/${series.slug}/${next.slug}`}
          className="flex items-center gap-2 text-right text-muted-foreground hover:text-foreground"
        >
          <div>
            <div className="text-xs">Next</div>
            <div className="font-medium">{next.title}</div>
          </div>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
```

---

## Content Schema (with Contentlayer/Velite)

```ts
// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Tutorial = defineDocumentType(() => ({
  name: 'Tutorial',
  filePathPattern: 'learn/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    track: { type: 'string', required: true }, // e.g., "javascript-essentials"
    part: { type: 'number', required: true },
    published: { type: 'boolean', default: false },
    publishedAt: { type: 'date' },
    prerequisites: { type: 'list', of: { type: 'string' } },
    outcomes: { type: 'list', of: { type: 'string' } },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').pop(),
    },
    readingTime: {
      type: 'number',
      resolve: (doc) => Math.ceil(doc.body.raw.split(/\s+/).length / 200),
    },
  },
}))

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    image: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Tutorial, BlogPost],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      // rehype-pretty-code for syntax highlighting
    ],
  },
})
```

---

## Example MDX Content

```mdx
---
title: "Your First JavaScript"
description: "Learn variables, console.log, and run your first JavaScript program"
track: "javascript-essentials"
part: 1
published: true
publishedAt: 2025-01-20
prerequisites: []
outcomes:
  - Understand what JavaScript is
  - Create and use variables
  - Output data with console.log
  - Run JavaScript in the browser
---

# Your First JavaScript

> **What you'll learn**: How to write and run JavaScript code, create variables, and output data.

<Callout type="note">
This is the first part of the JavaScript Essentials track. No prior programming experience needed!
</Callout>

## What is JavaScript?

JavaScript is the programming language of the web. Every website you've ever visited uses JavaScript to add interactivity.

## Your First Code

Let's write some JavaScript! Try editing the code below:

<Playground
  files={{
    '/index.js': `// This is a comment - the computer ignores it
const message = "Hello, World!"
console.log(message)

// Try changing the message!`,
  }}
  template="vanilla"
  showConsole={true}
/>

### What's Happening Here

Let's break down that code:

```js filename="index.js" showLineNumbers
const message = "Hello, World!"  // [!code highlight]
console.log(message)
```

1. **`const`** - Declares a variable that won't change
2. **`message`** - The name we're giving our variable
3. **`"Hello, World!"`** - The text (string) we're storing
4. **`console.log()`** - Outputs the value to the console

## Checkpoint ✅

By completing this part, you should now be able to:

- [ ] Explain what JavaScript is used for
- [ ] Create variables with `const`
- [ ] Output values with `console.log()`
- [ ] Run JavaScript code in a browser or playground

## Exercises

<ExerciseBlock
  title="Create a Greeting"
  difficulty="easy"
  hints={[
    "Use const to create a variable called `name`",
    "Use + to combine strings: `'Hello, ' + name`"
  ]}
  solution={
    <Playground
      files={{
        '/index.js': `const name = "Yogesh"
const greeting = "Hello, " + name + "!"
console.log(greeting)`
      }}
      template="vanilla"
      showConsole={true}
    />
  }
>

Create two variables: one for your name and one for a greeting that includes your name. Output the greeting to the console.

</ExerciseBlock>

---

**📖 Full code for this part**: [GitHub](https://github.com/itsyogesh/heroic-tutorials/tree/part-1)

<SeriesNav
  series={{
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    parts: [
      { title: "Your First JavaScript", slug: "01-your-first-javascript" },
      { title: "Making Decisions", slug: "02-making-decisions" },
    ],
    currentIndex: 0
  }}
/>
```

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@codesandbox/sandpack-react": "^2.19.0",
    "shiki": "^1.0.0",
    "rehype-pretty-code": "^0.13.0",
    "contentlayer": "^0.3.4",
    "next-contentlayer": "^0.3.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.400.0",
    "@giscus/react": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Development Phases

### Phase 1: Foundation (Week 1)
- [ ] Next.js 15 setup with App Router
- [ ] Tailwind CSS + shadcn/ui
- [ ] Basic layout (header, footer)
- [ ] Home page

### Phase 2: Content System (Week 2)
- [ ] MDX setup with Contentlayer
- [ ] Shiki syntax highlighting
- [ ] Blog listing and post pages
- [ ] Table of contents component

### Phase 3: Learning Features (Week 3)
- [ ] Sandpack integration
- [ ] Callout components
- [ ] Exercise blocks
- [ ] Series navigation

### Phase 4: Polish (Week 4)
- [ ] Dark mode
- [ ] SEO optimization
- [ ] OG image generation
- [ ] Giscus comments
- [ ] Analytics

### Phase 5: Content (Ongoing)
- [ ] Write Track 1: JavaScript Essentials
- [ ] Write Track 2: React Fundamentals
- [ ] Write Track 3: Building Heroic

---

## Design Inspiration

- **Code blocks**: GitHub style with line numbers
- **Colors**: Clean, accessible, professional
- **Typography**: Inter for UI, JetBrains Mono for code
- **Spacing**: Generous whitespace for readability
- **Mobile**: Fully responsive, code blocks scroll horizontally

---

*This spec provides the technical foundation for building yogesh.fyi as a world-class developer education platform.*
