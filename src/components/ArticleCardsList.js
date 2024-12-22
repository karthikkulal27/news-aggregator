import React, { useState } from 'react';
import ArticleCard from './AricleCard';

const ArticlesCardList = ({ articles, headlineloading }) => {
    const [currentPage, setCurrentPage] = useState(0); // Tracks the current page of articles
    const articlesPerPage = 5;

    // Calculate the current set of articles to display
    const currentArticles = articles.slice(
        currentPage * articlesPerPage,
        (currentPage + 1) * articlesPerPage
    );

    // Handle "View More" logic
    const handleViewMore = () => {
        if ((currentPage + 1) * articlesPerPage < articles.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center w-full mb-6 md:px-8">
                <h1 className="text-left font-bold text-3xl font-poppins">
                    Recent News
                </h1>
                {(currentPage + 1) * articlesPerPage < articles.length && (
                    <h1
                        onClick={handleViewMore}
                        className="text-right cursor-pointer font-semibold text-xl relative inline-block group"
                    >
                        View More
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </h1>

                )}

            </div>
            {/* Loader while articles are being fetched */}
            {headlineloading && currentArticles.length === 0 ? (
                <div className="text-center text-xl">Loading...</div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-between">
                        {/* First Article takes 50% of the width */}
                        <div className="w-full sm:w-1/2 mb-4 md:px-8">
                            {currentArticles.length > 0 && (
                                <ArticleCard
                                    article={currentArticles[0]}
                                    size="b"
                                />
                            )}
                        </div>

                        {/* Next 9 Articles in the remaining 50% */}
                        <div className="w-full sm:w-1/2 flex flex-wrap justify-between md:px-8">


                            {currentArticles.slice(1).map((article, index) => {
                                if (article.content === "[Removed]") return null;
                                return (
                                    <div key={index} className="w-full mb-4">
                                        <ArticleCard
                                            article={article}
                                            size="s"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* "View More" Button */}
                    {/* {(currentPage + 1) * articlesPerPage < articles.length && (
                        <div className="text-center mt-4">
                            <button
                                onClick={handleViewMore}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                View More
                            </button>
                        </div>
                    )} */}
                </>
            )}
        </div>
    );
};

export default ArticlesCardList;
