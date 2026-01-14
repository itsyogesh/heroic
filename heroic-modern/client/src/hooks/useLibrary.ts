import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { libraryApi } from '@/services/library'
import type { AddToLibraryInput, UpdateLibraryInput, GameStatus } from '@/types'

export const libraryKeys = {
  all: ['library'] as const,
  lists: () => [...libraryKeys.all, 'list'] as const,
  list: (params?: { status?: GameStatus }) => [...libraryKeys.lists(), params] as const,
  game: (gameId: string) => [...libraryKeys.all, 'game', gameId] as const,
  stats: () => [...libraryKeys.all, 'stats'] as const,
}

export function useLibrary(params?: { status?: GameStatus }) {
  return useQuery({
    queryKey: libraryKeys.list(params),
    queryFn: () => libraryApi.getAll(params),
  })
}

export function useLibraryEntry(gameId: string) {
  return useQuery({
    queryKey: libraryKeys.game(gameId),
    queryFn: () => libraryApi.getByGameId(gameId),
    enabled: !!gameId,
  })
}

export function useLibraryStats() {
  return useQuery({
    queryKey: libraryKeys.stats(),
    queryFn: () => libraryApi.getStats(),
  })
}

export function useAddToLibrary() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddToLibraryInput) => libraryApi.add(data),
    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: libraryKeys.stats() })
      queryClient.setQueryData(libraryKeys.game(entry.gameId), entry)
    },
  })
}

export function useUpdateLibraryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLibraryInput }) =>
      libraryApi.update(id, data),
    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: libraryKeys.stats() })
      queryClient.setQueryData(libraryKeys.game(entry.gameId), entry)
    },
  })
}

export function useRemoveFromLibrary() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => libraryApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: libraryKeys.stats() })
    },
  })
}
