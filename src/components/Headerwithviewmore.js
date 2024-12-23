import React from "react";

const Headerwithviewmore = ({ handleViewMore = false, headerTitle }) => {
  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Section */}
      <div>
        <h1 className="text-left font-bold md:text-xl lg:text-2xl font-poppins">
          {headerTitle}
        </h1>
        <div className="w-3/5 h-1 bg-blue-500 mt-4"></div>
      </div>

      {/* Right Section */}

      {handleViewMore && <h1
        onClick={handleViewMore}
        className="text-right cursor-pointer font-semibold sm:text-s md:text-s lg:text-1xl relative inline-block group"
      >
        View More
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </h1>}
    </div>
  );
};

export default Headerwithviewmore;
