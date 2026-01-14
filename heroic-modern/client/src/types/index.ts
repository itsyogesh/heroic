// Game types
export type GameStatus = 'backlog' | 'playing' | 'completed' | 'dropped' | 'wishlist'

export interface Game {
  id: string
  title: string
  slug: string
  coverUrl: string
  description?: string
  releaseDate?: string
  developer?: string
  publisher?: string
  genres?: string[]
  platforms?: string[]
  createdAt: string
  updatedAt: string
}

export interface UserGame {
  id: string
  gameId: string
  userId: string
  status: GameStatus
  rating?: number
  hoursPlayed?: number
  startedAt?: string
  completedAt?: string
  notes?: string
  game?: Game
  createdAt: string
  updatedAt: string
}

// User types
export interface User {
  id: string
  email: string
  name?: string
  image?: string
  createdAt: string
  updatedAt: string
}

// API types
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface CreateGameInput {
  title: string
  coverUrl: string
  description?: string
  releaseDate?: string
  developer?: string
  publisher?: string
  genres?: string[]
  platforms?: string[]
}

export interface UpdateGameInput extends Partial<CreateGameInput> {}

export interface AddToLibraryInput {
  gameId: string
  status: GameStatus
  notes?: string
}

export interface UpdateLibraryInput {
  status?: GameStatus
  rating?: number
  hoursPlayed?: number
  notes?: string
  startedAt?: string
  completedAt?: string
}
