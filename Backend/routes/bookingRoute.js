const express = require("express");
const bookingController = require("../controller/bookingController");

const router = express.Router();

router.route("/bookings").post(bookingController.bookPlace);
router.route("/bookings/:id").get(bookingController.getBookings);

module.exports = router;
