const User = require("../models/userModel");
const Place = require("../models/placeModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

//to get all users for admin dashboard
const getAllUsers = CatchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const totalUsers = await User.countDocuments({
    isDeleted: false,
    isAdmin: false,
  });

  const users = await User.find({
    isDeleted: false,
    isAdmin: false,
  })
    .skip(skip)
    .limit(limit)
    .select("-__v -password -updatedAt -isAdmin -aboutMe");

  if (!users) {
    return next(new AppError("You not have any Users!", 404));
  }

  res.status(201).json({
    status: "success",
    users,
    totalUsers,
  });
});

//to get all places for admin dashboard
const getAllPlaces = CatchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const totalPlaces = await Place.countDocuments({
    isDeleted: false,
  });

  const places = await Place.find({
    isDeleted: false,
  })
    .skip(skip)
    .limit(limit)
    .select(
      "_id title totalRatings numberOfReview category address photo price createdAt owner"
    )
    .populate({
      path: "host",
      select: "name phone email",
    })
    .lean();

  if (!places) {
    return next(new AppError("You not have any Users!", 404));
  }

  res.status(201).json({
    status: "success",
    places,
    totalPlaces,
  });
});

//to delete user for admin dashboard
const deleteUserDash = CatchAsync(async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId);
  const deletedUser = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  // console.log(deletedUser);
  if (!deletedUser) {
    return next(new AppError("Place not deleted!", 404));
  }

  res.status(204).json(null);
});

//to delete place for admin dashboard
const deletePlaceDash = CatchAsync(async (req, res, next) => {
  const placeId = req.params.id;
  console.log(placeId);
  const deletedPlace = await Place.findByIdAndUpdate(
    placeId,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  // console.log(deletedPlace);
  if (!deletedPlace) {
    return next(new AppError("Place not deleted!", 404));
  }

  res.status(204).json(null);
});

module.exports = {
  getAllUsers,
  getAllPlaces,
  deleteUserDash,
  deletePlaceDash,
};
