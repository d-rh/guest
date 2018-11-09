const Friend = require('../../models/friend');

const createFriend = async (friend) => {
  // mongoDB generates _id field when a new
  // document is saved without an id field
  const user = new Friend({
    username: friend.formUserName,
    firstName: friend.formFirstName,
    lastName: friend.formLastName,
    password: friend.password,
  });
  return user.save()
    .then((doc) => {
      console.log(doc)
      return 'success';
    })
    .catch((err) => {
      console.error(err);
      return 'error';
    });
}
module.exports = createFriend