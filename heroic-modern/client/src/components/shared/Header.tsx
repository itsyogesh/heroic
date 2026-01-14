import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Heroic</span>
        </Link>

        <nav className="flex items-center space-x-6 ml-6">
          <Link
            to="/games"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse Games
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/library"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                My Library
              </Link>
              <Link
                to="/games/new"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Add Game
              </Link>
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user?.name || user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
