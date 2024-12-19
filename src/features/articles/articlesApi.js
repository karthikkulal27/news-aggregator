import axios from 'axios';

// Function to fetch articles from the News API
export const fetchArticlesFromAPI = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.articles;
  } catch (error) {
    throw new Error('Error fetching articles: ' + error.message);
  }
};
