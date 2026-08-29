// Ahora estamos importando otra herramienta de Sequelize: DataTypes sirve para decir qué tipo de dato va a tener cada columna de nuestra tabla
// Por ejemplo: DataTypes.INTEGER-Numero entero, DataTypes.STRING-texto
import { DataTypes } from "sequelize";
// Acá traemos la conexión que hicimos anteriormente.
import Sequelize from "../config/database.js";

// sequelize.define() sirve para crear un modelo. Estamos creando un modelo llamado: User, Ese modelo representa una tabla que Sequelize va a manejar en MySQL.
// Y dentro de { ... } vamos a definir las columnas de esa tabla.
const user = Sequelize.define("User", {
    // Estamos creando una columna llamada: id  
    id: {
        // Estamos diciendo: "El id va a ser un número entero."
        type: DataTypes.INTEGER,
        // Esto dice que id es la clave primaria de la tabla.
        primaryKey: true,
        // Esto significa: "Aumentá automáticamente el número del ID."
        autoIncrement: true
    },

    // Estamos creando otra columna: name, Esta va a guardar el nombre del usuario.
    name: {
        // STRING significa texto. Significa que permitimos hasta 100 caracteres.
        type: DataTypes.STRING(100),
        // Esto significa: "El nombre es obligatorio."
        allowNull: false
    },

    // Creamos una columna llamada: email, 
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },

    // Creamos otra columna llamada: password
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

// Esto permite que otros archivos puedan utilizar este modelo.
export default user;