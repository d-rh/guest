// ~/controllers/friendController.js

const Friend = require('../models/friend');

exports.valReg = async (req) => {
  let errors = [];
  let formUserName = req.formUserName;
  console.log(formUserName)
  let email = req.email;
  let password = req.password;
  let passConf = req.passConf;
  if (typeof formUserName === 'undefined') errors.push('Please create a username with at least 3 characters');
  if (typeof email === 'undefined') errors.push('Please enter a valid email address');
  if (password.length < 5) errors.push('Please enter at least five characters for a password');
  if (password != passConf) errors.push('Please ensure Password and Password Confirmation match');
  if (errors.length === 0) {
    await Friend.findOne({ username: req.formUserName}, (err, match) => {
      try {
        if (match) errors.push('A user with this username already exists!');
      } catch (err) {
        errors.push(err)
      }
    });
    await Friend.findOne({ email: req.email}, (err, match) => {
      try {
        if (match) errors.push('A user with this email address already exists!');
      } catch (err) {
        errors.push(err)
      }
    });
  }
  // console.log(errors);
  return {
    formUserName: formUserName,
    email: email,
    errors: errors
  };
}


exports.friendCreatePost = (friend) => {
  // mongoDB generates _id field when a new
  // document is inserted and it omits
  // the _id field
  const user = new Friend({
    username: friend.formUserName,
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
