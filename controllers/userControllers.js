const User = require("../models/user");
const Admin = require("../models/admin");
const Participant = require("../models/participant");

const bcrypt = require("bcryptjs");

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
    if (req.body.email != null) {
      // check if user is admin or participant
      if (res.user.role === "admin") {
        // update admin associated with user account
        await Admin.findOneAndUpdate(
          res.user.email,
          { email: req.body.email },
          {
            new: true,
          }
        );
      } else if (res.user.role === "participant") {
        // update participant associated with user account
        await Participant.findOneAndUpdate(
          res.user.email,
          { email: req.body.email },
          {
            new: true,
          }
        );
      }

      // update user email
      res.user.email = req.body.email;
    }
    if (req.body.password != null) res.user.password = req.body.password;

    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    next();
  },

  // deleting a user
  async deleteUser(req, res, next) {
    try {
      // check if user is admin or participant
      if (res.user.role === "admin") {
        // delete admin associated with user account
        await Admin.findOneAndDelete({ email: res.user.email }, (err, docs) => {
          if (err) console.log(err);
          else {
            console.log(docs);
          }
        });
      } else if (res.user.role === "participant") {
        // delete participant associated with user account
        await Participant.findOneAndDelete(
          { email: res.user.email },
          (err, docs) => {
            if (err) console.log(err);
            else {
              console.log(docs);
            }
          }
        );
      }
      // delete user
      await res.user.remove();
      res.json({ message: "Deleted User" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },

  // Login
  async loginValidation(req, res, next) {
    // check if email exists
    const user = await User.findOne({ email: req.body.email });

    // throw error when email is wrong
    if (!user) return res.status(400).json({ error: "Account does not exist" });

    // check for password correctness
    let validPassword;
    if (user.role === "admin") {
      validPassword = await bcrypt.compare(req.body.password, user.password);
    } else if (user.role === "participant") {
      if (user.password === req.body.password) validPassword = true;
    }

    if (!validPassword) {
      return res.status(400).json({ error: "Password is wrong" });
    } else {
      // get user info (admin/participant)
      let user_info = {};
      try {
        if (user.role === "admin") {
          user_info = await Admin.findOne({ email: req.body.email });
        } else {
          user_info = await Participant.findOne({ email: req.body.email });
        }
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }

      res.json({
        error: null,
        data: {
          message: "Login successful",
          role: user.role, //send role of the user
          user_info: user_info,
        },
      });
    }
    next();
  },
};
