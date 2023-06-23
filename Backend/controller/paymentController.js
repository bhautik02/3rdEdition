const Razorpay = require("razorpay");
const crypto = require("crypto");
const CatchAsync = require("../utils/CatchAsync");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

//to make a payment
const checkout = CatchAsync(async (req, res, next) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };
  const order = await instance.orders.create(options);

  if (!order) {
    return next(new AppError("something went wrong", 500));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//to verify a payment
const verify = CatchAsync(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature !== expectedSign) {
    return next(new AppError("Invalid signature sent!", 400));
  }

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});

module.exports = {
  checkout,
  verify,
};
