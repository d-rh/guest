const express     = require('express');
const mongoose    = require('mongoose');
const app         = express();
require('dotenv').config();

mongoose.connect( process.env.DB_URI, { useNewUrlParser: true } );


app.set('view engine', 'pug');


app.get('/', (request, response) => {
  response.render('index', { title : 'Welcome' })
})
app.get('/sign', (request, response) => {
  response.render('sign')
})




app.listen(process.env.PORT || 3001, () => console.log('up and running!'));