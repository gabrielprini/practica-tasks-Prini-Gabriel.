import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremnt: true
    },

    title: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false 
    },

    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    // Estamos creando una columna llamada: isComplete, El nombre significa: "¿Está completada?"
    isComplete: {
        // Acá estamos diciendo que isComplete va a ser de tipo booleano.
        type: DataTypes.BOOLEAN,
        // Esto significa: "Si no especificamos un valor para isComplete, automáticamente va a ser false
        defaulValue: false
    }
});

export default task;