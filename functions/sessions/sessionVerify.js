const Session = require('../../models/session')

const sessionVerify = req => {
   return new Promise ( (resolve, reject) => {
    const sessionId = req.cookies.sessId;
    const AUTHORIZED = 'Logged In'
    const UNAUTHORIZED = 'Not Logged In'

    Session.findOne({_id: sessionId}, (err, match) => {
      try {
        if (match) resolve(AUTHORIZED)
        else resolve(UNAUTHORIZED);
      }
      catch (err) {
        reject(err)
      }
    })
  })
}
module.exports = sessionVerify;