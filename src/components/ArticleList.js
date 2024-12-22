// ArticlesList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, fetchTopHeadlines } from '../features/articles/articlesSlice';
import ArticleCarousel from './ArticleCarousel';
import ArticleModal from './ArticleModal';

const ArticlesList = ({ articles, loading, title }) => {
    const dispatch = useDispatch();
    // const { items, loading, error } = useSelector((state) => state.articles);
    const [selectedArticle, setSelectedArticle] = useState(null);

    // useEffect(() => {
    //     // Dispatch the async action to fetch articles
    //     dispatch(fetchArticles({ keyword: 'today' }));
    //     dispatch(fetchTopHeadlines())
    // }, [dispatch]);

    if (loading) return <p>Loading articles...</p>;

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold my-4 md:px-8">{title}</h1>

            <ArticleCarousel articles={articles} onArticleClick={handleArticleClick} selectedArticle={selectedArticle} />

            {selectedArticle && (
                <ArticleModal article={selectedArticle} onClose={closeModal} />
            )}
        </div>
    );
};

export default ArticlesList;
