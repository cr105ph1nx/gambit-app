const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");

// Getting all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one admin by id
router.get("/:id", getAdmin, (req, res) => {
  res.send(res.admin.email);
});

// Creating an admin
router.post("/", async (req, res) => {
  const admin = new Admin({
    email: req.body.email,
    password: req.body.password,
    club_id: req.body.club_id,
  });
  try {
    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating an admin
router.patch("/:id", getAdmin, async (req, res) => {
  if (req.body.email != null) res.admin.email = req.body.email;
  if (req.body.password != null)
    res.admin.password = req.body.password;
  if (req.body.club_id != null)
    res.admin.club_id = req.body.club_id;

  try {
    const updatedAdmin = await res.admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting an admin
router.delete("/:id", getAdmin, async (req, res) => {
  try {
    await res.admin.remove();
    res.json({ message: "Deleted Admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getAdmin(req, res, next) {
  let admin;
  try {
    admin = await Admin.findById(req.params.id);
    if (admin == null) {
      return res
        .status(404)
        .json({ message: "admin could not be found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.admin = admin;
  next();
}

module.exports = router;
