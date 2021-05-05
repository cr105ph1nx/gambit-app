const express = require("express");
const router = express.Router();

const clubControllers = require("../controllers/clubControllers");

// Getting all clubs
router.get("/", clubControllers.index);

// Getting one club by id
router.get("/:id", clubControllers.getClub, clubControllers.getClubByID);

// Creating a club
router.post("/", clubControllers.createClub);

// Updating a club
router.patch("/:id", clubControllers.getClub, clubControllers.updateClub);

// Deleting a club
router.delete("/:id", clubControllers.getClub, clubControllers.deleteClub);

module.exports = router;
