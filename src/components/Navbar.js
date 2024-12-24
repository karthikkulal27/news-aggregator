import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce"; // Custom debounce hook
import FilterModal from "./FilterModal";

const Navbar = ({ onSearch }) => {
  const [activeLink, setActiveLink] = useState("/");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate hook

  const debouncedSearch = useDebounce((value) => {
    if (onSearch) {
      onSearch(value);
    }
  }, 500); // Debounce delay set to 500ms

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value); // Trigger debounced search

    // Navigate to the search route
    if (value.trim()) {
        navigate(`/search?q=${encodeURIComponent(value)}`);
    }
};

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsMobileMenuOpen(false); // Toggle mobile menu
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu
  };



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const applyFilter = (filterData) => {
    setFilters(filterData);
    console.log('Applied Filters:', filterData);
    // Call your API or perform actions with the selected filters
  };


  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/HB.png"  // Assuming NEWS.png is in the public folder
              className="h-16"
              alt="News Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Headline Buzz
            </span>
          </Link>




          {/* Mobile menu toggle button */}
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>


<div className="flex flex-row ">
<div className="relative md:block w-full md:w-auto py-3">
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
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

          </div>

          {activeLink === "/" && <button
            className="flex items-center pe-3 cursor-pointer p-3 px-6"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v1a1 1 0 01-.293.707l-8 8a1 1 0 01-1.414 0l-8-8A1 1 0 013 5V4z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 16v6"
              />
            </svg>
            <span className={`px-1 text-s w-full md:w-auto md:order-1 md:block`} > Filter</span>
          </button>}
</div>
          




          {/* Menu Links for Desktop and Tablets */}
          <div
            className={`w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? "block" : "hidden"} md:block`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={() => handleLinkClick("/")}
                  className={`block py-2 px-3 rounded md:p-0 ${activeLink === "/"
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
                  className={`block py-2 px-3 rounded md:p-0 ${activeLink === "/sports"
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
                  className={`block py-2 px-3 rounded md:p-0 ${activeLink === "/technology"
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
                  className={`block py-2 px-3 rounded md:p-0 ${activeLink === "/trading"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    }`}
                >
                  Trading
                </Link>
              </li>
              <li>
                <Link
                  to="/lifestyle"
                  onClick={() => handleLinkClick("/lifestyle")}
                  className={`block py-2 px-3 rounded md:p-0 ${activeLink === "/lifestyle"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    }`}
                >
                  Life style
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav >

      <FilterModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        applyFilter={applyFilter}
      />
    </div >

  );
};

export default Navbar;
