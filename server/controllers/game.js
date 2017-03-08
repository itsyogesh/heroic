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
  const { name, poster } = req.body
  let game = new Game()
  game = {
    name,
    poster
  }
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
