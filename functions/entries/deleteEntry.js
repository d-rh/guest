const Entry = require("../../models/entry");

const deleteEntry = (entryId) => {
  return new Promise((resolve, reject) => {
    if (entryId) {
      const query = { _id: entryId };
      Entry.deleteOne(query).exec();
      resolve(query);
    }
  })
}
module.exports = deleteEntry;