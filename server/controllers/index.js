const router = require("express").Router();
// const homeRoutes = require("./home-routes");
// const dashboardRoutes = require('./dashboard-routes.js');
// const apiRoutes = require("./api");
const dbRoute = require("./DBController");

router.use("/db", dbRoute);
// router.use('/dashboard', dashboardRoutes);
// router.use("/", homeRoutes);
// router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;