import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Game, UserGame } from '@/types'

interface GameCardProps {
  game: Game
  libraryEntry?: UserGame | null
}

export function GameCard({ game, libraryEntry }: GameCardProps) {
  return (
    <Link to={`/games/${game.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="aspect-[3/4] relative">
          <img
            src={game.coverUrl}
            alt={game.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/300x400?text=No+Cover'
            }}
          />
          {libraryEntry && (
            <div className="absolute top-2 right-2">
              <Badge variant={libraryEntry.status}>{libraryEntry.status}</Badge>
            </div>
          )}
        </div>
        <CardHeader className="p-4">
          <h3 className="font-semibold line-clamp-2">{game.title}</h3>
        </CardHeader>
        {game.developer && (
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground">{game.developer}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
