import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
    const { handelReg, manageProfile } = useContext(authContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        if (!hasUppercase) return "Password must have at least one uppercase letter.";
        if (!hasLowercase) return "Password must have at least one lowercase letter.";
        if (!hasMinLength) return "Password must be at least 6 characters long.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, photoURL, password } = formData;

        const validationError = validatePassword(password);
        if (validationError) {
            Swal.fire({
                icon: "error",
                title: "Invalid Password",
                text: validationError,
            });
            return;
        }

        try {
            await handelReg(email, password);
            await manageProfile(name, photoURL);

            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: "You have registered successfully!",
            });

            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message || "An unexpected error occurred.",
            });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-100 shadow-lg rounded-xl">
                <h2 className="text-3xl font-bold text-center text-teal-600">Register to ArtifactVault</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photoURL"
                            placeholder="Enter photo URL"
                            value={formData.photoURL}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-2">
                        Register
                    </button>
                </form>
                <div className="text-center">
                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-teal-600 link link-hover cursor-pointer">
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
