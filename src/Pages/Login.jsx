import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { handelGoogleLogin } = useContext(authContext);
    const navigate = useNavigate();

    const handleGoogleLoginClick = async () => {
        try {
            await handelGoogleLogin();
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You have logged in successfully!",
                timer: 2000,
                showConfirmButton: false,
            });
            navigate("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message || "An unexpected error occurred. Please try again.",
            });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-100 shadow-lg rounded-xl">
                <h2 className="text-3xl font-bold text-center text-teal-600">
                    Login to ArtifactVault
                </h2>
                <form className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="checkbox checkbox-primary" />
                            <span className="label-text">Remember me</span>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-2">
                        Login
                    </button>
                </form>
                <div className="text-center">
                    <p>
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-teal-600 link link-hover cursor-pointer">
                            Register here
                        </span>
                    </p>
                    <p>
                        <span
                            onClick={() => navigate("/forgot-password")}
                            className="text-teal-600 link link-hover cursor-pointer">
                            Forgot Password?
                        </span>
                    </p>
                </div>
                <div className="divider">OR</div>
                <div className="flex flex-col gap-4">
                    <button onClick={handleGoogleLoginClick} className="btn btn-outline btn-primary flex items-center gap-2 justify-center">
                    <img className="w-[45px]" src="https://i.ibb.co.com/BgbVwXz/icons8-google-logo-94.png" alt="" />
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
