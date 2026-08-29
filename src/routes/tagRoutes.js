import express from "express";

import { createTag, getTags, updateTag, deleteTag } from "../controllers/tagController.js";

import { validate } from "../middlewares/validate.js";
import { createTagValidations, updateTagValidations, tagIdValidation  } from "../middlewares/tagValidations.js";

const router = express.Router();

router.post("/",createTagValidations, validate, createTag);
router.get("/", getTags);
router.put("/:id", tagIdValidation, updateTagValidations, validate, updateTag);
router.delete("/:id",tagIdValidation, validate, deleteTag);


export default router;