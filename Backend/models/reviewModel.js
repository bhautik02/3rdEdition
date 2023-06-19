const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.ObjectId,
      ref: "Place",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.ObjectId,
      ref: "Booking",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
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

module.exports = mongoose.model("Review", reviewSchema);
