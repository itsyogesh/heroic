const mongoose = require('mongoose')

// http://blog.benmcmahen.com/post/41122888102/creating-slugs-for-your-blog-using-expressjs-and
const slugify = (text) => {
  return (
    text.toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
  )
}

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    index: true
  },
  cover: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

GameSchema.pre('save', function(next) {
  this.slug = slugify(this.name)
  next()
})

module.exports = mongoose.model('Game', GameSchema)
