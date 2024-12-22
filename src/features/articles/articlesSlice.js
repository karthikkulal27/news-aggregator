import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesFromAPI } from './articlesApi'; // Import API function

// Async thunk for fetching articles
export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async (params, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const url = `https://newsapi.org/v2/everything?q=${params.keyword}?&apiKey=${apiKey}`
            const articles = await fetchArticlesFromAPI(url); // Call the API function
            return articles;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTopHeadlines = createAsyncThunk(
    'topHeadlines/fetchTopHeadlines',
    async (params = { country: 'US' }, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;  // Ensure the API key is in your .env file
            const country = params.country || 'IN';  // Default to 'IN' (India)
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
            const headlines = await fetchArticlesFromAPI(url); // Fetch top headlines from API
            return headlines;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTodaysNews = createAsyncThunk(
    'topHeadlines/fetchTodaysNews',
    async (keyword, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Your NewsAPI key
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            const toDay = new Date();
            const sevenDaysAgo = new Date(toDay);
            sevenDaysAgo.setDate(toDay.getDate() - 1);
            const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split('T')[0]

            const url = `https://newsapi.org/v2/everything?q=${keyword}&from=${formattedSevenDaysAgo}&to=${today}&sortBy=publishedAt&apiKey=${apiKey}`;
            const data = await fetchArticlesFromAPI(url); // Fetch top headlines from API
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice for articles
const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        items: [], // List of articles
        loading: false,
        error: null,
        headlineloading: false,
        headLines: [],
        todaysNews: {
            loading: false,
            articles: []
        }
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTopHeadlines.pending, (state) => {
                state.headlineloading = true;
                state.error = null;
            })
            .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
                state.headlineloading = false;
                state.headLines = action.payload;
            })
            .addCase(fetchTopHeadlines.rejected, (state, action) => {
                state.headlineloading = false;
                state.error = action.payload;
            })
            .addCase(fetchTodaysNews.pending, (state) => {
                state.todaysNews.loading = true;
                state.error = null;
            })
            .addCase(fetchTodaysNews.fulfilled, (state, action) => {
                state.todaysNews.loading = false;
                state.todaysNews.articles = action.payload;
            })
            .addCase(fetchTodaysNews.rejected, (state, action) => {
                state.todaysNews.loading = false;
                state.error = action.payload;
            })
    },
});

export default articlesSlice.reducer;
