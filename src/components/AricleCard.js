const ArticleCard = ({ article, size }) => {
    return (
        <div
            className={`overflow-hidden group ${size === "s" ? "flex flex-col sm:flex-row items-center" : ""
                }`}
        >
            {size === "s" ? (
                <>
                    <div className="sm:w-1/4 w-full h-40 sm:h-32 relative">
                        <img
                            src={article?.urlToImage}
                            alt={article?.title}
                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <div className="sm:w-3/4 w-full md:p-4">
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black relative inline-block font-semibold text-lg sm:text-xl mb-2 mx-2 sm:mx-6 underline-effect"
                        >
                            {article?.title}
                        </a>



                        <p className="font-light text-sm sm:text-base text-gray-500 mx-2 sm:mx-6">
                            By {article?.author}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="relative mb-5">
                        <img
                            src={article?.urlToImage}
                            alt={article?.title}
                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <div className="p-4 sm:p-2">
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black relative inline-block underline-effect"
                        >
                            <h3 className="font-semibold text-lg sm:text-xl mb-2 mx-2 sm:mx-6 underline-text">
                                {article?.title}
                            </h3>
                        </a>
                        <p className="text-gray-700 text-sm sm:text-base mx-2 sm:mx-6">
                            {article?.description}
                        </p>
                        <p className="font-light text-right text-sm sm:text-base text-gray-500 mx-2 sm:mx-6">
                            By {article?.author}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ArticleCard;
