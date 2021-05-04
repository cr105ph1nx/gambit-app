const express = require("express");
const router = express.Router();

const Participant = require("../models/participant");

// Getting all participants
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one participant by id
router.get("/:id", getParticipant, (req, res) => {
  res.send(res.participant.username);
});

// Creating a participant
router.post("/", async (req, res) => {
  const participant = new Participant({
    _id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    startingpoint: req.body.startingpoint,
  });
  try {
    const newParticipant = await participant.save();
    res.status(201).json(newParticipant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a participant
router.patch("/:id", getParticipant, async (req, res) => {
  if (req.body.username != null) res.participant.username = req.body.username;
  if (req.body.email != null) res.participant.email = req.body.email;
  if (req.body.startingpoint != null)
    res.participant.startingpoint = req.body.startingpoint;
  if (req.body.currentCase != null)
    res.participant.currentCase = req.body.currentCase;
  if (req.body.flagsRemaining != null)
    res.participant.flagsRemaining = req.body.flagsRemaining;
  if (req.body.score != null) res.participant.score = req.body.score;
  if (req.body.arsenal != null) res.participant.arsenal = req.body.arsenal;
  if (req.body.pendingAuthorization != null)
    res.participant.pendingAuthorization = req.body.pendingAuthorization;

  try {
    const updatedParticipant = await res.participant.save();
    res.json(updatedParticipant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a participant
router.delete("/:id", getParticipant, async (req, res) => {
  try {
    await res.participant.remove();
    res.json({ message: "Deleted Participant" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getParticipant(req, res, next) {
  let participant;
  try {
    participant = await Participant.findById(req.params.id);
    if (participant == null) {
      return res
        .status(404)
        .json({ message: "participant could not be found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.participant = participant;
  next();
}

module.exports = router;
