
// Acá estás trayendo Sequelize desde la librería que instalaste. 
// import → significa "traeme algo de otro lugar".
// { Sequelize } → estamos trayendo específicamente la herramienta llamada Sequelize.
// 'sequelize' → es el paquete que instalamos con npm
import { Sequelize } from "sequelize"; 


// Creamos una constante llamada sequelize.
// Podríamos llamarla de otra forma, pero normalmente se usa sequelize porque representa nuestra instancia de Sequelize.
// new significa que estamos creando una nueva instancia de Sequelize.
// Es decir: "Creame una conexión/configuración de Sequelize para mi base de datos."
// Este es el nombre de la base de datos.Es decir: quiero trabajar con la base de datos tasks_users_db
// Esto es el usuario de MySQL. ES decir: Para conectarme a MySQL voy a utilizar el usuario root
// '' Esto es la contraseña del usuario.
const sequelize = new Sequelize('tasks_users_db', 'root', '', {
    // host significa dónde está el servidor de la base de datos. localhost significa: "La base de datos está en mi propia computadora."
    host :'localhost',
    // Esto le dice a Sequelize qué sistema de base de datos estamos utilizando. En tu caso: mysql
    dialect :'mysql',
    // No me muestres en la consola todas las consultas SQL que estás haciendo.
    logging : false ,
});

// Estamos diciendo: "Quiero que otros archivos de mi proyecto puedan utilizar esta conexión."
// Y desde User.js vas a necesitar utilizar la conexión que creaste. Entonces vas a poder hacer: import sequelize from '../config/database.js'; Y ahora User.js tiene acceso a la misma conexión que configuraste en database.js
export default sequelize;