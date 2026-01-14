import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { GamesList } from '@/features/games/components/GamesList'
import { useGames } from '@/hooks/useGames'

export function GamesPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useGames({ page, limit: 20, search })

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load games</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Browse Games</h1>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search games..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
      </div>

      <GamesList games={data?.data || []} isLoading={isLoading} />

      {data && data.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
