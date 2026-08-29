// Ahora estamos importando otra herramienta de Sequelize: DataTypes sirve para decir qué tipo de dato va a tener cada columna de nuestra tabla
// Por ejemplo: DataTypes.INTEGER-Numero entero, DataTypes.STRING-texto
import { DataTypes } from "sequelize";
// Acá traemos la conexión que hicimos anteriormente.
import sequelize from "../config/database.js";

// sequelize.define() sirve para crear un modelo. Estamos creando un modelo llamado: User, Ese modelo representa una tabla que Sequelize va a manejar en MySQL.
// Y dentro de { ... } vamos a definir las columnas de esa tabla.
const user = sequelize.define(
  "User",
  {
    // Estamos creando una columna llamada: id
    id: {
      // Estamos diciendo: "El id va a ser un número entero."
      type: DataTypes.INTEGER,
      // Esto dice que id es la clave primaria de la tabla.
      primaryKey: true,
      // Esto significa: "Aumentá automáticamente el número del ID."
      autoIncrement: true,
    },

    // Estamos creando otra columna: name, Esta va a guardar el nombre del usuario.
    name: {
      // STRING significa texto. Significa que permitimos hasta 100 caracteres.
      type: DataTypes.STRING(100),
      // Esto significa: "El nombre es obligatorio."
      allowNull: false,
    },

    // Creamos una columna llamada: email,
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },

    // Creamos otra columna llamada: password
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  // timestamps registra cuándo se creó/modificó. paranoid registra cuándo se "eliminó" sin borrarlo realmente.
  {
    // "Agregá automáticamente las fechas de creación y modificación de cada usuario.", Entonces Sequelize agrega dos columnas a la tabla:
    // createdAt: cuándo se creó el usuario.
    // updatedAt: cuándo se modificó por última vez.
    // Sequelize actualiza automáticamente updatedAt cuando modificás el usuario.
    timestamps: true,
    // Esto activa la eliminación lógica, si hacemos "await user.destroy();", el registro se eliminaría de la base de datos.
    // pero con paranoid Sequelize no lo elimina físicamente. En cambio, agrega una columna: deletedAt, y asi cuando eliminamos aparace en la columna
    // deletedAt cuando se elimino, El usuario sigue guardado en MySQL, pero Sequelize lo considera eliminado. Y cuando buscamos ese usuario no aparece
    paranoid: true,
  },
);

// Esto permite que otros archivos puedan utilizar este modelo.
export default user;
