const userCheck = require('../functions/registration/userCheck')
const valReg = require('../functions/registration/validateRegistration');
const createFriend = require('../functions/registration/createFriend')

exports.userCheck = user => userCheck(user);
exports.valReg = req => valReg(req);
exports.friendCreatePost = req => createFriend(req);