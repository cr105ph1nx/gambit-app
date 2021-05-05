const Admin = require("../models/admin");

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
    const admin = new Admin({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      club_id: req.body.club_id,
    });
    try {
      const newAdmin = await admin.save();
      res.status(201).json(newAdmin);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Updating an admin
  async updateAdmin(req, res, next) {
    if (req.body.email != null) res.admin.email = req.body.email;
    if (req.body.password != null) res.admin.password = req.body.password;
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
      await res.admin.remove();
      res.json({ message: "Deleted Admin" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },
};
