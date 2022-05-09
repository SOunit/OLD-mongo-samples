import { NextFunction, Request, Response } from "express";
import db from "../db";

const createSkill = async (req: Request, res: Response, next: NextFunction) => {
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

export default { createSkill };
