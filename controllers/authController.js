const sessionController = require('../controllers/sessionController');
const verifyLogin = require('../functions/auth/verifyLogin');
const verifyAuth = require('../functions/auth/verifyAuth');
const logOut = require('../functions/auth/logOut')

exports.verifyLogin = user => verifyLogin(user)
  .then( login => {
    if (login.result === "AUTHENTICATED") {
      return sessionController.sessionCreatePost(login)
      .then( session => {
        return session
      })
    }
  })
exports.verifyAuth = (req, res) => verifyAuth(req, res);
exports.logOut = (req, res) => logOut(req, res);