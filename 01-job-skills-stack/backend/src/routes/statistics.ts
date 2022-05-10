import express, { Request, Response } from "express";
import db from "../db";
import { Statistics } from "../models/statistics";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const skillsMapToAdd = req.body;

  Object.keys(skillsMapToAdd).forEach(async (primarySkillId) => {
    // create primary key
    let statistics = (await db
      .getDb()
      .collection("statistics")
      .findOne({ "primarySkill._id": primarySkillId })) as Statistics;

    if (!statistics) {
      statistics = {
        primarySkill: skillsMapToAdd[primarySkillId],
        subSkillsMap: {},
      };
    }

    // create sub skills
    Object.keys(skillsMapToAdd).forEach((subSkillId) => {
      if (subSkillId === primarySkillId) {
        return;
      }

      if (statistics.subSkillsMap[subSkillId]) {
        statistics.subSkillsMap[subSkillId].count++;
      } else {
        statistics.subSkillsMap[subSkillId] = {
          count: 1,
          skill: skillsMapToAdd[subSkillId],
        };
      }
    });

    if (statistics._id) {
      await db
        .getDb()
        .collection("statistics")
        .updateOne({ _id: statistics._id }, { $set: statistics });
    } else {
      await db.getDb().collection("statistics").insertOne(statistics);
    }
  });

  res.json(skillsMapToAdd);
});

router.get("/:skillId", async (req: Request, res: Response) => {
  const skillId = req?.params?.skillId;

  const statistics = (await db
    .getDb()
    .collection("statistics")
    .findOne({ "primarySkill._id": skillId })) as Statistics;

  res.json({ statistics });
});

export default router;
