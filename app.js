const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

require('dotenv').config();

/*
|  Connect DB
*/
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

const newFriendController = require('./controllers/newFriendController');
const authController = require('./controllers/authController');

/*
|  Config
*/
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

/*
|  Static Path
*/
app.use('/static', express.static('public'));

/*
|  Routes
*/

app.use('/feed', (req, res, next) => {
  // require auth
  console.log('Cookies: ' + req.cookies);
});
// app.use((req, res, next) => {
//   console.log('TITS TITS TITS TITS TITS TITS TITS TITS TITS TITS ');
//   next();
// });

// homepage
app.get('/', (req, res) => {
  res.render('index', { title: 'Rockwell Guestbook' });
});

// register new user
app.route('/register')
  .get((req, res) => {
    res.render('register', { title: 'Register' });
  })
  .post((req, res) => {
    newFriendController.friendCreatePost(req.body);
    res.render('./welcome');
  });

// login
app.route('/login')
  .get((req, res) => {
    res.render('login', { title: 'Log In' });
  })
  .post((req, res) => {
    authController.verifyLogin(req.body)
      .then(authController.createSessionId(result))
      .catch((err) => {
        console.error(err.stack);
        res.status(500).send(err.stack);
      });
  });

// feed

/*
|  Error Handlers
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
});
app.use((req, res, next) => {
  res.status(404);
  res.render('error');
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server up and running on port ${process.env.PORT}!`);
});
