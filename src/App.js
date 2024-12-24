import React, { Suspense } from 'react';
import ArticlesList from './components/ArticleList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './screens/ScreenLayouts/MainLayout';
import HomePage from './screens/NormalScreen/Homescreen';

// Lazy loading other pages
const NotFound = React.lazy(() => import('./screens/NormalScreen/Notfound'));
const SportsPage = React.lazy(() => import('./screens/NormalScreen/SportsScreen'));
const TechPage = React.lazy(() => import('./screens/NormalScreen/Techscreen'));
const TradePage = React.lazy(() => import('./screens/NormalScreen/Tradingscreen'));
const LifestylePage = React.lazy(() => import('./screens/NormalScreen/Lifestylescreen'));

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/sports"
            element={
              <Suspense fallback={<div>Loading Sports...</div>}>
                <SportsPage />
              </Suspense>
            }
          />
          <Route
            path="/technology"
            element={
              <Suspense fallback={<div>Loading Technology...</div>}>
                <TechPage />
              </Suspense>
            }
          />
          <Route
            path="/trading"
            element={
              <Suspense fallback={<div>Loading Trading...</div>}>
                <TradePage />
              </Suspense>
            }
          />
          <Route
            path="/lifestyle"
            element={
              <Suspense fallback={<div>Loading Lifestyle...</div>}>
                <LifestylePage />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<div>Loading Search...</div>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
