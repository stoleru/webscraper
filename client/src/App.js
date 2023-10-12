import React, { useState } from 'react';
import ScraperForm from './components/ScraperForm';
import ResultBox from './components/ResultBox';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const scrapeUrl = async (url) => {
    try {
      setLoading(true);

      const response = await fetch('/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Web Scraper App</h1>
      <ScraperForm onSubmit={scrapeUrl} loading={loading} />
      {loading ? ( // Display loading indicator when loading is true
        <div className="text-blue-500 m-1 mt-2">Loading...</div>
      ) : (
        <ResultBox data={data} error={error} />
      )}
    </div>
  );
};

export default App;
