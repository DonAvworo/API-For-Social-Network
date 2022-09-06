//import mongoose from the node modules folder 
const mongoose = require('mongoose');

//connect to the database
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/your-database-name', 
    {
        useNewUrlParser: true,          //use the new url parser. this will used to parse the connection string to the database
        useUnifiedTopology: true        //use the new topology engine. this will used to monitor the database connection
    }
);

mongoose.set('debug', true);            //set the debug mode to true. this will used to log the database queries to the console

module.exports = mongoose.connection;   //export the connection to the database to be used in other files