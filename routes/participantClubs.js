const express = require("express");
const router = express.Router();

const ParticipantClub = require("../models/participantClub");

// Getting all participant/clubs
router.get("/", async (req, res) => {
  try {
    const participantClubs = await ParticipantClub.find();
    res.json(participantClubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one participant/club by id
router.get("/:id", getParticipantClub, (req, res) => {
  res.send(res.participantClub);
});

// Creating a participant/club 
router.post("/", async (req, res) => {
  const participantClub = new ParticipantClub({
    club_id: req.body.club_id,
    participant_id: req.body.participant_id,
    piece: req.body.piece
  });
  try {
    const newParticipantClub = await participantClub.save();
    res.status(201).json(newParticipantClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a participant/club
router.patch("/:id", getParticipantClub, async (req, res) => {
  if (req.body.club_id != null) res.participantClub.club_id = req.body.club_id;
  if (req.body.participant_id != null) res.participantClub.participant_id = req.body.participant_id;
  if (req.body.piece != null)
    res.participantClub.piece = req.body.piece;

  try {
    const updatedParticipantClub = await res.participantClub.save();
    res.json(updatedParticipantClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a participant/club
router.delete("/:id", getParticipantClub, async (req, res) => {
  try {
    await res.participantClub.remove();
    res.json({ message: "Deleted ParticipantClub" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getParticipantClub(req, res, next) {
  let participantClub;
  try {
    participantClub = await ParticipantClub.findById(req.params.id);
    if (participantClub == null) {
      return res
        .status(404)
        .json({ message: "participantClub could not be found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.participantClub = participantClub;
  next();
}

module.exports = router;
