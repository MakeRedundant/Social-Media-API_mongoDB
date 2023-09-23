const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormats');

// Defines the reaction schema
const reactionSchema = new Schema(
  { //best ot create a unique ids for reaction so not to conflict with other ids within the application.
    reactionId: { // representing the unique identifier for a reaction.
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // is used to set a custom default value for reactionId. When a new reaction document is created, this code generates a new unique ObjectID as the default value for reactionId.
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 200,
    },
    username: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
