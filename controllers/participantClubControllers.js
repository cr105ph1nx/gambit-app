const ParticipantClub = require("../models/participantClub");
const Participant = require("../models/participant");
const WIN = 1,
  DRAW = 0,
  LOSS = -1;

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
      const result = await ParticipantClub.find({
        club_id: res.club._id,
        handled: false,
      })
        .select(["_id", "participant_id", "piece"])
        .populate("participant_id", "username");
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateWin(req, res, next) {
    // search for participant
    const participant = await Participant.findById(req.body.participant_id);
    // add to participant score
    participant.score = participant.score + req.body.points;
    // set pending to false
    participant.pendingAuthorization = false;
    // update participant
    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    // search for participantclub association
    const participantClub = await ParticipantClub.findById(req.body.id);
    // set handled to true
    participantClub.handled = true;
    // set result to WIN
    participantClub.result = WIN;
    // update participantclub
    try {
      const updatedParticipantClub = await participantClub.save();
      res.json(updatedParticipantClub);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateLoss(req, res, next) {
    // search for participant
    const participant = await Participant.findById(req.body.participant_id);

    // deduct the piece they used for the current position
    for (let i in participant.arsenal) {
      if (participant.arsenal[i].id === req.body.piece) {
        participant.arsenal[i].number = participant.arsenal[i].number - 1;
      }
    }
    participant.markModified("arsenal");

    // set pending to false
    participant.pendingAuthorization = false;
    // update participant
    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    // search for participantclub association
    const participantClub = await ParticipantClub.findById(req.body.id);
    // set handled to true
    participantClub.handled = true;
    // set result to WIN
    participantClub.result = LOSS;
    // update participantclub
    try {
      const updatedParticipantClub = await participantClub.save();
      res.json(updatedParticipantClub);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateDraw(req, res, next) {
    // search for participant
    const participant = await Participant.findById(req.body.participant_id);
    // set pending to false
    participant.pendingAuthorization = false;
    // update participant
    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    // search for participantclub association
    const participantClub = await ParticipantClub.findById(req.body.id);
    // set handled to true
    participantClub.handled = true;
    // set result to WIN
    participantClub.result = DRAW;
    // update participantclub
    try {
      const updatedParticipantClub = await participantClub.save();
      res.json(updatedParticipantClub);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateMove(req, res, next) {
    try {
      // add participant club record
      const participantClub = new ParticipantClub({
        club_id: req.body.club_id,
        participant_id: req.body.participant_id,
        piece: req.body.piece,
      });

      // create participant
      const newParticipantClub = await participantClub.save();

      // search for participant
      const participant = await Participant.findById(req.body.participant_id);
      // update startingpoint and styles
      participant.startingpoint = req.body.club_id;
      participant.currentSquare = req.body.currentSquare;
      participant.startingCase = req.body.startingCase;
      participant.boardSetting.squareStyles = req.body.squareStyles;
      participant.markModified("boardSetting");

      // search for participantclub association record with participant and club id
      var records = 0;
      await ParticipantClub.countDocuments(
        { club_id: req.body.club_id, participant_id: req.body.participant_id },
        (err, count) => {
          records = count;
          // if record unique, decrement number of flagsremaining
          if (records == 1) {
            participant.flagsRemaining = participant.flagsRemaining - 1;
          }
        }
      );
      // make pendingauthorization true
      participant.pendingAuthorization = true;
      // update participant
      const updatedParticipant = await participant.save();

      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
