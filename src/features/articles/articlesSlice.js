import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesFromAPI } from './articlesApi'; // Import API function

// Async thunk for fetching articles
export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async (params, { rejectWithValue }) => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            const url = `https://newsapi.org/v2/everything?q=${params.keyword}&apiKey=${apiKey}`
            const articles = await fetchArticlesFromAPI(url); // Call the API function
            return articles;
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
            });
    },
});

export default articlesSlice.reducer;
