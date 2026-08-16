// Estamos trayendo Express, que instalaste con: npm install express, Express nos permite crear nuestro servidor y después agregarle rutas
import express from "express";
// Acá estamos trayendo el sequelize que creamos anteriormente en: database
import sequelize from "./src/config/database.js";

import { User, Task, PersonalData, Tag, TaskTag } from "./src/models/index.js";

import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
import personalDataRouter from "./src/routes/personalDataRoutes.js";
import tagRouter from "./src/routes/tagRoutes.js";

// Acá ejecutamos: express() y guardamos el resultado en app, app va a representar nuestra aplicación de Express.
const app = express();

// ¿Qué es express.json()? Cuando un usuario manda datos a nuestro servidor, muchas veces los manda en formato JSON.
// express.json() Es un middleware de Express que lee el JSON que llega en una petición y lo convierte en un objeto de JavaScript.
// app.use() sirve para decirle a Express: "Usá esto en las peticiones que lleguen al servidor."
// se puede entender como: "Express, cada vez que recibas una petición, preparate para recibir datos JSON."
app.use(express.json());

// es la que conecta las rutas de usuarios con tu aplicación principal.
// dice: "Todo lo que venga a /api/users, mandalo al router de usuarios."
app.use("/api/users", userRouter);

app.use("/api/tasks", taskRouter);

app.use("/api/personaldata", personalDataRouter);

app.use("/api/tags", tagRouter);

// Acá elegimos el puerto donde va a funcionar nuestro servidor Express. Entonces nuestro servidor va a estar disponible en:
const PORT = 3000;

// Esta línea le dice a Sequelize: "Intentá conectarte a la base de datos usando la configuración que puse en database.js
sequelize
  .authenticate()
  // Esto significa: "Si la conexión salió bien, hacé esto."
  .then(() => {
    console.log("Conecion a mysql exitosa");

    // async indica que una función va a trabajar con operaciones que pueden tardar y que devuelve una Promesa.
    // El return devuelve el resultado de la operación a la cadena de Promesas, permitiendo que el siguiente .then() espere a que termine.
    // Si la operación falla, el error puede llegar al .catch().
    return sequelize.sync();
  })

  .then(() => {
    console.log("Tablas creadas correctamente");
    // app.listen() → sirve para poner el servidor a escuchar en un puerto. No comprueba directamente si anda. significa: "arrancá el servidor en el puerto 3000"
    // Esto significa: "Ahora que comprobamos que MySQL funciona, arrancá nuestro servidor Express."
    app.listen(PORT, () => {
      console.log(`Seridor funcionando en http://localhost:${PORT}`);
    });
  })

  // Ahora viene el caso contrario, esto significa: "Si ocurrió un error intentando conectarnos, hacé esto."
  // Entonces si algo sale mal, la terminal te va a mostrar algo parecido a Error al conectar con MySQL: ... Y error contiene la información específica del problema.
  .catch((error) => {
    console.error("Error al conectar con mysqul", error);
  });
