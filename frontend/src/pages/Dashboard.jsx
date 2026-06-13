import DashboardLayout from "../components/DashboardLayout";
import UserDashboard from "../components/UserDashboard";
import Analytics from "./admin/Analytics";

const Dashboard = () => {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <DashboardLayout>
            {user?.role === "admin" ? (
                <Analytics />
            ) : (
                <UserDashboard />
            )}
        </DashboardLayout>
    );
};

export default Dashboard;