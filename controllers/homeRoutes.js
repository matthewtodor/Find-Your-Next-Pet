const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const { Pets, Users } = require("../models/");

router.get("/", async (req, res) => {
  try {
    const pf = new petfinder.Client({
      apiKey: process.env.API_KEY,
      secret: process.env.SECRET,
    });

    pf.animal
      .search({
        type: "cat", //become a variable
        // breed: searchBreed,
        // page,
        limit: 100,
      })
      .then(function (response) {
        console.log(response.data);
        // Do something with `response.data.animals`
      });

    res.render("main");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
