const express       = require('express')
const mongoose      = require('mongoose')
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const app           = express()

require('dotenv').config();

//    Connect DB
mongoose.connect( process.env.DB_URI, { useNewUrlParser: true } )
const new_friend_controller = require('./constrollers/newFriendController')

//    config
app.set('view engine', 'pug')
app.use(bodyParser)
app.use(morgan('dev'))

//    Mount static path
app.use('/static', express.static('public'))

//    Routes
app.get('/', (req, res) => {
  res.render('index', { title : 'Welcome' })
})
app.route('/sign')
  .get( (req, res) => {
    res.render('sign')
  })
  .post( (req, res) => {
    res.send('POST to /sign')
  })

//    Err and Status 404 Handlers //
app.use( (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('We have a problem!')
})

app.use( (req, res, next) => {
  res.status(404)
  res.render('error')
})

app.listen(process.env.PORT || 3001, () => console.log('up and running!'))