import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesFromAPI } from './articlesApi'; // Import API function

// Async thunk for fetching articles
export const fetchTrendingArticles = createAsyncThunk(
    'articles/fetchTrendingArticles',
    async (keyword = 'trending', { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const url = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${apiKey}`;
            const articles = await fetchArticlesFromAPI(url);
            return articles;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const fetchTopHeadlines = createAsyncThunk(
    'topHeadlines/fetchTopHeadlines',
    async ({ keyword = '', country = 'US' } = {}, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const baseUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
            const url = keyword.trim() ? `${baseUrl}&q=${keyword}` : baseUrl; // Add `q` only if a keyword exists
            console.log("url", keyword)
            const headlines = await fetchArticlesFromAPI(url);
            return headlines;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export const fetchTodaysNews = createAsyncThunk(
    'topHeadlines/fetchTodaysNews',
    async (keyword = 'news', { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const today = new Date().toISOString().split('T')[0];
            const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 1))
                .toISOString()
                .split('T')[0];
            const url = `https://newsapi.org/v2/everything?q=${keyword}&from=${sevenDaysAgo}&to=${today}&sortBy=publishedAt&apiKey=${apiKey}`;
            const data = await fetchArticlesFromAPI(url);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const data=[
    {
        "source": {
            "id": "bbc-news",
            "name": "BBC News"
        },
        "author": "BBC News",
        "title": "Global stock markets rise as economies recover",
        "description": "Global stock markets have risen as economies continue to recover, with major indices hitting record highs.",
        "url": "https://www.bbc.com/news/business-12345678",
        "urlToImage": "https://www.bbc.com/images/global_stock_market.jpg",
        "publishedAt": "2024-12-23T10:00:00Z",
        "content": "Stock markets across the globe have seen a significant rise as economies continue to recover from the pandemic, with investors looking towards the future with optimism."
    },
    {
        "source": {
            "id": "cnn",
            "name": "CNN"
        },
        "author": "CNN Staff",
        "title": "Breakthrough in renewable energy as new solar panels hit market",
        "description": "A new generation of solar panels promises to revolutionize renewable energy, offering higher efficiency and lower costs.",
        "url": "https://www.cnn.com/news/tech/renewable_energy_solar_panels",
        "urlToImage": "https://www.cnn.com/images/solar_panels_breakthrough.jpg",
        "publishedAt": "2024-12-23T11:30:00Z",
        "content": "The latest breakthrough in solar technology is expected to reduce costs and increase efficiency, providing a significant boost to the global renewable energy market."
    },
    {
        "source": {
            "id": "the-new-york-times",
            "name": "The New York Times"
        },
        "author": "New York Times Staff",
        "title": "US government announces new climate action plan",
        "description": "The US government has unveiled an ambitious new climate action plan, setting goals to cut emissions and promote clean energy.",
        "url": "https://www.nytimes.com/2024/12/23/us/climate-action-plan.html",
        "urlToImage": "https://www.nytimes.com/images/us_climate_action_plan.jpg",
        "publishedAt": "2024-12-23T12:00:00Z",
        "content": "The plan includes measures to reduce carbon emissions, promote electric vehicles, and transition to renewable energy sources over the next decade."
    }
]

// Slice for articles
const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        trendingArticles: {
            articles: [],
            loading: false
        }, // List of articles
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
            .addCase(fetchTrendingArticles.pending, (state) => {
                state.trendingArticles.loading = true;
                state.error = null;
            })
            .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
                state.trendingArticles.loading = false;
                state.trendingArticles.articles = action.payload;
            })
            .addCase(fetchTrendingArticles.rejected, (state, action) => {
                state.trendingArticles.loading = false;
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
