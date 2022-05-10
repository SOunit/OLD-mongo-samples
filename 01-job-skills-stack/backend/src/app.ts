import express from "express";
import db from "./db";
import bodyParser from "body-parser";
import skillsRouter from "./routes/skills";
import jobsRouter from "./routes/jobs";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/skills", skillsRouter);
app.use("/jobs", jobsRouter);

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
