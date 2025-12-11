const Task = require('../models/Task');

class TaskService {
  // Create new task
  async createTask(taskData, userId) {
    const task = await Task.create({
      ...taskData,
      createdBy: userId,
    });

    return await task.populate('createdBy', 'name email');
  }

  // Get all tasks with search, filter, and pagination
  async getTasks(userId, queryParams) {
    const {
      search = '',
      status,
      priority,
      page = 1,
      limit = 10,
    } = queryParams;

    // Build query
    const query = { createdBy: userId };

    // Search by title (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Filter by status
    if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
      query.status = status;
    }

    // Filter by priority
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      query.priority = priority;
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const tasks = await Task.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await Task.countDocuments(query);

    return {
      tasks,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    };
  }

  // Get single task by ID
  async getTaskById(taskId, userId) {
    const task = await Task.findOne({
      _id: taskId,
      createdBy: userId,
    }).populate('createdBy', 'name email');

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  // Update task
  async updateTask(taskId, userId, updateData) {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: userId },
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  // Delete task
  async deleteTask(taskId, userId) {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      createdBy: userId,
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }
}

module.exports = new TaskService();
