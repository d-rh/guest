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
          console.log(match);
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

exports.verifyAuth = (req, res, next) => new Promise((resolve, reject) => {
  Session.findOne( { _id: req.cookies.sessId }, (err, match) => {
    if (err) reject(err);
    if (match) {
      resolve('Logged in!');
    } else {
      resolve(console.log('Not Logged In'))
    }
  })
});