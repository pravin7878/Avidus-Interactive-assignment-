# Task Manager Application

A full-stack Task Management Application built with React.js, Node.js, Express.js, MongoDB, JWT Authentication, Role-Based Access Control (RBAC), and Activity Logging.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### User Features

* Create Tasks
* View Own Tasks
* Update Tasks
* Mark Tasks as Completed
* Delete Tasks
* Dashboard with Task Analytics

### Admin Features

* View All Users
* Manage User Status
* Delete Users
* View All Tasks
* Delete Any Task
* View Activity Logs
* Analytics Dashboard

### Activity Logging

Tracks:

* User Login
* Task Creation
* Task Updates
* Task Deletion
* User Management Activities

---

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Axios
* React Hot Toast
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv

---

## Project Structure

```bash
project-root/
│
├── frontend/
│
├── backend/
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/pravin7878/Avidus-Interactive-assignment-
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=8080

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run Backend

```bash
npm run start
```

Backend URL

```bash
http://localhost:8080
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL

```bash
http://localhost:5173
```

---

## Admin Credentials

Use the following credentials to access the Admin Dashboard:

### Admin Login

```text
Email: admin@gmail.com
Password: 123456
```

---

## User Permissions

* Create own tasks
* View own tasks
* Update own tasks
* Delete own tasks

---

## Admin Permissions

* View all users
* Manage users
* View all tasks
* Delete any task
* View activity logs
* Access analytics dashboard

---

## Screens

### User Dashboard

* Task Statistics
* Recent Tasks
* Quick Actions

### Admin Dashboard

* Total Users
* Total Tasks
* Completed Tasks
* Pending Tasks

### User Management

* Activate User
* Deactivate User
* Delete User

### Task Monitoring

* View All Tasks
* Delete Tasks

### Activity Logs

* Login Activity
* Task Activity
* User Management Activity

---

## API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```http
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

### Admin

```http
GET    /api/admin/users
PATCH  /api/admin/users/:id/status
DELETE /api/admin/users/:id

GET    /api/admin/tasks
DELETE /api/admin/tasks/:id

GET    /api/admin/logs

GET    /api/admin/analytics
```

---

## Author

Pravin Kumar

Full Stack Developer
