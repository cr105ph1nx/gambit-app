const express = require("express");
const router = express.Router();

const participantClubControllers = require("../controllers/participantClubControllers");
const clubControllers = require("../controllers/clubControllers");
const userControllers = require("../controllers/userControllers");

// Getting all participant/clubs
router.get("/", participantClubControllers.index);

// Getting one participant/club by id
router.get(
  "/:id",
  participantClubControllers.getParticipantClub,
  participantClubControllers.getParticipantClubByID
);

// Creating a participant/club
router.post("/", participantClubControllers.createParticipantClub);

// Updating a participant/club
router.patch(
  "/:id",
  participantClubControllers.getParticipantClub,
  participantClubControllers.updateParticipantClub
);

// Deleting a participant/club
router.delete(
  "/:id",
  participantClubControllers.getParticipantClub,
  participantClubControllers.deleteParticipantClub
);

// Getting participants in a set club given by ID
router.get(
  "/getCurrentParticipants/:id",
  clubControllers.getClub,
  participantClubControllers.getCurrentParticipants
);


// Getting participants in a set club given by ID
router.post(
  "/updateWin",
  userControllers.loginRequired,
  userControllers.adminRequired,
  participantClubControllers.updateWin
);

router.post(
  "/updateLoss",
  userControllers.loginRequired,
  userControllers.adminRequired,
  participantClubControllers.updateLoss
);

router.post(
  "/updateDraw",
  userControllers.loginRequired,
  userControllers.adminRequired,
  participantClubControllers.updateDraw
);


router.post(
  "/updateMove",
  userControllers.loginRequired,
  userControllers.participantRequired,
  participantClubControllers.updateMove
);

module.exports = router;
