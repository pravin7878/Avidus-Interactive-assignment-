import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getMyTasks } from "../services/taskService";

const UserDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const fetchTasks = async () => {
        try {
            const data = await getMyTasks();
            setTasks(data.tasks || []);
        } catch (error) {
            toast.error("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    const completionRate = totalTasks
        ? Math.round(
            (completedTasks / totalTasks) * 100
        )
        : 0;

    const recentTasks = [...tasks]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 5);

    if (loading) {
        return (
            <div className="text-center py-10">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow p-6">
                <h1 className="text-3xl font-bold">
                    Welcome Back, {user?.name} 👋
                </h1>

                <p className="text-gray-600 mt-2">
                    You currently have{" "}
                    <span className="font-semibold">
                        {pendingTasks}
                    </span>{" "}
                    pending tasks.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">
                        Total Tasks
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {totalTasks}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">
                        Completed
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        {completedTasks}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">
                        Pending
                    </p>

                    <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                        {pendingTasks}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500">
                        Completion Rate
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        {completionRate}%
                    </h2>
                </div>

            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Quick Actions
                </h2>

                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/create-task"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Create Task
                    </Link>

                    <Link
                        to="/my-tasks"
                        className="bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-900"
                    >
                        View Tasks
                    </Link>
                </div>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold">
                        Recent Tasks
                    </h2>

                    <Link
                        to="/my-tasks"
                        className="text-blue-600 hover:underline"
                    >
                        View All
                    </Link>
                </div>

                {recentTasks.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No tasks found.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recentTasks.map((task) => (
                            <div
                                key={task._id}
                                className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {task.title}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {task.description}
                                    </p>
                                </div>

                                <span
                                    className={`mt-3 md:mt-0 px-3 py-1 rounded-full text-sm font-medium w-fit ${task.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {task.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default UserDashboard;