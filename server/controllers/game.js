const Game = require('../models/Game')

exports.getAllGames = (req, res, next) => {
  Game.find().exec()
    .then((games) => {
      return res.status(200).json({
        games: games})
    })
    .catch((err) => {
      return next(err)
    })
}

exports.postGame = (req, res, next) => {
  const { name, cover } = req.body
  let errors = {}

  if(!name || !name.length) {
    errors.title = 'Title cannot be empty'
  }

  if(!cover || !cover.length) {
    errors.cover = 'Cover URL cannot be empty'
  }

  if(Object.keys(errors).length) {
    let err = new Error('Invalid data')
    err.statusCode = 400
    err.details = errors
    return next(err)
  }

  let game = new Game({
    name,
    cover
  })

  game.save()
    .then((game) => {
      return res.status(200).json(game)
    })
    .catch((err) => {
      return next(err)
    })
}

exports.getGame = (req, res, next) => {
  Game.findOne({slug: req.params.gameId})
    .exec()
    .then((game) => {
      return res.status(200).json(game)
    })
    .catch((err) => {
      return next(err)
    })
}
