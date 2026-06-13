import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/DashboardLayout";

import {
    getMyTasks,
    deleteTask,
    updateTask,
} from "../services/taskService";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

const MyTasks = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const fetchTasks =
        async () => {
            try {
                const data =
                    await getMyTasks();

                setTasks(data.tasks);
            } catch (error) {
                toast.error(
                    "Failed to load tasks"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete =
        async (id) => {
            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this task?"
                );

            if (!confirmDelete) return;

            try {
                await deleteTask(id);

                setTasks((prev) =>
                    prev.filter(
                        (task) =>
                            task._id !== id
                    )
                );

                toast.success(
                    "Task deleted"
                );
            } catch (error) {
                toast.error(
                    "Delete failed"
                );
            }
        };

    const filteredTasks =
        tasks.filter((task) => {
            return (
                task.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                task.description
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        });

    const onEdit = (taskId) => {
        navigate(`/edit-task/${taskId}`)
    }

    const handleMarkDone =
        async (task) => {
            try {
                const data =
                    await updateTask(
                        task._id,
                        {
                            ...task,
                            status:
                                "completed",
                        }
                    );

                setTasks((prev) =>
                    prev.map((t) =>
                        t._id ===
                            task._id
                            ? data.task
                            : t
                    )
                );

                toast.success(
                    "Task Completed"
                );
            } catch (error) {
                toast.error(
                    "Failed"
                );
            }
        };

    return (
        <DashboardLayout>
            <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold">
                        My Tasks
                    </h1>

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="border rounded-lg px-4 py-2 w-full md:w-80"
                    />
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-10">
                        Loading tasks...
                    </div>
                )}

                {/* Empty State */}
                {!loading &&
                    filteredTasks.length ===
                    0 && (
                        <div className="bg-white rounded-xl shadow p-10 text-center">
                            <h2 className="text-xl font-semibold">
                                No Tasks Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Create your first
                                task to get
                                started.
                            </p>
                        </div>
                    )}

                {/* Task Grid */}
                {!loading &&
                    filteredTasks.length >
                    0 && (
                    <div className="space-y-4">
                            {filteredTasks.map(
                                (task) => (
                                    <TaskCard task={task} onDelete={handleDelete} onEdit={onEdit} onMarkDone={handleMarkDone}/>
                                )
                            )}
                        </div>
                    )}
            </div>
        </DashboardLayout>
    );
};

export default MyTasks;