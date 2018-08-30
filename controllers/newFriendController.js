// ~/controllers/friendController.js

const Friend      = require('../models/friend')

exports.friend_create_post = (friend) => {
  let user = new Friend({
    first_name : friend.first_name,
    last_name : friend.last_name,
    username : friend.username,
    password : friend.password
  })
  user.save()
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
}