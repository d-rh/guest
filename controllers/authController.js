// controllers/authController.js

const Friend = require('../models/friend');
const sessController = require('./sessController')

exports.verifyLogin = user => new Promise((resolve, reject) => {
  
  const INCORRECT_PW = "Incorrect password";
  const INCORRECT_USER = "Incorrect username";

  Friend.findOne({ username: user.username }, (err, match) => {
    if (err) reject(err);
    if (match) {
      match.comparePassword(user.password, (err, isMatch) => {
        if (err) reject(err);
        if (isMatch) {
          return sessController.sessionCreatePost()
            .then((result) => {
              resolve(result)
            })
        }

        resolve({
          result: INCORRECT_PW
        });
      });

    } else {

      resolve({
        result: INCORRECT_USER
      });
      
    }
  });
});
