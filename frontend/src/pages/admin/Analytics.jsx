import { useEffect, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import AnalyticsCard from "../../components/AnalyticsCard";

import { getAnalytics } from "../../services/adminService";

import toast from "react-hot-toast";

const Analytics = () => {
    const [analytics, setAnalytics] =
        useState({
            totalUsers: 0,
            totalTasks: 0,
            completedTasks: 0,
            pendingTasks: 0,
        });

    const [loading, setLoading] =
        useState(true);
    console.log(loading)
    const fetchAnalytics =
        async () => {
            try {
                const data =
                    await getAnalytics();

                setAnalytics(
                    data.analytics
                );
            } catch (error) {
                toast.error(
                    "Failed to load analytics"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
                <h1>Loading Dashboard...</h1>
        )
    }

    return (
       
            <div>
                <h1 className="text-3xl font-bold mb-8">
                    Analytics Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <AnalyticsCard
                        title="Total Users"
                        value={
                            analytics.totalUsers
                        }
                    />

                    <AnalyticsCard
                        title="Total Tasks"
                        value={
                            analytics.totalTasks
                        }
                    />

                    <AnalyticsCard
                        title="Completed Tasks"
                        value={
                            analytics.completedTasks
                        }
                    />

                    <AnalyticsCard
                        title="Pending Tasks"
                        value={
                            analytics.pendingTasks
                        }
                    />
                </div>
            </div>
    );
};

export default Analytics;