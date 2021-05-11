const express = require("express");
const router = express.Router();

const participantControllers = require("../controllers/participantControllers");
const clubControllers = require("../controllers/clubControllers");

// Getting all participants
router.get("/", participantControllers.index);

// Getting one participant by id
router.get(
  "/:id",
  participantControllers.getParticipant,
  participantControllers.getParticipantByID
);

// Creating a participant
router.post(
  "/",
  clubControllers.getClubsCount,
  participantControllers.createParticipant
);

// Updating a participant
router.patch(
  "/:id",
  participantControllers.getParticipant,
  participantControllers.updateParticipant
);

// Deleting a participant
router.delete(
  "/:id",
  participantControllers.getParticipant,
  participantControllers.deleteParticipant
);

module.exports = router;
