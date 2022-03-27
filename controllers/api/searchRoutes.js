const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const { SearchedPets } = require("../../models");

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
        search.forEach((pet) =>
          SearchedPets.create({
            type: pet.type,
            breeds: pet.breeds.primary,
            age: pet.age,
            gender: pet.gender,
            size: pet.size,
            name: pet.name,
            description: pet.description,
            // photo: pet.primary_photo_cropped.full,
            status: pet.status,
            published_at: pet.published_at,
            contact: pet.contact.email,
            // console.log("look at me -----------------", searchArr);
          })
        );
      })
      .catch((err) => console.log(err));
  }

  // try {
  let type = req.body.keyCheck;
  let limit = req.body.limitCheck;
  await GetPetsFromAPI(type, limit);
  
  // return res.render("searchpage", { petSearchCall });
  // } catch (err) {
  //   console.log(err);
  //   console.log("something went wrong server side");
  //   res.status(500).json(err);
  // }
});


module.exports = router;
