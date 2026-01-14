# Modern React Tutorial Series: Building Heroic

> A comprehensive tutorial series on building a modern React application - "Goodreads for Video Games"

## Series Overview

This tutorial series takes you from zero to a production-ready React application using the latest 2025 best practices. We'll rebuild **Heroic** - a game collection tracking app - using modern technologies including React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, and Better Auth.

---

## Part 1: Project Setup & Modern React Foundations

**Topics Covered:**
- Why Vite over Create React App (speed, ES modules, HMR)
- Setting up a React + TypeScript project with Vite
- Project structure best practices for 2025
- ESLint & Prettier configuration
- Environment variables with `.env` files

**What You'll Build:**
- A properly configured React + TypeScript + Vite project
- Organized folder structure following modern conventions

**Key Commands:**
```bash
npm create vite@latest heroic-modern -- --template react-ts
cd heroic-modern
npm install
```

**Modern Project Structure:**
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── shared/         # Custom shared components
├── features/           # Feature-based modules
│   ├── auth/           # Authentication feature
│   ├── games/          # Games feature
│   └── user/           # User profile feature
├── hooks/              # Custom React hooks
├── lib/                # Utility functions & configurations
├── pages/              # Page components (routes)
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── App.tsx
└── main.tsx
```

---

## Part 2: Tailwind CSS & shadcn/ui Setup

**Topics Covered:**
- Introduction to Tailwind CSS 4.x
- What is shadcn/ui and why it's different (copy-own vs npm dependency)
- Setting up Tailwind CSS with Vite
- Installing and configuring shadcn/ui
- Understanding Radix UI primitives
- Theme customization and CSS variables

**What You'll Build:**
- Fully configured Tailwind CSS
- shadcn/ui with custom theme
- Basic layout components (Header, Footer, Layout)

**Key Concepts:**
```typescript
// shadcn/ui - You OWN the components
// Instead of: import { Button } from 'some-ui-library'
// You copy the source code and customize freely:
import { Button } from '@/components/ui/button'
```

**Installation Steps:**
```bash
# Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Initialize shadcn/ui
npx shadcn@latest init

# Add components as needed
npx shadcn@latest add button card form input
```

---

## Part 3: React Router & Navigation

**Topics Covered:**
- React Router v7 (latest) setup
- File-based vs configuration-based routing
- Protected routes and authentication guards
- Layout patterns with Outlet
- Navigation with Link and useNavigate

**What You'll Build:**
- Complete routing structure for Heroic
- Public routes: Home, Login, Register
- Protected routes: Dashboard, Games, Add Game, Profile
- 404 Not Found page

**Route Structure:**
```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'games', element: <GamesPage /> },
          { path: 'games/new', element: <AddGamePage /> },
          { path: 'games/:slug', element: <GameDetailPage /> },
        ],
      },
    ],
  },
])
```

---

## Part 4: Better Auth - Modern Authentication

**Topics Covered:**
- Why Better Auth over NextAuth/Auth.js for React SPAs
- Setting up Better Auth server
- Configuring Better Auth client
- Email/password authentication
- OAuth providers (Google, GitHub)
- Session management
- Protected routes with auth state

**What You'll Build:**
- Complete authentication system
- Login/Register forms with validation
- User session management
- Auth context and hooks

**Server Setup:**
```typescript
// server/lib/auth.ts
import { betterAuth } from 'better-auth'

export const auth = betterAuth({
  database: {
    type: 'mongodb',
    url: process.env.MONGODB_URI,
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
})
```

**Client Setup:**
```typescript
// src/lib/auth-client.ts
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
})

export const { useSession, signIn, signOut, signUp } = authClient
```

---

## Part 5: TanStack Query - Server State Management

**Topics Covered:**
- Why TanStack Query over Redux for server state
- Setting up QueryClient and QueryClientProvider
- useQuery for data fetching
- useMutation for data modifications
- Query invalidation and cache management
- Optimistic updates
- Error and loading states

**What You'll Build:**
- API service layer for games
- Custom hooks for game CRUD operations
- Optimistic updates for better UX

**Example Implementation:**
```typescript
// src/hooks/useGames.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { gamesApi } from '@/services/games'

export function useGames() {
  return useQuery({
    queryKey: ['games'],
    queryFn: gamesApi.getAll,
  })
}

export function useCreateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: gamesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] })
    },
  })
}
```

---

## Part 6: Building the Games Feature

**Topics Covered:**
- Feature-based architecture
- Building reusable game components
- Form handling with React Hook Form + Zod
- Image upload and preview
- Search and filtering
- Pagination

**What You'll Build:**
- GameCard component
- GamesList with grid layout
- GameForm with validation
- Game detail page
- Search and filter functionality

**Component Examples:**
```typescript
// src/features/games/components/GameCard.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={game.coverUrl}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <h3 className="font-semibold">{game.title}</h3>
      </CardHeader>
      <CardContent>
        <Badge>{game.status}</Badge>
      </CardContent>
    </Card>
  )
}
```

---

## Part 7: Modern Backend with Express & TypeScript

**Topics Covered:**
- Express with TypeScript setup
- Better Auth server integration
- MongoDB with Mongoose (modern patterns)
- RESTful API design
- Input validation with Zod
- Error handling middleware
- CORS and security best practices

**What You'll Build:**
- TypeScript Express server
- Better Auth integration
- Games API with user association
- Proper error handling

**Modern Express Setup:**
```typescript
// server/src/index.ts
import express from 'express'
import cors from 'cors'
import { auth } from './lib/auth'
import { gamesRouter } from './routes/games'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())

// Better Auth handles its own routes
app.all('/api/auth/*', auth.handler)

