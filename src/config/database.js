
// Acá estás trayendo Sequelize desde la librería que instalaste. 
// import → significa "traeme algo de otro lugar".
// { Sequelize } → estamos trayendo específicamente la herramienta llamada Sequelize.
// 'sequelize' → es el paquete que instalamos con npm
import { Sequelize } from "sequelize"; 

// Traemos dotenv, el paquete que nos permite leer variables desde el archivo .env
// dotenv NO se importa con { } porque no traemos una pieza específica, 
// traemos el paquete completo (por eso se llama "import por defecto").
import dotenv from "dotenv";

// Esto le dice a dotenv: "andá a buscar el archivo .env y cargá esas variables dentro de process.env, para que pueda usarlas en cualquier parte del código."
dotenv.config();


// Creamos una constante llamada sequelize.
// Podríamos llamarla de otra forma, pero normalmente se usa sequelize porque representa nuestra instancia de Sequelize.
// new significa que estamos creando una nueva instancia de Sequelize.
// Es decir: "Creame una conexión/configuración de Sequelize para mi base de datos."
// Antes esto estaba escrito directo ("hardcodeado"): 'tasks_users_db', 'root', ''
// Ahora en vez de escribir los datos a mano, se los pedimos a process.env,
// que es un objeto donde JavaScript guarda las variables de entorno.
// process.env.DB_NAME → busca la variable DB_NAME que está en tu archivo .env
const sequelize = new Sequelize(
    process.env.DB_NAME,      // nombre de la base de datos (antes: 'tasks_users_db')
    process.env.DB_USER,      // usuario de MySQL (antes: 'root')
    process.env.DB_PASSWORD,  // contraseña (antes: '')
    {
        // host significa dónde está el servidor de la base de datos.
        // process.env.DB_HOST reemplaza el 'localhost' que tenías escrito a mano.
        host: process.env.DB_HOST,
        // Esto le dice a Sequelize qué sistema de base de datos estamos utilizando.
        dialect: 'mysql',
        // No me muestres en la consola todas las consultas SQL que estás haciendo.
        logging: false,
    }
);

// Estamos diciendo: "Quiero que otros archivos de mi proyecto puedan utilizar esta conexión."
// Y desde User.js vas a necesitar utilizar la conexión que creaste. Entonces vas a poder hacer: import sequelize from '../config/database.js'; Y ahora User.js tiene acceso a la misma conexión que configuraste en database.js
export default sequelize;