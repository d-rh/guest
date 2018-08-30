// ~/controllers/friendController.js

const Friend      = require('../models/friend')

exports.friend_create_post = (friend) => {
  let user = {
    first_name : friend.first_name,
    last_name : friend.last_name,
    username : friend.username,
    password : friend.password
  }
  console.log(user)
}