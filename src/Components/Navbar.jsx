import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { user, handelLogOut } = useContext(authContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await handelLogOut();
            Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have successfully logged out!",
                timer: 2000,
                showConfirmButton: false,
            });
            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Logout Failed",
                text: error.message || "An unexpected error occurred.",
            });
        }
    };

    const handleNavClick = () => {
        setDropdownOpen(false);
    };

    return (
        <div className="bg-[#dbca9a57]">
            <div className="navbar md:px-10">
                {/* START */}
                <div className="navbar-start">
                    {/* Mobile Dropdown */}
                    <div className="relative lg:hidden">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="btn btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute z-50 mt-2 bg-base-100 rounded-box shadow menu p-2 w-52">
                                <li><NavLink to="/" onClick={handleNavClick}>Home</NavLink></li>
                                <li><NavLink to="/artifacts" onClick={handleNavClick}>All Artifacts</NavLink></li>
                                <li><NavLink to="/add-artifact" onClick={handleNavClick}>Add Artifacts</NavLink></li>
                            </ul>
                        )}
                    </div>

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            className="rounded-full h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
                            src="https://i.ibb.co/6DCx92j/Gemini-Generated-Image-977h7y977h7y977h.jpg"
                            alt="Logo"
                        />
                        <a className="md:text-xl min-w-24 font-bold">Artifact Vault</a>
                    </div>
                </div>

                {/* CENTER (Desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold text-[16px] space-x-8">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/artifacts">All Artifacts</NavLink></li>
                        <li><NavLink to="/add-artifact">Add Artifacts</NavLink></li>
                    </ul>
                </div>

                {/* END */}
                <div className="navbar-end">
                    <ThemeToggle />
                    {!user ? (
                        <NavLink to="/login" className="btn">Login</NavLink>
                    ) : (
                        <div className="dropdown dropdown-end z-50">
                            <div
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                                data-tip={user.displayName || "User"}
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        src={user.photoURL || "https://i.ibb.co/6DCx92j/Gemini-Generated-Image-977h7y977h7y977h.jpg"}
                                        alt="User"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li><NavLink to="/my-artifacts">My Artifacts</NavLink></li>
                                <li><NavLink to="/liked-artifacts">Liked Artifacts</NavLink></li>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-error w-full">Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
