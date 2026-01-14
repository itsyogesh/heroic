import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { gamesApi } from '@/services/games'
import type { CreateGameInput, UpdateGameInput } from '@/types'

export const gameKeys = {
  all: ['games'] as const,
  lists: () => [...gameKeys.all, 'list'] as const,
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    [...gameKeys.lists(), params] as const,
  details: () => [...gameKeys.all, 'detail'] as const,
  detail: (id: string) => [...gameKeys.details(), id] as const,
  slug: (slug: string) => [...gameKeys.all, 'slug', slug] as const,
}

export function useGames(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: gameKeys.list(params),
    queryFn: () => gamesApi.getAll(params),
  })
}

export function useGame(id: string) {
  return useQuery({
    queryKey: gameKeys.detail(id),
    queryFn: () => gamesApi.getById(id),
    enabled: !!id,
  })
}

export function useGameBySlug(slug: string) {
  return useQuery({
    queryKey: gameKeys.slug(slug),
    queryFn: () => gamesApi.getBySlug(slug),
    enabled: !!slug,
  })
}

export function useCreateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateGameInput) => gamesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gameKeys.lists() })
    },
  })
}

export function useUpdateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGameInput }) =>
      gamesApi.update(id, data),
    onSuccess: (game) => {
      queryClient.invalidateQueries({ queryKey: gameKeys.lists() })
      queryClient.setQueryData(gameKeys.detail(game.id), game)
    },
  })
}

export function useDeleteGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => gamesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gameKeys.lists() })
    },
  })
}
