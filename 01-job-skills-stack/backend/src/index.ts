import express from "express";
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res, next) => {
  res.send("hello");
});

// process.env.PORT come from Heroku
const PORT = process.env.PORT || 5000;

try {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r27pb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
      app.listen(PORT);
      console.log(`listening on ${PORT}`);
    });
} catch (err) {
  console.log(err);
}
