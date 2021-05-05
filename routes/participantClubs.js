const express = require("express");
const router = express.Router();

const participantClubControllers = require("../controllers/participantClubControllers");

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

module.exports = router;
