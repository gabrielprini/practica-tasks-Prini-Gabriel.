import express from "express";

import { createPersonalData, getPersonalData } from "../controllers/personalDataController.js";

const router = express.Router();

router.post("/", createPersonalData);
router.get("/", getPersonalData);


export default router;