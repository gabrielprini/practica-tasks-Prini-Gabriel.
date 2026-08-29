import { User, Task } from "../models/index.js";
import { matchedData } from "express-validator";


export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, userId } = req.body;

    // Validamos que se haya mandado un userId
    if(!userId) {
      return res.status(400).json({
        message: "Debe indicar el usuario dueño de la tarea"
      })
    }

     // Verificamos que ese usuario exista realmente antes de crear la tarea
    const userExists = await User.findByPk(userId);

    if (!userExists) {
      res.status(404).json({
        message: "El usuario indicado no existe"
      });
    }

    const task = await Task.create({
      title,
      description,
      isComplete,
      user_id: userId
    });

    res.status(201).json({
      message: "Tarea Creada",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la tarea",
      error: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      // include: [ ... ] Esto es lo nuevo. Le estamos diciendo: 
      // "además de las tareas, traeme también los datos relacionados". 
      // Es un array ([ ]) porque podrías incluir más de una relación al mismo tiempo (por ejemplo, tareas + usuario + etiquetas), separadas por comas dentro del array.
      // Sin este include, si consultás una tarea, Sequelize solo te da: id, title, description, isComplete, user_id. 
      // Vas a ver el user_id (un número, ej: 3), pero no vas a saber quién es ese usuario sin hacer OTRA consulta aparte. 
      // El include evita eso: en una sola consulta a MySQL, trae la tarea Y el usuario completo (nombre, email, etc.) juntos.
      // { model: User, as: "user" } Esto es un objeto que le dice a Sequelize DE DÓNDE traer esos datos extra: 
      // model: User → "el modelo relacionado es User" (tu modelo de usuarios) as: "user" → este es el alias, y es crítico que sea exactamente igual al que pusiste en index.js
      include: [{model: User, as: "user"}],
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener todas las tareas",
      error: error.message,
    });
  }
};

export const getTaskId = async (req, res) => {
  try {
    const { id } = req.params;

    const taskId = await Task.findByPk(id);

    if (!taskId) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    res.status(200).json(taskId);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener todas las tareas",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const datosValidos = matchedData(req);

    const taskUpdate = await Task.findByPk(id);

    if (!taskUpdate) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    await taskUpdate.update(datosValidos)

    res.status(200).json({
      message: "Tarea Actualizada",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener todas las tareas",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskDelete = await Task.findByPk(id);

    if (!taskDelete) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    await taskDelete.destroy();

    res.status(200).json({
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la tarea",
      error: error.message,
    });
  }
};
