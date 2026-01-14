import { Router, type Request, type Response } from 'express'
import { z } from 'zod'
import { UserGame, type GameStatus } from '../models/UserGame.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// All library routes require authentication
router.use(requireAuth)

// Validation schemas
const addToLibrarySchema = z.object({
  gameId: z.string().min(1, 'Game ID is required'),
  status: z.enum(['backlog', 'playing', 'completed', 'dropped', 'wishlist']),
  notes: z.string().optional(),
})

const updateLibrarySchema = z.object({
  status: z.enum(['backlog', 'playing', 'completed', 'dropped', 'wishlist']).optional(),
  rating: z.number().min(1).max(10).optional(),
  hoursPlayed: z.number().min(0).optional(),
  notes: z.string().optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
})

// GET /api/library - Get user's library
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = req.query.status as GameStatus | undefined

    const query: Record<string, unknown> = { userId: req.user!.id }
    if (status) {
      query.status = status
    }

    const entries = await UserGame.find(query)
      .populate('gameId')
      .sort({ updatedAt: -1 })

    // Map to include game data
    const result = entries.map((entry) => ({
      id: entry._id,
      gameId: entry.gameId._id,
      userId: entry.userId,
      status: entry.status,
      rating: entry.rating,
      hoursPlayed: entry.hoursPlayed,
      startedAt: entry.startedAt,
      completedAt: entry.completedAt,
      notes: entry.notes,
      game: entry.gameId,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    }))

    res.json(result)
  } catch (error) {
    console.error('Error fetching library:', error)
    res.status(500).json({ message: 'Failed to fetch library' })
  }
})

// GET /api/library/stats - Get library statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id

    const [stats, hoursResult] = await Promise.all([
      UserGame.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
      UserGame.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: null,
            totalHoursPlayed: { $sum: '$hoursPlayed' },
          },
        },
      ]),
    ])

    const statusCounts: Record<string, number> = {
      playing: 0,
      completed: 0,
      backlog: 0,
      dropped: 0,
      wishlist: 0,
    }

    let total = 0
    for (const stat of stats) {
      statusCounts[stat._id] = stat.count
      total += stat.count
    }

    res.json({
      total,
      ...statusCounts,
      totalHoursPlayed: hoursResult[0]?.totalHoursPlayed || 0,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ message: 'Failed to fetch stats' })
  }
})

// GET /api/library/game/:gameId - Get library entry for a specific game
router.get('/game/:gameId', async (req: Request, res: Response) => {
  try {
    const entry = await UserGame.findOne({
      userId: req.user!.id,
      gameId: req.params.gameId,
    }).populate('gameId')

    if (!entry) {
      return res.status(404).json({ message: 'Not in library' })
    }

    res.json({
      id: entry._id,
      gameId: entry.gameId._id,
      userId: entry.userId,
      status: entry.status,
      rating: entry.rating,
      hoursPlayed: entry.hoursPlayed,
      startedAt: entry.startedAt,
      completedAt: entry.completedAt,
      notes: entry.notes,
      game: entry.gameId,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    })
  } catch (error) {
    console.error('Error fetching library entry:', error)
    res.status(500).json({ message: 'Failed to fetch library entry' })
  }
})

// POST /api/library - Add game to library
router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = addToLibrarySchema.parse(req.body)

    // Check if already in library
    const existing = await UserGame.findOne({
      userId: req.user!.id,
      gameId: validatedData.gameId,
    })

    if (existing) {
      return res.status(400).json({ message: 'Game already in library' })
    }

    const entry = new UserGame({
      userId: req.user!.id,
      gameId: validatedData.gameId,
      status: validatedData.status,
      notes: validatedData.notes,
      startedAt: validatedData.status === 'playing' ? new Date() : undefined,
    })

    await entry.save()
    await entry.populate('gameId')

    res.status(201).json({
      id: entry._id,
      gameId: entry.gameId._id,
      userId: entry.userId,
      status: entry.status,
      rating: entry.rating,
      hoursPlayed: entry.hoursPlayed,
      startedAt: entry.startedAt,
      completedAt: entry.completedAt,
      notes: entry.notes,
      game: entry.gameId,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      })
    }
    console.error('Error adding to library:', error)
    res.status(500).json({ message: 'Failed to add to library' })
  }
})

// PATCH /api/library/:id - Update library entry
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const validatedData = updateLibrarySchema.parse(req.body)

    const updateData: Record<string, unknown> = { ...validatedData }

    // Parse dates if provided
    if (validatedData.startedAt) {
      updateData.startedAt = new Date(validatedData.startedAt)
    }
    if (validatedData.completedAt) {
      updateData.completedAt = new Date(validatedData.completedAt)
    }

    // Auto-set completedAt when status changes to completed
    if (validatedData.status === 'completed' && !validatedData.completedAt) {
      updateData.completedAt = new Date()
    }

    const entry = await UserGame.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      updateData,
      { new: true }
    ).populate('gameId')

    if (!entry) {
      return res.status(404).json({ message: 'Library entry not found' })
    }

    res.json({
      id: entry._id,
      gameId: entry.gameId._id,
      userId: entry.userId,
      status: entry.status,
      rating: entry.rating,
      hoursPlayed: entry.hoursPlayed,
      startedAt: entry.startedAt,
      completedAt: entry.completedAt,
      notes: entry.notes,
      game: entry.gameId,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      })
    }
    console.error('Error updating library entry:', error)
    res.status(500).json({ message: 'Failed to update library entry' })
  }
})

// DELETE /api/library/:id - Remove from library
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await UserGame.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!.id,
    })

    if (!entry) {
      return res.status(404).json({ message: 'Library entry not found' })
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error removing from library:', error)
    res.status(500).json({ message: 'Failed to remove from library' })
  }
})

export { router as libraryRouter }
