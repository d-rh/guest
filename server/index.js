const express     = require('express');
const mongoose    = require('mongoose');
const app         = express();
require('dotenv').config();

// connect Mongoose to MongoDB
mongoose.connect( process.env.DB_URI, { useNewUrlParser: true } );

// config
app.set('view engine', 'pug');

// Mount static path
app.use('/static', express.static('public'))

// 404 responses and error handler
app.use( (req, res, next) => {
  res.status(404)
  res.render('error')
})
app.use( (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('We have a problem!')
})

// Routes
app.get('/', (req, res) => {
  res.render('index', { title : 'Welcome' })
})
app.get('/sign', (req, res) => {
  res.render('sign', { title : 'Sign In' })
})
app.get('/welcome', (req, res) => {
  res.render('welcome', {title : 'Welcome!'})
})


app.listen(process.env.PORT || 3001, () => console.log('up and running!'));