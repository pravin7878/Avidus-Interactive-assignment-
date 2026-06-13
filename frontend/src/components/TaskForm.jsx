import { useState } from "react";

const TaskForm = ({
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] =
        useState(
            initialData || {
                title: "",
                description: "",
            }
        );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);

        setFormData({
            title: "",
            description: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded shadow"
        >
            <input
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-3 mb-3 rounded"
            />

            <textarea
                name="description"
                placeholder="Description"
                value={
                    formData.description
                }
                onChange={handleChange}
                className="w-full border p-3 mb-3 rounded"
            />

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Save Task
            </button>
        </form>
    );
};

export default TaskForm;