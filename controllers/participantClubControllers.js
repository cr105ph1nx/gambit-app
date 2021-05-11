const ParticipantClub = require("../models/participantClub");
const Participant = require("../models/participant");

module.exports = {
  // Find a participant|clubs by ID
  async getParticipantClub(req, res, next) {
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
  },

  // Getting all participant|clubs
  async index(req, res, next) {
    try {
      const participantClubs = await ParticipantClub.find();
      res.json(participantClubs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },

  // Getting a participant|club by ID
  async getParticipantClubByID(req, res, next) {
    res.send(res.participantClub);

    next();
  },

  // Creating a participant|club
  async createParticipantClub(req, res, next) {
    const participantClub = new ParticipantClub({
      club_id: req.body.club_id,
      participant_id: req.body.participant_id,
      piece: req.body.piece,
    });
    try {
      const newParticipantClub = await participantClub.save();
      res.status(201).json(newParticipantClub);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Updating a participant|club
  async updateParticipantClub(req, res, next) {
    if (req.body.club_id != null)
      res.participantClub.club_id = req.body.club_id;
    if (req.body.participant_id != null)
      res.participantClub.participant_id = req.body.participant_id;
    if (req.body.piece != null) res.participantClub.piece = req.body.piece;

    try {
      const updatedParticipantClub = await res.participantClub.save();
      res.json(updatedParticipantClub);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Deleting a participant|club
  async deleteParticipantClub(req, res, next) {
    try {
      await res.participantClub.remove();
      res.json({ message: "Deleted ParticipantClub" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },

  // Getting all participants whose startingpoint is a set club id
  async getCurrentParticipants(req, res, next) {
    try {
      // get list of participants and their pieces
      const result = await ParticipantClub.find({ club_id: res.club._id })
        .select(["participant_id", "piece"])
        .populate("participant_id", "username");
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
