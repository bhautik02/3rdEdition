const express = require("express");
const dashboardController = require("./../controller/dashBoardController");

const router = express.Router();

router.route("/users").get(dashboardController.getAllUsers);
router.route("/places").get(dashboardController.getAllPlaces);
router.route("/users/:id").patch(dashboardController.deleteUserDash);
router.route("/places/:id").patch(dashboardController.deletePlaceDash);

module.exports = router;
