import Sidebar from "../components/Sidebar";

const DashboardLayout = ({
    children,
}) => {
    return (
        <div className="flex">
            <Sidebar />

            <main className="flex-1 min-h-screen bg-gray-100 p-5">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;