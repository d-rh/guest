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
        resolve('Not Authenticated');
      });
    } else {
      resolve('Not Authenticated');
    }
  });
});

exports.verifyAuth = (req, res, next) => new Promise((resolve, reject) => {
  if (!req.cookies.sessId) {
    console.log('halt! not logged in.')
    resolve(res.redirect('/login'));
    return;
  }
  Session.findOne( { _id: req.cookies.sessId }, (err, match) => {
    try {
      if (match) {
        console.log('logged in :)')
        resolve('Authorized');
      } else {
        resolve('Not authenticated');
      }
    } catch (err) {
      reject(err)
    }
  })
});

exports.logOut = (req, res, next) => new Promise((resolve, reject) => {
  const sessionId = req.cookies.sessId;
  try {
    Session.find().remove({ _id: sessionId }, () => {
      console.log('Session deleted from db!');
      resolve('Logout success!')
    });
  }
  catch(err) {
    reject(err)
  }
})
