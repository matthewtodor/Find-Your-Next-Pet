const router = require("express").Router();
const { SearchedPets } = require("../../models/Search");

router.get("/", async (req, res) => {
  try {
    res.render("searchpage");
  } catch (err) {
    res.status(500).json(err);
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
