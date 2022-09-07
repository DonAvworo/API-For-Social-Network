// create delete friend  route

const router = require('express').Router();
// const { deleteFriend } = require('../../controllers/friend-controller');
const { deleteFriend } = require('../../controllers/user-controller');

// /api/friends/:id
router
    .route('/:id')                                // route to /api/friends/:id (DELETE to remove a friend from a user's friend list)
    .delete(deleteFriend);                        // remove a friend from a user's friend list

module.exports = router;                          // export the router (this is called in server.js) ie. const routes = require('./routes'); 
                                                  // where './routes' is the path (folder) to this file





