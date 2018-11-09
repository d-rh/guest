const Session = require('../../models/session');

function verifyAuth (req, res) {
  return new Promise((resolve, reject) => {
    if (!req.cookies.sessId) {
      resolve(res.redirect('/login'));
    }
    Session.findOne({ _id: req.cookies.sessId }, (err, match) => {
      if (match) {
        resolve(verifyAuth.AUTHORIZED);
      } else {
        resolve(verifyAuth.NOT_AUTHORIZED);
      }
      reject(err)
    })
  })
}
verifyAuth.AUTHORIZED = "AUTHORIZED";
verifyAuth.NOT_AUTHORIZED = "NOT_AUTHORIZED"

module.exports = verifyAuth;