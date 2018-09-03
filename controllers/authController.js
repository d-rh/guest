// controllers/authController.js

const mongoose = require('mongoose'),
      friend   = require('../models/friend.js')

exports.verifyLogin = (user) => {
  console.log(user)
  friend.findOne({ username: user.username }, function (err, match) {
    console.log(match)
    match.methods.comparePassword(user.password, function (err, isMatch) {
      if (err) throw err;
      console.log(isMatch)
    })
  })
/*
  friend.findOne (match, function (err, user) {
    console.log(user)
    console.log(match)
    if (err) throw err;
    friend.methods.comparePassword(user.password, function (err, isMatch) {
        if (err) throw err;
        console.log ('In comparePassword!')
    });
  });
  */
}