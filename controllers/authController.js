// controllers/authController.js

const Friend = require('../models/friend');
const sessController = require('./sessController')

exports.verifyLogin = user => new Promise((resolve, reject) => {
  Friend.findOne({ username: user.username }, (err, match) => {
    if (err) reject(err);
    if (match) {
      match.comparePassword(user.password, (err, isMatch) => {
        if (err) reject(err);
        if (isMatch) {
          resolve(sessController.sessionCreatePost());
        }
        console.log('Incorrect password.');
        resolve(null);
      });
    } else {
      console.log('Incorrect username.');
      resolve(null);
    }
  });
});
