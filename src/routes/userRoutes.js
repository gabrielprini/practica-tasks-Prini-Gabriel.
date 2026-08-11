import express from "express"
import { createUser, getUsers, getUserById, updateUser} from '../controllers/userController.js';

// Esto crea un router de Express. Pensalo como un pequeño encargado de organizar rutas.
const router = express.Router();

// Estamos diciendo: "Cuando alguien haga una petición POST a /, ejecutá createUser." 
// POST normalmente se utiliza cuando queremos crear/enviar información.
// Ese / es la ruta relativa a este router.
router.post("/", createUser);
// GET: estamos pidiendo información para obtenerla.
router.get("/", getUsers);

// ¿Qué significa /:id? Es una parte de la URL que puede cambiar.
router.get("/:id", getUserById);

router.put("/:id", updateUser);

export default router;