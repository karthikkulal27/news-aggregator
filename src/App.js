import React from 'react';
import ArticlesList from './components/ArticleList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './screens/ScreenLayouts/MainLayout';
import HomePage from './screens/NormalScreen/Homescreen';
import NotFound from './screens/NormalScreen/Notfound';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports" element={<ArticlesList />} />
          <Route path="*" element={<NotFound />} />
          {/*<Route path="/technology" element={<TechnologyPage />} /> */}
          {/* Add more routes as needed */}
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
