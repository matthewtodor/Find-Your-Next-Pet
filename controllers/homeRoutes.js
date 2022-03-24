const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const { Pets, Users } = require("../models/");

async function GetPetsFromAPI(req, type, limit) {
	const pf = new petfinder.Client({
		apiKey: process.env.API_KEY,
		secret: process.env.SECRET,
	});
	const pets = req.session.pets;
	console.log("this is what we got" + pets);
	if (!pets?.length) {
		console.log("we made it");
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
		console.log("not using api", pets[0]);
		return req.session.pets;
	}
}

router.get("/", async (req, res) => {
	const pets = await GetPetsFromAPI(req, "cat", 5);
	console.log(pets?.length);
	res.render("landingpage");
});

module.exports = router;
