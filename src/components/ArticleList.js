// ArticlesList.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ArticleCarousel from './ArticleCarousel';
import ArticleModal from './ArticleModal';
import Headerwithviewmore from './Headerwithviewmore';

const ArticlesList = ({ articles, loading, title }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    if (loading) return <p>Loading articles...</p>;

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    return (
        <div>
            {/* Left Section */}
            <div className="flex flex-col items-center w-full mb-6 md:px-8">
                <Headerwithviewmore  headerTitle={title} />
            </div>

            <ArticleCarousel articles={articles} onArticleClick={handleArticleClick} selectedArticle={selectedArticle} isLoading={loading} />

            {selectedArticle && (
                <ArticleModal article={selectedArticle} onClose={closeModal} />
            )}
        </div>
    );
};

export default ArticlesList;
