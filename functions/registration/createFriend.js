
const Friend = require('../../models/friend');

const createFriend = async (friend) => {
  // mongoDB generates _id field when a new
  // document is saved without an id field
  const user = new Friend({
    username: friend.formUserName.toLowerCase(),
    firstName: friend.formFirstName,
    lastName: friend.formLastName,
    password: friend.password,
  });
  return user.save()
    .then((doc) => {
      console.log(doc)
      return createFriend.SUCCESS;
    })
    .catch((err) => {
      console.error(err);
      return createFriend.ERROR;
    });
}
createFriend.SUCCESS = 'success';
createFriend.ERROR = 'error';
module.exports = createFriend