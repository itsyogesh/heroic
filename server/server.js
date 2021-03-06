const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')

const router = require('./router')

mongoose.Promise = global.Promise

connectDB()
  .on('error', console.log)
  .on('disconnected', connectDB)
  .once('open', listen)

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use(cors())

router(app)

app.use((err, req, res, next) => {

  if(req.app.get('env') !== 'development'){
    delete err.stack
  }
  return res.status(err.statusCode || 500).json({
    errors: {
      message: (err.message) ? err.message : 'Something went wrong. We are looking into it.',
      details: (err.details) ? err.details : 'No details specified'
    }
  })
})

function connectDB() {
  const options = { server: { socketOptions: {keepAlive: 1}}}
  return mongoose.connect('localhost:27017/heroic', options).connection;
}

function listen() {
  app.listen(8080)
  console.log('App is running')
}
