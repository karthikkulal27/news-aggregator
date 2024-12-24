import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const ArticleCarousel = ({ articles, onArticleClick, selectedArticle, isLoading }) => {
    // Check if articles are loading or empty
    // const isLoading = !articles || articles.length === 0;
    const fallbackImage = 'https://source.unsplash.com/150x150/?nature,water';
    return (
        <div className="px-4 sm:px-6 md:px-8">
            <Swiper
                spaceBetween={20}  // Space between slides
                slidesPerView={1}  // Default slides per view for mobile
                className="my-4"
                breakpoints={{
                    640: {
                        slidesPerView: 1,  // 1 slide per view on small screens (mobile)
                    },
                    768: {
                        slidesPerView: 2,  // 2 slides per view on tablets
                    },
                    1024: {
                        slidesPerView: 3,  // 3 slides per view on large screens
                    },
                }}
                autoplay={{
                    delay: 3000, // Auto-swiping every 3 seconds
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]} // Import Autoplay module
            >
                {isLoading ? (
                    // Skeleton loader while articles are loading
                    Array.from({ length: 5 }).map((_, index) => (
                        <SwiperSlide key={index} className="cursor-pointer">
                            <div className="relative bg-gray-300 animate-pulse rounded-lg shadow-md">
                                <div className="h-48 sm:h-56 md:h-64 bg-gray-400 rounded-lg"></div>
                                <div className="absolute bottom-4 left-4 text-transparent bg-black bg-opacity-50 p-2 rounded-md">
                                    <div className="w-24 h-4 bg-gray-500 rounded-md"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : articles.length === 0 ? (
                    // No news found message
                    <div className="swiper-slide flex justify-center items-center bg-white h-64 sm:h-72 md:h-80 rounded-lg shadow-md">
                        <p className="text-xl font-semibold text-gray-500">No news found</p>
                    </div>
                ) : (
                    articles.map((article, index) => {
                        if (article.content === "[Removed]") return null;
                        return (
                            <SwiperSlide key={index} onClick={() => onArticleClick(article)} className="cursor-pointer">
                                <div className="relative bg-white rounded-lg shadow-md">
                                    <img
                                        src={article.urlToImage || fallbackImage}
                                        alt={article.title}
                                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                                    />
                                    <h3 className="absolute bottom-4 left-4 text-white font-semibold bg-black bg-opacity-50 p-2 rounded-md">
                                        {article.title}
                                    </h3>
                                </div>
                            </SwiperSlide>
                        );
                    })
                )}
            </Swiper>
        </div>
    );
};

export default ArticleCarousel;
