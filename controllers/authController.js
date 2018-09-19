// ~/controllers/authController.js

const Friend = require('../models/friend');
const Session = require('../models/session');
const sessionController = require('./sessionController')

exports.verifyLogin = user => new Promise((resolve, reject) => {

  Friend.findOne({ username: user.username }, (err, match) => {
    if (err) reject(err);
    if (match) {
      match.comparePassword(user.password, (err, isMatch) => {
        if (err) reject(err);
        if (isMatch) {
          return sessionController.sessionCreatePost(match)
            .then((result) => {
              resolve(result);
            })
        }
        resolve('Incorrect password');
      });
    } else {
      resolve('Incorrect username');
    }
  });
});

// buggy
exports.verifyAuth = (req, res, next) => new Promise((resolve, reject) => {
  console.log(req.cookies.sessId);
  if (!req.cookies.sessId) {
    res.redirect('/login');
  }
  Session.findOne( { _id: req.cookies.sessId }, (err, match) => {
    if (err) reject(err);
    if (match) {
      resolve(next());
    } else {
      reject(res.redirect('login'));
    }
  })
});