import { TaskModel } from "../models/TaskModel.js";
import { UserModel } from "../models/UserModel.js";
import { LocationModel } from "../models/LocationModel.js";



export const getTaskById = async (req, res) => {
  const task = await TaskModel.findByPk(req.params.id, {
    include: [UserModel, LocationModel],
  });
  task
    ? res.json(task)
    : res.status(404).json({ message: "Tarea no encontrada" });
};

export const createTask = async (req, res) => {
  const { title, description, date, status, priority, category , user_id, location_id } = req.body;
  const task = await TaskModel.create({ title, description, date, status, priority, category , user_id, location_id });
  res.status(201).json(task);
};

//Listar tareas del Usuario
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.user_id; // ID del usuario autenticado (lo coloca verifyToken)

    const tasks = await TaskModel.findAll({
      where: { user_id: userId },
      include: [LocationModel] // si deseas incluir más info
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas', error: error.message });
  }
};




export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Validar campos que sí se van a permitir actualizar
    const {
      title,
      description,
      date,
      status,
      priority,
      category,
      location_id
    } = req.body;

    // Solo se actualizan campos válidos
    await task.update({
      ...(title && { title }),
      ...(description && { description }),
      ...(date && { date }),
      ...(status && { status }),
      ...(priority && { priority }),
      ...(category && { category }),
      ...(location_id && { location_id }),
    });

    res.status(200).json({ message: "Tarea actualizada correctamente", task });
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
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
    task.status = 'completed';

    // Guardar la tarea actualizada
    await task.save();

    return res.json({ message: 'Tarea completada', task });
  } catch (error) {
    console.error('Error al completar la tarea:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

//Tareas cercanas por coordenadas
export const getNearbyTasks = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat && !lng) {
    return res.status(400).json({ message: "Coordenadas faltantes" });
  }
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  try {
    // Buscar todas las ubicaciones registradas
    const locations = await LocationModel.findAll();
    // Calcular distancia simple en metros y filtrar las cercanas
    const nearbyLocationIds = locations
      .filter(loc => {
        const distance = calcularDistancia(
          latitude,
          longitude,
          parseFloat(loc.latitude),
          parseFloat(loc.longitude)
        );
        return distance <= loc.geofence_radius; // radio de geocerca de esa ubicación
      })
      .map(loc => loc.id);

    if (nearbyLocationIds.length === 0) {
      return res.json([]); // No hay tareas cercanas
    }
    // Buscar tareas asociadas a esas ubicaciones
    const tasks = await TaskModel.findAll({
      where: {
        location_id: { [Op.in]: nearbyLocationIds }
      },
      include: [LocationModel]
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error en getNearbyTasks:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Función auxiliar: Haversine (aproximación)
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distancia en metros
}