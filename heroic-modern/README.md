# Heroic - Modern Game Library Tracker

A modern React application for tracking your video game collection. Like Goodreads, but for video games.

## Tech Stack

### Frontend
- **React 19** - UI framework with hooks
- **TypeScript** - Type safety
- **Vite** - Build tool with fast HMR
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **TanStack Query** - Server state management
- **React Router 7** - Client-side routing
- **React Hook Form + Zod** - Form handling and validation

### Backend
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Better Auth** - Modern authentication
- **MongoDB + Mongoose** - Database
- **Zod** - Schema validation

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/heroic.git
cd heroic/heroic-modern
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
# Server
cp server/.env.example server/.env
# Edit server/.env with your configuration
```

4. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend at http://localhost:5173
- Backend at http://localhost:3001

## Project Structure

```
heroic-modern/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   └── shared/   # Shared layout components
│   │   ├── features/     # Feature modules
│   │   │   ├── auth/     # Authentication
│   │   │   └── games/    # Games feature
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── lib/          # Database & auth config
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Mongoose models
│   │   └── routes/       # API routes
│   └── package.json
└── package.json           # Root package.json
```

## Features

- **User Authentication** - Sign up, sign in, and session management with Better Auth
- **Game Library** - Add games to your personal library with status tracking
- **Status Tracking** - Track games as Playing, Completed, Backlog, Dropped, or Wishlist
- **Game Details** - Store cover images, descriptions, developers, and more
- **Statistics** - View your gaming stats including total games and hours played
- **Search** - Search through games by title
- **Responsive Design** - Works on desktop and mobile

## API Endpoints

### Authentication (handled by Better Auth)
- `POST /api/auth/sign-up/email` - Register new user
- `POST /api/auth/sign-in/email` - Sign in
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session

### Games
- `GET /api/games` - List all games (paginated)
- `GET /api/games/:id` - Get game by ID
- `GET /api/games/slug/:slug` - Get game by slug
- `POST /api/games` - Create new game (auth required)
- `PATCH /api/games/:id` - Update game (auth required)
- `DELETE /api/games/:id` - Delete game (auth required)

### Library
- `GET /api/library` - Get user's library (auth required)
- `GET /api/library/stats` - Get library statistics (auth required)
- `GET /api/library/game/:gameId` - Check if game is in library (auth required)
- `POST /api/library` - Add game to library (auth required)
- `PATCH /api/library/:id` - Update library entry (auth required)
- `DELETE /api/library/:id` - Remove from library (auth required)

## Tutorial Series

This project was created as part of a tutorial series on modern React development. See [TUTORIAL_SERIES.md](../TUTORIAL_SERIES.md) for the complete guide.

## License

MIT
