const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// /api/users <== this is already prepended to all of the below routes
router
    .route('/')                                     // route to /api/users (GET all users, POST a new user)
    .get(getAllUser)                                // GET all users  
    .post(createUser);                              // POST a new user

// /api/users/:id <== this is already prepended to all of the below routes
router
    .route('/:id')                                  // route to /api/users/:id (GET one user by id, PUT to update user by id, DELETE to remove user by id)
    .get(getUserById)                               // get a user by its _id and populated thought and friend data
    .put(updateUser)                                // update a user by its _id
    .delete(deleteUser);                            // delete a user by its _id

// /api/users/:userId/friends/:friendId <== this is already prepended to all of the below routes
router
    .route('/:userId/friends/:friendId')            // route to /api/users/:userId/friends/:friendId (POST to add a new friend to a user's friend list, DELETE to remove a friend from a user's friend list)
    .post(addFriend)                                // add a new friend to a user's friend list
    .delete(deleteFriend);                          // remove a friend from a user's friend list

module.exports = router;                            // export the router

