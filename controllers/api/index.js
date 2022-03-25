const router = require('express').Router();

const petRoutes = require('./petRoutes');
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/pets', petRoutes);
router.use('/user', userRoutes);
router.use('/search', searchRoutes);

module.exports = router;
