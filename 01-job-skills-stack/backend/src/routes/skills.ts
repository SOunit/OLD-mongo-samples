import express from "express";
import skillsController from "../controllers/skills";

const router = express.Router();

router.post("/skills/new", skillsController.createSkill);
router.get("/skills", skillsController.getSkills);

export default router;
