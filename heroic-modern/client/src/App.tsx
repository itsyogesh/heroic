import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/features/auth/hooks/useAuth'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { Layout } from '@/components/shared/Layout'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { GamesPage } from '@/pages/GamesPage'
import { GameDetailPage } from '@/pages/GameDetailPage'
import { AddGamePage } from '@/pages/AddGamePage'
import { LibraryPage } from '@/pages/LibraryPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'games', element: <GamesPage /> },
      { path: 'games/:slug', element: <GameDetailPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'library', element: <LibraryPage /> },
          { path: 'games/new', element: <AddGamePage /> },
        ],
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
