// body() sirve para acceder a los datos que vienen en el cuerpo (body) de la petición.
// param() sirve para validar datos que vienen en la URL
import { body, param } from "express-validator";
// lo necesitamos para poder consultar con la base de datos y saber si ya existe el gmail
import { User } from "../models/index,js";

// creamos una constante que contiene un array. Que adentro de este vamos a ponerle las reglas
export const createUserValidations = [
  // vamos a validar el campo name
  body("name")
    // El campo no puede estar vacío.
    // .withMessage() Esto indica qué mensaje mostrar si la validación anterior falla.
    .notEmpty.withMessage("el nombre es obligatorio")
    // .isLength({ min: 2 }) indica el numero minimo de caracteres
    .isLength({ min: 2 })
    .withMessage("el nombre debe tener minimo dos caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    // isEmail Comprueba que tenga un formato de email válido(@gmail.com).
    .isEmail()
    .withMessage("El email no tiene un formato válido")
    // .custom() permite crear nuestra propia regla de validación.
    // Por qué necesitamos una regla propia? Porque express-validator puede comprobar fácilmente:
    // ¿Está vacío? ¿Tiene formato de email? ¿Tiene determinada longitud?
    // Pero necesitamos comprobar algo que depende de nuestra base de datos: "¿Ya existe este email?"
    // y despues hacemos una funcion flecha asincrona con el parametro email que ingresamos
    .custom(async (email) => {
      // Acá usamos Sequelize para preguntarle a MySQL:
      // "¿Existe algún usuario cuyo email sea este?" findOne() busca un solo registro.
      const existingUser = await User.findOne({ where: { email } });

      // si User.findOne encontro un usuario en la bse de datos, entonces lanza un error(throw new error)
      if (existingUser) {
        throw new Error("Ese email ya está registrado");
      }

      // la validacion salio bien
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

// Creamos un array de validaciones llamado userIdValidation
export const userIdValidation = [
  // Buscá el id que viene en la URL y validalo.
  param("id")
    // isInt() significa: "Comprobá que sea un número entero.", Además tiene que ser 1 o mayor
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    // custom como ya vimos antes permite crear nuestra propia reglas de validaciones
    // necesitamos una regla propia, Porque isInt() solamente puede comprobar:
    // "El ID tiene formato de número entero positivo" Pero eso no significa que el usuario exista.
    .custom(async (id) => {
      // findByPk Buscá un registro por su clave primaria (Primary Key).
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      return true;
    }),
];

// Creamos un array con todas las reglas que se van a aplicar al actualizar un usuario.
export const updateUserValidations = [
  body("name")
    // Esto significa: "Si el usuario manda este campo, validalo. Pero si no lo manda, no pasa nada."
    .optional()
    // si manda este campo no puede estar vacio y debe contener al menos 2 caracteres
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),
  // traemos el campo email
  body("email")
    // es opcional, pero si lo mando que le mande con el formato valido y luego creamos nustras reglas
    // de validaciones
    .optional()
    .isEmail()
    .withMessage("El email no tiene un formato válido")
    // Estamos creando una validación personalizada para comprobar que el nuevo email
    // no pertenezca a otro usuario.
    // El primer parámetro: email es el que estamos intentando poner.
    // El segundo: { req } nos permite acceder a la petición completa.,
    // Y necesitamos req porque queremos obtener el ID que viene en la URL, para asi usar req.params.id
    .custom(async (email, { req }) => {
      // Le preguntamos a la base de datos: "¿Existe algún usuario que tenga este email?"
      const existingUser = await User.findOne({ where: { email } });
      // aca decimos si hay un usuario que tenga ese gmail y si no es igual el
      // id del usuario que queremos cambiar.
      // Por qué Number(req.params.id) Recordá que los parámetros de la URL normalmente
      // llegan como string y con number lo pasamos a entero.
      if (existingUser && existingUser.id !== Number(req.params.id)) {
        throw new Error("Ese email ya está registrado por otro usuario");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];
