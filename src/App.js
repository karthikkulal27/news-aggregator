import React from 'react';
import ArticlesList from './components/ArticleList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './screens/ScreenLayouts/MainLayout';
import HomePage from './screens/NormalScreen/Homescreen';
import NotFound from './screens/NormalScreen/Notfound';
import SportsPage from './screens/NormalScreen/SportsScreen';
import TechPage from './screens/NormalScreen/Techscreen';
import TradePage from './screens/NormalScreen/Tradingscreen';
import LifestylePage from './screens/NormalScreen/Lifestylescreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/technology" element={<TechPage />} />
          <Route path="/trading" element={<TradePage />} />
          <Route path="/lifestyle" element={<LifestylePage />} />
          <Route path="*" element={<NotFound />} />
          {/*<Route path="/technology" element={<TechnologyPage />} /> */}
          {/* Add more routes as needed */}
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
