import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesFromAPI, fetchArticlesFromGauradinAPI } from './articlesApi'; // Import API function

// The Guardian API Base URL and Key
const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY ?? "916850e5-673c-4e50-9f57-56d9e7d62e36";
const guardianBaseUrl = 'https://content.guardianapis.com';


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

export const fetchFilteredTrendingArticles = createAsyncThunk(
    'articles/fetchFilteredTrendingArticles',
    async ({ keyword = 'trending', filters }, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const { fromDate, toDate, category, source } = filters;

            // Constructing the URL with filters
            const today = toDate || new Date().toISOString().split('T')[0];
            const sevenDaysAgo = fromDate || new Date(new Date().setDate(new Date().getDate() - 7))
                .toISOString().split('T')[0];

            let url = `https://newsapi.org/v2/everything?q=${keyword}&from=${sevenDaysAgo}&to=${today}&sortBy=popularity&apiKey=${apiKey}`;

            // Adding additional filters if provided
            if (source) url += `&sources=${source}`;  // Source is supported on /everything endpoint
            // Don't include category for /everything endpoint as it's not supported

            const articles = await fetchArticlesFromAPI(url);

            return articles;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchFilteredTopHeadlines = createAsyncThunk(
    'topHeadlines/fetchFilteredTopHeadlines',
    async ({ keyword = '', country = 'US', filters }, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const baseUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
            const { category, source } = filters;

            // Constructing the URL with filters
            let url = keyword.trim() ? `${baseUrl}&q=${keyword}` : baseUrl;

            // Handle the case where both category and source are provided
            if (category && source) {
                // Remove one of the parameters to avoid conflict (choose `category` or `sources`)
                url = `${baseUrl}&q=${keyword}&category=${category}`; // Use category only
            } else {
                // Add category if present
                if (category) url += `&category=${category}`;

                // Add sources if present
                if (source) url += `&sources=${source}`;
            }

            const headlines = await fetchArticlesFromAPI(url);

            return headlines;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchFilteredTodaysNews = createAsyncThunk(
    'topHeadlines/fetchFilteredTodaysNews',
    async ({ keyword = 'news', filters }, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const { fromDate, toDate, category, source } = filters;

            // Calculate today and yesterday if no dates are provided
            const today = toDate || new Date().toISOString().split('T')[0];
            const yesterday = fromDate || new Date(new Date().setDate(new Date().getDate() - 1))
                .toISOString().split('T')[0];

            let url = `https://newsapi.org/v2/everything?q=${keyword}&from=${yesterday}&to=${today}&sortBy=publishedAt&apiKey=${apiKey}`;

            // Adding additional filters if provided
            if (source) url += `&sources=${source}`;  // Source is supported on /everything endpoint
            // Don't include category for /everything endpoint as it's not supported

            const data = await fetchArticlesFromAPI(url);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Async thunk for The Guardian - Trending Articles
export const fetchGuardianTrending = createAsyncThunk(
    'articles/fetchGuardianTrending',
    async (keyword = 'sports', { rejectWithValue }) => {
        try {
            const url = `${guardianBaseUrl}/search?q=${keyword}&page-size=50&order-by=relevance&show-fields=all&api-key=${guardianApiKey}`;
            const articles = await fetchArticlesFromGauradinAPI(url);
            console.log("action.payload", articles)
            return articles.response.results.map(article => ({
                source: { id: 'guardian', name: 'The Guardian' },
                author: article.fields.byline || 'Unknown',
                title: article.webTitle,
                description: article.fields.trailText || 'No description available.',
                url: article.webUrl,
                urlToImage: article.fields.thumbnail || null,
                publishedAt: article.webPublicationDate,
                content: article.fields.bodyText || null
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for The Guardian - Today's News
export const fetchGuardianTodaysNews = createAsyncThunk(
    'articles/fetchGuardianTodaysNews',
    async (keyword = 'sports', { rejectWithValue }) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7))
                .toISOString()
                .split('T')[0];
            const url = `${guardianBaseUrl}/search?q=${keyword}&from-date=${sevenDaysAgo}&to-date=${today}&page-size=50&order-by=newest&show-fields=all&api-key=${guardianApiKey}`;
            const articles = await fetchArticlesFromGauradinAPI(url);
            return articles.response.results.map(article => ({
                source: { id: 'guardian', name: 'The Guardian' },
                author: article.fields.byline || 'Unknown',
                title: article.webTitle,
                description: article.fields.trailText || 'No description available.',
                url: article.webUrl,
                urlToImage: article.fields.thumbnail || null,
                publishedAt: article.webPublicationDate,
                content: article.fields.bodyText || null
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for The Guardian - Most Viewed
export const fetchGuardianMostViewed = createAsyncThunk(
    'articles/fetchGuardianMostViewed',
    async (keyword = '', { rejectWithValue }) => {
        try {
            const searchQuery = keyword.trim() ? `&q=${keyword}` : '';
            // Removed 'section=most-viewed' and used 'order-by=relevance' for popular results
            const url = `${guardianBaseUrl}/search?order-by=relevance${searchQuery}&show-fields=all&api-key=${guardianApiKey}`;

            const articles = await fetchArticlesFromGauradinAPI(url);

            if (!articles.response || !articles.response.results) {
                throw new Error('No results found.');
            }

            return articles.response.results.map(article => ({
                source: { id: 'guardian', name: 'The Guardian' },
                author: article.fields.byline || 'Unknown',
                title: article.webTitle,
                description: article.fields.trailText || 'No description available.',
                url: article.webUrl,
                urlToImage: article.fields.thumbnail || null,
                publishedAt: article.webPublicationDate,
                content: article.fields.bodyText || null
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchNYTArticles = createAsyncThunk(
    'articles/fetchNYTArticles',
    async (keyword = '', { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_NYT_API_KEY ?? "II2A7f82IOaLvTORk3vbU2iAcU9HJIvq"; // Replace with your New York Times API key
            const pageSize = 100; // Set the page size to 100 (maximum allowed)
            const pageNumber = 1; // You can dynamically change this based on pagination needs
            const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${apiKey}&page=${pageNumber}&fl=headline,byline,web_url,abstract,multimedia,lead_paragraph,pub_date&rows=${pageSize}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!data.response || !data.response.docs) {
                throw new Error('No results found.');
            }

            return data.response.docs.map(article => ({
                source: { id: 'nyt', name: 'The New York Times' },
                author: article.byline ? article.byline.original : 'Unknown',
                title: article.headline.main,
                description: article.abstract || 'No description available.',
                url: article.web_url,
                urlToImage: article.multimedia?.[0]?.url ? `https://static01.nyt.com/${article.multimedia[0].url}` : null,
                publishedAt: article.pub_date,
                content: article.lead_paragraph || null
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



// Updated Slice with The Guardian API Integration
const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        trendingArticles: {
            articles: [],
            loading: false
        },
        todaysNews: {
            loading: false,
            articles: []
        },
        headlineloading: false,
        headLines: [],
        guardianTrending: {
            loading: false,
            articles: []
        },
        guardianTodaysNews: {
            loading: false,
            articles: []
        },
        guardianMostViewed: {
            loading: false,
            articles: []
        },
        error: null,
        filterCategoryOptions: [],
        filterSouceOptions: []
    },
    reducers: {
        setFilterCategoryOptions(state, action) {
            state.filterCategoryOptions = action.payload;
        },
        setFilterSourceOptions(state, action) {
            state.filterSouceOptions = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        clearFilters: (state) => {
            state.filters = { fromDate: '', toDate: '', category: '', source: '' };
        },
    },

    extraReducers: (builder) => {
        builder
            // Existing NewsAPI Cases
            .addCase(fetchTrendingArticles.pending, (state) => {
                state.trendingArticles.loading = true;
                state.error = null;
            })
            .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
                state.trendingArticles.loading = false;
                state.trendingArticles.articles = action.payload;

                const sources = action.payload.map(article => article.source?.name || 'Unknown');
                const uniqueSources = [...new Set(sources)].map(source => ({ label: source, value: source }));
                state.filterSouceOptions = uniqueSources;
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

                const sources = action.payload.map(article => article.source?.name || 'Unknown');
                const uniqueSources = [...new Set(sources)].map(source => ({ label: source, value: source }));
                state.filterSouceOptions = uniqueSources;
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

                const sources = action.payload.map(article => article.source?.name || 'Unknown');
                const uniqueSources = [...new Set(sources)].map(source => ({ label: source, value: source }));
                state.filterSouceOptions = uniqueSources;

            })
            .addCase(fetchTodaysNews.rejected, (state, action) => {
                state.todaysNews.loading = false;
                state.error = action.payload;
            })


            .addCase(fetchFilteredTrendingArticles.pending, (state) => {
                state.trendingArticles.loading = true;
                state.error = null;
            })
            .addCase(fetchFilteredTrendingArticles.fulfilled, (state, action) => {
                state.trendingArticles.loading = false;
                state.trendingArticles.articles = action.payload;
            })
            .addCase(fetchFilteredTrendingArticles.rejected, (state, action) => {
                state.trendingArticles.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFilteredTopHeadlines.pending, (state) => {
                state.headlineloading = true;
                state.error = null;
            })
            .addCase(fetchFilteredTopHeadlines.fulfilled, (state, action) => {
                state.headlineloading = false;
                state.headLines = action.payload;
            })
            .addCase(fetchFilteredTopHeadlines.rejected, (state, action) => {
                state.headlineloading = false;
                state.error = action.payload;
            })
            .addCase(fetchFilteredTodaysNews.pending, (state) => {
                state.todaysNews.loading = true;
                state.error = null;
            })
            .addCase(fetchFilteredTodaysNews.fulfilled, (state, action) => {
                state.todaysNews.loading = false;
                state.todaysNews.articles = action.payload;
            })
            .addCase(fetchFilteredTodaysNews.rejected, (state, action) => {
                state.todaysNews.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchGuardianTrending.pending, (state) => {
                state.guardianTrending.loading = true;
                state.error = null;
            })
            .addCase(fetchGuardianTrending.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                state.guardianTrending.loading = false;
                state.guardianTrending.articles = action.payload;
            })
            .addCase(fetchGuardianTrending.rejected, (state, action) => {
                state.guardianTrending.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchGuardianTodaysNews.pending, (state) => {
                state.guardianTodaysNews.loading = true;
                state.error = null;
            })
            .addCase(fetchGuardianTodaysNews.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                state.guardianTodaysNews.loading = false;
                state.guardianTodaysNews.articles = action.payload;
            })
            .addCase(fetchGuardianTodaysNews.rejected, (state, action) => {
                state.guardianTodaysNews.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchNYTArticles.pending, (state) => {
                state.guardianMostViewed.loading = true;
                state.error = null;
            })
            .addCase(fetchNYTArticles.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                state.guardianMostViewed.loading = false;
                state.guardianMostViewed.articles = action.payload;
            })
            .addCase(fetchNYTArticles.rejected, (state, action) => {
                state.guardianMostViewed.loading = false;
                state.error = action.payload;
            });
    },
});


export const { setFilterCategoryOptions, setFilterSourceOptions, setFilters, clearFilters } = articlesSlice.actions;
export default articlesSlice.reducer;
