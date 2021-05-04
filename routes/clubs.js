const express = require("express");
const router = express.Router();

const Club = require("../models/club");

// Getting all clubs
router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one club by id
router.get("/:id", getClub, (req, res) => {
  res.send(res.club.name);
});

// Creating a club
router.post("/", async (req, res) => {
  const club = new Club({
    _id: req.body.id,
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
});

// Updating a club
router.patch("/:id", getClub, async (req, res) => {
  if (req.body.position != null) res.club.position = req.body.position;
  if (req.body.name != null)
    res.club.name = req.body.name;
  if (req.body.logo != null)
    res.club.logo = req.body.logo;
  if (req.body.description != null)
    res.club.description = req.body.description;

  try {
    const updatedClub = await res.club.save();
    res.json(updatedClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a club
router.delete("/:id", getClub, async (req, res) => {
  try {
    await res.club.remove();
    res.json({ message: "Deleted Club" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getClub(req, res, next) {
  let club;
  try {
    club = await Club.findById(req.params.id);
    if (club == null) {
      return res
        .status(404)
        .json({ message: "club could not be found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.club = club;
  next();
}

module.exports = router;
