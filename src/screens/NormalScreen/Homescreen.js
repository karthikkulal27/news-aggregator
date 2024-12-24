import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingArticles, fetchTodaysNews, fetchTopHeadlines } from '../../features/articles/articlesSlice';
import ArticlesCardList from '../../components/ArticleCardsList';
import PostCard from '../../components/Postcard';
import ArticleCarousel from '../../components/ArticleCarousel';
import ArticlesList from '../../components/ArticleList';
import CardwithTitleBottom from '../../components/CardwithTitleBottom';
import CardwithTitleBottomList from '../../components/CardwithBottomTitleList';

const HomePage = () => {
    const dispatch = useDispatch();
    const { headLines, headlineloading, error, todaysNews, trendingArticles } = useSelector((state) => state.articles);
    console.log("headLines",headLines)

    const filteredHeadlines = headLines.filter(article => article.content !== "[Removed]");
    const filteredTodaysNews = todaysNews?.articles.filter(article => article.content !== "[Removed]");
    const filteredTrendingArticles = trendingArticles?.articles.filter(article => article.content !== "[Removed]");

    // Fetch data on mount
    useEffect(() => {
        dispatch(fetchTopHeadlines());
        dispatch(fetchTodaysNews("India"));
        dispatch(fetchTrendingArticles("viral"))
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
            <ArticlesList articles={filteredHeadlines} loading={headlineloading} title={"Top Headlines"} />
            <CardwithTitleBottomList articles={filteredTrendingArticles} title={"Top Trendings"} loading={trendingArticles.loading} />
        </div>
    );
};

export default HomePage;
