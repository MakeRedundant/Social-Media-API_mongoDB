const { Thought } = require('../models/thought');
const User = require('../models/user');


const thoughtController = {
  // Gets all thoughts
  async getAllThoughts(req, res) {
    try {
      const ThoughtData = await Thought.find({});
      res.json(ThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Get one user by their id
  async getThoughtById({ params }, res) {
    try {
      const ThoughtData = await Thought.findOne({ _id: params.thoughtId });
      if (!ThoughtData) {
        res.status(404).json({ message: ' Error! No thought found with this id!' });
        return;
      }
      res.json(ThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // add thought to user
  async addThought({ params, body }, res) {
    console.log(body);
    try {
      const createdThought = await Thought.create(body);
      const { _id } = createdThought;
      const UserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
      if (!UserData) {
        res.status(404).json({ message: 'Error! No user found with this id!' });
        return;
      }
      res.json(UserData);
    } catch (err) {
      res.json(err);
    }
  },

  // update thought by id
  async updateThought({ params, body }, res) {
    try {
      const ThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        body,
        { new: true, runValidators: true }
      );
      if (!ThoughtData) {
        res.status(404).json({ message: 'Error! No thought found with this id!' });
        return;
      }
      res.json(ThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove thought by id
  async removeThought({ params }, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: params.thoughtId });
      if (!deletedThought) {
        return res.status(404).json({ message: 'Error! No thought with this id!' });
      }
      const UserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId } }, 
        { new: true }
      );
      if (!UserData) {
        res.status(404).json({ message: 'Error! No user found with this id!' });
        return;
      }
      res.json(UserData);
    } catch (err) {
      res.json(err);
    }
  },

  // adds a reaction
  async addReaction({ params, body }, res) {
    try {
      const ThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
      );
      if (!ThoughtData) {
        return res.status(404).json({ message: 'Error! No thought found with this id!' });
      }
      res.json(ThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // removes reaction
  async removeReaction({ params }, res) {
    console.log(params.thoughtId, params.reactionId);
    try {
      const UserData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } }, //pull operator to remove an element from the reactions array
        { runValidators: true, new: true }
      );
      res.json(UserData);
    } catch (err) {
      res.json(err);
    }
  }
};

module.exports = thoughtController;
