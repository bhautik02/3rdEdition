const express = require("express");
const dashboardController = require("./../controller/dashBoardController");

const router = express.Router();

router.route("/users").get(dashboardController.getAllUsers);
router.route("/places").post(dashboardController.getAllPlaces);

module.exports = router;
