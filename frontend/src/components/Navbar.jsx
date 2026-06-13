import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { logout } from "../redux/auth/authSlice";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const navLinkClass = ({ isActive }) =>
        `font-medium transition ${isActive
            ? "text-blue-600"
            : "text-gray-700 hover:text-blue-600"
        }`;

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-16 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-blue-600"
                    >
                        Task Manager
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={navLinkClass}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className={navLinkClass}
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden"
                        onClick={() =>
                            setIsOpen((prev) => !prev)
                        }
                    >
                        {isOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t bg-white">
                    <div className="flex flex-col p-4 gap-4">
                        {user ? (
                            <>
                                <NavLink
                                    to="/"
                                    onClick={() =>
                                        setIsOpen(false)
                                    }
                                >
                                    Dashboard
                                </NavLink>

                                {user.role === "admin" && (
                                    <>
                                        <NavLink
                                            to="/admin"
                                            onClick={() =>
                                                setIsOpen(false)
                                            }
                                        >
                                            Admin
                                        </NavLink>

                                        <NavLink
                                            to="/admin/users"
                                            onClick={() =>
                                                setIsOpen(false)
                                            }
                                        >
                                            Users
                                        </NavLink>

                                        <NavLink
                                            to="/admin/tasks"
                                            onClick={() =>
                                                setIsOpen(false)
                                            }
                                        >
                                            Tasks
                                        </NavLink>

                                        <NavLink
                                            to="/admin/logs"
                                            onClick={() =>
                                                setIsOpen(false)
                                            }
                                        >
                                            Logs
                                        </NavLink>
                                    </>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white py-2 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    onClick={() =>
                                        setIsOpen(false)
                                    }
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    onClick={() =>
                                        setIsOpen(false)
                                    }
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;