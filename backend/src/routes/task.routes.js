const express = require('express');
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const {
  createTaskSchema,
  updateTaskSchema,
} = require('../validators/taskValidator');

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

// POST /tasks - Create new task
router.post('/', validate(createTaskSchema), taskController.createTask);

// GET /tasks - Get all tasks (with search, filter, pagination)
router.get('/', taskController.getTasks);

// GET /tasks/:id - Get single task by ID
router.get('/:id', taskController.getTaskById);

// PUT /tasks/:id - Update task
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);

// DELETE /tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
