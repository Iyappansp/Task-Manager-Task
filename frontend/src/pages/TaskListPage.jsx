import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskApi } from '../api/taskApi';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import TaskCard from '../components/TaskCard';
import SearchFilterBar from '../components/SearchFilterBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import Button from '../components/Button';

const TaskListPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 1,
  });

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    fetchTasks();
  }, [pagination.page, search, status, priority]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskApi.getTasks({
        page: pagination.page,
        limit: pagination.limit,
        search,
        status,
        priority,
      });

      setTasks(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
    });
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskApi.deleteTask(taskId);
      toast.success('Task deleted successfully! 🗑️');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask._id, formData);
        toast.success('Task updated successfully! ✏️');
      } else {
        await taskApi.createTask(formData);
        toast.success('Task created successfully! ✨');
      }

      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save task');
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="task-list-page">
      <div className="task-list-container">
        <header className="task-list-header">
          <div>
            <h1>📝 My Tasks</h1>
            <p>Manage your tasks efficiently</p>
          </div>
          <div className="header-actions">
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>

        <div className="task-controls">
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            priority={priority}
            onPriorityChange={setPriority}
          />
          <Button variant="primary" onClick={handleCreateTask}>
            + Create Task
          </Button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <h2>📭 No tasks found</h2>
            <p>Create your first task to get started!</p>
            <Button variant="primary" onClick={handleCreateTask}>
              Create Task
            </Button>
          </div>
        ) : (
          <>
            <div className="task-grid">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onPageChange={(page) => setPagination({ ...pagination, page })}
            />
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <form onSubmit={handleFormSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Enter task description"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleFormChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleFormChange}
            />
          </div>

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TaskListPage;
