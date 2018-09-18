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
          return sessionController.sessionCreatePost()
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

exports.verifyAuth = cookie => new Promise((resolve, reject) => {
  Session.findOne( { sessId: cookie.sessId }, (err, match) => {
    if (err) reject(err);
    if (match) {
      resolve(cookie);
    } else {
      resolve('Please log in')
    }
  })
});