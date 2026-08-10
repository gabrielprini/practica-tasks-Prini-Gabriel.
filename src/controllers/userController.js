// Estamos trayendo el modelo que hicimos antes, Ese modelo sabe cómo es nuestra tabla de usuarios: id, name, email, password
import user from "../models/user.js"

// Acá estamos creando una función llamada: createUser
// Y hacemos: export cont porque queremos que otros archivos puedan importar esta función.
// ¿Por qué async? Porque dentro vamos a utilizar: await, y además vamos a hacer una operación con la base de datos que puede tardar, 
// async indica que esta función trabaja de manera asíncrona(es un adjetivo que describe procesos, comunicaciones o eventos que no ocurren al mismo tiempo).
// req Es la petición del usuario. La peticion del usuario llega todo adentro de req.bodyy res Es la respuesta que nosotros le vamos a devolver al usuario.
export const createUser = async(req, res) => {
    // try Le estamos diciendo: "Intentá ejecutar este código." Porque estamos haciendo una operación con la base de datos y puede fallar.
    try {
        // Esta línea puede parecer complicada, pero en realidad es desestructuración.
        const {name ,email, password} = req.body

        //le dice a Sequelize: "Creá un nuevo usuario en la base de datos."
        // Await: "Esperá a que termine de crearse antes de continuar."
        const User = await user.create({
            // le pasamos los datos 
            name,
            email,
            password
        });

        // Acá estamos enviando una respuesta. Res Es la respuesta. Status(201 = Creado) Estamos diciendo que la operación fue exitosa y que se creó un recurso.
        // .json(user) Le mandamos el usuario creado en formato JSON para que peuda leerlo.
        res.status(201).json(user);
    }

    // Si algo dentro del try falla, entramos acá.
    // le respondemos con 500 que significa que ocurrió un error del servidor. Después mandamos un JSON: 
    // Es un mensaje que nosotros escribimos para explicar qué operación falló.
    // Es el mensaje específico que nos proporciona JavaScript/Sequelize sobre el error.
    catch (error) {
        res.status(500).json({
            message: "error al crear el usuaio",
            error: error.message
        });
    }
};  

