import { GameCard } from './GameCard'
import type { Game, UserGame } from '@/types'

interface GamesListProps {
  games: Game[]
  libraryEntries?: Map<string, UserGame>
  isLoading?: boolean
}

export function GamesList({ games, libraryEntries, isLoading }: GamesListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No games found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          libraryEntry={libraryEntries?.get(game.id)}
        />
      ))}
    </div>
  )
}
