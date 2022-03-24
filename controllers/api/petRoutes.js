const router = require("express").Router();
const SavedPets = require("../../models");

router.get("/", async (req, res) => {
  try {
    const petDB = await SavedPets.findAll();
    res.json(petDB);
    res.render('savedpetcards')
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
