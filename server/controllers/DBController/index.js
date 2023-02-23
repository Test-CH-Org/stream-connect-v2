const router = require("express").Router();

const userRoutes = require("./user-controller.js");

router.use("/users", userRoutes);

module.exports = router;