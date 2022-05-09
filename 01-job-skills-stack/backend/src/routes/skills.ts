import express from "express";
import skillsController from "../controllers/skills";
import db from "../db";

const router = express.Router();

// FIXME: add type to request
// https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
router.post("/skills/new", skillsController.createSkill);

router.get("skills", () => {});

export default router;
