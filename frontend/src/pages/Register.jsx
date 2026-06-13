import { useState } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import { registerUser } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
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
            await registerUser(formData);

            toast.success(
                "Registration Successful"
            );

            navigate("/login");
        } catch (error) {
            toast.error(
                error?.response?.data
                    ?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md shadow-lg p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-5">
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

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
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-blue-600 ml-1"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;