// ~/controllers/friendController.js

const Friend      = require('..models/friend')

exports.friend_create_post = [
  body('first name', 'first name required').isLength({min: 1}).trim(),
  (req, res, next) => {
    const friend = new Friend(
      {// not implemented!!}
    )
  }
]

