import express from "express";

import { createPersonalData, getPersonalData } from "../controllers/personalDataController.js";

import { validate } from "../middlewares/validate.js";
import { createPersonalDataValidations } from "../middlewares/personalDataValidations.js";

const router = express.Router();

router.post("/",createPersonalDataValidations, validate, createPersonalData);
router.get("/", getPersonalData);


export default router;