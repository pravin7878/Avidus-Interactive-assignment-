import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/DashboardLayout";

import {
    getAllUsers,
    updateUserStatus,
    deleteUser,
} from "../../services/adminService";

const Users = () => {
    const [users, setUsers] =
        useState([]);
    const filteredUsers = users.filter(
        (user) => user.role === "user"
    );
    const [loading, setLoading] =
        useState(true);

    const fetchUsers =
        async () => {
            try {
                const data =
                    await getAllUsers();

                setUsers(data.users);
            } catch (error) {
                toast.error(
                    "Failed to fetch users"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleStatusChange =
        async (
            userId,
            currentStatus
        ) => {
            try {
                const newStatus =
                    currentStatus ===
                        "active"
                        ? "inactive"
                        : "active";

                await updateUserStatus(
                    userId,
                    newStatus
                );

                setUsers((prev) =>
                    prev.map((user) =>
                        user._id === userId
                            ? {
                                ...user,
                                status:
                                    newStatus,
                            }
                            : user
                    )
                );

                toast.success(
                    `User ${newStatus}`
                );
            } catch (error) {
                toast.error(
                    "Status update failed"
                );
            }
        };

    const handleDelete =
        async (userId) => {
            const confirmed =
                window.confirm(
                    "Delete this user?"
                );

            if (!confirmed) return;

            try {
                await deleteUser(userId);

                setUsers((prev) =>
                    prev.filter(
                        (user) =>
                            user._id !==
                            userId
                    )
                );

                toast.success(
                    "User deleted"
                );
            } catch (error) {
                toast.error(
                    "Delete failed"
                );
            }
        };

    return (
        <DashboardLayout>
            <div>
                <h1 className="text-3xl font-bold mb-6">
                    User Management
                </h1>

                {loading ? (
                    <div>
                        Loading users...
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left p-4">
                                        Name
                                    </th>

                                    <th className="text-left p-4">
                                        Email
                                    </th>

                                    <th className="text-left p-4">
                                        Role
                                    </th>

                                    <th className="text-left p-4">
                                        Status
                                    </th>

                                    <th className="text-left p-4">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                    {filteredUsers.map(
                                    (user) => (
                                        <tr
                                            key={
                                                user._id
                                            }
                                            className="border-b"
                                        >
                                            <td className="p-4">
                                                {
                                                    user.name
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    user.email
                                                }
                                            </td>

                                            <td className="p-4">
                                                <span className="capitalize">
                                                    {
                                                        user.role
                                                    }
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm ${user.status ===
                                                            "active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {
                                                        user.status
                                                    }
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex gap-2 flex-wrap">
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                user._id,
                                                                user.status
                                                            )
                                                        }
                                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                                    >
                                                        {user.status ===
                                                            "active"
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user._id
                                                            )
                                                        }
                                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Users;