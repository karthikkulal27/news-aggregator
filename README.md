# Headlines Buzz App 📰  
A News Aggregator React Application that compiles and displays the latest news from multiple sources, primarily News API. This app is built with React and uses Docker for deployment, ensuring a seamless and containerized setup.

---

## Features 🚀  
- 🗞️ Fetch news from multiple APIs.  
- 🔍 Easy search and filtering options.  
- 🌐 Mobile-friendly responsive design.  
- 🚢 Fully containerized using Docker.  
- 🛠️ Environment-based configuration with `.env` support.  

---

## Important Notes  

-**API Failures**:
The application relies on the API for data fetching, and if the API hits its request limit, the app might not function correctly. This is because we are using the free version, which has restrictions on the number of API calls. Please wait for 24 hours to reset the API limit before trying again.


- **Search and Filter API Limitations**:  
  Please note that the search and filter functionalities might not work as expected sometimes. This is due to the limitations of the free version of the API we are using. If you encounter issues, it is recommended to wait at least **12-24 hours** before trying again.  

- To ensure optimal usage, consider upgrading to a paid API plan for uninterrupted access and higher request limits.  

---

## Prerequisites  
Ensure you have the following installed:  
- **Node.js** (>= 18.18.0)  
- **Docker** & **Docker Compose**  
- A `.env` file with the following variables:  

```env
REACT_APP_API_KEY=your_api_key
REACT_APP_API_URL=your_api_url
REACT_NYT_API_KEY=your_api_key
```


## Installation 🔧  

### 1. Clone the Repository  
git clone https://github.com/karthikkulal27/news-aggregator  
```
cd news-aggregator  
```


### 2. Install Dependencies 
```
npm install
```

### 3. Run the Development Server
```
npm start
```
Access the app in your browser at http://localhost:3000.

## Deployment with Docker 🚢
### 1. Build the Docker Image

```
docker build -t news-aggregator .
```

### 2. Run the Docker Container

```
docker run --env-file .env -p 3000:80 news-aggregator
```

The app will be accessible at http://localhost:3000.

Environment Variables 🛡️
The app uses environment variables for configuration. Create a .env file in the project root with the following variables:

```env
REACT_APP_API_KEY=your_api_key
REACT_APP_API_URL=your_api_url
REACT_NYT_API_KEY=your_api_key
```

Make sure all environment variables are prefixed with REACT_APP_ for React to recognize them.



Feedback 💬
Have questions or suggestions? Feel free to open an issue or contact us at karthik27kulal@gmail.com



