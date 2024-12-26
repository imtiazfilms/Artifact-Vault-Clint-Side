import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, handelLogOut } = useContext(authContext);
    const navigate = useNavigate();

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

    return (
        <div className="bg-[#dbca9a57]">
            <div className="navbar px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <NavLink to="/">
                                <li>Home</li>
                            </NavLink>
                            <NavLink to="/artifacts">
                                <li>All Artifacts</li>
                            </NavLink>
                            <NavLink to="/add-artifact">
                                <li>Add Artifacts</li>
                            </NavLink>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2">
                        <img
                            className="rounded-full h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
                            src="https://i.ibb.co/6DCx92j/Gemini-Generated-Image-977h7y977h7y977h.jpg"
                            alt="Logo"
                        />
                        <a className="text-xl font-bold">Artifact Vault</a>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold text-[16px] space-x-8">
                        <NavLink to="/">
                            <li>Home</li>
                        </NavLink>
                        <NavLink to="/artifacts">
                            <li>All Artifacts</li>
                        </NavLink>
                        <NavLink to="/add-artifact">
                            <li>Add Artifacts</li>
                        </NavLink>
                    </ul>
                </div>

                <div className="navbar-end">
                    {!user ? (
                        <NavLink to="/login">
                            <p className="btn">Login</p>
                        </NavLink>
                    ) : (
                        <div className="dropdown dropdown-end z-50">
                            <div
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                                data-tip={user.displayName || "User"}>
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL || "https://i.ibb.co/6DCx92j/Gemini-Generated-Image-977h7y977h7y977h.jpg"} alt="User" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <NavLink to="/my-artifacts">My Artifacts</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/liked-artifacts">Liked Artifacts</NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-error w-full">
                                        Logout
                                    </button>
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
