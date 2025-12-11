import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskApi } from '../api/taskApi';
import { toast } from 'react-toastify';
import Button from '../components/Button';

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await taskApi.getTaskById(id);
      setTask(response.data);
    } catch (error) {
      toast.error('Failed to load task');
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskApi.deleteTask(id);
      toast.success('Task deleted successfully! 🗑️');
      navigate('/tasks');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="task-detail-page">
      <div className="task-detail-container">
        <div className="task-detail-header">
          <Link to="/tasks" className="back-button">
            ← Back to Tasks
          </Link>
          <div className="task-detail-actions">
            <Button variant="secondary" onClick={() => navigate(`/tasks`)}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>

        <div className="task-detail-content">
          <div className="task-detail-title">
            <h1>{task.title}</h1>
            <div className="task-detail-badges">
              <span className={`badge priority-${task.priority}`}>
                {task.priority}
              </span>
              <span className={`badge status-${task.status}`}>
                {task.status}
              </span>
            </div>
          </div>

          <div className="task-detail-info">
            <div className="info-item">
              <label>Description:</label>
              <p>{task.description || 'No description provided'}</p>
            </div>

            <div className="info-item">
              <label>Due Date:</label>
              <p>📅 {formatDate(task.dueDate)}</p>
            </div>

            <div className="info-item">
              <label>Status:</label>
              <p className={`status-${task.status}`}>{task.status}</p>
            </div>

            <div className="info-item">
              <label>Priority:</label>
              <p className={`priority-${task.priority}`}>{task.priority}</p>
            </div>

            <div className="info-item">
              <label>Created By:</label>
              <p>{task.createdBy?.name} ({task.createdBy?.email})</p>
            </div>

            <div className="info-item">
              <label>Created At:</label>
              <p>{new Date(task.createdAt).toLocaleString()}</p>
            </div>

            <div className="info-item">
              <label>Last Updated:</label>
              <p>{new Date(task.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
