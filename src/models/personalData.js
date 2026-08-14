import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const personalData = sequelize.define("dataPr", {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    dni: {
        type: DataTypes.STRING(8),
        allownull: false,
        unique: true
    },

    birthDate: {
        type: DataTypes.STRING(10),
        allownull: false
    },

    address: {
        type: DataTypes.STRING,
        allownull: false
    }
});

export default personalData;