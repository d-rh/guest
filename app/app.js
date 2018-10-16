const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const url = require('url');
const app = express();

require('dotenv').config();
/******************
|  Connect DB     |
******************/
mongoose.set('useCreateIndex', true);
mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true }
)
  .then(console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

const newFriendController = require('../controllers/newFriendController');
const authController = require('../controllers/authController');
const entryController = require('../controllers/entryController');
/******************
|  Config         |
******************/
app.use('/static/', express.static('public'));
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
/******************
|  Middleware     |
******************/
app.use('/', (req, res, next) => {
  // if a user is authenticated, pass their username as a local
  // to the layout view template
  if (req.cookies.sessId) {
    res.locals.username = req.cookies.username;
  }
  next();
});
app.use('/feed', (req, res, next) => {
  authController.verifyAuth(req, res, next)
    .then(result => {
      if (result === 'Authorized') {
        next();
      } else if (result === 'Not authenticated') {
        res.redirect(
          url.format({
            pathname: '/login'
          })
        );
      }
    })
    .catch(err => {
      console.error(err.stack);
      res.status(500).send(err.stack);
    });
});
/******************
|  Routes         |
******************/
// index
app.get('/', async (req, res, next) => {
  res.render('index');
});

// register new user
app.route('/register')
  .get((req, res) => {
    res.render('register', { title: 'Register' });
  })
  .post(async (req, res) => {
    const valResult = await newFriendController.valReg(req.body);
    if (valResult.errors.length === 0) {
      newFriendController.friendCreatePost(req.body).then(() => {
        res.render('index');
      });
    } else {
      console.log(valResult);
      res.render('register', {
        title: 'Register',
        renderUserName: valResult.formUserName,
        renderEmail: valResult.email,
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
            maxAge: 1000 * 60 * 60 * 8,
            httpOnly: true
          });
          res.cookie('username', result['username'], {
            maxAge: 1000 * 60 * 60 * 8,
            httpOnly: true
          });
          res.redirect(
            url.format({
              pathname: '/feed/' + req.cookies.username
            })
          );
        } else if (result === 'Not Authenticated') {
          console.error(result);
          res.render('login', { title: 'Log In', result });
        }
      })
      .catch(err => {
        console.error(err.stack);
        res.status(500).send(err.stack);
      });
  });

// feed
app.route('/feed')
  .post(async (req, res) => {
    await entryController.entryCreatePost(req)
      .then(
        res.redirect(
          url.format({
            pathname: '/feed/' + req.cookies.username
          })
        )
      )
  })
  .get(async (req, res) => {
    res.redirect(
      url.format({
        pathname: '/feed/' + req.cookies.username
      })
    )
  })
app.get('/feed/:username', async (req, res) => {
  const recentEntries = await entryController.getRecentEntries()
  console.log(recentEntries)
  res.render('feed', { guestbook: recentEntries })
})

// logout
app.route('/logout')
  .get(async (req, res) => {
    authController.logOut(req)
      .then(res.clearCookie('sessId'), res.clearCookie('username'));
    res.redirect(
      url.format({
        pathname: '/'
      })
    );
  });


/******************
|  Error Handlers |
******************/
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