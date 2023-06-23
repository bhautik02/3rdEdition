const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log(`connected on port ${port}`);
});

app.listen(port, () => {
  console.log("App is Running on", port);
});
