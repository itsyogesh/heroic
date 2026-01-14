import type { Request, Response, NextFunction } from 'express'
import { auth, type AuthSession } from '../lib/auth.js'

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      session?: AuthSession
      user?: AuthSession['user']
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as Headers,
    })

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.session = session
    req.user = session.user
    next()
  } catch (error) {
    console.error('Auth error:', error)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as Headers,
    })

    if (session) {
      req.session = session
      req.user = session.user
    }
    next()
  } catch (error) {
    // Continue without auth
    next()
  }
}
