// ArticleCarousel.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const ArticleCarousel = ({ articles, onArticleClick }) => {
    return (
        <div>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                className="my-4"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                autoplay={{
                    delay: 1000, // Auto-swiping every 3 seconds
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]} // Import Autoplay module
            >
                {articles.map((article, index) => {
                    if (article.content === "[Removed]") return null;
                    return (
                        <SwiperSlide key={index} onClick={() => onArticleClick(article)} className="cursor-pointer">
                            <div className="relative">
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <h3 className="absolute bottom-4 left-4 text-white font-semibold bg-black bg-opacity-50 p-2 rounded">
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
