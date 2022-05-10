import express from "express";
import jobsController from "../controllers/jobs";

const router = express.Router();

router.post("/new", jobsController.createJob);

export default router;
