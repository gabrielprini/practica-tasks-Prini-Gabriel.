// Acá definimos las relaciones. Esto se hace en un solo lugar (este archivo)
// para evitar que user.js y task.js se importen entre sí directamente,
// lo que generaría una "dependencia circular" (un lío de importaciones cruzadas).

import User from "./user.js";
import Task from "./task.js";
import PersonalData from "./personalData.js";


// Aca nos esta diciendo que la tala user tiene muchas tareas 
// ForeignKey le dice a la tabla de tareas(task) que cree una columna llamada user_id con el alias tasks para despues pedir las tareas de este usuario (ej: user.tasks)
User.hasMany(Task, { foreignKey: "user_id", as: "tasks" });

// Aca nos esta diciendo que una tarea pertenece a un usuario 
// Es la misma relación vista desde el otro lado
// as: "user" → alias para pedir "el usuario de esta tarea" (ej: task.user)
Task.belongsTo(User, { foreignKey: { name:"user_id", allowNull:false }, as: "user" });


User.hasOne(personalData, {foreignKey: "user_id", as: "dataPersonal"});

PersonalData.belongsTo(User, {foreignKey: "user_id", as: "user"})

// Exportamos ambos modelos ya relacionados, para que los controladores
// los importen desde ACÁ (desde index.js) y no directo desde user.js/task.js.
export { User, Task, PersonalData };