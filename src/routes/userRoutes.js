import express from "express"
import { createUser, getUsers, getUserById, updateUser, deleteUser} from '../controllers/userController.js';

// Traemos el middleware central que chequea si hubo errores de validación.
import { validate } from '../middlewares/validate.js';

// // Traemos los arrays de validaciones específicas para User.
import { createUserValidations, userIdValidation, updateUserValidations } from "../middlewares/userValidations.js"

// Esto crea un router de Express. Pensalo como un pequeño encargado de organizar rutas.
const router = express.Router();


// POST /: primero corren las validaciones de creación, después "validate"
// (que chequea si hubo errores), y recién si todo está bien, createUser.
// Estamos diciendo: "Cuando alguien haga una petición POST a /, ejecutá createUser." 
// POST normalmente se utiliza cuando queremos crear/enviar información.
// Ese / es la ruta relativa a este router.
router.post("/", createUserValidations, validate, createUser);

// GET / (todos): no recibe datos del usuario, no necesita validaciones.
// GET: estamos pidiendo información para obtenerla.
router.get("/", getUsers);

// GET /:id: valida que el id sea válido y que el usuario exista.
// ¿Qué significa /:id? Es una parte de la URL que puede cambiar.
router.get("/:id", userIdValidation, validate, getUserById);


// PUT /:id: necesita DOS validaciones combinadas: la del id (que exista)
// y la de los campos que se quieran actualizar (name, email, password).
router.put("/:id", userIdValidation, updateUserValidations, validate, updateUser);

// DELETE /:id: solo necesita validar que el id sea válido y exista.
router.delete("/:id", userIdValidation, validate, deleteUser);

export default router;