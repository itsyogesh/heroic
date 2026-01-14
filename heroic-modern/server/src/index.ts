import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDatabase } from './lib/db.js'
import { auth } from './lib/auth.js'
import { gamesRouter } from './routes/games.js'
import { libraryRouter } from './routes/library.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

// Better Auth handler - handles all /api/auth/* routes
app.all('/api/auth/*', async (req, res) => {
  const response = await auth.handler(req)

  // Copy headers
  response.headers.forEach((value, key) => {
    res.setHeader(key, value)
  })

  // Set status and send body
  res.status(response.status)

  if (response.body) {
    const text = await response.text()
    res.send(text)
  } else {
    res.end()
  }
})

// API routes
app.use('/api/games', gamesRouter)
app.use('/api/library', libraryRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Unhandled error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
)

// Start server
async function start() {
  try {
    await connectDatabase()

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
      console.log(`Auth endpoint: http://localhost:${PORT}/api/auth`)
      console.log(`API endpoint: http://localhost:${PORT}/api`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()
