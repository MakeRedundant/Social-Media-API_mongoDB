const { Schema, model } = require('mongoose');

// Defines the User schema
const UserSchema = new Schema(
  {
    // Username field
    //Attributes/Properties
    username: {
      type: String, //sub attributes/properties
      unique: true,
      max_length: 9, // Maximum length for the username
      trim: true, // Remove leading/trailing spaces
      required: ' Error! Username is Required', // Error message if not provided
    },

    // Email field
    email: {
      type: String,
      unique: true,
      max_length: 9,
      required: 'Error! Email is Required',
      match: [/.+@.+\..+/], // Email format validation using a regular expression
    },

    // Array of references to 'Thought' documents
    thoughts: [
      { //It's defined as an array of Schema.Types.ObjectId objects, allowing users to have multiple thoughts associated with them
        type: Schema.Types.ObjectId,
        ref: 'Thought', // References the 'Thought' model
      },
    ],

    // Array of references to other 'User' documents (friends)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the 'User' model
      },
    ],
  },
  {
    // Options
    toJSON: {
      virtuals: true, // Include virtual properties in the JSON representation
    }, //Virtuals are properties that are not stored in the database but can be calculated based on existing fields.
    id: false, // Exclude the default '_id' field from JSON representation
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

//UserSchema.virtual('friendCount') essentially creates a property called friendCount that doesn't exist in the actual MongoDB document but can be accessed and used like a regular property.
//.get(function () { return this.friends.length; }) This defines a getter function for the virtual property. The getter function calculates the value of friendCount based on the length
//of the friends array in the document. It returns the number of friends a user has by counting the elements in the friends array.
//when you access the friendCount virtual prop for a user, Mongoose will execute the getter function and it will compute the friend count based on the friends array's length.
const User = model('User', UserSchema);

module.exports = User;
