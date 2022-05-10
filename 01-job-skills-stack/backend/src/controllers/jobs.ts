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

const getJobs = async (req: Request, res: Response) => {
  const jobs = await db.getDb().collection("jobs").find({}).toArray();
  res.status(200).json(jobs);
};

const deleteJob = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;

  try {
    const query = { _id: new ObjectId(jobId) };

    const result = await db.getDb().collection("jobs").deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed job with id ${jobId}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove job with id ${jobId}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Job with id ${jobId} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export default { createJob, getJobs, deleteJob };
