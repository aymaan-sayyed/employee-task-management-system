# Employee Task Management System

A full-stack Employee Task Management System built using the MERN stack. The application allows users to securely manage their daily tasks with authentication, task tracking, search, filtering, sorting, pagination, and a responsive user interface.

---

## Features

### Authentication
- User Signup
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Logout

### Task Management
- Create Task
- View Tasks
- Update Task
- Delete Task
- Search Tasks
- Filter by Status
- Filter by Priority
- Sort by Date
- Pagination

### Dashboard
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks

### User Profile
- View User Information
- Member Since

### UI Features
- Responsive Design
- Dark Mode
- Loading Spinner
- Empty State
- Toast Notifications
- Delete Confirmation

---

## Tech Stack

### Frontend
- React.js
- React Router
- Bootstrap
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## Folder Structure

Employee-Task-Management

├── client
│   ├── src
│   ├── public
│   └── package.json

├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── package.json
│   └── server.js

---

## Installation

### Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### Install Frontend

```bash
cd client
npm install
npm run dev
```

### Install Backend

```bash
cd server
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication

POST /auth/signup

POST /auth/login

GET /auth/profile

---

### Tasks

GET /tasks

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

---

## Screenshots

Add screenshots of:

- Login Page
- Signup Page
- Dashboard
- Profile Page
- Dark Mode

---

## Future Improvements

- Due Date Reminders
- Email Notifications
- Task Categories
- Admin Dashboard
- Charts and Analytics

---

## Author

Aymaan Sayyed
