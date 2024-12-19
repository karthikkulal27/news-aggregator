// ArticlesList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../features/articles/articlesSlice';
import ArticleCarousel from './ArticleCarousel';
import ArticleModal from './ArticleModal';

const ArticlesList = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.articles);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        // Dispatch the async action to fetch articles
        dispatch(fetchArticles({ keyword: 'today' }));
    }, [dispatch]);

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold my-4">News Articles</h1>

            <ArticleCarousel articles={items} onArticleClick={handleArticleClick} />

            {selectedArticle && (
                <ArticleModal article={selectedArticle} onClose={closeModal} />
            )}
        </div>
    );
};

export default ArticlesList;
