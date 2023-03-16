const router = require("express").Router();

const searchRoutes = require("./search-controller");

router.use("/search", searchRoutes);

module.exports = router;