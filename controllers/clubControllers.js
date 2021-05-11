const Club = require("../models/club");

module.exports = {
  // Find club by ID
  async getClub(req, res, next) {
    let club;
    try {
      club = await Club.findById(req.params.id);
      if (club == null) {
        return res.status(404).json({ message: "club could not be found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.club = club;
    next();
  },

  // Get count of all clubs
  async getClubsCount(req, res, next) {
    try {
      var total = 0;
      await Club.countDocuments({}, (err, count) => {
        total = count;
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.count = total;
    next();
  },

  // Getting all clubs
  async index(req, res, next) {
    try {
      const clubs = await Club.find();
      res.json(clubs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  },

  // Getting a club by ID
  async getClubByID(req, res, next) {
    res.send(res.club.name);
    next();
  },

  // Creating a club
  async createClub(req, res, next) {
    const club = new Club({
      _id: req.body._id,
      position: req.body.position,
      name: req.body.name,
      logo: req.body.logo,
      description: req.body.description,
    });
    try {
      const newClub = await club.save();
      res.status(201).json(newClub);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Updating a club
  async updateClub(req, res, next) {
    if (req.body.position != null) res.club.position = req.body.position;
    if (req.body.name != null) res.club.name = req.body.name;
    if (req.body.logo != null) res.club.logo = req.body.logo;
    if (req.body.description != null)
      res.club.description = req.body.description;

    try {
      const updatedClub = await res.club.save();
      res.json(updatedClub);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }

    next();
  },

  // Deleting a club
  async deleteClub(req, res, next) {
    try {
      await res.club.remove();
      res.json({ message: "Deleted Club" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    next();
  },
};
