const Admin = require("../models/admin");
const User = require("../models/user");

const bcrypt = require("bcryptjs");

module.exports = {
  // Find admin by ID
  async getAdmin(req, res, next) {
    let admin;
    try {
      admin = await Admin.findById(req.params.id);
      if (admin == null) {
        return res.status(404).json({ message: "admin could not be found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.admin = admin;
    next();
  },

  // Getting all admins
  async index(req, res, next) {
    try {
      const admins = await Admin.find();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },

  // Getting an admin by ID
  async getAdminByID(req, res, next) {
    res.send(res.admin.email);
    next();
  },

  // Creating an admin
  async createAdmin(req, res, next) {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // create admin
    const admin = new Admin({
      email: req.body.email,
      username: req.body.username,
      club_id: req.body.club_id,
    });

    // create user
    const user = new User({
      email: req.body.email,
      password,
      role: "admin",
    });

    try {
      const newAdmin = await admin.save();
      const newUser = await user.save();

      res.status(201).json(newAdmin, newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Updating an admin
  async updateAdmin(req, res, next) {
    if (req.body.email != null) {
      // update user email
      await User.findOneAndUpdate(
        res.admin.email,
        { email: req.body.email },
        {
          new: true,
        }
      );
      // update admin email
      res.admin.email = req.body.email;
    }
    if (req.body.club_id != null) res.admin.club_id = req.body.club_id;
    if (req.body.username != null) res.admin.username = req.body.username;

    try {
      const updatedAdmin = await res.admin.save();
      res.json(updatedAdmin);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Deleting an admin
  async deleteAdmin(req, res, next) {
    try {
      // delete user associated with admin account
      await User.findOneAndDelete({ email: res.admin.email }, (err, docs) => {
        if (err) console.log(err);
        else {
          console.log(docs);
        }
      });
      // delete admin account
      await res.admin.remove();

      res.json({ message: "Deleted Admin" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },
};
