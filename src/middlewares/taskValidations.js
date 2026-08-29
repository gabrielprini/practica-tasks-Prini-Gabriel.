// porque importamos user tambien en las validaciones de task
import { body, param } from "express-validator";
import { Task, User } from "../models/index.js";

// aca lo que estamos haciendo es crear una constante para luego importarlo llamada createTaskValidations, estamos llamando al campo titulo de task que contiene un array de validaciones
// que va a ser obligatorio y va a tener minimo 3 caracteres, con el custom vamos a crear nuestra regla de validaciones que vamos a decir que si ya hay un titulo vamos a poner un error y si no
// hacer el return de la funcion
export const createTaskValidations = [
  body("title")
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El titulo debe contener minimo 3 caracteres")

    .custom(async (title) => {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask) {
        throw new Error("Ya existe una tarea con ese título");
      }
      return true;
    }),

  // lo mismo que arria pero con el campo descripcion
  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 3 })
    .withMessage("La descripción debe tener al menos 3 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser true o false"),

  // aca hacemos lo mismo pero con userId
  body("userId")
    .notEmpty()
    .withMessage("Debe indicar el usuario dueño de la tarea")
    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("El usuario indicado no existe");
      }
      return true;
    }),
];

// aca lo que hicimos es agarra el campo id, dar las validaciones de como tiene que ser, que seria numero entero positivo y un custom por las dudas que exista ese id tirar un error y si no existe dar el return
export const taskIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")

    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("La tarea no existe");
      }
      return true;
    }),
];

// aca lo que estamos haciendo es en custom hacer una funcion que el parametro sea el titulo y el req para sacar toda la peticion, de ahi creamos una constante llamada existingTask para preguntar a 
// la base de datos si existe el titulo, despues hacemos un if para preguntar si existe el titulo y el id es el mismo que ya tenemos en la base de datos si es verdadero damos el mensaje del error 
export const updateTaskValidations = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El titulo debe contener minimo 3 caracteres")

     .custom(async (title, { req }) => {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask && existingTask.id !== Number(req.params.id)) {
        throw new Error("Ya existe una tarea con ese título");
      }
      return true;
    }),

  // lo mismo que arria pero con el campo descripcion
  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 3 })
    .withMessage("La descripción debe tener al menos 3 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser true o false"),

  // aca hacemos lo mismo pero con userId
  body("userId")
    .optional()
    .notEmpty()
    .withMessage("Debe indicar el usuario dueño de la tarea")
    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("El usuario indicado no existe");
      }
      return true;
    }),
];
