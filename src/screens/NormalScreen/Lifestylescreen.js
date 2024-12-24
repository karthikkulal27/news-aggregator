import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticlesCardList from '../../components/ArticleCardsList';
import ArticlesList from '../../components/ArticleList';
import CardwithTitleBottomList from '../../components/CardwithBottomTitleList';
import { fetchGuardianMostViewed, fetchGuardianTodaysNews, fetchGuardianTrending, fetchNYTArticles } from '../../features/articles/articlesSlice';

const LifestylePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGuardianTrending("Life style"));
        dispatch(fetchGuardianTodaysNews("Life style"));
        dispatch(fetchNYTArticles("Life style"));
    }, [dispatch]);


    const { guardianMostViewed, guardianTodaysNews, guardianTrending } = useSelector((state) => state.articles);

    const filteredHeadlines = guardianMostViewed?.articles.filter(article => article.content !== "[Removed]");
    const filteredTodaysNews = guardianTodaysNews?.articles.filter(article => article.content !== "[Removed]");
    const filteredTrendingArticles = guardianTrending?.articles.filter(article => article.content !== "[Removed]");

    // Fetch data on mount
    

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-row space-x-4">
                <div className="w-full">
                    <ArticlesCardList
                        articles={filteredTodaysNews?.slice(1)}
                        headlineloading={guardianTodaysNews?.loading}
                    />
                </div>
            </div>
            <ArticlesList articles={filteredHeadlines} loading={guardianMostViewed.loading} title={"Life Style Headlines"} />
            <CardwithTitleBottomList articles={filteredTrendingArticles} title={"Life Style Trendings"} loading={guardianTrending.loading} />
        </div>
    );
};

export default LifestylePage;
