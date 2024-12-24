import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticlesCardList from '../../components/ArticleCardsList';
import ArticlesList from '../../components/ArticleList';
import CardwithTitleBottomList from '../../components/CardwithBottomTitleList';
import { fetchGuardianMostViewed, fetchGuardianTodaysNews, fetchGuardianTrending, fetchNYTArticles } from '../../features/articles/articlesSlice';

const TechPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGuardianTrending("technology"));
        dispatch(fetchGuardianTodaysNews("technology"));
        dispatch(fetchNYTArticles("technology"));
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
                        title='Recent Tech News'
                    />
                </div>
            </div>
            <ArticlesList articles={filteredHeadlines} loading={guardianMostViewed.loading} title={"Techology Headlines"} />
            <CardwithTitleBottomList articles={filteredTrendingArticles} title={"Techology Trendings"} loading={guardianTrending.loading} />
        </div>
    );
};

export default TechPage;
