import { useNavigate } from 'react-router-dom'
import { GameForm } from '@/features/games/components/GameForm'
import { useCreateGame } from '@/hooks/useGames'
import type { CreateGameInput } from '@/types'

export function AddGamePage() {
  const navigate = useNavigate()
  const createGame = useCreateGame()

  const handleSubmit = async (data: CreateGameInput) => {
    const game = await createGame.mutateAsync(data)
    navigate(`/games/${game.slug}`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Add New Game</h1>
      <GameForm onSubmit={handleSubmit} isLoading={createGame.isPending} />
    </div>
  )
}
