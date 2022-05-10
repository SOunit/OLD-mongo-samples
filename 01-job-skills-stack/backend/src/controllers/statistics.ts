import { Request, Response } from "express";
import db from "../db";
import { SkillsMap } from "../models/job";
import { Statistics } from "../models/statistics";

const _createStaticsWithPrimaryKey = async (
  primarySkillId: string,
  skillsMapToAdd: SkillsMap
) => {
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

  return statistics;
};

const _addSubSkills = (
  skillsMapToAdd: SkillsMap,
  primarySkillId: string,
  statistics: Statistics
) => {
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

  return statistics;
};

const addSkillsToStatistics = (req: Request, res: Response) => {
  const skillsMapToAdd = req.body;

  Object.keys(skillsMapToAdd).forEach(async (primarySkillId) => {
    const statisticsWithPrimaryKey = await _createStaticsWithPrimaryKey(
      primarySkillId,
      skillsMapToAdd
    );

    const subSkillUpdatedStatistics = _addSubSkills(
      skillsMapToAdd,
      primarySkillId,
      statisticsWithPrimaryKey
    );

    if (subSkillUpdatedStatistics._id) {
      await db
        .getDb()
        .collection("statistics")
        .updateOne(
          { _id: subSkillUpdatedStatistics._id },
          { $set: subSkillUpdatedStatistics }
        );
    } else {
      await db
        .getDb()
        .collection("statistics")
        .insertOne(subSkillUpdatedStatistics);
    }
  });

  res.json({ message: "statistics updated!" });
};

const _removeSubSkills = (
  skillsMapToRemove: SkillsMap,
  primarySkillId: string,
  statistics: Statistics
) => {
  Object.keys(skillsMapToRemove).forEach((subSkillId) => {
    if (subSkillId === primarySkillId) {
      return;
    }

    statistics.subSkillsMap[subSkillId].count--;
    if (statistics.subSkillsMap[subSkillId].count < 0) {
      statistics.subSkillsMap[subSkillId].count = 0;
    }
  });

  return statistics;
};

const getStatisticBySkillId = async (req: Request, res: Response) => {
  const skillId = req?.params?.skillId;

  const statistics = (await db
    .getDb()
    .collection("statistics")
    .findOne({ "primarySkill._id": skillId })) as Statistics;

  res.json({ statistics });
};

const removeSkills = (req: Request, res: Response) => {
  const skillsMapToRemove = req.body;

  Object.keys(skillsMapToRemove).forEach(async (primarySkillId) => {
    let statistics = (await db
      .getDb()
      .collection("statistics")
      .findOne({ "primarySkill._id": primarySkillId })) as Statistics;

    const subSKillsUpdatedStatistics = _removeSubSkills(
      skillsMapToRemove,
      primarySkillId,
      statistics
    );

    console.log("subSKillsUpdatedStatistics", subSKillsUpdatedStatistics);

    db.getDb()
      .collection("statistics")
      .updateOne(
        { "primarySkill._id": primarySkillId },
        { $set: subSKillsUpdatedStatistics }
      );
  });

  res.json({ message: "skills removed" });
};

export default { addSkillsToStatistics, getStatisticBySkillId, removeSkills };
