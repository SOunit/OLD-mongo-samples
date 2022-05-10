import express from "express";
import statisticsController from "../controllers/statistics";

const router = express.Router();

router.post("/", statisticsController.addSkillsToStatistics);
router.get("/:skillId", statisticsController.getStatisticBySkillId);
router.delete("/", statisticsController.removeSkills);

export default router;
