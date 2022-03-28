const router = require("express").Router();
const { SavedPets } = require("../../models");

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
// Get a pet that matches the id of the requested pet
router.get("/:id", async (req, res) => {
  try {
    // finds the pet by the primary key, which is id
    const petDetails = await SavedPets.findByPk(req.params.id);
    // if it 404s, return the message below
    if (!petDetails) {
      res.status(404).json({ message: "No pet found with that id!" });
      return;
    }
    res.status(200).json(petDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});
// creates a row for the saved pet with the included columns
router.post("/", async (req, res) => {
  try {
    const savePet = await SavedPets.create({
      id: req.body.id,
      type: req.body.type,
      breeds: req.body.breeds[0],
      age: req.body.age,
      gender: req.body.gender,
      size: req.body.size,
      name: req.body.name,
      description: req.body.description,
      photo: req.body.photos,
      status: req.body.status,
      published_at: req.body.published_at,
      contact: req.body.contact,
    });
    res.status(200).json(savePet);
  } catch (err) {
    res.status(400).json(err);
  }
});
// removes a pet from the saved pets list
router.delete("/", async (req, res) => {
  try {
    const savedPetCard = SavedPets.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!savedPetCard) {
      res.status(404).json({ message: "No pet found with that id!" });
      return;
    }
    res.status(200).json(savedPetCard);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
