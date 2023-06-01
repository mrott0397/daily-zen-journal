const { Schema, model } = require('mongoose');

const journalSchema = new Schema({
  thoughts: {
    type: String,
    required: true,
  },
  entryId: {
    type: String,
    required: true,
  },
});


module.exports = journalSchema;
