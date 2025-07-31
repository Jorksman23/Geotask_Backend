import express from 'express';
import { 
  login, 
  getUsers, 
  updateUsers, 
  getOneUser 
} from '../controller/UserController.js';
import { verifyToken } from '../middleware/auth.js';
import { 
  validateRegister, 
  validateLogin, 
  validateUpdateUser
} from '../middleware/validatorMiddleware.js';
import { registerUser } from '../controller/AuthController.js';

const router = express.Router();



router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, login);
router.get('/user', verifyToken, getUsers);
router.get('/user/:id', verifyToken, getOneUser);
router.put('/user/:id', verifyToken, validateUpdateUser, updateUsers);

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints relacionados con usuarios y autenticación
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               numero:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error de validación
 */


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Campos incompletos
 *       401:
 *         description: Credenciales inválidas
 */


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener todos los usuarios activos
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user:
 *                         type: string
 *                       email:
 *                         type: string
 *                       numero:
 *                         type: string
 */


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a consultar
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     user:
 *                       type: string
 *                     email:
 *                       type: string
 *                     numero:
 *                       type: string
 *       404:
 *         description: Usuario no encontrado
 */


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Actualizar nombre de usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Faltan datos obligatorios
 *       404:
 *         description: Usuario no encontrado
 */

export const RouterUsuer = router;