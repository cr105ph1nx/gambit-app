const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/adminControllers");

// Getting all admins
router.get("/", adminControllers.index);

// Getting one admin by id
router.get("/:id", adminControllers.getAdmin, adminControllers.getAdminByID);

// Creating an admin
router.post("/", adminControllers.createAdmin);

// Updating an admin
router.patch("/:id", adminControllers.getAdmin, adminControllers.updateAdmin);

// Deleting an admin
router.delete("/:id", adminControllers.getAdmin, adminControllers.deleteAdmin);

module.exports = router;
