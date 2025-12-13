
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router"; // Fixed import
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
import { FaHome, FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { FiPhone, FiShoppingBag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { Sun, Moon } from "lucide-react"; // npm install lucide-react (if not installed)

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Log-out successful."))
      .catch((error) => console.log(error));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const links = (
    <>
      <li className="font-semibold hover:bg-secondary rounded-md hover:text-white">
        <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/">
          <span><FaHome /></span> Home
        </NavLink>
      </li>
      <li className="font-semibold hover:bg-secondary rounded-md hover:text-white">
        <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/products">
          <span><FiShoppingBag /></span> All Products
        </NavLink>
      </li>
      
      {user ? (
        <li className="font-semibold hover:bg-secondary rounded-md hover:text-white">
          <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/dashboard">
            <span><MdDashboard /></span> Dashboard
          </NavLink>
        </li>
      ) : (
        <>
          <li className="font-semibold hover:bg-secondary rounded-md hover:text-white">
            <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/about-us">
              <span><FaUser /></span> About Us
            </NavLink>
          </li>
          <li className="font-semibold hover:bg-secondary rounded-md hover:text-white">
            <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/contact">
              <span><FiPhone /></span> Contact
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar text-black dark:text-white bg-primary shadow-md sticky z-50 top-0 px-4 md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-black rounded-box z-1 mt-3 w-52 p-2 shadow-md">
            {links}
            {user && (
              <div className="mt-4 flex justify-center">
                <button onClick={toggleTheme} className="btn btn-ghost">
                  {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-3 lg:hidden">
              {!user && (
                <NavLink to="/register" className="btn hover:text-indigo-500">Register</NavLink>
              )}
              {user ? (
                <button onClick={handleLogOut} className="btn hover:text-indigo-500">Log Out</button>
              ) : (
                <div className="flex justify-center">
                  <button onClick={toggleTheme} className="btn btn-ghost">
                    {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>
        <Link to="/" className="flex gap-2 items-center text-green-600 font-bold text-xl md:text-2xl">
          <img className="w-14 rounded-full" src={logo} alt="" />
          <span className="bg-gradient-to-r from-black via-gray-800 to-green-800 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-md">
            Garments Tracker
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {user && user.photoURL ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-green-400">
                <img referrerPolicy="no-referrer" src={user.photoURL} alt="" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {user && (
                <li className="font-semibold text-center hover:text-indigo-500">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              <li>
                <button onClick={handleLogOut} className="btn btn-sm bg-green-200 border-none text-green-700 hover:bg-green-300 mt-2">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-3">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `btn bg-primary text-white hover:bg-secondary mr-2 ${isActive ? "bg-secondary font-semibold" : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `btn bg-primary text-white hover:bg-secondary ${isActive ? "bg-secondary font-semibold" : ""}`
              }
            >
              Register
            </NavLink>
          </div>
        )}

        {/* Beautiful Moon/Sun Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle hidden md:flex"
          aria-label="Toggle Theme"
        >
          <div className="relative w-6 h-6">
            <Sun
              className={`absolute inset-0 transition-all duration-500 text-yellow-500 ${
                theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
              }`}
            />
            <Moon
              className={`absolute inset-0 transition-all duration-500 text-blue-400 ${
                theme === "light" ? "-rotate-90 scale-0" : "rotate-0 scale-100"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;