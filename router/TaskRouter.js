import express from 'express';
import {
  createTask,
  completeTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getNearbyTasks
} from '../controller/TaskController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/tasks', verifyToken, createTask);
router.get('/tasks/:id', verifyToken, getTaskById);
router.get('/tasks', verifyToken, getTasks);
router.get('/tasks/nearby', getNearbyTasks);
router.put('/tasks/:id', verifyToken, updateTask);
router.put('/tasks/:id/complete', verifyToken, completeTask);
router.delete('/tasks/:id', verifyToken, deleteTask);

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para gestionar tareas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [baja, media, alta]
 *               category:
 *                 type: string
 *               user_id:
 *                 type: integer
 *               location_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Detalle de la tarea obtenida correctamente
 *       404:
 *         description: Tarea no encontrada
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario autenticado
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   priority:
 *                     type: string
 *                   category:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   location_id:
 *                     type: integer
 *       500:
 *         description: Error al obtener las tareas
 */

/**
 * @swagger
 * /tasks/nearby:
 *   get:
 *     summary: Obtener tareas cercanas según coordenadas
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitud actual
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitud actual
 *     responses:
 *       200:
 *         description: Lista de tareas cercanas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   location_id:
 *                     type: integer
 *       400:
 *         description: Coordenadas faltantes
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [baja, media, alta]
 *               category:
 *                 type: string
 *               location_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       404:
 *         description: Tarea no encontrada
 */

/**
 * @swagger
 * /tasks/{id}/complete:
 *   put:
 *     summary: Marcar una tarea como completada
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a completar
 *     responses:
 *       200:
 *         description: Tarea marcada como completada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea completada
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No encontrada
 */

export const RouterTask = router;