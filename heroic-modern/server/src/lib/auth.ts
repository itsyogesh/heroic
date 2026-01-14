import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import mongoose from 'mongoose'

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  trustedOrigins: [process.env.CLIENT_URL || 'http://localhost:5173'],
})

// Type for the user from Better Auth
export type AuthUser = typeof auth.$Infer.Session.user
export type AuthSession = typeof auth.$Infer.Session
