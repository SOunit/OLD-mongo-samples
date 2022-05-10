import express from "express";
import skillsController from "../controllers/skills";

const router = express.Router();

router.post("/new", skillsController.createSkill);
router.get("/", skillsController.getSkills);
router.get("/:skillId", skillsController.getSkill);

export default router;
