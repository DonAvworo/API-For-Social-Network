const schema = {Schema, model} = require('mongoose'); //import the mongoose package and destructure the Schema and model properties from it
                                                      // destructuring is a way to extract multiple properties from an object and assign them to their own variables
                                                      // the destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables
const UserSchema = new Schema( {
    
        username: {
            type: String,
            unique: true,
            required: 'You need to provide a username!',
            trim: true   //remove any leading or trailing white space
        },
        email: { 
            type: String,
            required: 'You need to provide an email address!',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']  //use a regular expression to validate the email address
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,   //use the ObjectId data type
                ref: 'Thought'                 //use the Thought model for the data
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,   //use the ObjectId data type      
                ref: 'User'                    //use the User model for the data
            }
        ]
    },

    {
        toJSON: {    
            virtuals: true,   //include virtual properties when data is requested
            getters: true     //include getters when data is requested
        },
        id: false           //disable the virtual id property
    }
);

//create a virtual called friendCount that retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {  // use the function keyword to allow the this keyword to work correctly
    return this.friends.length;                     //return the length of the user's friends array  
});

const User = model('User', UserSchema);         //create the User model using the UserSchema


module.exports = User;                          //export the User model to be used in other files
