const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const { SearchedPets, UserSearch } = require("../../models");

router.get("/", async (req, res) => {
  try {
    res.render("searchpage");
  } catch (err) {
    res.status(500).json(err);
  }
});

async function GetPetsFromAPI(req, type, limit) {
  const pf = new petfinder.Client({
    apiKey: process.env.API_KEY,
    secret: process.env.SECRET,
  });
  const pets = req.session.pets;
  // console.log("this is what we got" + pets);
  if (!pets?.length) {
    // console.log("we made it");
    await pf.animal
      .search({
        type, //become a variable
        // breed: searchBreed,
        // page,
        limit,
      })
      .then(function (response) {
        // console.log(response.data);
        // Do something with `response.data.animals`
        req.session.pets = response.data.animals;
        return response.data.animals;
        // new SavedPets = await SavedPet.create({
        // photo: response.data.photo[0]
        // })
      })
      .catch((err) => console.log(err));
  } else {
    // console.log("not using api", pets[0]);
    return req.session.pets;
  }
}

router.post("/", async (req, res) => {
  try {
    let type = req.body.keyCheck;
    let limit = req.body.limitCheck;
    const petSearchCall = await GetPetsFromAPI(req, type, limit);
    res.render("searchpage", { petSearchCall });
  } catch (err) {
    res.status(500).json("this error", err);
  }
});

// router.get("/", async (req, res) => {
//   let sessionIndex = req.session.pets;
//   // console.log("this is on the search route", req.session.pets[0]);
//   try {
//     const newSearch = await SearchedPets.findall({
//       type: sessionIndex.type,
//       breeds: sessionIndex.breeds[0],
//       age: sessionIndex.age,
//       gender: sessionIndex.gender,
//       size: sessionIndex.size,
//       name: sessionIndex.name,
//       description: sessionIndex.description,
//       photo: sessionIndex.primary_photo_cropped.full,
//       status: sessionIndex.status,
//       published_at: sessionIndex.published_at,
//       contact: sessionIndex.contact,
//     });
//     res.json(newSearch);
//     res.render("searchpage");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
module.exports = router;
