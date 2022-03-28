const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const { Pets, Users } = require("../models");

async function GetPetsFromAPI(req, type, limit) {
  const pf = new petfinder.Client({
    apiKey: process.env.API_KEY,
    secret: process.env.SECRET,
  });
  // console.log("look at me ----------");
  // console.log(pf.animal.search("cat", 5));

  const pets = req.session.pets;
  // console.log(pets);
  if (!pets?.length) {
    await pf.animal
      .search({
        type,
        limit,
      })
      .then(function (response) {
        req.session.pets = response.data.animals;
        return response.data.animals;
      })
      .catch((err) => console.log(err));
  } else {
    return req.session.pets;
  }
}

router.get("/", async (req, res) => {
  // const petsfromhome = await GetPetsFromAPI(req, "dog", 1);
  // console.log(petsfromhome);
  res.render("landingpage");
});

//get for login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
