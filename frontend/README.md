# Task Manager Pro - Frontend

## Overview
Modern React-based frontend for Task Manager Pro with premium UI/UX.

## Tech Stack
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Notifications**: React Toastify
- **Styling**: Custom CSS with modern design

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running

## Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
# Update .env with your backend URL
VITE_API_URL=http://localhost:5000
```

4. Start development server:
```bash
npm run dev
```

5. Open browser:
```
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Features

### Authentication
- ✅ User registration
- ✅ User login
- ✅ JWT token management
- ✅ Protected routes
- ✅ Auto-redirect on auth failure

### Task Management
- ✅ Create, read, update, delete tasks
- ✅ Search tasks by title
- ✅ Filter by status (pending/in-progress/completed)
- ✅ Filter by priority (low/medium/high)
- ✅ Pagination
- ✅ Task details view
- ✅ Quick stats dashboard

### UI/UX
- ✅ Modern dark theme
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Loading states
- ✅ Error handling
- ✅ Error boundary

## Project Structure

```
frontend/
├── src/
│   ├── api/              # API client and services
│   │   ├── axiosClient.js
│   │   ├── authApi.js
│   │   └── taskApi.js
│   ├── components/       # Reusable components
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── TaskCard.jsx
│   │   ├── SearchFilterBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ErrorBoundary.jsx
│   ├── pages/           # Page components
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── TaskListPage.jsx
│   │   └── TaskDetailPage.jsx
│   ├── context/         # React Context
│   │   └── AuthContext.jsx
│   ├── hooks/           # Custom hooks
│   │   └── useAuth.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
└── package.json        # Dependencies
```

## Routes

- `/` - Redirects to dashboard
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Dashboard (protected)
- `/tasks` - Task list (protected)
- `/tasks/:id` - Task detail (protected)

## Environment Variables

```env
VITE_API_URL=http://localhost:5000
```

## Design System

### Colors
- Primary: Blue gradient (#5c7cfa → #4263eb)
- Success: Green (#51cf66)
- Warning: Yellow (#ffd43b)
- Error: Red (#ff6b6b)
- Background: Dark gradient (#0a0e27 → #141932)

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

### Components
All components use a consistent design system with:
- Rounded corners
- Smooth transitions
- Hover effects
- Shadow elevation
- Responsive breakpoints

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

### Hot Reload
Vite provides instant hot module replacement (HMR).

### API Calls
All API calls go through `axiosClient.js` which:
- Adds auth token automatically
- Handles 401 errors
- Provides consistent error handling

### State Management
- Auth state managed via `AuthContext`
- Task state managed locally in components
- Future: Can migrate to Redux/Zustand if needed

### Styling
- Use CSS custom properties (variables)
- Follow BEM naming convention
- Mobile-first responsive design

## Troubleshooting

**CORS errors:**
- Ensure backend has CORS enabled
- Check `VITE_API_URL` in `.env`

**404 on refresh:**
- Configure server to redirect to index.html
- Or use HashRouter instead of BrowserRouter

**Build fails:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm run dev -- --force`

---
Built with ❤️ for Task Manager Pro
