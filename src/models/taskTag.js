import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// TaskTag: tabla intermedia entre Task y Tag.
// No necesita columnas propias (más allá de las FK) porque solo
// existe para conectar una tarea con una etiqueta.
const taskTag = sequelize.define("TaskTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export default taskTag;
