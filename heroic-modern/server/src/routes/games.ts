import { Router, type Request, type Response } from 'express'
import { z } from 'zod'
import { Game } from '../models/Game.js'
import { requireAuth, optionalAuth } from '../middleware/auth.js'

const router = Router()

// Validation schemas
const createGameSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  coverUrl: z.string().url('Cover URL must be a valid URL'),
  description: z.string().optional(),
  developer: z.string().optional(),
  publisher: z.string().optional(),
  releaseDate: z.string().optional(),
  genres: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
})

const updateGameSchema = createGameSchema.partial()

// GET /api/games - Get all games with pagination and search
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100)
    const search = req.query.search as string

    const query: Record<string, unknown> = {}
    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    const [games, total] = await Promise.all([
      Game.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Game.countDocuments(query),
    ])

    res.json({
      data: games,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Error fetching games:', error)
    res.status(500).json({ message: 'Failed to fetch games' })
  }
})

// GET /api/games/slug/:slug - Get game by slug
router.get('/slug/:slug', optionalAuth, async (req: Request, res: Response) => {
  try {
    const game = await Game.findOne({ slug: req.params.slug })
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.json(game)
  } catch (error) {
    console.error('Error fetching game:', error)
    res.status(500).json({ message: 'Failed to fetch game' })
  }
})

// GET /api/games/:id - Get game by ID
router.get('/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.json(game)
  } catch (error) {
    console.error('Error fetching game:', error)
    res.status(500).json({ message: 'Failed to fetch game' })
  }
})

// POST /api/games - Create a new game (requires auth)
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const validatedData = createGameSchema.parse(req.body)

    const game = new Game({
      ...validatedData,
      releaseDate: validatedData.releaseDate
        ? new Date(validatedData.releaseDate)
        : undefined,
    })

    await game.save()
    res.status(201).json(game)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      })
    }
    console.error('Error creating game:', error)
    res.status(500).json({ message: 'Failed to create game' })
  }
})

// PATCH /api/games/:id - Update a game (requires auth)
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const validatedData = updateGameSchema.parse(req.body)

    const game = await Game.findByIdAndUpdate(
      req.params.id,
      {
        ...validatedData,
        releaseDate: validatedData.releaseDate
          ? new Date(validatedData.releaseDate)
          : undefined,
      },
      { new: true }
    )

    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }

    res.json(game)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      })
    }
    console.error('Error updating game:', error)
    res.status(500).json({ message: 'Failed to update game' })
  }
})

// DELETE /api/games/:id - Delete a game (requires auth)
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id)
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting game:', error)
    res.status(500).json({ message: 'Failed to delete game' })
  }
})

export { router as gamesRouter }
