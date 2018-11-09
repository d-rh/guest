const Friend = require('../../models/friend');

function verifyLogin(user) {
  return new Promise((resolve, reject) => {
    if (!user) resolve({ result: verifyLogin.NOT_AUTHENTICATED })
    Friend.findOne({ username: user.username }, (err, match) => {
      if (err) reject(err);
      if (match) {
        match.comparePassword(user.password, (err, isMatch) => {
          if (err) reject(err);
          if (isMatch) {
            resolve(
            {
              result: verifyLogin.AUTHENTICATED,
              username: user.username,
            })
          }
          else resolve(verifyLogin.NOT_AUTHENTICATED);
        });
      }
      else resolve(verifyLogin.NOT_AUTHENTICATED);
    });
  })
}
verifyLogin.NOT_AUTHENTICATED = "NOT_AUTHENTICATED"
verifyLogin.AUTHENTICATED = "AUTHENTICATED"

module.exports = verifyLogin;