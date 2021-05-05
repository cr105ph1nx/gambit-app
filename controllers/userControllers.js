const User = require("../models/user");

module.exports = {
  // Find user by ID
  async getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "user could not be found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
  },

  // Get all users
  async index(req, res, next) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },

  // Get User by ID
  async getUserByID(req, res, next) {
    res.send(res.user.email);
    next();
  },

  // Creating a user
  async createUser(req, res, next) {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Updating a user
  async updateUser(req, res, next) {
    if (req.body.email != null) res.user.email = req.body.email;
    if (req.body.password != null) res.user.password = req.body.password;
    if (req.body.role != null) res.user.role = req.body.role;
    if (req.body.username != null) res.user.username = req.body.username;

    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    next();
  },

  // deleting a user
  async deleteUser(req, res, next){
    try {
      await res.user.remove();
      res.json({ message: "Deleted User" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  }
};
