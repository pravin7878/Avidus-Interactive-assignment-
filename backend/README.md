# Task Manager Backend API

A role-based Task Management System built with Node.js, Express.js, MongoDB, JWT Authentication, and Activity Logging.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Role-Based Access Control

* Admin Role
* User Role

### User Features

* Create Tasks
* View Own Tasks
* Update Own Tasks
* Delete Own Tasks

### Admin Features

* View All Users
* Delete Users
* Activate/Deactivate Users
* View All Tasks
* Delete Any Task
* View Activity Logs
* Dashboard Analytics

### Activity Tracking

The system tracks:

* User Login
* Task Creation
* Task Updates
* Task Deletion
* User Management Activities

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv
* cors

---

## Project Structure

```bash
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── task.controller.js
│   └── admin.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── admin.middleware.js
│
├── models/
│   ├── User.js
│   ├── Task.js
│   └── ActivityLog.js
│
├── routes/
│   ├── auth.routes.js
│   ├── task.routes.js
│   └── admin.routes.js
│
├── utils/
│   ├── generateToken.js
│   └── logActivity.js
│
└── server.js
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/pravin7878/Avidus-Interactive-assignment-
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### Run Server

Development Mode

```bash
npm run start
```

Server will run on:

```bash
http://localhost:3000
```

---

# API Endpoints

## Authentication

### Register User

POST `/api/auth/register`

Request Body

```json
{
  "name": "Pravin Kumar",
  "email": "pravin@gmail.com",
  "password": "123456"
}
```

### Login

POST `/api/auth/login`

Request Body

```json
{
  "email": "pravin@gmail.com",
  "password": "123456"
}
```

---

## Tasks

### Create Task

POST `/api/tasks`

### Get My Tasks

GET `/api/tasks`

### Get Single Task

GET `/api/tasks/:id`

### Update Task

PATCH `/api/tasks/:id`

### Delete Task

DELETE `/api/tasks/:id`

---

## Admin APIs

### Get All Users

GET `/api/admin/users`

### Delete User

DELETE `/api/admin/users/:id`

### Update User Status

PATCH `/api/admin/users/:id/status`

Request Body

```json
{
  "status": "inactive"
}
```

### Get All Tasks

GET `/api/admin/tasks`

### Delete Any Task

DELETE `/api/admin/tasks/:id`

### Get Activity Logs

GET `/api/admin/logs`

### Dashboard Analytics

GET `/api/admin/analytics`

Response

```json
{
  "totalUsers": 10,
  "totalTasks": 25,
  "completedTasks": 15,
  "pendingTasks": 10
}
```

---

## Authentication Header

For protected routes, include:

```http
Authorization: Bearer <JWT_TOKEN>
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
* Access analytics

---

## Author

Pravin Kumar

Full Stack Developer
