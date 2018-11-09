const Session = require('../../models/session')

const createSession = match => {
  // mongoDB generates _id field when a new
  // document is inserted and it omits
  // the _id field
  const session = new Session({
    username: match.username
  });
  return session.save()
    .then( outcome => {
      return outcome
    })
}
module.exports = createSession;