// Protected API routes
app.use('/api/games', gamesRouter)

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001')
})
```

---

## Part 8: User Dashboard & Game Tracking

**Topics Covered:**
- Dashboard layout design
- Game status tracking (Playing, Completed, Backlog, Dropped)
- Statistics and progress visualization
- User preferences
- Dark mode implementation

**What You'll Build:**
- User dashboard with statistics
- Game status management
- Progress tracking
- Theme toggle (light/dark mode)

**Game Status Types:**
```typescript
type GameStatus = 'backlog' | 'playing' | 'completed' | 'dropped' | 'wishlist'

interface UserGame {
  id: string
  gameId: string
  userId: string
  status: GameStatus
  rating?: number
  hoursPlayed?: number
  startedAt?: Date
  completedAt?: Date
  notes?: string
}
```

---

## Part 9: Testing & Quality Assurance

**Topics Covered:**
- Testing strategy for React applications
- Unit testing with Vitest
- Component testing with React Testing Library
- API mocking with MSW (Mock Service Worker)
- End-to-end testing with Playwright
- Test coverage and CI/CD

**What You'll Build:**
- Unit tests for hooks and utilities
- Component tests for key UI components
- Integration tests for features
- E2E tests for critical user flows

**Testing Examples:**
```typescript
// src/features/games/__tests__/GameCard.test.tsx
import { render, screen } from '@testing-library/react'
import { GameCard } from '../components/GameCard'

describe('GameCard', () => {
  it('renders game title and cover', () => {
    const game = {
      id: '1',
      title: 'The Legend of Zelda',
      coverUrl: 'https://example.com/zelda.jpg',
      status: 'playing',
    }

    render(<GameCard game={game} />)

    expect(screen.getByText('The Legend of Zelda')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', game.coverUrl)
  })
})
```

---

## Part 10: Deployment & Production

**Topics Covered:**
- Building for production with Vite
- Environment configuration
- Deploying frontend (Vercel, Netlify, Cloudflare Pages)
- Deploying backend (Railway, Render, Fly.io)
- Database hosting (MongoDB Atlas)
- Domain setup and SSL
- Performance optimization
- Monitoring and analytics

**What You'll Build:**
- Production-ready builds
- Deployed application
- CI/CD pipeline with GitHub Actions

---

## Technology Stack Summary

### Frontend
| Technology | Purpose | Why This Choice |
|------------|---------|-----------------|
| **React 19** | UI Framework | Latest features, concurrent rendering |
| **TypeScript** | Type Safety | Better DX, fewer runtime errors |
| **Vite** | Build Tool | Fast HMR, ES modules, small bundle |
| **Tailwind CSS 4** | Styling | Utility-first, rapid development |
| **shadcn/ui** | UI Components | Own your components, beautiful defaults |
| **TanStack Query** | Server State | Caching, background sync, easy to use |
| **React Router 7** | Routing | Industry standard, great DX |
| **React Hook Form** | Forms | Performance, easy validation |
| **Zod** | Validation | TypeScript-first schema validation |

### Backend
| Technology | Purpose | Why This Choice |
|------------|---------|-----------------|
| **Express** | API Server | Simple, flexible, huge ecosystem |
| **TypeScript** | Type Safety | Consistent types across stack |
| **Better Auth** | Authentication | Modern, TypeScript-first, self-hosted |
| **MongoDB** | Database | Flexible schema, easy scaling |
| **Mongoose** | ODM | Schema validation, TypeScript support |
| **Zod** | Validation | Shared schemas with frontend |

### DevOps
| Technology | Purpose |
|------------|---------|
| **Vitest** | Unit/Integration Testing |
| **Playwright** | E2E Testing |
| **GitHub Actions** | CI/CD |
| **Vercel/Railway** | Hosting |

---

## Comparison: Old vs New Architecture

### Old Stack (2016)
```
React 15 + Redux + Redux Thunk
├── Class components
├── connect() HOC pattern
├── Semantic UI (CDN)
├── No TypeScript
├── No authentication
├── Create React App
└── Separate concerns by type (components/, reducers/, actions/)
```

### New Stack (2025)
```
React 19 + TanStack Query + Zustand (if needed)
├── Functional components with hooks
├── Custom hooks pattern
├── shadcn/ui + Tailwind CSS
├── Full TypeScript
├── Better Auth
├── Vite
└── Feature-based architecture (features/games/, features/auth/)
```

---

## Getting Started

Clone the repository and follow along with each part:

```bash
git clone https://github.com/yourusername/heroic-modern.git
cd heroic-modern

# Install dependencies
npm install

# Start development server
npm run dev
```

Each part has its own branch for reference:
- `part-1-setup` - Project setup complete
- `part-2-styling` - Tailwind + shadcn/ui configured
- `part-3-routing` - React Router implemented
- `part-4-auth` - Better Auth integrated
- `part-5-data` - TanStack Query setup
- `part-6-games` - Games feature complete
- `part-7-backend` - Backend modernized
- `part-8-dashboard` - Dashboard implemented
- `part-9-testing` - Tests added
- `part-10-deploy` - Production ready

---

## Resources & References

### Official Documentation
- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Better Auth](https://www.better-auth.com/)
- [React Router](https://reactrouter.com/)

### Tutorials & Guides
- [Vercel Academy - shadcn/ui Course](https://vercel.com/academy/shadcn-ui)
- [TanStack Query Crash Course](https://dev.to/pedrotech/tanstack-react-query-crash-course-4ggp)
- [Better Auth with React](https://catalins.tech/better-auth-with-hono-bun-typescript-react-vite/)

---

*This tutorial series is designed for developers familiar with basic React concepts who want to learn modern React development practices. Each part builds upon the previous, creating a complete, production-ready application.*
