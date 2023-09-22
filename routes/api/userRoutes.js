const router = require('express').Router();

// Imports the controller functions for user operations
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userControllers');

// Define routes for handling user-related operations

// Route for getting all users and creating a new user
router
  .route('/')
  .get(getAllUsers) // Handles GET requests to retrieve all users
  .post(createUser); // Handles POST requests to create a new user

// Route for getting, updating, or deleting a user by their ID
router
  .route('/:id')
  .get(getUserById) // Handles GET requests to retrieve a user by ID
  .put(updateUserById)// Handles PUT requests to update a user by ID
  .delete(deleteUser); // Handles DELETE requests to delete a user by ID

// Route for adding or removing a friend from a user's friends list
router
  .route('/:id/friends/:friendId')
  .post(addFriend) // Handles POST requests to add a friend
  .delete(deleteFriend); // Handles DELETE requests to remove a friend

module.exports = router;
