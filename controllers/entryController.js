
const createEntry = require('../functions/entries/createEntry');
const getRecentEntries = require('../functions/entries/getRecentEntries');
const createReply = require('../functions/entries/createReply');
const deleteEntry = require ('../functions/entries/deleteEntry');

exports.entryCreatePost = entry => createEntry(entry);
exports.getRecentEntries = () => getRecentEntries();
exports.replyCreatePost = reply => createReply(reply);
exports.entryDeletePost = entryId => deleteEntry(entryId);

