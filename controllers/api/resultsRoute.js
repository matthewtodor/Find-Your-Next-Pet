// const router = require("express").Router();
// const petfinder = require("@petfinder/petfinder-js");
// const sequelize = require("../../config/connection");
// const { SearchedPets } = require("../../models");

// router.get("/", async (req, res) => {
//     try {
//         const dbPetData = await SearchedPets.findAll({});
//         const petData = dbPetData.map((pd) => pd.get({ plain: true }));
//         console.log("weeeeeeeeeeeeeeeeeeeeeeee");
//         console.log(petData);
//         return res.render("searchresults", { petData });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;
