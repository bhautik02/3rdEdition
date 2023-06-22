const express = require("express");
const dashboardController = require("./../controller/dashBoardController");

const router = express.Router();

router.route("/users").get(dashboardController.getAllUsers);
router.route("/places").get(dashboardController.getAllPlaces);

module.exports = router;
