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

exports.createSessionId = result => {
  if (result['_id']) {
    res.cookie('sessId', result['id'], { 
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true, 
    });
    res.render('./feed', { title: 'Welcome!', result })
  } else if (result === 'Incorrect Password' || 'Incorrect username') {
    console.error(result)
    res.render('login', { title: result, result });
  }
}

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