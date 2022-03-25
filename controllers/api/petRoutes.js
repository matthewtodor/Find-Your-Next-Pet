const router = require("express").Router();
const req = require("express/lib/request");
const SavedPets = require("../../models");

router.get("/", async (req, res) => {
	try {
		// const petDB = await SavedPets.findAll();
		// res.json(petDB);
		res.render("savedpets");
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const petDetails = await SavedPets.findByPk(req.params.id);

		if (!petDetails) {
			res.status(404).json({ message: "No pet found with that id!" });
			return;
		}
		res.status(200).json(petDetails);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const savePet = await SavedPets.create({
			id: req.session.pets.id,
			type: req.session.pets.type,
			breeds: req.session.pets.breeds[0],
			age: req.session.pets.age,
			gender: req.session.pets.gender,
			size: req.session.pets.size,
			name: req.session.pets.name,
			description: req.session.pets.description,
			photo: req.session.pets.photos[3],
			status: req.session.pets.status,
			published_at: req.session.pets.published_at,
			contact: req.session.pets.contact,
		});
		res.status(200).json(savePet);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete("/", async (req, res) => {
	try {
		const savedPetCard = SavedPets.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!savedPetCard) {
			res.status(404).json({ message: "No pet found with that id!" });
			return;
		}
		res.status(200).json(savedPetCard);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
