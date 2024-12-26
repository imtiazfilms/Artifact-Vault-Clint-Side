/* eslint-disable react/prop-types */
import { useContext } from "react";
import { authContext } from "../Firebase/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-green-50">
    <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
        <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full"></div>
    </div>
</div>

        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children; 
};

export default PrivetRoute;
