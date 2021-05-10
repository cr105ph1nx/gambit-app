const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const User = require("../models/user");

// Getting all users
router.get("/", userController.index);

// Getting one user by id
router.get("/:id", userController.getUser, userController.getUserByID);

// Creating a user
router.post("/", userController.createUser);

// Updating a user
router.patch("/:id", userController.getUser, userController.updateUser);

// Deleting a user
router.delete("/:id", userController.getUser, userController.deleteUser);

// lOGIN ROUTE
router.post("/login", userController.loginValidation);

// PROFILE ROUTES
router.post(
  "/board",
  userController.loginRequired,
  userController.participantProfile
);
router.post(
  "/panel",
  userController.loginRequired,
  userController.adminProfile
);

module.exports = router;
