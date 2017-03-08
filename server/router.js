const express = require('express')
const gameController = require('./controllers/game')

module.exports = (app) => {
  const APIRoutes = express.Router()
  const gameRoutes = express.Router()

  APIRoutes.use('/games', gameRoutes)
  gameRoutes.post('/', gameController.postGame)
  gameRoutes.get('/', gameController.getAllGames)
  gameRoutes.get('/:gameId', gameController.getGame)

  app.use('/api', APIRoutes)
}
