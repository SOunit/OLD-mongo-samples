import express from "express";
import db from "./db";
import bodyParser from "body-parser";
import skillsRouter from "./routes/skills";

const app = express();

app.use(bodyParser.json());

app.use(skillsRouter);

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
