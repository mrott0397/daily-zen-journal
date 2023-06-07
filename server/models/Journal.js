const { Schema, model } = require('mongoose');

const journalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  entryId: {
    type: String,
    required: true,
  },
  thoughts: {
    type: String,
    required: true,
  }
});


module.exports = journalSchema;
