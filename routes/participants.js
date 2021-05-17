const express = require("express");
const router = express.Router();

const participantControllers = require("../controllers/participantControllers");
const clubControllers = require("../controllers/clubControllers");
const userControllers = require("../controllers/userControllers");

// Getting all participants
router.get("/", participantControllers.index);

// Getting one participant by id
router.get(
  "/:id",
  participantControllers.getParticipant,
  participantControllers.getParticipantByID
);

// Getting one participant styles by id
router.get(
  "/getStyles/:id",
  userControllers.loginRequired,
  userControllers.participantRequired,
  participantControllers.getParticipant,
  participantControllers.getParticipantStylesByID,

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

router.post(
  "/updateStartingPosition",
  userControllers.loginRequired,
  userControllers.participantRequired,
  participantControllers.updateStartingPosition
);

router.post(
  "/updateStartingCase",
  userControllers.loginRequired,
  userControllers.participantRequired,
  participantControllers.updateStartingCase
);
router.post(
  "/updateCurrentSquare",
  userControllers.loginRequired,
  userControllers.participantRequired,
  participantControllers.updateCurrentSquare
);

router.post(
  "/updateDesiredSquare",
  userControllers.loginRequired,
  userControllers.participantRequired,
  participantControllers.updateDesiredSquare
);

router.post(
  "/updateStyles",
  userControllers.loginRequired,
  userControllers.participantRequired,
  participantControllers.updateStyles
);
module.exports = router;
