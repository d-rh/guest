const express       = require('express')
const mongoose      = require('mongoose')
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const app           = express()

require('dotenv').config();

//    Connect DB
mongoose.connect( process.env.DB_URI, 
                  { useNewUrlParser : true },
                  (err) => { if (err) throw err; console.log('Successfully connected to MongoDB') } 
                )
const newFriendController = require('./controllers/newFriendController')

//    config
app.set('view engine', 'pug')
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))

//    Mount static path
app.use('/static', express.static('public'))

//    Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Rockwell Guestbook' })
})

app.route('/register')
  .get( (req, res) => {
    res.render('register', { title: 'Register' })
  })
  .post( (req, res) => {
    newFriendController.friendCreatePost(req.body)
    res.render('welcome')
  })

app.route('/login')
  .get( (req, res) => {
    res.render('login', { title: 'Log In' })
  })
  .post(
    // needs to be implemented!
  )


//    Err and Status 404 Handlers //
app.use( (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('We have a problem!')
})
app.use( (req, res, next) => {
  res.status(404)
  res.render('error')
})
app.listen(process.env.PORT || 3001, () => console.log('Server up and running on port ' + process.env.PORT + '!'))