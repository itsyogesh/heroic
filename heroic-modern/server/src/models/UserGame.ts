import mongoose, { Schema, type Document, type Types } from 'mongoose'

export type GameStatus = 'backlog' | 'playing' | 'completed' | 'dropped' | 'wishlist'

export interface IUserGame extends Document {
  userId: string
  gameId: Types.ObjectId
  status: GameStatus
  rating?: number
  hoursPlayed?: number
  startedAt?: Date
  completedAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const UserGameSchema = new Schema<IUserGame>(
  {
    userId: { type: String, required: true, index: true },
    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    status: {
      type: String,
      enum: ['backlog', 'playing', 'completed', 'dropped', 'wishlist'],
      required: true,
    },
    rating: { type: Number, min: 1, max: 10 },
    hoursPlayed: { type: Number, min: 0 },
    startedAt: { type: Date },
    completedAt: { type: Date },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
)

// Ensure one entry per user per game
UserGameSchema.index({ userId: 1, gameId: 1 }, { unique: true })

export const UserGame = mongoose.model<IUserGame>('UserGame', UserGameSchema)
