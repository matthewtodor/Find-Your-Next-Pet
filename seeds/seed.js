const sequelize = require('../config/connection');
const { SavedPets } = require('../models');

const petData = require('./petData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const pets = await SavedPets.bulkCreate(petData);

    process.exit(0);
};

seedDatabase();
