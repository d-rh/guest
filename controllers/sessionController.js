const Session = require('../models/session');

exports.sessionCreatePost = match => new Promise( (resolve, reject) => {
  // mongoDB generates _id field when a new
  // document is inserted and it omits
  // the _id field
  const session = new Session({
    username: match.username
  });

  session.save()
    .then((doc) => {
      resolve(doc);
    })
    .catch((err) => {
      console.error(err);
    });

    resolve(session)
});

exports.sessionVerify = (req) => new Promise ( (resolve, reject) => {
  const sessionId = req.cookies.sessId;
  const user = req.cookies.user;
  const AUTHORIZED = 'Logged In'
  const UNAUTHORIZED = 'Not Logged In'
  const FAILURE = 'ERROR'

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

exports.getActiveUsers = (req) => new Promise ( (resolve, reject) => {
  try {
    Session.find().then(sessions => resolve(sessions))
  }
  catch (err) {
    reject(err)
  }
})