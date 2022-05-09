import express from "express";
import db from "./db";

const app = express();

app.get("/", (req, res, next) => {
  db.getDb().collection("tests").insertOne({ name: "test" });
  res.send("hello");
});

// process.env.PORT come from Heroku
const PORT = process.env.PORT || 5000;

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on ${PORT}`);
    app.listen(PORT);
  }
});
