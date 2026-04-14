const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log("Error connecting to Database", err);
    });
}

module.exports = connectDB;
