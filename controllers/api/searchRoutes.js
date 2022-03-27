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

router.post("/", async (req, res) => {
  // try {
  let type = req.body.keyCheck;
  let limit = req.body.limitCheck;
  const petSearchCall = await GetPetsFromAPI(req, type, limit);
  console.log("look ma we got some data ---", petSearchCall[0]);
  // res.status(200).json({ data: petSearchCall });
  console.log("before the catch");

  SearchedPets.create({
    type: petSearchCall[0].type,
    breeds: petSearchCall[0].breeds.primary,
    age: petSearchCall[0].age,
    gender: petSearchCall[0].gender,
    size: petSearchCall[0].size,
    name: petSearchCall[0].name,
    description: petSearchCall[0].description,
    photo: petSearchCall[0].primary_photo_cropped,
    status: petSearchCall[0].status,
    published_at: petSearchCall[0].published_at,
    contact: petSearchCall[0].contact.email,
  }).then((data) => {
    res.json(data);
  });

  // return res.json(petSearchCall);
  // res.status(200).json(petSearchCall);

  // return res.render("searchpage", { petSearchCall });
  // } catch (err) {
  //   console.log(err);
  //   console.log("something went wrong server side");
  //   res.status(500).json(err);
  // }
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
