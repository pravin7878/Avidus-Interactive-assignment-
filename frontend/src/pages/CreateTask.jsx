import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../components/DashboardLayout";
import { createTask } from "../services/taskService";

const CreateTask = () => {
    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            return toast.error(
                "Title is required"
            );
        }

        try {
            setLoading(true);

            await createTask(formData);

            toast.success(
                "Task created successfully"
            );

            navigate("/my-tasks");
        } catch (error) {
            toast.error(
                error?.response?.data
                    ?.message ||
                "Failed to create task"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow p-6">
                    <h1 className="text-3xl font-bold mb-6">
                        Create Task
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block mb-2 font-medium">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={handleChange}
                                placeholder="Enter task description"
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Task"}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateTask;