const express     = require('express');
const mongoose    = require('mongoose');
const app         = express();
require('dotenv').config();

mongoose.connect( process.env.DB_URI, { useNewUrlParser: true } );


app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title : 'Welcome' })
})
app.get('/sign', (req, res) => {
  res.render('sign', { title : 'Sign In' })
})
app.get('/welcome', (req, res) => {
  res.render('welcome', {title : 'Welcome!'})
})

app.use('/static', express.static('public'))
app.use( (req, res, next) => {
  res.status(404)
  res.render('error')
})



app.listen(process.env.PORT || 3001, () => console.log('up and running!'));