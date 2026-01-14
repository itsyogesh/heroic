import type { UserGame, AddToLibraryInput, UpdateLibraryInput, GameStatus } from '@/types'

const API_URL = '/api/library'

export const libraryApi = {
  async getAll(params?: { status?: GameStatus }): Promise<UserGame[]> {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)

    const response = await fetch(`${API_URL}?${searchParams}`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch library')
    }

    return response.json()
  },

  async getByGameId(gameId: string): Promise<UserGame | null> {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
      credentials: 'include',
    })

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error('Failed to fetch library entry')
    }

    return response.json()
  },

  async add(data: AddToLibraryInput): Promise<UserGame> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to add to library')
    }

    return response.json()
  },

  async update(id: string, data: UpdateLibraryInput): Promise<UserGame> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update library entry')
    }

    return response.json()
  },

  async remove(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to remove from library')
    }
  },

  async getStats(): Promise<{
    total: number
    playing: number
    completed: number
    backlog: number
    dropped: number
    wishlist: number
    totalHoursPlayed: number
  }> {
    const response = await fetch(`${API_URL}/stats`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch stats')
    }

    return response.json()
  },
}
