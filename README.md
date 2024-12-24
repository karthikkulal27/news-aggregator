Headlines Buzz App 📰
A News Aggregator React Application that compiles and displays the latest news from multiple sources mostly News API. This app is built with React and uses Docker for deployment, ensuring a seamless and containerized setup.

Features 🚀
🗞️ Fetch news from multiple APIs.
🔍 Easy search and filtering options.
🌐 Mobile-friendly responsive design.
🚢 Fully containerized using Docker.
🛠️ Environment-based configuration with .env support.
Getting Started 🛠️
Follow these instructions to get the application up and running locally or in a Docker container.

Prerequisites
Node.js >= 18.18.0
Docker & Docker Compose
A .env file with the following variables:
env
Copy code
REACT_APP_API_KEY=<Your API Key>

Installation 🔧
1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator
2. Install Dependencies
bash
Copy code
npm install
3. Run the Development Server
bash
Copy code
npm start
Access the app in your browser at http://localhost:3000.

Deployment with Docker 🚢
1. Build the Docker Image
bash
Copy code
docker build -t news-aggregator .
2. Run the Docker Container
bash
Copy code
docker run --env-file .env -p 3000:80 news-aggregator
The app will be accessible at http://localhost:3000.

Environment Variables 🛡️
The app uses environment variables for configuration. Create a .env file in the project root with the following variables:

env
Copy code
REACT_APP_API_KEY=your_api_key
REACT_APP_API_URL=your_api_url
Make sure all environment variables are prefixed with REACT_APP_ for React to recognize them.



Feedback 💬
Have questions or suggestions? Feel free to open an issue or contact us at your-email@example.com.

Screenshots 📸


