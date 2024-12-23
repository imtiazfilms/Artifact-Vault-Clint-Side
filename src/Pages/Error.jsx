import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
            <h1 className="text-9xl font-bold text-error">404</h1>
            <h2 className="text-3xl font-semibold text-primary mt-4">Page Not Found</h2>
            <p className="mt-2 text-gray-600 text-lg">
                The page you are looking for doesn’t exist or has been moved.
            </p>
            <NavLink to="/" className="btn btn-primary mt-6">
                Go Back to Home
            </NavLink>
        </div>
    );
};

export default Error;
