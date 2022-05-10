import express from "express";
import jobsController from "../controllers/jobs";

const router = express.Router();

router.post("/new", jobsController.createJob);
router.get("/", jobsController.getJobs);
router.delete("/:jobId", jobsController.deleteJob);

export default router;
