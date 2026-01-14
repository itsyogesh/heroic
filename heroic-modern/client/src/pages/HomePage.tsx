import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Track Your Gaming Journey
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
        Heroic is your personal game library manager. Keep track of games you're
        playing, have completed, or want to play. Like Goodreads, but for video
        games.
      </p>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        {isAuthenticated ? (
          <>
            <Link to="/library">
              <Button size="lg">Go to My Library</Button>
            </Link>
            <Link to="/games">
              <Button variant="outline" size="lg">
                Browse Games
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
          <div className="text-3xl mb-4">📚</div>
          <h3 className="text-lg font-semibold">Track Your Library</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Organize games by status: playing, completed, backlog, or wishlist.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
          <div className="text-3xl mb-4">⭐</div>
          <h3 className="text-lg font-semibold">Rate & Review</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Keep personal notes and ratings for all your games.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-lg border bg-card">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-lg font-semibold">Track Progress</h3>
          <p className="text-sm text-muted-foreground mt-2">
            See your gaming stats and track hours played.
          </p>
        </div>
      </div>
    </div>
  )
}
