const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const url = require('url');
const app = express();
const newFriendController = require('../controllers/newFriendController');
const authController = require('../controllers/authController');
const entryController = require('../controllers/entryController');
const sessionController = require('../controllers/sessionController');
const verifyLogin = require('../functions/auth/verifyLogin');
const verifyAuth = require('../functions/auth/verifyAuth');

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
app.use('/feed', async (req, res, next) => {
  authController.verifyAuth(req, res, next)
    .then(result => {
      if (result === verifyAuth.AUTHORIZED) {
        next();
      } else if (result === verifyAuth.NOT_AUTHORIZED) {
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
    })
});
/******************
|  Routes         |
******************/
// ----- INDEX -----
app.get('/', async (req, res, next) => {
  res.render('index');
});
app.route('/register')
  .get((_req, res) => {
    res.render('register', { title: 'Register' });
  })
  .post(async (req, res) => {
    if (req.body.usernameCheck) {
      newFriendController.userCheck(req.body.usernameCheck)
        .then(result => {
          if (result) {
            res.json({ validated: true })
          } else if (!result) {
            res.json({ validated: false })
          }
        })
    }
  })
app.route('/newuser')
  .post(async (req, res) => {
    const valResult = await newFriendController.valReg(req.body);
    if (valResult.errors.length === 0) {
      await newFriendController.friendCreatePost(req.body).then(result => {
        return result
      }).then(regResult => {
        res.redirect(url.format({
          pathname: '/register/' + regResult
        }))
      })
    } else {
      res.render('register', {
        title: 'Register',
        renderUserName: valResult.formUserName,
        renderFirstName: valResult.firstName,
        renderLastName: valResult.lastName,
        errors: valResult.errors
      });
    }
  })
app.route('/register/:outcome')
  // Register/:outcome renders differently, depending on success or failure
  .get((req, res) => {
    if (req.params.outcome === 'success') {
      console.log(req.params);
      res.render('register', { outcome: req.params.outcome })
    }
    else if (req.params != 'success') res.render('error')
  })
// ----- LOGIN -----
app.route('/login')
  .get((req, res) => {
    res.render('login', { title: 'Log In' });
  })
  .post((req, res) => {
    // On login success, redirects to /feed/:username
    authController.verifyLogin(req.body)
      .then(result => {
        if (result['_id']) {
          let user = result['username']
          res.cookie('sessId', result['id'], {
            maxAge: 1000 * 60 * 60 * 8,
            httpOnly: true
          });
          res.cookie('username', result['username'], {
            maxAge: 1000 * 60 * 60 * 8,
            httpOnly: true
          });
          console.log('\x1b[33m%s\x1b{', user + ' has logged in for session ' +
            String.prototype.slice.call(result['id'], 0, 8))
          res.redirect(
            url.format({
              pathname: '/feed/' + user
            })
          );
        } else if (result === verifyLogin.NOT_AUTHENTICATED) {
          console.error(result);
          res.render('login', { title: 'Log In', result });
        }
      })
      .catch(err => {
        console.error(err.stack);
        res.status(500).send(err.stack);
      });
  });
// ----- FEED -----
app.route('/feed')
  .post(async (req, res) => {
    if (req.body.newEntry) {
      await entryController.entryCreatePost(req)
        .then(
          res.redirect(
            url.format({
              pathname: '/feed/' + req.cookies.username
            })
          )
        )
        .catch(err => res.render('error', { err }))
    }
    if (req.body.newReply) {
      await entryController.replyCreatePost(req)
        .then(res.redirect(
          url.format({
            pathname: '/feed/' + req.cookies.username
          })
        ))
    }
  })
  .get(async (req, res) => {
    // all GET requests to /feed redirect to /feed/:username
    res.redirect(
      url.format({
        pathname: '/feed/' + req.cookies.username
      })
    )
  })
app.route('/feed/:username')
  .get((req, res) => {
    if (req.params.username != req.cookies.username) res.redirect(
      url.format({
        pathname: '/feed/' + req.cookies.username
      })
    )
    return sessionController.getActiveUsers()
      .then( renderUsers => entryController.getRecentEntries()
          .then( renderEntries => ({ renderUsers, renderEntries: renderEntries.reverse() })))
      .then((data) => res.render('feed', data))
      .catch(err => res.render('error', { err }));
  })
  .post((req, res) => {
    if (typeof req.body.deleteEntry === 'string') {
      entryController.entryDeletePost(req.body.deleteEntry);
    }
  })
// ----- LOGOUT -----
app.route('/logout')
  .get(async (req, res) => {
    authController.logOut(req, res)
      .then(
        console.log('\x1b[31m%s\x1b{',
          req.cookies.username + ' has logged out, session ' +
          String.prototype.slice.call(req.cookies.sessId, 0, 8) +
          ' removed from session collection'))
      .then(
        res.clearCookie('sessId'), res.clearCookie('username'));
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
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server up and running on port ${process.env.PORT}!`);
});
// module.exports = server;