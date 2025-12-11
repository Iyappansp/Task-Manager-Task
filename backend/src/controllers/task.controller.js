const taskService = require('../services/taskService');

class TaskController {
  // Create new task
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body, req.user._id);

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all tasks
  async getTasks(req, res, next) {
    try {
      const result = await taskService.getTasks(req.user._id, req.query);

      res.status(200).json({
        success: true,
        message: 'Tasks retrieved successfully',
        data: result.tasks,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get single task by ID
  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id, req.user._id);

      res.status(200).json({
        success: true,
        message: 'Task retrieved successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update task
  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(
        req.params.id,
        req.user._id,
        req.body
      );

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete task
  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id, req.user._id);

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
