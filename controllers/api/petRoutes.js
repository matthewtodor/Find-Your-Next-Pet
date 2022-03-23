const router = require("express").Router();
const Pets = require("../../models");

router.get("/", async (req, res) => {
  try {
    const petDB = await Pets.findAll();
    res.json(petDB);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
