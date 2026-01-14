import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGameBySlug } from '@/hooks/useGames'
import { useLibraryEntry, useAddToLibrary, useUpdateLibraryEntry } from '@/hooks/useLibrary'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { GameStatus } from '@/types'

const STATUS_OPTIONS: { value: GameStatus; label: string }[] = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'playing', label: 'Playing' },
  { value: 'completed', label: 'Completed' },
  { value: 'dropped', label: 'Dropped' },
  { value: 'wishlist', label: 'Wishlist' },
]

export function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { isAuthenticated } = useAuth()

  const { data: game, isLoading, error } = useGameBySlug(slug!)
  const { data: libraryEntry } = useLibraryEntry(game?.id || '')
  const addToLibrary = useAddToLibrary()
  const updateLibrary = useUpdateLibraryEntry()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Game not found</p>
      </div>
    )
  }

  const handleStatusChange = async (status: GameStatus) => {
    if (!game) return

    if (libraryEntry) {
      await updateLibrary.mutateAsync({ id: libraryEntry.id, data: { status } })
    } else {
      await addToLibrary.mutateAsync({ gameId: game.id, status })
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img
            src={game.coverUrl}
            alt={game.title}
            className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/300x400?text=No+Cover'
            }}
          />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{game.title}</h1>
            {game.developer && (
              <p className="text-lg text-muted-foreground mt-2">
                by {game.developer}
              </p>
            )}
          </div>

          {libraryEntry && (
            <Badge variant={libraryEntry.status} className="text-sm">
              {libraryEntry.status}
            </Badge>
          )}

          {isAuthenticated && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add to Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((option) => (
                    <Button
                      key={option.value}
                      variant={libraryEntry?.status === option.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleStatusChange(option.value)}
                      disabled={addToLibrary.isPending || updateLibrary.isPending}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {game.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-muted-foreground">{game.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {game.publisher && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Publisher</h3>
                <p>{game.publisher}</p>
              </div>
            )}
            {game.releaseDate && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Release Date</h3>
                <p>{new Date(game.releaseDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
