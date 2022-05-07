import express from "express";
const mongoose = require("mongoose");

const app = express();

const PORT = 5000;

app.get("/", (req, res, next) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

try {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r27pb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
      // process.env.PORT come from Heroku
      app.listen(process.env.PORT || 5000);
    });
} catch (err) {
  console.log(err);
}
