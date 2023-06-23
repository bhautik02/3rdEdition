const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [6, "Password must be of minimum 6 characters"],
      select: false,
      validate: [validator.isStrongPassword, "Please Enter Strong Password."],
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    aboutMe: {
      type: String,
    },
    phone: {
      type: Number,
      minlength: [10, "Phone length must be exact 10!"],
      maxlength: [10, "Phone length must be exact 10!"],
    },
    profile: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

//hashung the password before saving it in databse for security reason
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//verify hashpassword with user entered password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generates token for auth
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
};

module.exports = mongoose.model("User", userSchema);
