import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/DashboardLayout";

import {
    getAllTasks,
    deleteAnyTask,
} from "../../services/adminService";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const fetchTasks =
        async () => {
            try {
                const data =
                    await getAllTasks();

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
        async (taskId) => {
            const confirmed =
                window.confirm(
                    "Delete this task?"
                );

            if (!confirmed) return;

            try {
                await deleteAnyTask(taskId);

                setTasks((prev) =>
                    prev.filter(
                        (task) =>
                            task._id !== taskId
                    )
                );

                toast.success(
                    "Task deleted successfully"
                );
            } catch (error) {
                toast.error(
                    "Failed to delete task"
                );
            }
        };

    const filteredTasks =
        tasks.filter((task) => {
            const searchText =
                search.toLowerCase();

            return (
                task.title
                    ?.toLowerCase()
                    .includes(searchText) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchText) ||
                task.createdBy?.name
                    ?.toLowerCase()
                    .includes(searchText)
            );
        });

    return (
        <DashboardLayout>
            <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold">
                        All Tasks
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
                        className="border px-4 py-2 rounded-lg w-full md:w-80"
                    />
                </div>

                {loading ? (
                    <div>
                        Loading tasks...
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTasks.map(
                            (task) => (
                                <div
                                    key={task._id}
                                    className="bg-white shadow rounded-xl p-5"
                                >
                                    <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                {task.title}
                                            </h2>

                                            <p className="text-gray-600 mt-2">
                                                {
                                                    task.description
                                                }
                                            </p>

                                            <div className="mt-4 space-y-1 text-sm text-gray-500">
                                                <p>
                                                    Created By:
                                                    {" "}
                                                    <span className="font-medium text-gray-700">
                                                        {
                                                            task
                                                                .createdBy
                                                                ?.name
                                                        }
                                                    </span>
                                                </p>

                                                <p>
                                                    Email:
                                                    {" "}
                                                    {
                                                        task
                                                            .createdBy
                                                            ?.email
                                                    }
                                                </p>

                                                <p>
                                                    Date:
                                                    {" "}
                                                    {new Date(
                                                        task.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-start lg:items-end gap-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${task.status ===
                                                        "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {
                                                    task.status
                                                }
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        task._id
                                                    )
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                            >
                                                Delete Task
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                        {!filteredTasks.length && (
                            <div className="bg-white p-10 rounded-xl text-center">
                                No Tasks Found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AllTasks;