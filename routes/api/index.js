const router = require('express').Router();         // import the express router from the express package (npm i express) 
const thoughtRoutes = require('./thought-routes');  // import the thought-routes.js file
const userRoutes = require('./user-routes');        // import the user-routes.js file

// add prefix of `/thoughts` to routes created in `thought-routes.js`
router.use('/thoughts', thoughtRoutes);             // use the thoughtRoutes file for the /thoughts route

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);                   // use the userRoutes file for the /users route

module.exports = router;                            // export the router called in server.js