import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../../assets/logo.png'
 

const Navbar = () => {
   const links = <>
  <li className='text-white hover:bg-secondary mr-2'><NavLink className={({isActive})=>
  isActive ? 'bg-secondary font-semibold' : ''} to='/'>Home</NavLink></li>
  <li className='text-white hover:bg-secondary mr-2'><NavLink className={({isActive})=>
  isActive ? 'bg-secondary font-semibold' : ''} to='/all-product'>All Product</NavLink></li>
  <li className='text-white hover:bg-secondary mr-2'><NavLink className={({isActive})=>
  isActive ? 'bg-secondary font-semibold' : ''} to='/about-us'>About Us</NavLink></li>
  <li className='text-white hover:bg-secondary mr-2'><NavLink className={({isActive})=>
  isActive ? 'bg-secondary font-semibold' : ''} to='/contact'>Contact</NavLink></li>
  </>

    return (
       <div className="navbar bg-primary shadow-sm sticky z-50 top-0 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
      {links}
      </ul>
    </div>
     <Link
      to="/" className="flex gap-2 items-center text-green-600 font-bold  text-xl md:text-2xl">
             <img className="w-14 rounded-full" src={logo} alt="" />
             <span className="bg-gradient-to-r from-black via-gray-800 to-green-800 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-md">
               Garments Tracker
             </span>
           </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
{links}
    </ul>
  </div>
  <div className="navbar-end ">
  <NavLink
    to="/login"
    className={({ isActive }) =>
      `btn bg-primary text-white hover:bg-secondary mr-2 ${
        isActive ? "bg-secondary font-semibold" : ""
      }`
    }
  >
    Login
  </NavLink>

  <NavLink
    to="/register"
    className={({ isActive }) =>
      `btn bg-primary text-white hover:bg-secondary ${
        isActive ? "bg-secondary font-semibold" : ""
      }`
    }
  >
    Register
  </NavLink>
  </div>
</div>
    );
};

export default Navbar;