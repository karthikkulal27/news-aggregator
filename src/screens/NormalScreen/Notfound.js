import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        <p className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
       
        <div className="mt-6">
          <Link
            to="/"
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default NotFound;
