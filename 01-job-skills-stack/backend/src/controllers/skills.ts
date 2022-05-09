import { NextFunction, Request, Response } from "express";
import db from "../db";

// https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
const createSkill = async (req: Request, res: Response, _: NextFunction) => {
  const { skill } = req.body;

  try {
    const response = await db.getDb().collection("skills").insertOne(skill);

    response
      ? res.status(201).json({ message: "created a new skill", response })
      : res.status(500).json({ message: "Failed to create a new skill" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create a new skill" });
  }
};

const getSkills = async (req: Request, res: Response, _: NextFunction) => {
  const skills = await db.getDb().collection("skills").find({}).toArray();

  res.status(200).json(skills);
};

export default { createSkill, getSkills };
