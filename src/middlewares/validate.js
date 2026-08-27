// Traemos validationResult, una función de express-validator que revisa
// si las validaciones que definimos en la ruta encontraron algún problema.

import { validationResult } from "express-validator";

// Validate recibe req (petición), res (respuesta), y next (siguiente paso) 
// Es lo nuevo importante. next() significa:
// "La validación salió bien, continuá con el siguiente middleware o con el controller."
export const validate = ( req, res, next ) => {

    // Acá le decimos: "Revisá la petición req y dame los errores de validación que encontraste."
    const errors = validationResult(req);

    // isEmpty() pregunta: "¿No hay errores?", Pero tenemos: !, Entonces estamos preguntando: 
    // "¿SÍ hay errores?", Por eso entra al if cuando encuentra algún problema.
    if (!errors.isEmpty()) {
        // porque return: Porque si encontramos errores: No queremos que la petición continúe.
        return res.status(400).json ({
            message: "Error de validación",
            // array() convierte los errores en una lista que podemos enviar fácilmente como JSON.
            errors: errors.array()
        })
    }

    // significa: "No encontramos errores, podés continuar."
    next();
}