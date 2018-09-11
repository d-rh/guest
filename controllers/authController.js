// controllers/authController.js

const friend = require('../models/friend.js');

exports.verifyLogin = (user) => {
  friend.findOne({ username: user.username }, (err, match) => {
    if (err) throw err;
    if (match) {
      match.comparePassword(user.password, (isMatch) => {
        if (err) throw err;
        if (isMatch) {
          console.log('authenticated!');
          console.log(match);
          return match;
        }
        console.log('Incorrect password.');
      });
    } else console.log('Incorrect username.');
  });
};
