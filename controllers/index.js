const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home_route.js");
const dashboardRoutes = require('./dashboard-routes.js');

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
