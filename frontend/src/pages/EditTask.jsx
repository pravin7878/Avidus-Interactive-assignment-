import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../components/DashboardLayout";

import {
    getTaskById,
    updateTask,
} from "../services/taskService";

const EditTask = () => {
    const { id } = useParams();

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            status: "pending",
        });

    const fetchTask =
        async () => {
            try {
                const data =
                    await getTaskById(
                        id
                    );

                setFormData(
                    data.task
                );
            } catch (error) {
                toast.error(
                    "Failed to load task"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchTask();
    }, []);

    const handleChange = (
        e
    ) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit =
        async (e) => {
            e.preventDefault();

            try {
                await updateTask(
                    id,
                    formData
                );

                toast.success(
                    "Task Updated"
                );

                navigate(
                    "/my-tasks"
                );
            } catch (error) {
                toast.error(
                    "Update failed"
                );
            }
        };

    if (loading) {
        return (
            <DashboardLayout>
                Loading...
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Edit Task
                </h1>

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="title"
                        value={
                            formData.title
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <textarea
                        rows="5"
                        name="description"
                        value={
                            formData.description
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border rounded-lg p-3"
                    />

                    <select
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full border rounded-lg p-3"
                    >
                        <option value="pending">
                            Pending
                        </option>

                        <option value="completed">
                            Completed
                        </option>
                    </select>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                        Update Task
                    </button>

                </form>
            </div>
        </DashboardLayout>
    );
};

export default EditTask;