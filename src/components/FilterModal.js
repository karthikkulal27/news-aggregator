import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchFilteredTrendingArticles, fetchFilteredTopHeadlines, fetchFilteredTodaysNews, fetchTrendingArticles, fetchTodaysNews, fetchTopHeadlines } from '../features/articles/articlesSlice';

const FilterModal = ({ isOpen, closeModal }) => {
    const dispatch = useDispatch();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');
    const { filterSouceOptions } = useSelector((state) => state.articles);


    const categoryOptions = [
        { label: 'Business', value: 'business' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'General', value: 'general' },
        { label: 'Health', value: 'health' },
        { label: 'Science', value: 'science' },
        { label: 'Sports', value: 'sports' },
        { label: 'Technology', value: 'technology' }
    ];

    const sourceOptions = filterSouceOptions ?? [];

    const handleSubmit = () => {
        // Dispatching filter values to the Redux store
        dispatch(setFilters({ fromDate, toDate, category, source }));

        // Fetching the filtered articles based on active filter
        dispatch(fetchFilteredTrendingArticles({ keyword: 'trending', filters: { fromDate, toDate, category, source } }));
        dispatch(fetchFilteredTopHeadlines({ keyword: '', country: 'US', filters: { fromDate, toDate, category, source } }));
        dispatch(fetchFilteredTodaysNews({ keyword: 'news', filters: { fromDate, toDate, category, source } }));

        closeModal();
    };

    const handleClearFilters = () => {
        // Resetting the state values
        setFromDate('');
        setToDate('');
        setCategory('');
        setSource('');

        // Dispatching the reset filters action to Redux
        dispatch(setFilters({ fromDate: '', toDate: '', category: '', source: '' }));
        dispatch(fetchTopHeadlines());
        dispatch(fetchTodaysNews("India"));
        dispatch(fetchTrendingArticles("viral"))

        closeModal();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg md:max-w-md sm:max-w-sm">
                        <h2 className="text-2xl font-semibold mb-4">Filter Articles</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="fromDate">
                                From Date
                            </label>
                            <input
                                type="date"
                                id="fromDate"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="toDate">
                                To Date
                            </label>
                            <input
                                type="date"
                                id="toDate"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="category">
                                Category
                            </label>
                            <select
                                id="category"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categoryOptions.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="source">
                                Source
                            </label>
                            <select
                                id="source"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            >
                                <option value="">Select Source</option>
                                {sourceOptions.map((src) => (
                                    <option key={src.value} value={src.value}>
                                        {src.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-4">
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 w-full sm:w-auto mb-3 sm:mb-0"
                            >
                                Apply Filter
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 w-full sm:w-auto mb-3 sm:mb-0"
                            >
                                Clear Filters
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FilterModal;
