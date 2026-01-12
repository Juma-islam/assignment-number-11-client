import React, { useEffect, useState } from "react";
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
      <li className="font-semibold hover:bg-secondary rounded-md text-white">
        <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/">
          <span>
            <FaHome />
          </span>{" "}
          Home
        </NavLink>
      </li>
      <li className="font-semibold hover:bg-secondary rounded-md text-white">
        <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/allProducts">
          <span>
            <FiShoppingBag />
          </span>{" "}
           Products
        </NavLink>
      </li>
      <li className="font-semibold hover:bg-secondary rounded-md text-white">
            <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/about-us">
              <span>
                <FaUser />
              </span>{" "}
              About Us
            </NavLink>
          </li>
          <li className="font-semibold hover:bg-secondary rounded-md text-white">
            <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/contact">
              <span>
                <FiPhone />
              </span>{" "}
              Contact
            </NavLink>
          </li>
          <li className="font-semibold hover:bg-secondary rounded-md text-white">
            <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/blog">
              <span>
                <FaMicroblog />
              </span>{" "}
              Blog
            </NavLink>
          </li>

      {user ? (
        <li className="font-semibold hover:bg-secondary rounded-md text-white">
          <NavLink className={({ isActive }) => (isActive ? "bg-secondary font-semibold" : "")} to="/dashboard">
            <span>
              <MdDashboard />
            </span>{" "}
            Dashboard
          </NavLink>
        </li>
      ) : (
        <>
          
        </>
      )}
    </>
  );

  return (
    <div className="navbar text-black dark:text-white bg-primary shadow-md sticky z-50 top-0 px-4 md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white dark:bg-black rounded-box z-1 mt-3 w-52 p-2 shadow-md"
          >
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
                <NavLink to="/register" className="btn hover:text-indigo-500">
                  Register
                </NavLink>
              )}
              {user ? (
                <button onClick={handleLogOut} className="btn hover:text-indigo-500">
                  Log Out
                </button>
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user && (
                <li className="font-semibold text-center hover:text-indigo-500">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm bg-green-200 border-none text-green-700 hover:bg-green-300 mt-2"
                >
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
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle hidden md:flex" aria-label="Toggle Theme">
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


// import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router";
// import { toast } from "react-toastify";
// import logo from "../../../assets/logo.png";
// import { FaHome, FaUser } from "react-icons/fa";
// import useAuth from "../../../hooks/useAuth";
// import { FiPhone, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
// import { MdDashboard } from "react-icons/md";
// import { Sun, Moon, LogOut, ChevronRight } from "lucide-react";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
    
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [theme]);

//   const handleLogOut = () => {
//     logOut()
//       .then(() => toast.success("Log-out successful."))
//       .catch((error) => console.log(error));
//   };

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const navItemStyles = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.3em] font-black uppercase transition-all duration-300 border-b-2 ${
//       isActive
//         ? "border-indigo-600 text-indigo-600"
//         : "border-transparent text-gray-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white"
//     }`;

//   const links = (
//     <>
//       <li>
//         <NavLink to="/" className={navItemStyles}>HOME</NavLink>
//       </li>
//       <li>
//         <NavLink to="/allProducts" className={navItemStyles}>PRODUCTS</NavLink>
//       </li>
//        <li>
//             <NavLink to="/about-us" className={navItemStyles}>ABOUT</NavLink>
//           </li>
//           <li>
//             <NavLink to="/contact" className={navItemStyles}>CONTACT</NavLink>
//           </li>
//           <li>
//             <NavLink to="/blog" className={navItemStyles}>Blog</NavLink>
//           </li>
//       {user ? (
//         <li>
//           <NavLink to="/dashboard" className={navItemStyles}>DASHBOARD</NavLink>
//         </li>
//       ) : (
//         <>
         
//         </>
//       )}
//     </>
//   );

//   return (
//     <div className={`fixed top-0 z-[100] w-full transition-all duration-500 border-b ${
//       scrolled 
//         ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl py-2 border-gray-100 dark:border-zinc-900" 
//         : "bg-white dark:bg-[#050505] py-4 border-transparent"
//     }`}>
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
//         {/* Brand/Logo */}
//         <Link to="/" className="flex items-center gap-3 group">
//           <div className="relative">
//              <img className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" src={logo} alt="Logo" />
//              <div className="absolute inset-0 rounded-full border border-indigo-600 scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-lg font-serif font-black tracking-tighter text-gray-900 dark:text-white leading-none uppercase">
//               Garments
//             </span>
//             <span className="text-[8px] tracking-[0.5em] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
//               Tracker
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex items-center gap-2">
//           <ul className="flex items-center mr-8">{links}</ul>
          
//           <div className="h-6 w-[1px] bg-gray-200 dark:bg-zinc-800 mr-4"></div>

//           {/* Theme Toggle */}
//           <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-zinc-400 hover:text-indigo-600 transition-colors">
//             {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
//           </button>

//           {/* User Section */}
//           <div className="flex items-center gap-4 ml-4">
//             {user ? (
//               <div className="dropdown dropdown-end">
//                 <div tabIndex={0} role="button" className="relative p-[2px] rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
//                   <div className="bg-white dark:bg-black p-[2px] rounded-full">
//                     <img className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" src={user.photoURL} alt="Profile" />
//                   </div>
//                 </div>
//                 <ul tabIndex={0} className="dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 w-52 overflow-hidden">
//                    <li className="px-4 py-3 border-b dark:border-zinc-800">
//                       <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{user.displayName || 'User'}</p>
//                    </li>
//                    <li>
//                       <Link to="/dashboard" className="flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
//                         Dashboard <ChevronRight size={14} />
//                       </Link>
//                    </li>
//                    <li>
//                       <button onClick={handleLogOut} className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
//                         Log Out <LogOut size={14} />
//                       </button>
//                    </li>
//                 </ul>
//               </div>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <NavLink to="/login" className="text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all">
//                   Login
//                 </NavLink>
//                 <NavLink to="/register" className="text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all">
//                   Register
//                 </NavLink>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="lg:hidden flex items-center gap-4">
//            <button onClick={toggleTheme} className="text-gray-500 dark:text-zinc-400">
//               {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
//            </button>
//            <div className="dropdown dropdown-end">
//               <label tabIndex={0} className="p-2 text-gray-900 dark:text-white"><FiMenu size={24} /></label>
//               <ul tabIndex={0} className="dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 w-[90vw] max-w-[300px]">
//                  {links}
//                  {!user && (
//                     <div className="flex flex-col gap-2 mt-6">
//                        <Link to="/login" className="w-full py-4 text-center text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-zinc-800">Login</Link>
//                        <Link to="/register" className="w-full py-4 text-center text-[10px] font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black">Register</Link>
//                     </div>
//                  )}
//                  {user && (
//                    <button onClick={handleLogOut} className="w-full mt-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-100 dark:border-red-900/30">Log Out</button>
//                  )}
//               </ul>
//            </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Navbar;

