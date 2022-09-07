const express = require('express');                   // import the express package (npm i express)
const db = require('./config/connection');            // import the connection to the database
const routes = require('./routes');                   // import the routes file
const PORT = process.env.PORT || 3001;                // set the port to 3001 or the port specified in the .env file
const app = express();                                // create the express server

// middleware
app.use(express.json());                              // parse incoming JSON data
app.use(express.urlencoded({ extended: true }));      // parse incoming string or array data
app.use(routes);                                      // use the routes file

// turn on connection to db and server
db.once('open', () => {                                     // once the connection to the database is open, start the server
    app.listen(PORT, () => {                                // start the server
    console.log(`API server running on port ${PORT}!`);     // log the port the server is running on
    console.log('Use Ctrl+C to quit.');                     // log a message telling the user to use Ctrl+C to quit the server
    });
});

