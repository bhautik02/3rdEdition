const Booking = require("../models/bookingModel");
const Place = require("../models/placeModel");
const Review = require("../models/reviewModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

//create a review for booked place
const createReview = CatchAsync(async (req, res, next) => {
  const bookingId = req.params.id;
  const { place, user, name, profile, rating, review } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return next(new AppError("you don't have booking with this id!", 404));
  }

  const findReview = await Review.find({
    bookingId,
  });

  if (findReview.length > 0) {
    return next(
      new AppError("This place already have been reviewed by you!", 400)
    );
  }

  const reviews = await Review.create({
    bookingId,
    place,
    user,
    name,
    rating,
    review,
    profile,
    isDeleted: false,
  });

  await Place.findByIdAndUpdate(place, {
    $inc: { totalRatings: rating, numberOfReview: 1 },
  });

  res.status(201).json({
    status: "success",
    length: reviews.length,
    reviews,
  });
});

//get all reviews for particular place
const getReviews = CatchAsync(async (req, res, next) => {
  const placeId = req.params.id;
  const reviews = await Review.find({ place: placeId, isDeleted: false });

  if (!reviews) {
    return next(new AppError("Review not found!", 400));
  }

  res.status(201).json({
    status: "success",
    length: reviews.length,
    reviews,
  });
});

module.exports = {
  createReview,
  getReviews,
};
