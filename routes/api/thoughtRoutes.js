const router = require('express').Router();
const {
  getAllThoughts,
  addThought,
  getThoughtById,
  updateThought,
  removeThoughtByID,
  addReaction,
  removeReactionByID
} = require('../../controllers/thoughtsControllers');

// const { route } = require('./user-routes');

// Route for retrieving all thoughts
// /api/thoughts
router.route('/').get(getAllThoughts);

// Route for adding a thought to a user
// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// Route for retrieving a specific thought by its ID
// GET /api/thoughts/<thoughtId>
// Route for updating a specific thought by its ID
// PUT /api/thoughts/<thoughtId>
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought);

// Route for deleting a specific thought by its ID
// DELETE /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .delete(removeThoughtByID);

// Route for adding a reaction to a thought
// POST /api/thoughts/<thoughtId>/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// Route for removing a specific reaction from a thought by its ID
// DELETE /api/thoughts/<thoughtId>/reactions/<reactionId>
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReactionByID);

module.exports = router;