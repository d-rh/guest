// ~/controllers/friendController.js

const Friend = require('../models/friend');

exports.valReg = async (friend) => {
  let errors = [];
  let username = friend.username;
  let email = friend.email;
  let password = friend.password;
  let passConf = friend.passConf;
  if (!username) errors.push('Please create a username');
  if (!email) errors.push('Please enter a valid email address');
  if (password.length < 5) errors.push('Please enter at least five characters for a password');
  if (password != passConf) errors.push('Please ensure password and Password confirmation match');
  if (errors.length === 0) {
    await Friend.findOne({ username: friend.username}, (err, match) => {
      try {
        if (match) errors.push('A user with this username already exists!');
      } catch (err) {
        errors.push(err)
      }
    });
    await Friend.findOne({ email: friend.email}, (err, match) => {
      try {
        if (match) errors.push('A user with this email address already exists!');
      } catch (err) {
        errors.push(err)
      }
    });
  }
  // console.log(errors);
  return {
    username: username,
    email: email,
    errors: errors
  };
}


exports.friendCreatePost = (friend) => {
  // mongoDB generates _id field when a new
  // document is inserted and it omits
  // the _id field
  const user = new Friend({
    username: friend.username,
    email: friend.email,
    password: friend.password,
  });

  user.save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
};
