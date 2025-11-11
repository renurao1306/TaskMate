import express from 'express';
import TaskController from '../controllers/TaskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, TaskController.addTask);
router.get('/getTasks', protect, TaskController.getTasks);

export default router;