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
app.use('/static', express.static('public'));

/*
| Middleware
*/
app.use('/feed', (req, res, next) => { 
  authController.verifyAuth(req, res, next)
    .then(result => {
      if (result === 'Authorized') next();
      else if (result === 'Not authenticated') { res.redirect('/login') }
    })
    .catch((err) => {
      console.error(err.stack);
      res.status(500).send(err.stack);
    });
});
app.use('/', (req, res, next) => {
  if (req.cookies.username) res.locals.username = req.cookies.username;
  next();
})

/*
|  Routes
*/

// homepage
app.get('/', (req, res) => {
  res.render('index', { title: 'Rockwell Guestbook' });
});

// register new user
app.route('/register')
  .get((req, res) => {
    res.render('register', { title: 'Register' });
  })
  .post( async (req, res) => {
    const valResult = await newFriendController.valReg(req.body);
    if (valResult.errors.length === 0) {
      newFriendController.friendCreatePost(req.body)
      res.redirect('./');
    } else {
      console.log(valResult.errors)
      res.render('register', {
        title: 'Register',
        username: valResult.username,
        email: valResult.email,
        errors: valResult.errors
      });
    }
  });

// login
app.route('/login')
  .get((req, res) => {
    res.render('login', { title: 'Log In' });
  })
  .post((req, res) => {
    authController.verifyLogin(req.body)
      .then(result => {
        if (result['_id']) {
            res.cookie('sessId', result['id'], { 
              maxAge: 1000 * 60 * 60 * 24,
              httpOnly: true, 
            });
            res.cookie('username', result['username'], {
              maxAge: 1000 * 60 * 60 * 24,
              httpOnly: true,
            });
            res.redirect('/feed', { title: 'Welcome!' })
          } else if (result === 'Incorrect Password' || 'Incorrect username') {
            console.error(result)
            res.render('login', { title: result, result });
          }
      })
      .catch((err) => {
        console.error(err.stack);
        res.status(500).send(err.stack);
      });
  });

// feed
app.route('/feed')
  .get((req, res) => {
    res.render('feed')
  })

// logout
app.route('/logout')
  .get((req, res) => {
    res.clearCookie('sessId');
    res.clearCookie('username');
    res.redirect('/');
  })

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
