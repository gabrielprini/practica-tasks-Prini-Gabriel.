// No necesitamos buscar el Tag en la base de datos porque puede repetirse. Por eso no necesitamos importar Tag. 
// En cambio taskId, body("taskId") Acá sí necesitamos comprobar algo en la base de datos: 
// "¿Existe la tarea con este ID?" Por eso importamos: import { Task } from "../models/index.js"; 
// Y hacemos: const task = await Task.findByPk(taskId);
// En las validaciones de Tag, estamos creando un Tag a partir de un taskId: 
// No estamos recibiendo un tagId porque el Tag todavía se está creando o reutilizando.
import { body } from "express-validator";
import { Task } from "../models/index.js";

export const createTagValidations = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),
  body("taskId")
    .notEmpty()
    .withMessage("Debe indicar la tarea a la que se le asigna la etiqueta")
    .custom(async (taskId) => {
      const task = await Task.findByPk(taskId);
      if (!task) {
        throw new Error("La tarea indicada no existe");
      }
      return true;
    }),
];
