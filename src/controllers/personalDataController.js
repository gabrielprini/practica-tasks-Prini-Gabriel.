import { User, PersonalData } from "../models/index.js";

export const createPersonalData = async (req, res) => {
  try {
    const { dni, birthDate, address, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "Debe indicar el usuario dueño de los datos personales",
      });
    }

    // Verificamos que ese usuario exista realmente antes de crear el registro
    const userExists = await User.findByPk(userId);

    if (!userExists) {
      return res.status(404).json({
        message: "El usuario indicado no existe",
      });
    }

    // findOne() es parecido a findAll(), pero en vez de traer un array con todos los resultados, trae un solo registro 
    // El primero que encuentre que cumpla la condición que le pongas. Si no encuentra ninguno, te devuelve null.
    // where: { user_id: userId } Esto es la condición de búsqueda. Es como decirle: 
    // "Buscame en la tabla PersonalData un registro donde la columna user_id sea igual al valor que tiene la variable userId."
    const alreadyExists = await PersonalData.findOne({ where: { user_id: userId } });

    // Si findOne encontró un registro → alreadyExists tiene un objeto adentro → el if es verdadero → entra al bloque. 
    // Si findOne no encontró nada → alreadyExists es null → el if es falso → NO entra, sigue de largo. 
    // return res.status(400)... 
    // Si ya existe, cortamos la ejecución ahí mismo (por eso el return) 
    // y le devolvemos al usuario un código 400 (Bad Request "tu pedido está mal armado") con un mensaje explicando por qué no se pudo crear.
    if (alreadyExists) {
      return res.status(400).json({
        message: "Este usuario ya tiene datos personales cargados",
      });
    }

    const personalData = await PersonalData.create({
      dni,
      birthDate,
      address,
      user_id: userId,
    });

    res.status(201).json({
      message: "Datos personales creados",
      personalData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear los datos personales",
      error: error.message,
    });
  }
};

export const getPersonalData = async (req, res) => {
  try {
    const personalDatas = await PersonalData.findAll({
      include: [{ model: User, as: "user" }],
    });

    res.status(200).json(personalDatas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener todos los datos",
      error: error.message,
    });
  }
};