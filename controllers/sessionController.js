
const createSession = require('../functions/sessions/createSession');
const sessionVerify = require('../functions/sessions/sessionVerify');
const getActiveUsers = require('../functions/sessions/getActiveUsers');

exports.sessionCreatePost = match => createSession(match);
exports.sessionVerify = req => sessionVerify(req);
exports.getActiveUsers = () => getActiveUsers();