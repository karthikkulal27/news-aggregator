import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <div className="flex md:order-2">
          {/* Search Bar for Desktop */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar-desktop"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
        <div
          className="w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          {/* Navigation Links */}
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                onClick={() => handleLinkClick("/")}
                className={`block py-2 px-3 rounded md:p-0 ${
                  activeLink === "/"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/sports"
                onClick={() => handleLinkClick("/sports")}
                className={`block py-2 px-3 rounded md:p-0 ${
                  activeLink === "/sports"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                }`}
              >
                Sports
              </Link>
            </li>
            <li>
              <Link
                to="/technology"
                onClick={() => handleLinkClick("/technology")}
                className={`block py-2 px-3 rounded md:p-0 ${
                  activeLink === "/technology"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                }`}
              >
                Technology
              </Link>
            </li>
            <li>
              <Link
                to="/trading"
                onClick={() => handleLinkClick("/trading")}
                className={`block py-2 px-3 rounded md:p-0 ${
                  activeLink === "/trading"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                }`}
              >
                Trading
              </Link>
            </li>
            <li>
              <Link
                to="/cricket"
                onClick={() => handleLinkClick("/cricket")}
                className={`block py-2 px-3 rounded md:p-0 ${
                  activeLink === "/cricket"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                }`}
              >
                Cricket
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
