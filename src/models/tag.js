import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const tag = sequelize.define("tag", {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    name: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true
    }
});

export default tag;