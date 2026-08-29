import express from "express";

import { createPersonalData, getPersonalData, updatePersonalData, deletePersonalData } from "../controllers/personalDataController.js";

import { validate } from "../middlewares/validate.js";
import { createPersonalDataValidations, updatePersonalDataValidations, personalDataIdValidation } from "../middlewares/personalDataValidations.js";

const router = express.Router();

router.post("/",createPersonalDataValidations, validate, createPersonalData);
router.get("/", getPersonalData);
router.put("/:id", updatePersonalDataValidations, personalDataIdValidation, validate, updatePersonalData);
router.delete("/:id", personalDataIdValidation, validate, deletePersonalData);



export default router;