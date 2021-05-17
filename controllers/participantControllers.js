const Participant = require("../models/participant");
const ParticipantClub = require("../models/participantClub");
const User = require("../models/user");

module.exports = {
  // Find a participant by ID
  async getParticipant(req, res, next) {
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
  },

  // Getting all participants
  async index(req, res, next) {
    try {
      const participants = await Participant.find();
      res.json(participants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },

  // Getting a participant by ID
  async getParticipantByID(req, res, next) {
    res.send(res.participant.username);

    next();
  },

  // Getting a participant styles by ID
  async getParticipantStylesByID(req, res, next) {
    res.send({
      positions: res.participant.boardSetting.positions,
      squareStyles: res.participant.boardSetting.squareStyles,
      startingCase: res.participant.startingCase,
      currentSquare: res.participant.currentSquare,
    });

  },

  // Creating a participant by ID
  async createParticipant(req, res, next) {
    try {
      // create participant
      const participant = new Participant({
        email: req.body.email,
        username: req.body.username,
        startingpoint: req.body.startingpoint,
        flagsRemaining: res.count - 1,
      });

      const newParticipant = await participant.save();

      // create participantClub
      const participantClub = new ParticipantClub({
        club_id: req.body.startingpoint,
        participant_id: newParticipant._id,
        piece: "k",
      });

      // create user
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: "participant",
      });
      const newUser = await user.save();
      const newParticipantClub = await participantClub.save();

      res.status(201).json({
        participant: newParticipant,
        user: newUser,
        participantClub: newParticipantClub,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Updating a particpant
  async updateParticipant(req, res, next) {
    if (req.body.username != null) res.participant.username = req.body.username;
    if (req.body.email != null) {
      // update user email
      await User.findOneAndUpdate(
        res.participant.email,
        { email: req.body.email },
        {
          new: true,
        }
      );
      // update particpant email
      res.participant.email = req.body.email;
    }
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

    next();
  },

  // Deleting a participant
  async deleteParticipant(req, res, next) {
    try {
      // delete user asssociated with participant account
      await User.findOneAndDelete(
        { email: res.participant.email },
        function (err, docs) {
          if (err) console.log(err);
          else {
            console.log(docs);
          }
        }
      );

      // delete participantclub asssociated with participant account
      await ParticipantClub.findOneAndDelete(
        { participant_id: res.participant._id },
        function (err, docs) {
          if (err) console.log(err);
          else {
            console.log(docs);
          }
        }
      );

      //delete particpaitn account
      await res.participant.remove();

      res.json({ message: "Deleted Participant" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    next();
  },

  async updateStartingPosition(req, res, next) {
    const participant = await Participant.findById(req.body.participant_id);
    participant.startingPosition = req.body.startingPosition;
    participant.markModified("startingPosition");

    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateStartingCase(req, res, next) {
    const participant = await Participant.findById(req.body.participant_id);
    participant.startingCase = req.body.startingCase;
    participant.markModified("startingCase");

    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateCurrentSquare(req, res, next) {
    console.log(req.body);
    const participant = await Participant.findById(req.body.participant_id);
    participant.currentSquare = req.body.currentSquare;
    participant.markModified("currentSquare");

    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateDesiredSquare(req, res, next) {
    const participant = await Participant.findById(req.body.participant_id);
    participant.desiredSquare = req.body.desiredSquare;
    participant.markModified("desiredSquare");

    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateStartingCase(req, res, next) {
    const participant = await Participant.findById(req.body.participant_id);
    participant.startingCase = req.body.startingCase;
    participant.markModified("startingCase");

    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateCurrentSquare(req, res, next) {
    console.log(req.body);
    const participant = await Participant.findById(req.body.participant_id);
    participant.currentSquare = req.body.currentSquare;
    participant.markModified("currentSquare");

    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateStyles(req, res, next) {
    const participant = await Participant.findById(req.body.participant_id);
    participant.boardSetting.positions = req.body.positions;
    participant.boardSetting.squareStyles = req.body.squareStyles;
    participant.markModified("boardSetting");

    try {
      const updatedParticipant = await participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
