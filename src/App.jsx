import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import the page components
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import RedirectPage from './pages/RedirectPage';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Shortener</Link>
        <Link to="/statistics">Statistics</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/:shortCode" element={<RedirectPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
