import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import {
    loginFailure,
    loginStart,
    loginSuccess,
} from "../redux/auth/authSlice";

import { loginUser } from "../services/authService";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        try {
            dispatch(loginStart());

            const data =
                await loginUser(formData);

            dispatch(loginSuccess(data));

            toast.success(
                "Login Successful"
            );

            if (
                data.user.role === "admin"
            ) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            dispatch(loginFailure());

            toast.error(
                error?.response?.data
                    ?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md shadow-lg p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-5">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="text-blue-600 ml-1"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;