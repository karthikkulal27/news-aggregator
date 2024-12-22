import React, { useState } from "react";
import CardwithTitleBottom from "./CardwithTitleBottom";

const CardwithTitleBottomList = ({ articles,title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleViewMore = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length); // Loop through articles
    };

    // Determine the current articles to show based on the index
    const article1 = articles[currentIndex];
    const article2 = articles[(currentIndex + 1) % articles.length];
    const article3 = articles[(currentIndex + 2) % articles.length];

    return (
        <div className="mt-16 px-4">
            {/* Headline and View More */}
            <div className="flex justify-between items-center w-full mb-6 md:px-8">
                <h1 className="text-left font-bold text-3xl font-poppins">
                    {title}
                </h1>
                <h1
                    onClick={handleViewMore}
                    className="text-right cursor-pointer font-semibold text-xl relative inline-block group"
                >
                    View More
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </h1>
            </div>

            {/* Layout */}
            <div className="flex h-screen">
                {/* Left side */}
                <div className=" w-2/3 h-full px-3">
                    <CardwithTitleBottom article={article1} />
                </div>

                {/* Right side */}
                <div className="flex flex-col w-1/3 h-full px-3">
                    <div className=" flex-1 pb-4">
                        <CardwithTitleBottom article={article2} />
                    </div>
                    <div className=" flex-1 pt-4">
                        <CardwithTitleBottom article={article3} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardwithTitleBottomList;
