import express from "express";

import { createTask, getTasks, getTaskId, updateTask, deleteTask } from "../controllers/taskController.js";

import { validate } from "../middlewares/validate.js";
import { createTaskValidations, taskIdValidation, updateTaskValidations } from "../middlewares/taskValidations.js";

const router = express.Router();

// aca lo que hacemos es correr primero las validaciones que nosotros hicimos y depues validate para saber si hubo errores 
router.post("/",createTaskValidations, validate, createTask);
router.get("/", getTasks);
router.get("/:id",taskIdValidation, validate, getTaskId);
router.put("/:id",updateTaskValidations,taskIdValidation, validate, updateTask);
router.delete("/:id",taskIdValidation, validate, deleteTask);

export default router