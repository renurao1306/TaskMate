import express from 'express';
import TaskController from '../controllers/TaskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, TaskController.addTask);
router.get('/getTasks', protect, TaskController.getTasks);
router.post('/:id/update', protect, TaskController.editTask);
router.delete('/:id/delete', protect, TaskController.deleteTask);

export default router;