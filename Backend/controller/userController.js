const sendEmail = require("../utils/email");
const sendCookie = require("../utils/sendCookie");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const CatchAsync = require("./../utils/CatchAsync");
const AppError = require("../utils/appError");

const signupUser = CatchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (password.includes(" ")) {
    return next(
      new AppError(
        "You can not enter space as a password, Change your password!!!",
        //Unprocessable Entity
        422
      )
    );
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  await sendEmail({
    email: newUser.email,
    name: newUser.name,
    subject: "Thank you for Signing Up",
  });

  sendCookie(newUser, 201, res);
  // res.status(200).json("jkdnjkdn");
});

const loginUser = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email, isDeleted: false }).select(
    "+password"
  );
  if (!user) {
    return next(new AppError("User doesn't exist", 404));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new AppError("Password doesn't match", 401));
  }

  sendCookie(user, 201, res);
});

const logoutUser = CatchAsync(async (req, res, next) => {
  res.status(200).clearCookie("token").json({
    status: "success",
  });
});

const profile = CatchAsync(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token || token === "null") {
    return next(new AppError("Please Login to Access", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    if (err) {
      return next(new AppError("Please Login to Access", 401));
    } else {
      const userDoc = await User.findById(user.id).select(
        "-createdAt -updatedAt -__v"
      );

      if (!userDoc) {
        return next(new AppError("User not Found!", 401));
      }

      res.status(200).json({
        status: "success",
        user: userDoc,
      });
    }
  });
});

const updateUserDetails = CatchAsync(async (req, res, next) => {
  const { address, gender, aboutMe, phone, profile } = req.body;
  console.log(aboutMe);
  await User.findByIdAndUpdate(req.params.id, {
    address,
    gender,
    aboutMe,
    phone,
    profile,
  });

  const updatedUser = await User.findById(req.params.id);

  if (!updatedUser) {
    return next(new AppError("user not Exist!", 400));
  }
  console.log(updatedUser);
  res.status(200).json({
    status: "success",
    updatedUser,
  });
});

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  profile,
  updateUserDetails,
};
