import express from "express";

import { createTag, getTags } from "../controllers/tagController.js";

import { validate } from "../middlewares/validate.js";
import { createTagValidations } from "../middlewares/tagValidations.js";

const router = express.Router();

router.post("/",createTagValidations, validate, createTag);
router.get("/", getTags);


export default router;