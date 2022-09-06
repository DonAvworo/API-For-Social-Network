const User = require('./User');             //import the User model from the User.js file
const Thought = require('./Thought');       //import the Thought model from the Thought.js file

const models = { User, Thought };           //create an object that contains the User and Thought models

module.exports = models;                    //export the models object to be used in other files