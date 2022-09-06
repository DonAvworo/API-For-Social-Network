const {Schema, model, Types} = require('mongoose');  //import the mongoose package and destructure the Schema, model, and Types properties from it
const dateFormat = require('../utils/dateFormat');   //import the dateFormat function from the utils/dateFormat.js file

const ReactionSchema = new Schema( {
    //set custom id to avoid confusion with parent thought _id
    reactionId: {
        type: Schema.Types.ObjectId,    //use the ObjectId data type
        default: () => new Types.ObjectId()  //use a function to set the default value for the reactionId to a new ObjectId
    },
    reactionBody: {
        type: String,
        required: 'You need to provide a reaction!',
        maxLength: 280
    },
    username: { 
        type: String,
        required: 'You need to provide a username!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)  //use the dateFormat function to format the date
    }
},
{
    toJSON: {
        getters: true
    }
}
);

const ThoughtSchema = new Schema( {
    thoughtText: {
        type: String,
        required: 'You need to provide a thought!',
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)  //use the dateFormat function to format the date
    },
    username: {
        type: String,
        required: 'You need to provide a username!'
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

//create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {  // use the function keyword to allow the this keyword to work correctly
    return this.reactions.length;                         //return the length of the thought's reactions array
});

const Thought = model('Thought', ThoughtSchema);  //create the Thought model using the ThoughtSchema

module.exports = Thought;                         //export the Thought model to be used in other files


//date format function: https://www.npmjs.com/package/dateformat
//mongoose virtuals: https://mongoosejs.com/docs/tutorials/virtuals.html