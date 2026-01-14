import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GamesList } from '@/features/games/components/GamesList'
import { useLibrary, useLibraryStats } from '@/hooks/useLibrary'
import type { GameStatus, Game } from '@/types'

const STATUS_TABS: { value: GameStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'playing', label: 'Playing' },
  { value: 'backlog', label: 'Backlog' },
  { value: 'completed', label: 'Completed' },
  { value: 'dropped', label: 'Dropped' },
  { value: 'wishlist', label: 'Wishlist' },
]

export function LibraryPage() {
  const [selectedStatus, setSelectedStatus] = useState<GameStatus | 'all'>('all')

  const { data: stats, isLoading: statsLoading } = useLibraryStats()
  const { data: libraryEntries, isLoading } = useLibrary(
    selectedStatus === 'all' ? undefined : { status: selectedStatus }
  )

  // Extract games from library entries
  const games: Game[] = (libraryEntries || [])
    .filter((entry) => entry.game)
    .map((entry) => entry.game as Game)

  // Create a map for quick lookup
  const libraryMap = new Map(
    (libraryEntries || []).map((entry) => [entry.gameId, entry])
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Library</h1>
      </div>

      {/* Stats Cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">
                Playing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.playing}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600">
                Backlog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.backlog}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hours Played
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalHoursPlayed || 0}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-4">
        {STATUS_TABS.map((tab) => (
          <Button
            key={tab.value}
            variant={selectedStatus === tab.value ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedStatus(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Games List */}
      <GamesList games={games} libraryEntries={libraryMap} isLoading={isLoading} />
    </div>
  )
}
