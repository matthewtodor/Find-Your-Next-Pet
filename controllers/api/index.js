const router = require("express").Router();

const petRoutes = require("./petRoutes");
const userRoutes = require("./userRoutes");
const searchRoutes = require("./searchRoutes");
const resultsRoute = require("./resultsRoute")

router.use("/user", userRoutes);
router.use("/pets", petRoutes);
router.use("/search", searchRoutes);
router.use("/results", resultsRoute);

module.exports = router;
