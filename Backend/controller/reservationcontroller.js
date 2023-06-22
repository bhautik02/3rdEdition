const Booking = require("../models/bookingModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

const getReservations = CatchAsync(async (req, res, next) => {
  const placeId = req.params.id;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const totalReservations = await Booking.countDocuments({
    place: placeId,
    isDeleted: false,
  });

  const reservations = await Booking.find({
    place: placeId,
    isDeleted: false,
  })
    .skip(skip)
    .limit(limit)
    .select("name placeName phone checkIn checkOut price numberOfGuests");

  if (!reservations) {
    return next(new AppError("You not have any Reservations!", 404));
  }

  res.status(201).json({
    status: "success",
    reservations,
    totalReservations,
  });
});

module.exports = {
  getReservations,
};
