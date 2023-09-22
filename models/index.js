const User = require('./user');
const Thought = require('./thought');
// const Reaction = require('./thought');

module.exports = { User, Thought };

//No need to export the reaction model since it is primarily associated with
//the thoughts model as a nested schema.