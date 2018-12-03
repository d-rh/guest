
const Session = require('../../models/session')

const getActiveUsers = () => {
  return new Promise ( (resolve, reject) => {
    let now = new Date();
    let eightHoursAgo = now.setHours(now.getHours() - 8);
    let filterDate = new Date(eightHoursAgo).toISOString();
    Session.find({ "createdAt": { $gte: new Date(filterDate) } })
    .then(sessions => resolve(sessions))
  })
}
module.exports = getActiveUsers;