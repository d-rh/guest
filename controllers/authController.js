// controllers/authController.js

const mongoose = require('mongoose'),
      friend   = require('../models/friend.js')

exports.verifyLogin = (user) => {
  friend.findOne({ username: user.username }, function (err, match) {
    console.log(match)
    match.comparePassword(user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) console.log ('authenticated!')
      else console.log ('oops!')
    })
  })
}