import express from 'express';
import {
  createTask,
  completeTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controller/TaskController.js';
import { verifyToken } from '../middleware/auth.js'; // si estás usando autenticación

const router = express.Router();

router.get('/tasks', verifyToken, getTasks);
router.get('/tasks/:id', verifyToken, getTaskById);
router.post('/tasks', verifyToken, createTask);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);
router.put('/tasks/:id/complete', verifyToken, completeTask);

export const RouterTask = router;
