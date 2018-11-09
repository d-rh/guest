const Entry = require("../../models/entry");

const getRecentEntries = () => {
  return new Promise((resolve, reject) => {
    const query = Entry.find().limit(10);
    resolve(query);
    if (err) reject(err);
  });
}
module.exports = getRecentEntries;