const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { PORT, CORS_ORIGIN } = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Manager Pro API',
    version: '1.0.0',
  });
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
