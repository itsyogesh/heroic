import mongoose, { Schema, type Document } from 'mongoose'

export interface IGame extends Document {
  title: string
  slug: string
  coverUrl: string
  description?: string
  releaseDate?: Date
  developer?: string
  publisher?: string
  genres?: string[]
  platforms?: string[]
  createdAt: Date
  updatedAt: Date
}

const GameSchema = new Schema<IGame>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    coverUrl: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: Date },
    developer: { type: String },
    publisher: { type: String },
    genres: [{ type: String }],
    platforms: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

// Generate slug from title before saving
GameSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export const Game = mongoose.model<IGame>('Game', GameSchema)
