const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormats');
const ReactionSchema = require('./reaction');

// Defines the Thought schema
const thoughtSchema = new Schema(
  {
    // Thought text field
    thoughtText: {
      type: String,
      required: 'Error! Thought is Required',
      minlength: 1,
      maxlength: 280,
    },
    // Creation timestamp field
    createdOn: {
      type: Date,
      default: Date.now,
      //In Mongoose, a getter method is a function defined within a schema that allows you to customize the way a field's value is retrieved or presented when querying documents.
      //Here we use the getter method to take the timestamp value in the createdIb fuekd abd apply the dateFormat function to format it to what we want.
      get: (timestamp) => dateFormat(timestamp),
    },
    // Username field
    username: {
      type: String,
      required: true,
    },

    // Array of nested documents created with the ReactionSchema
    reactions: [ReactionSchema],
  },
  {
    // Schema options
    toJSON: {
      virtuals: true,
      getters: true, // Apply getters when converting to JSON
    },
    id: false,
  }
);

//This mongoose method defines a virtual property called reaction count that you
//can acess on the doco but not stored in the db, they are created from other fields

thoughtSchema.virtual('reactionsCounter').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;