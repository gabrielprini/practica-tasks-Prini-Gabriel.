import { body, param } from "express-validator";
import { PersonalData, User } from "../models/index.js";

export const createPersonalDataValidations = [
  body("dni")
    .notEmpty()
    .withMessage("El dni tiene que ser obligatorio")
    .isLength({ max: 8 })
    .withMessage("El dni tiene que tener maximos 8 carcteres")

    .custom(async (dni) => {
      const existingDni = await PersonalData.findOne({ where: { dni } });

      if (existingDni) {
        throw new Error("El dni ya existe");
      }

      return true;
    }),

  body("birthDate")
    .notEmpty()
    .withMessage("La fecha de cumpleaños tiene que ser obligatoria"),

  body("address")
    .notEmpty()
    .withMessage("La direccion tiene que ser obligatoria"),

  body("userId")
    .notEmpty()
    .withMessage("Debe indicar el dueño de los datos personales")

    .custom(async (userId) => {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("El usuario no existe");
      }

      // en el findOne tenemos dos veces user id porque 
      // Buscá en PersonalData donde la columna user_id sea igual al valor que tiene la variable userId.
      const exist = await PersonalData.findOne({ where: { user_id: userId } });
      if (exist) {
        throw new Error("Este usuario ya tiene datos personales cargados");
      }

      return true;
    }),
];

export const updatePersonalDataValidations = [
  body("dni")
    .optional()
    .notEmpty().withMessage("El dni no puede estar vacío")
    .isLength({ max: 8 }).withMessage("El dni tiene que tener máximo 8 caracteres")
    .custom(async (dni, { req }) => {
      const existingDni = await PersonalData.findOne({ where: { dni } });
      // Mismo patrón que ya usamos en User y Task: si existe, pero es EL
      // MISMO registro que se está actualizando, no es un error.
      if (existingDni && existingDni.id !== Number(req.params.id)) {
        throw new Error("El dni ya existe");
      }
      return true;
    }),

  body("birthDate")
    .optional()
    .notEmpty().withMessage("La fecha de nacimiento no puede estar vacía"),

  body("address")
    .optional()
    .notEmpty().withMessage("La dirección no puede estar vacía"),
];

export const personalDataIdValidation = [
  param("id")
    .isInt({ min: 1 }).withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const personalData = await PersonalData.findByPk(id);
      if (!personalData) {
        throw new Error("Los datos personales no existen");
      }
      return true;
    }),
];
