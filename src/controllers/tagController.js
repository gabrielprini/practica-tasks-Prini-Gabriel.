import { Task, Tag } from "../models/index.js";
import { matchedData } from "express-validator";

export const createTag = async (req, res) => {
  try {
    // // Acá necesitamos DOS datos del body: el nombre de la etiqueta,
    // y a qué tarea se la queremos poner.
    const { name, taskId } = req.body;

    // validar que venga taskId
    if (!taskId) {
      return res.status(400).json({
        message: "Debe indicar la tarea a la que se le asigna la etiqueta",
      });
    }

    // verificar que esa Task exista
    const taskExists = await Task.findByPk(taskId);

    if (!taskExists) {
      return res.status(404).json({
        message: "La tarea indicada no existe",
      });
    }

    // buscar si la etiqueta ya existe (por nombre).
    // findOrCreate() es un método especial de Sequelize: busca un registro
    // que cumpla la condición, y SI NO LO ENCUENTRA, lo crea automáticamente.
    // Le estás diciendo a JavaScript: "de ese array que me devuelve, 
    // quedate solo con la primera posición (el registro en sí) y 
    // guardala en una variable llamada tag. El segundo elemento (el booleano) ni lo necesito, así que lo ignoro."
    const [tag] = await Tag.findOrCreate({
        where: { name },
    });

    // conectar la tarea con la etiqueta en la tabla intermedia.
    // addTag() es un método que Sequelize genera SOLO porque definiste
    // Task.belongsToMany(Tag, { ..., as: "tags" }) en index.js.
    // (si el alias fuera "etiquetas" en vez de "tags", el método se llamaría addEtiqueta)
    await taskExists.addTag(tag);

    res.status(201).json({
      message: "Etiqueta asignada a la tarea",
      tag,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la etiqueta",
      error: error.message,
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Task, as: "tasks" }],
    });

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener todos los datos",
      error: error.message,
    });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;

    const datosValidados = matchedData(req);
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({
        message: "La etiqueta no existe",
      });
    }

    await tag.update(datosValidados);
    res.status(200).json({
      message: "Tags actualizados",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la Tag",
      error: error.message,
    });
  }
};

export const deleteTag = async (req, res ) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id)

    if (!tag) {
      return res.status(404).json({
        message: "La tag no existe",
      });
    }

    await tag.destroy()

    res.status(200).json({
      message: "tag eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la tag",
      error: error.message,
    });
  }
};