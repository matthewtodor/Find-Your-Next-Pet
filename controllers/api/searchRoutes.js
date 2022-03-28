const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const sequelize = require("../../config/connection");
const { SearchedPets } = require("../../models");
const { route } = require("./resultsRoute");

router.get("/", async (req, res) => {
  try {
    res.render("searchpage");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  function GetPetsFromAPI(type, limit) {
    const pf = new petfinder.Client({
      apiKey: process.env.API_KEY,
      secret: process.env.SECRET,
    });
    pf.animal
      .search({
        type,
        limit,
      })
      .then(function (response) {
        const search = response.data.animals;
        SearchedPets.truncate();
        search.forEach((pet) =>
          SearchedPets.create({
            type: pet.type,
            pf_id: pet.id,
            breeds: pet.breeds.primary,
            age: pet.age,
            gender: pet.gender,
            size: pet.size,
            name: pet.name,
            description: pet.description,
            photo: pet.primary_photo_cropped?.full,
            status: pet.status,
            published_at: pet.published_at,
            contact: pet.contact.email,
          })
        );
      })
      // .then(function (req, res) {
      //   const dbPetData = SearchedPets.findAll({});
      //   console.log("weeeeeeeeeeeeeeeeeeeeeeee");
      //   console.log(dbPetData);
      //   const petData = dbPetData.map((pd) => pd.get({ plain: true }));
      //   res.render("searchpage", petData);
      // })
      .catch((err) => console.log(err));
  }

  // try {
  let type = req.body.keyCheck;
  let limit = req.body.limitCheck;
  GetPetsFromAPI(type, limit);
  console.log("DB seeded with search results");
  // renderSearch(req, res);

  // return res.render("searchpage", { petSearchCall });
  // return res.render.json("searchpage", { SearchedPets });
  // } catch (err) {
  //   console.log(err);
  //   console.log("something went wrong server side");
  //   res.status(500).json(err);
  // }
});

router.get("/results", async (req, res) => {
  try {
    const dbPetData = await SearchedPets.findAll({});
    const petData = dbPetData.map((pd) => pd.get({ plain: true }));
    // console.log("weeeeeeeeeeeeeeeeeeeeeeee");
    // console.log(petData);
    return res.render("searchresults", { petData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
