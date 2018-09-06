// controllers/sessController.js

const Session = require('../models/session.js')

exports.createSession = (user) => {
  const session = new Session({
    user: user
  })

  session.save()
    .then(doc => {
      console.log (doc) 
    })
    .catch(err => {
      console.error(err)
    })
}