import express from 'express';
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation
} from '../controller/LocationController.js';

const router = express.Router();

router.post('/locations', createLocation);
router.get('/locations', getLocations);
router.put('/locations/:id', updateLocation);
router.delete('/locations/:id', deleteLocation);

/**
 * @swagger
 * tags:
 *   name: Ubicaciones
 *   description: Endpoints para gestionar ubicaciones
 */

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Crear una nueva ubicación
 *     tags: [Ubicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Quito
 *               latitude:
 *                 type: number
 *                 example: -0.1807
 *               longitude:
 *                 type: number
 *                 example: -78.4678
 *               geofence_radius:
 *                 type: number
 *                 example: 500
 *     responses:
 *       201:
 *         description: Ubicación creada correctamente
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Obtener todas las ubicaciones
 *     tags: [Ubicaciones]
 *     responses:
 *       200:
 *         description: Lista de ubicaciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   geofence_radius:
 *                     type: number
 */

/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     summary: Actualizar una ubicación por ID
 *     tags: [Ubicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ubicación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               geofence_radius:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Ubicación actualizada correctamente
 */

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     summary: Eliminar una ubicación por ID
 *     tags: [Ubicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ubicación a eliminar
 *     responses:
 *       200:
 *         description: Ubicación eliminada correctamente
 *       404:
 *         description: Ubicación no encontrada
 *       500:
 *         description: Error interno del servidor
 */

export const RouterLocation = router;