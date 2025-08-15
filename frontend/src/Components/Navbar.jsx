import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoLogOut, IoMenu, IoClose } from "react-icons/io5";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to:"/signup", label:"Sign Up" }
  ];

  const baseLinkClasses = "block px-3 py-2 rounded hover:bg-gray-700";
  const activeLinkClasses = "text-blue-400 font-semibold";

  return (
    <nav className="bg-black text-white border-b-gray-500 border-b-1">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <h1 className="text-blue-500 text-2xl font-bold">DevNotes</h1>

        {/* Desktop links */}
        <ul className="hidden md:flex space-x-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout icon */}
        <div className="hidden md:block text-2xl cursor-pointer">
          <IoLogOut />
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900">
          <ul className="flex flex-col space-y-1 px-4 pb-4">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${isActive ? activeLinkClasses : ""}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                className="block px-3 py-2 rounded hover:bg-gray-700 text-white"
                onClick={() => {
                  // insert logout logic here
                }}
              >
                <IoLogOut className="inline mr-2 text-xl" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
