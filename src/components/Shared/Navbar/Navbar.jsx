import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
import { FaHome, FaMicroblog, FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { FiPhone, FiShoppingBag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { Sun, Moon } from "lucide-react";

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
      <li className="font-semibold hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-all">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive ? "bg-white/20 dark:bg-white/10 font-bold text-white" : "text-white/90"
            }`
          }
          to="/"
        >
          <FaHome /> Home
        </NavLink>
      </li>

      <li className="font-semibold hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-all">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive ? "bg-white/20 dark:bg-white/10 font-bold text-white" : "text-white/90"
            }`
          }
          to="/allProducts"
        >
          <FiShoppingBag /> Products
        </NavLink>
      </li>

      <li className="font-semibold hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-all">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive ? "bg-white/20 dark:bg-white/10 font-bold text-white" : "text-white/90"
            }`
          }
          to="/about-us"
        >
          <FaUser /> About Us
        </NavLink>
      </li>

      <li className="font-semibold hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-all">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive ? "bg-white/20 dark:bg-white/10 font-bold text-white" : "text-white/90"
            }`
          }
          to="/contact"
        >
          <FiPhone /> Contact
        </NavLink>
      </li>

      <li className="font-semibold hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-all">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive ? "bg-white/20 dark:bg-white/10 font-bold text-white" : "text-white/90"
            }`
          }
          to="/blog"
        >
          <FaMicroblog /> Blog
        </NavLink>
      </li>

      {user && (
        <li className="font-semibold hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-all">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive ? "bg-white/20 dark:bg-white/10 font-bold text-white" : "text-white/90"
              }`
            }
            to="/dashboard"
          >
            <MdDashboard /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-primary text-white shadow-2xl sticky top-0 z-50 transition-all duration-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-gradient-to-b from-indigo-950/95 to-purple-950/95 backdrop-blur-xl rounded-2xl w-64 border border-white/10"
          >
            {links}
            <div className="mt-6 flex justify-center">
              <button onClick={toggleTheme} className="btn btn-circle btn-ghost text-white">
                {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              </button>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              {!user ? (
                <>
                  <Link to="/login" className="btn bg-white/10 hover:bg-white/20 text-white border-none">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button onClick={handleLogOut} className="btn bg-red-600/80 hover:bg-red-700 text-white border-none">
                  Log Out
                </button>
              )}
            </div>
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-3 text-xl md:text-2xl font-extrabold">
          <img className="w-12 md:w-14 rounded-full shadow-lg border-2 border-white/30" src={logo} alt="Logo" />
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-md">
            Garments Tracker
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {user && user.photoURL ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 md:w-11 rounded-full border-2 border-indigo-400/50 shadow-md overflow-hidden">
                <img referrerPolicy="no-referrer" src={user.photoURL} alt="User" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-gradient-to-b from-indigo-950/95 to-purple-950/95 backdrop-blur-xl rounded-2xl w-60 border border-white/10"
            >
              <li className="text-center font-medium text-white/90 mb-2">{user.displayName || "User"}</li>
              <li>
                <Link to="/dashboard" className="hover:bg-white/10 transition-all">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="text-red-400 hover:bg-red-900/30 transition-all">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-6"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none rounded-xl px-6 shadow-lg"
            >
              Register
            </Link>
          </div>
        )}

        {/* Theme Toggle - Beautiful Animation */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle hidden md:flex" aria-label="Toggle Theme">
          <div className="relative w-6 h-6">
            <Sun
              className={`absolute inset-0 transition-all duration-500 text-yellow-400 ${
                theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <Moon
              className={`absolute inset-0 transition-all duration-500 text-indigo-300 ${
                theme === "light" ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
