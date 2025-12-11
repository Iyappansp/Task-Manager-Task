import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { taskApi } from '../api/taskApi';
import Button from '../components/Button';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all tasks to calculate stats
      const [allTasks, pendingTasks, inProgressTasks, completedTasks] = await Promise.all([
        taskApi.getTasks({}),
        taskApi.getTasks({ status: 'pending' }),
        taskApi.getTasks({ status: 'in-progress' }),
        taskApi.getTasks({ status: 'completed' }),
      ]);

      setStats({
        total: allTasks.pagination.total,
        pending: pendingTasks.pagination.total,
        inProgress: inProgressTasks.pagination.total,
        completed: completedTasks.pagination.total,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>👋 Welcome, {user?.name}!</h1>
            <p>Here's your task overview</p>
          </div>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </header>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card stat-total">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>{stats.total}</h3>
                  <p>Total Tasks</p>
                </div>
              </div>

              <div className="stat-card stat-pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>{stats.pending}</h3>
                  <p>Pending</p>
                </div>
              </div>

              <div className="stat-card stat-in-progress">
                <div className="stat-icon">🔄</div>
                <div className="stat-content">
                  <h3>{stats.inProgress}</h3>
                  <p>In Progress</p>
                </div>
              </div>

              <div className="stat-card stat-completed">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>{stats.completed}</h3>
                  <p>Completed</p>
                </div>
              </div>
            </div>

            <div className="dashboard-actions">
              <Link to="/tasks">
                <Button variant="primary">View All Tasks →</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
