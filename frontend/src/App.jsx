import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import CreateTask from "./pages/CreateTask";
import MyTasks from "./pages/MyTasks";
import AdminRoute from "./routes/AdminRoute";
import Analytics from "./pages/admin/Analytics";
import Users from "./pages/admin/Users";
import AllTasks from "./pages/admin/AllTasks";
import ActivityLogs from "./pages/admin/ActivityLogs";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
         }
        />

        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={<Users />}
        />

        <Route
          path="/admin/tasks"
          element={
            <AdminRoute>
              <AllTasks />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/logs"
          element={
            <AdminRoute>
              <ActivityLogs />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;