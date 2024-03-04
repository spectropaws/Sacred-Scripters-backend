const express = require("express");
const paymentController = require("./middlewares/paymentController");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
mongoose.connect(DB, {}).then(() => console.log("DB connection successful!"));

const port = 5500;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
