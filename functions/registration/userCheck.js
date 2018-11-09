const Friend = require('../../models/friend');

const userCheck = async (username) => {
  const query = await Friend.findOne({ username: username }).exec();
  if (query === null) {
    return true
  } else if (query) {
    return false
  }
}
module.exports = userCheck;