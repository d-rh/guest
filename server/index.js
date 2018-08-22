const express     = require('express')
const db          = require('./db.js')

const app         = express();


app.set('view engine', 'pug');


app.get('/', (request, response) => {
  response.render('index', { title : 'Welcome' })
})
app.get('/sign', (request, response) => {
  response.render('sign')
})


app.listen(3000, () => console.log('Up and running on port 3000!'));