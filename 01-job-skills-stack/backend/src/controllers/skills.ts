import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import db from "../db";

// https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
const createSkill = async (req: Request, res: Response, _: NextFunction) => {
  const { skill } = req.body;

  try {
    const existingSkill = await db
      .getDb()
      .collection("skills")
      .findOne({ name: new RegExp(skill.name, "i") });

    if (existingSkill) {
      throw new Error(`${skill.name} already exists!`);
    }

    const createResponse = await db
      .getDb()
      .collection("skills")
      .insertOne(skill);

    if (!createResponse) {
      res.status(500).json({ message: "Failed to create a new skill" });
    }

    const { insertedId } = createResponse;

    const createdSkill = await db
      .getDb()
      .collection("skills")
      .findOne({ _id: new ObjectId(insertedId) });

    createdSkill
      ? res.status(201).json({
          skill: createdSkill,
        })
      : res.status(500).json({ message: "Failed to fetch a new skill" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getSkills = async (req: Request, res: Response, _: NextFunction) => {
  const skills = await db.getDb().collection("skills").find({}).toArray();
  res.status(200).json(skills);
};

const getSkill = async (req: Request, res: Response, _: NextFunction) => {
  const skillId = req?.params?.skillId;

  try {
    const query = { _id: new ObjectId(skillId) };
    const skill = await db.getDb().collection("skills").findOne(query);

    if (skill) {
      res.status(200).send(skill);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
};

export default { createSkill, getSkills, getSkill };
