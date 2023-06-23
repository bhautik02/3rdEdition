const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const user = require("./routes/userRoutes");
const place = require("./routes/placeRoute");
const booking = require("./routes/bookingRoute");
const reservation = require("./routes/reservationRoute");
const review = require("./routes/reviewRoute");
const errorController = require("./controller/errorController");
const payment = require("./routes/paymentRoute");
const admin = require("./routes/dashboardRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1/users", user);
app.use("/api/v1/place", place);
app.use("/api/v1/book", booking);
app.use("/api/v1", reservation);
app.use("/api/v1/review", review);
app.use("/api/v1", payment);
app.use("/api/v1/admin", admin);

app.use(errorController);

module.exports = app;
