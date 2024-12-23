// MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchTodaysNews, fetchTopHeadlines, fetchTrendingArticles } from '../../features/articles/articlesSlice';
import { useDispatch } from 'react-redux';

const MainLayout = () => {

    const dispatch = useDispatch();

    const handleSearch = (query) => {
        if (query.trim()) {
            dispatch(fetchTrendingArticles(query));
            dispatch(fetchTopHeadlines({ keyword: query }));
            dispatch(fetchTodaysNews(query));
        } else {
            dispatch(fetchTopHeadlines());
            dispatch(fetchTodaysNews("India"));
            dispatch(fetchTrendingArticles("viral"))
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar onSearch={handleSearch} />
            <main className="flex-1 p-4">
                <Outlet /> {/* This will render the content based on the route */}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
