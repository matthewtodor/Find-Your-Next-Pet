const router = require('express').Router();

const petRoutes = require('./petRoutes');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/pets', petRoutes);

module.exports = router;
