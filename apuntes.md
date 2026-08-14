Named export: export const createUser = ...
Se importa: import { createUser } from "..."; Con parentesis

Default export: export default User;
Se importa: import User from "..."; Sin parentesis,

Cuando quiero importar un archivo no hace falta poner el mismo nombre cuando lo exporte, como es un default export, cuando lo importás podés ponerle el nombre que quieras. Yo lo haria con el mismo nombre

findByPk() → busca
create() → crea
update() → actualiza
destroy() → elimina

Archivo Exporta Por qué
user.js export default user Un solo modelo
task.js export default task Un solo modelo
index.js export { User, Task } Dos modelos juntos

Relaciones:

La regla es: la FK se maneja del lado de belongsTo

Como vimos en la teoría: la clave foránea (user_id) vive en la tabla Tasks, no en Users. Por eso:

Al crear una Task → SÍ necesitás pedir un userId, porque esa tarea tiene que decir "yo pertenezco a este usuario" (es el lado belongsTo).
Al crear un User → NO necesitás nada de tareas, porque un usuario puede existir perfectamente sin tener ninguna tarea todavía. La relación hasMany no es obligatoria del lado de User — un usuario recién creado simplemente va a tener un array de tareas vacío.

N:M ( muchos a muchos )
Porque en una relación muchos a muchos (N:M) una tabla sola no alcanza para guardar todas las combinaciones.

Podríamos tener:

Task Tag
id title id name
1 Aprender JavaScript 1 javascript
2 Aprender Node.js 2 programacion

Ahí entra TaskTag:

taskId tagId
1 1
1 2
2 1
2 2
2 3
