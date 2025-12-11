import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="task-card" onClick={() => navigate(`/tasks/${task._id}`)}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span className={`badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`badge ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        <span className="task-due-date">
          📅 {formatDate(task.dueDate)}
        </span>
        <div className="task-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn-icon btn-edit"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => onDelete(task._id)}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
