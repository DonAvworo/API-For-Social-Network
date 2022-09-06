const { User, Thought } = require("../models");

const userController = {
  getAllUser(req, res) {        // get all Users from the database
    User.find({})
      .populate({               // populate the user's thoughts and friends
        path: "friends",
        select: "-__v",
      })
      .select("-__v")                               // exclude the __v field from the results (this is a MongoDB thing www.mongodb.com/try/download/versioning)) 
      .sort({ _id: -1 })                            // sort the results by _id in descending order
      .then((dbUserData) => res.json(dbUserData))   // return the results as JSON
      .catch((err) => {                             // if there's an error, return the error message
        console.log(err);                           // log the error message to the console
        res.sendStatus(400);                        // return a 400 status code
      });
  },

 
  getUserById({ params }, res) {                    // get one user by id from the database (the id is passed in the request parameters)
    User.findOne({ _id: params.id })                // find the user by its _id field (the id is passed in the request parameters)
      .populate({                                   // populate the user's thoughts and friends (the  thoughts )
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",                            // populate the user's friends
        select: "-__v",                             // exclude the __v field from the results (this is a MongoDB thing www.mongodb.com/try/download/versioning))
      })
      .select("-__v")
      .then((dbUserData) => {                       // if the user is found, return the user as JSON
        if (!dbUserData) {                          // if the user is not found, return a 404 status code
          return res
            .status(404)                            // return a 404 status code
            .json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
    
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted!" });
      })
      .catch((err) => res.json(err));
  },

  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};
module.exports = userController;