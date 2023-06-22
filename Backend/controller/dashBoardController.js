const User = require("../models/userModel");
const Place = require("../models/placeModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

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
    .select("-__v -password -updatedAt -isAdmin -aboutMe");

  if (!places) {
    return next(new AppError("You not have any Users!", 404));
  }

  res.status(201).json({
    status: "success",
    places,
    totalPlaces,
  });
});

module.exports = {
  getAllUsers,
  getAllPlaces,
};
