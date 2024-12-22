import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodaysNews, fetchTopHeadlines } from '../../features/articles/articlesSlice';
import ArticlesCardList from '../../components/ArticleCardsList';
import PostCard from '../../components/Postcard';
import ArticleCarousel from '../../components/ArticleCarousel';
import ArticlesList from '../../components/ArticleList';
import CardwithTitleBottom from '../../components/CardwithTitleBottom';
import CardwithTitleBottomList from '../../components/CardwithBottomTitleList';

const HomePage = () => {
    const dispatch = useDispatch();
    const { headLines, headlineloading, error, todaysNews } = useSelector((state) => state.articles);

    const filteredHeadlines = headLines.filter(article => article.content !== "[Removed]");
    const filteredTodaysNews = todaysNews?.articles.filter(article => article.content !== "[Removed]");

    // Fetch data on mount
    useEffect(() => {
        dispatch(fetchTopHeadlines());
        dispatch(fetchTodaysNews("India"));
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-row space-x-4">
                <div className="w-full">
                    <ArticlesCardList
                        articles={filteredTodaysNews?.slice(1)} 
                        headlineloading={todaysNews?.loading}
                    />
                </div>
            </div>
            <ArticlesList articles={headLines} loading={headlineloading} title={"Top Headlines"}/>
            <CardwithTitleBottomList articles={filteredHeadlines} title={"Top Stories"}/>
        </div>
    );
};

export default HomePage;
