const router = require("express").Router();
const req = require("express/lib/request");
const SavedPets = require("../../models");

router.get("/", async (req, res) => {
  try {
    // const petDB = await SavedPets.findAll();
    // res.json(petDB);
    res.render("savedpets");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const petDetails = await SavedPets.findByPk(req.params.id);

    if (!petDetails) {
      res.status(404).json({ message: "No pet found with that id!" });
      return;
    }
    res.status(200).json(petDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const savedPet = await SavedPets.create({
      id: req.body.id,
    });
    res.status(200).json(savedPet);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
