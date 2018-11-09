const Session = require('../../models/session');

function logOut (req) {
  return new Promise((resolve, reject) => {
    const sessionId = req.cookies.sessId;
    Session.find().deleteOne({ _id: sessionId }, () => {
      resolve(logOut.SUCCESS)
    });
  })
}
logOut.SUCCESS = 'LOGOUT_SUCCESS';

module.exports = logOut;