import type { Game, CreateGameInput, UpdateGameInput, PaginatedResponse } from '@/types'

const API_URL = '/api/games'

export const gamesApi = {
  async getAll(params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<Game>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)

    const response = await fetch(`${API_URL}?${searchParams}`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch games')
    }

    return response.json()
  },

  async getById(id: string): Promise<Game> {
    const response = await fetch(`${API_URL}/${id}`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch game')
    }

    return response.json()
  },

  async getBySlug(slug: string): Promise<Game> {
    const response = await fetch(`${API_URL}/slug/${slug}`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch game')
    }

    return response.json()
  },

  async create(data: CreateGameInput): Promise<Game> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create game')
    }

    return response.json()
  },

  async update(id: string, data: UpdateGameInput): Promise<Game> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update game')
    }

    return response.json()
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to delete game')
    }
  },
}
