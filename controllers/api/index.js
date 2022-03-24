const router = require('express').Router();

const petRoutes = require('./petRoutes');
const userRoutes = require('./userRoutes');

router.use('/pets', petRoutes);
router.use('/user', userRoutes);

module.exports = router;
