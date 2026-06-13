import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, LayoutDashboard, PlusCircle, ClipboardList, Users, BarChart3, Activity } from "lucide-react";
import { useState } from "react";

import { logout } from "../redux/auth/authSlice";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = location.pathname 
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>{
      
      return `block px-4 py-3 rounded-lg transition-all duration-200 ${isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`;}

    const userMenus = [
        {
            name: "Dashboard",
            path: "/",
            icon: LayoutDashboard,
        },
        {
            name: "Create Task",
            path: "/create-task",
            icon: PlusCircle,
        },
        {
            name: "My Tasks",
            path: "/my-tasks",
            icon: ClipboardList,
        },
    ];

    const adminMenus = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: BarChart3,
        },
        {
            name: "All Users",
            path: "/admin/users",
            icon: Users,
        },
        {
            name: "All Tasks",
            path: "/admin/tasks",
            icon: ClipboardList,
        },
        {
            name: "Activity Logs",
            path: "/admin/logs",
            icon: Activity,
        },
    ];

    const menus =
        user?.role === "admin"
            ? adminMenus
            : userMenus;

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 shadow bg-white">
                <h1 className="text-xl font-bold text-blue-600">
                    Task Manager
                </h1>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <X size={28} />
                    ) : (
                        <Menu size={28} />
                    )}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static
                    top-0 left-0
                    h-screen
                    w-64
                    bg-white
                    shadow-lg
                    z-50
                    transform
                    transition-transform
                    duration-300
                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
                `}
            >
                {/* Logo */}
                <div className="p-5 border-b flex justify-center"> 

                    {user && (
                        <div className="mt-3">
                            <p className="font-medium">
                                {user.name}
                            </p>

                            <span className="text-sm text-gray-500 capitalize">
                                {user.role}
                            </span>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {menus.map((menu) => {
                        const Icon = menu.icon;

                        return (
                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                className={linkClass({isActive : currentPath === menu.path})}
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} />
                                    <span>{menu.name}</span>
                                </div>
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;