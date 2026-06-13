import { useState } from "react";
import {
    MoreVertical,
    Pencil,
    Trash2,
    CheckCircle,
} from "lucide-react";

const TaskCard = ({
    task,
    onDelete,
    onEdit,
    onMarkDone,
}) => {
    const [showMenu, setShowMenu] =
        useState(false);

    return (
        <div className="bg-white rounded-xl shadow border hover:shadow-md transition">

            <div className="flex items-center justify-between p-4">

                {/* Left */}
                <div className="flex-1">

                    <div className="flex items-center gap-3">

                        <h2 className="font-semibold text-lg">
                            {task.title}
                        </h2>

                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${task.status ===
                                    "completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {task.status}
                        </span>

                    </div>

                    <p className="text-gray-500 text-sm mt-1">
                        {task.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                        Created:
                        {" "}
                        {new Date(
                            task.createdAt
                        ).toLocaleDateString()}
                    </p>

                </div>

                {/* Right */}
                <div className="relative">

                    <button
                        onClick={() =>
                            setShowMenu(
                                !showMenu
                            )
                        }
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <MoreVertical
                            size={20}
                        />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-10 w-44 bg-white border rounded-lg shadow-lg z-50">

                            <button
                                onClick={() => {
                                    onEdit(
                                        task._id
                                    );
                                    setShowMenu(
                                        false
                                    );
                                }}
                                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-left"
                            >
                                <Pencil
                                    size={16}
                                />
                                Edit
                            </button>

                            {task.status !==
                                "completed" && (
                                    <button
                                        onClick={() => {
                                            onMarkDone(
                                                task
                                            );

                                            setShowMenu(
                                                false
                                            );
                                        }}
                                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-left"
                                    >
                                        <CheckCircle
                                            size={
                                                16
                                            }
                                        />
                                        Mark Done
                                    </button>
                                )}

                            <button
                                onClick={() => {
                                    onDelete(
                                        task._id
                                    );

                                    setShowMenu(
                                        false
                                    );
                                }}
                                className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 text-left"
                            >
                                <Trash2
                                    size={16}
                                />
                                Delete
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default TaskCard;