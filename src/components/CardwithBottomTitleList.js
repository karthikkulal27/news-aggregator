import React, { useState } from "react";
import CardwithTitleBottom from "./CardwithTitleBottom";
import Headerwithviewmore from "./Headerwithviewmore";
import ArticleModal from "./ArticleModal";

const CardwithTitleBottomList = ({ articles, title, loading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleViewMore = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length); // Loop through articles
    };

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    // Determine the current articles to show based on the index
    const article1 = articles[currentIndex];
    const article2 = articles[(currentIndex + 3) % articles.length];
    const article3 = articles[(currentIndex + 4) % articles.length];

    return (
        <div className="mt-16 px-4">
            {/* Headline and View More */}
            <div className="flex flex-col items-center w-full mb-6 md:px-4">
                <Headerwithviewmore headerTitle={title} handleViewMore={handleViewMore} />
            </div>
            {/* Layout */}
            <div className="flex flex-col md:flex-row h-full">
                {/* Left side */}
                <div className="w-full md:w-2/3 h-full md:px-3 mb-4 md:mb-0">
                    {loading ? (
                        <div className="skeleton-loader h-64 w-full bg-gray-300 animate-pulse rounded-md" />
                    ) : article1 ? (
                        <CardwithTitleBottom article={article1} onArticleClick={handleArticleClick} />
                    ) : (
                        <div className="flex justify-center items-center min-h-96 my-3 bg-gray-100 rounded-md">
                            <p className="text-xl font-semibold text-gray-500">No news found</p>
                        </div>
                    )}
                </div>

                {/* Right side */}
                <div className="flex flex-col w-full md:w-1/3 h-full md:px-3">
                    {loading ? (
                        <>
                            <div className="skeleton-loader h-32 w-full bg-gray-300 animate-pulse rounded-md mb-4" />
                            <div className="skeleton-loader h-32 w-full bg-gray-300 animate-pulse rounded-md" />
                        </>
                    ) : (
                        <>
                            {article2 ? (
                                <div className="flex-1 pb-4">
                                    <CardwithTitleBottom article={article2} onArticleClick={handleArticleClick} />
                                </div>
                            ) : (
                                <div className="flex-1 pb-4 flex justify-center items-center min-h-48 my-3 bg-gray-100 rounded-md">
                                    <p className="text-xl font-semibold text-gray-500">No news found</p>
                                </div>
                            )}
                            {article3 ? (
                                <div className="flex-1 pt-4">
                                    <CardwithTitleBottom article={article3} onArticleClick={handleArticleClick} />
                                </div>
                            ) : (
                                <div className="flex-1 pt-4 flex justify-center items-center min-h-48 my-3 bg-gray-100 rounded-md">
                                    <p className="text-xl font-semibold text-gray-500">No news found</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {selectedArticle && (
                <ArticleModal article={selectedArticle} onClose={closeModal} />
            )}
        </div>
    );
};

export default CardwithTitleBottomList;
