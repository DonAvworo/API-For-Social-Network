const router = require('express').Router();        // import the express router from the express package (npm i express)
const apiRoutes = require('./api');                // import the api-routes.js file

// add prefix of `/api` to routes created in `api-routes.js`
router.use('/api', apiRoutes);                     // use the apiRoutes file for the /api route

// make the 404 message change color
router.use ((req, res) => {                        // if the user tries to access a route that doesn't exist, send a 404 error
    res.status(404).send('<h1 style="color: red;"> 404 Error!</h1>'); // send a 404 error message to the user in red text 😝 
});

module.exports = router;                           // export the router

