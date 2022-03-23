const router = require('express').Router();

const petRoutes = require('./petRoutes');

router.use('/pets', petRoutes);

module.exports = router;
