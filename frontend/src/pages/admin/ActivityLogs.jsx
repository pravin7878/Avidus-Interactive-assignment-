import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/DashboardLayout";
import { getActivityLogs } from "../../services/adminService";

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchLogs = async () => {
        try {
            const data = await getActivityLogs();
            setLogs(data.logs);
        } catch (error) {
            toast.error("Failed to fetch activity logs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter((log) => {
        const searchText = search.toLowerCase();

        return (
            log.action?.toLowerCase().includes(searchText) ||
            log.details?.toLowerCase().includes(searchText) ||
            log.user?.name?.toLowerCase().includes(searchText) ||
            log.user?.email?.toLowerCase().includes(searchText)
        );
    });

    return (
        <DashboardLayout>
            <div>
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold">
                        Activity Logs
                    </h1>

                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="border px-4 py-2 rounded-lg w-full md:w-80"
                    />
                </div>

                {loading ? (
                    <div>
                        Loading activity logs...
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredLogs.map((log) => (
                            <div
                                key={log._id}
                                className="bg-white shadow rounded-xl p-5"
                            >
                                <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-semibold text-lg">
                                                {log.user?.name || "Unknown User"}
                                            </span>

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {log.action}
                                            </span>
                                        </div>

                                        <p className="text-gray-500 text-sm">
                                            {log.user?.email}
                                        </p>

                                        <p className="mt-3 text-gray-700">
                                            {log.details}
                                        </p>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        {new Date(
                                            log.createdAt
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {!filteredLogs.length && (
                            <div className="bg-white rounded-xl p-10 text-center">
                                No Activity Logs Found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ActivityLogs;