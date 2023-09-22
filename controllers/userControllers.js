const { User, Thought } = require('../models');

//Mongoose syntax

const userController = {
  // Gets all users using async/await
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  //This code is the same thing but with .then and .catch
  /*const userController = {
  // Gets all users
  getAllUsers(req, res) {
    User.find({}) //Mongoose method to query the db for all users " empty braces" means to retrieve all users without any filters
      .then((UsersData) => res.json(UsersData)) //promise chain if success return array of userdata >json  response
      // If there is an error during the database query or any other part of the process, the .catch block is executed.
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  */
  // Gets one user by their id using async/await
  async getUserById({ params }, res) {
    try {
      const UserData = await User.findOne({ _id: params.id })
        .populate('thoughts')
        .populate('friends');
      // .select('-__v'); // You can exclude the __v field if needed
      if (!UserData) {
        res.status(404).json({ message: 'Error!, No users found with this id!' });
        return;
      }
      res.json(UserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  /*
  // Gets one user by their id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id }) //Mongoose find one method for a specific id
      .populate('thoughts') //Mongoose populate method to replace ids of user's thought and friends
      .populate('friends')
      //   .select('-__v') // It excludes the __v field so the version stuff from the user data when sending the response.
      .then((UserData) => {
        if (!UserData) {
          res
            .status(404)
            .json({ message: 'Error!, No users found with this id!' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  */

  // create a new user
  async createUser(req, res) {
    try { //try block wraps the code that may throw a error
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //This code uses traditional promises with .then and .catch
  // Creates a User
  //   createUser({ body }, res) {
  //     User.create(body)
  //       .then((UserData) => res.json(UserData))
  //       .catch((err) => res.status(400).json(err));
  //   },

  // Update user by id using async/await
  async updateUserById({ params, body }, res) {
    try {
      const UserData = await User.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true, runValidators: true }
      );
      if (!UserData) {
        res.status(404).json({ message: 'Error! No user found with this id!' });
        return;
      }
      res.json(UserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  /*
  // update user by id
  updateUserbyId({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((UserData) => {
        if (!UserData) {
          res
            .status(404)
            .json({ message: 'Error! No user found with this id!' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.status(400).json(err));
  },
*/
  // Delete user
  async deleteUser({ params }, res) {
    try {
      const UserData = await User.findOneAndDelete({ _id: params.id });
      if (!UserData) {
        return res
          .status(404)
          .json({ message: 'Error! No user found with this id!' });
      }
      // Delete thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: userData.thoughts } }); //Mongoose method that removes multiple documents from a collection that match the specified condition.
      res.json({ message: 'Success! User has been deleted.' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  /*
  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((UserData) => {
        if (!UserData) {
          return res
            .status(404)
            .json({ message: 'Error! No user found with this id!' });
        }

        // bonus: return Thought.deleteMany({ _id: { $in: UserData.thoughts } })
      })
      .then(() => {
        res.json({ message: 'Success! user has been deleted.' });
      })
      .catch((err) => res.status(400).json(err));
  },
  */

  // Adds friend
  async addFriend({ params }, res) {
    try {
      const UserData = await User.findOneAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: params.friendId } },
        { runValidators: true }
      );
      if (!UserData) {
        return res
          .status(404)
          .json({ message: 'Error! No user found with this id!' });
      }
      res.json(UserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  /*
  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendId } },
      { runValidators: true }
    )
      .then((UserData) => {
        if (!UserData) {
          res
            .status(404)
            .json({ message: 'Error! No user found with this id!' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  */
  // Remove friend
  async removeFriend({ params }, res) {
    try {
      const UserData = await User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { runValidators: true }
      );
      if (!UserData) {
        return res
          .status(404)
          .json({ message: 'Error! No user found with this id!' });
      }
      res.json(UserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  /*
  // remove friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { runValidators: true }
    )
      .then((UserData) => {
        if (!UserData) {
          res
            .status(404)
            .json({ message: 'Error! No user found with this id!' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  */
};


module.exports = userController;
