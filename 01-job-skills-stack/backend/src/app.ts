import express from "express";
import db from "./db";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/test", (req, res, next) => {
  db.getDb().collection("tests").insertOne({ name: "test" });
  res.send("hello");
});

// FIXME: add type to request
app.post("/skills/new", (req, res, next) => {
  const { skill } = req.body;

  db.getDb().collection("skills").insertOne(skill);

  res.status(200).json({ message: "skill created", skill: {} });
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
