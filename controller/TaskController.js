import { TaskModel } from "../models/TaskModel.js";
import { UserModel } from "../models/UserModel.js";
import { CategoryModel } from "../models/CategoryModel.js";
import { LocationModel } from "../models/LocationModel.js";


export const getTaskById = async (req, res) => {
  const task = await TaskModel.findByPk(req.params.id, {
    include: [UserModel, CategoryModel, LocationModel],
  });
  task
    ? res.json(task)
    : res.status(404).json({ message: "Tarea no encontrada" });
};

export const createTask = async (req, res) => {
  const { title, description, date, status, priority, user_id, category_id, location_id } = req.body;
  const task = await TaskModel.create({ title, description, date, status, priority, user_id, category_id, location_id });
  res.status(201).json(task);
};

//Listar tareas del Usuario
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.user_id; // ID del usuario autenticado (lo coloca verifyToken)

    const tasks = await TaskModel.findAll({
      where: { user_id: userId },
      include: [CategoryModel, LocationModel] // si deseas incluir más info
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const task = await TaskModel.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

  await task.update(req.body);
  res.json({ message: "Tarea actualizada", task });
};

export const deleteTask = async (req, res) => {
  const deleted = await TaskModel.destroy({ where: { id: req.params.id } });
  deleted
    ? res.json({ message: "Tarea eliminada" })
    : res.status(404).json({ message: "No encontrada" });
};

export const completeTask = async (req, res) => {
  const { id } = req.params; // Obtener el id de la tarea desde la URL

  try {
    // Buscar la tarea por id
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Cambiar el estado de la tarea a "finalizado"
    task.status = 'finalizado';

    // Guardar la tarea actualizada
    await task.save();

    return res.json({ message: 'Tarea completada', task });
  } catch (error) {
    console.error('Error al completar la tarea:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
