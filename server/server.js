const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')

const router = require('./router')

mongoose.Promise = global.Promise
mongoose.connect('localhost:27017/heroic')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use(cors())

app.use((err, req, res, next) => {
  logger.error(err)

  if(req.app.get('env') !== 'development'){
    delete err.stack
  }
  return res.status(err.statusCode || 500).json(err)
})

router(app)

app.listen(8080)
console.log('App is running')
