Named export: export const createUser = ...
Se importa: import { createUser } from "..."; Con parentesis

Default export: export default User;
Se importa: import User from "..."; Sin parentesis

Cuando quiero importar un archivo no hace falta poner el mismo nombre cuando lo exporte, como es un default export, cuando lo importás podés ponerle el nombre que quieras. Yo lo haria con el mismo nombre 

findByPk() → busca
create()   → crea
update()   → actualiza
destroy()  → elimina

Archivo	              Exporta	                      Por qué
user.js	               export default user	           Un solo modelo
task.js	               export default task	           Un solo modelo
index.js	           export { User, Task }	       Dos modelos juntos