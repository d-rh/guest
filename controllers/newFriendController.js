// ~/controllers/friendController.js

const Friend = require('../models/friend')

exports.friendCreatePost = (friend) => {
  // mongoDB generates _id field when a new
  // document is inserted and it omits
  // the _id field
  const user = new Friend({
    first_name  : friend.first_name,
    last_name   : friend.last_name,
    username    : friend.username,
    password    : friend.password
  })

  user.save()
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
}