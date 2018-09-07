const express      = require('express'),
      mongoose     = require('mongoose'),
      morgan       = require('morgan'),
      bodyParser   = require('body-parser'),
      cookieParser = require('cookie-parser'),
      app          = express()

require('dotenv').config();

/*    
|  Connect DB
*/
mongoose.connect(process.env.DB_URI, { useNewUrlParser : true } )
  .then(console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err))

const newFriendController = require('./controllers/newFriendController'),
      authController      = require('./controllers/authController'),
      sessController      = require('./controllers/sessController')

/*    
|  Config
*/
app.set('view engine', 'pug')
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/*    
|  Static Path
*/
app.use('/static', express.static('public'))

/*    
|  Routes
*/

// homepage
app.get('/', (req, res) => {
  res.render('index', { title: 'Rockwell Guestbook' })
})
// register new user
app.route('/register')
  .get( (req, res) => {
    res.render('register', { title: 'Register' })
  })
  .post( (req, res) => {
    newFriendController.friendCreatePost(req.body)
    res.render('welcome')
  })
// login
app.route('/login')
  .get( (req, res) => {
    res.render('login', { title: 'Log In' })
  })
  .post( (req, res) => {
    authController.verifyLogin(req.body)
    // user.then(sessController.createSession)
    res.render('welcome', { title: 'Welcome!' })
  })

/*    
|  Error Handlers
*/
app.use( (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err.stack)
})
app.use( (req, res, next) => {
  res.status(404)
  res.render('error')
})
app.listen(process.env.PORT || 3001, () => console.log('Server up and running on port ' + process.env.PORT + '!'))