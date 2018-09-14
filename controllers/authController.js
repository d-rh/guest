// controllers/authController.js

const friend = require('../models/friend.js');

exports.verifyLogin = user => new Promise((resolve, reject) => {
  friend.findOne({ username: user.username }, (err, match) => {
    if (err) reject(err);
    if (match) {
      match.comparePassword(user.password, (err, isMatch) => {
        if (err) reject(err);
        if (isMatch) {
          console.log('authenticated!');
          console.log(match);
          resolve({ _id: 'XOXOXOGLAMOURGIRL' });
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
