import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const ArticleCarousel = ({ articles, onArticleClick, selectedArticle }) => {
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
                {articles.map((article, index) => {
                    if (article.content === "[Removed]") return null;
                    return (
                        <SwiperSlide key={index} onClick={() => onArticleClick(article)} className="cursor-pointer">
                            <div className="relative bg-white rounded-lg shadow-md">
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                                />
                                <h3 className="absolute bottom-4 left-4 text-white font-semibold bg-black bg-opacity-50 p-2 rounded-md">
                                    {article.title}
                                </h3>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default ArticleCarousel;
