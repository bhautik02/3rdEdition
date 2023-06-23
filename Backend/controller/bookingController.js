const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const Place = require("../models/placeModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

//for book a place
const bookPlace = CatchAsync(async (req, res, next) => {
  const {
    checkIn,
    checkOut,
    numberOfGuests,
    bookBy,
    name,
    phone,
    placeID,
    price,
    bookedDates,
    placeName,
    placeAddress,
    placePhoto,
    checkInTime,
    checkOutTime,
  } = req.body;
  console.log(placeID);

  const booking = new Booking({
    checkIn,
    checkOut,
    numberOfGuests,
    bookBy,
    name,
    phone,
    place: placeID,
    price,
    placeName,
    placeAddress,
    placePhoto,
    checkInTime,
    checkOutTime,
    isDeleted: false,
  });

  const place = await Place.findById(placeID);

  if (!place) {
    return next(new AppError("place doesn't exists", 404));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  place.bookedDates.push(...bookedDates);
  await Place.findByIdAndUpdate(place._id, place, {
    new: true,
    runValidators: true,
  });

  await booking.save({ session });
  session.commitTransaction();

  res.status(201).json({
    status: "success",
    booking,
  });
});

//all user bookings
const getBookings = CatchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const bookings = await Booking.find({
    bookBy: userId,
    isDeleted: false,
  }).sort({
    createdAt: -1,
  });

  if (!bookings) {
    return next(new AppError("you don't have any booking!", 404));
  }

  res.status(201).json({
    status: "success",
    length: bookings.length,
    bookings,
  });
});

module.exports = {
  bookPlace,
  getBookings,
};
