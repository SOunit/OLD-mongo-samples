import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import db from "../db";

const createJob = async (req: Request, res: Response) => {
  const job = req.body;

  try {
    const createResponse = await db.getDb().collection("jobs").insertOne(job);

    if (!createResponse) {
      res.status(500).json({ message: "Failed to create a new job" });
    }

    const { insertedId } = createResponse;

    const createdJob = await db
      .getDb()
      .collection("jobs")
      .findOne({ _id: new ObjectId(insertedId) });

    createdJob
      ? res.status(201).json({
          job: createdJob,
        })
      : res.status(500).json({ message: "Failed to fetch a new job" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { createJob };
