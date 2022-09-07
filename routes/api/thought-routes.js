const router = require('express').Router();         // import the express router from the express package (npm i express)

const {
    getAllThought,                                  // import the getAllThought function from the thought-controller.js file
    getThoughtById,                                 // import the getThoughtById function from the thought-controller.js file
    createThought,                                  // import the createThought function from the thought-controller.js file
    updateThought,                                  // import the updateThought function from the thought-controller.js file
    deleteThought,                                  // import the deleteThought function from the thought-controller.js file
    addReaction,                                    // import the addReaction function from the thought-controller.js file
    removeReaction                                  // import the removeReaction function from the thought-controller.js file
} = require('../../controllers/thought-controller');

// /api/thoughts <== this is already prepended to all of the below routes
router
    .route('/')                                     // route to /api/thoughts (GET all thoughts, POST a new thought)
    .get(getAllThought)                             // GET all thoughts
    .post(createThought);                           // POST a new thought

// /api/thoughts/:id <== this is already prepended to all of the below routes
router                  
    .route('/:id')                                  // route to /api/thoughts/:id (GET one thought by id, PUT to update thought by id, DELETE to remove thought by id)
    .get(getThoughtById)                            // get a thought by its _id and populated thought and user data 
    .put(updateThought)                             // update a thought by its _id   
    .delete(deleteThought);                         // delete a thought by its _id 

// /api/thoughts/:thoughtId/reactions <== this is already prepended to all of the below routes
router
    .route('/:thoughtId/reactions')                 // route to /api/thoughts/:thoughtId/reactions (POST to create a reaction stored in a single thought's reactions array field)
    .post(addReaction);                             // add a reaction to a thought's reactions array field

// /api/thoughts/:thougts/reaationid <== this is already prepended to all of the below routes
router
    .route('/:thoughtId/reactions/:reactionId')     // route to /api/thoughts/:thoughtId/reactions/:reactionId (DELETE to pull and remove a reaction by the reaction's reactionId value)
    .delete(removeReaction);                        // delete a reaction by its reactionId

module.exports = router;                            // export the router



