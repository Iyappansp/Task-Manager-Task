# Task Manager Pro - Backend API

## Overview
RESTful API for Task Manager Pro built with Node.js, Express, and MongoDB.

## Tech Stack
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Password Hashing**: bcrypt
- **CORS**: Enabled for frontend integration

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy .env file and update values
cp .env.example .env
```

Edit `.env` with your settings:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your secret key for JWT (change in production!)
- `PORT`: Server port (default: 5000)
- `CORS_ORIGIN`: Frontend URL (default: http://localhost:5173)

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Tasks (Protected)
- `POST /tasks` - Create new task
- `GET /tasks` - Get all tasks (supports search, filter, pagination)
- `GET /tasks/:id` - Get single task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Query Parameters for GET /tasks
- `search` - Search by task title (case-insensitive)
- `status` - Filter by status (pending/in-progress/completed)
- `priority` - Filter by priority (low/medium/high)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```
GET /tasks?search=meeting&status=pending&priority=high&page=1&limit=10
```

## Request/Response Examples

### Register
**Request:**
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Task
**Request:**
```json
POST /tasks
Authorization: Bearer <token>
{
  "title": "Complete project",
  "description": "Finish the task manager",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the task manager",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "createdBy": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Folder Structure
```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── validators/      # Joi validation schemas
│   ├── middleware/      # Custom middleware
│   └── server.js        # App entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
└── README.md           # This file
```

## Security Features
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation with Joi
- ✅ Protected routes
- ✅ CORS configuration
- ✅ Error handling

## Testing with Postman/Thunder Client
1. Register a user via `POST /auth/register`
2. Login via `POST /auth/login` to get JWT token
3. Use the token in Authorization header: `Bearer <token>`
4. Test all task endpoints

## Common Issues

**MongoDB Connection Failed:**
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`

**JWT Token Invalid:**
- Check if `JWT_SECRET` matches between requests
- Ensure token format: `Bearer <token>`

**CORS Error:**
- Update `CORS_ORIGIN` in `.env` to match frontend URL

## Development
```bash
npm run dev  # Auto-restart on file changes
```

## Production
```bash
npm start    # Standard Node.js start
```

---
Built with ❤️ for Task Manager Pro
