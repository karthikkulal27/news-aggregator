import React, { useState } from 'react';
import ArticleCard from './AricleCard';
import Headerwithviewmore from './Headerwithviewmore';

const ArticlesCardList = ({ articles, headlineloading }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const articlesPerPage = 5;

    const currentArticles = articles.slice(
        currentPage * articlesPerPage,
        (currentPage + 1) * articlesPerPage
    );

    const handleViewMore = () => {
        if ((currentPage + 1) * articlesPerPage < articles.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const SkeletonLoader = ({ size }) => (
        <div
            className={`overflow-hidden rounded-lg bg-gray-200 animate-pulse ${size === 'b' ? 'h-64' : 'h-40'} mb-4`}
        >
            <div className="w-full h-2/3 bg-gray-300"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            <div className="flex flex-col items-center w-full mb-6 md:px-8">
                <Headerwithviewmore handleViewMore={handleViewMore} headerTitle="Recent News" />
            </div>

            {headlineloading && currentArticles.length === 0 ? (
                <div>
                    {/* Skeleton loader for the first big article */}
                    <SkeletonLoader size="b" />
                    {/* Skeleton loaders for smaller articles */}
                    <div className="flex flex-wrap justify-between">
                        {[...Array(4)].map((_, index) => (
                            <SkeletonLoader key={index} size="s" />
                        ))}
                    </div>
                </div>
            ) : currentArticles.length === 0 ? (
                // "No news found" message when no articles are available
                <div className="flex justify-center items-center h-64 bg-gray-100 rounded-md md:mx-8">
                    <p className="text-xl font-semibold text-gray-500">No news found</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full sm:w-1/2 mb-4 md:px-8">
                            {currentArticles.length > 0 && (
                                <ArticleCard article={currentArticles[0]} size="b" />
                            )}
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-wrap justify-between md:px-8">
                            {currentArticles.slice(1).map((article, index) => {
                                if (article.content === '[Removed]') return null;
                                return (
                                    <div key={index} className="w-full mb-4">
                                        <ArticleCard article={article} size="s" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ArticlesCardList;
