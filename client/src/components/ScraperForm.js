// ScraperForm.js
import React, { useState } from 'react';

const ScraperForm = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('https://wsa-test.vercel.app/');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-lg shadow-md">
        <input
          type="url"
          placeholder="Enter the URL to be scraped"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          disabled={loading}
        />
        <button type="submit" className={`mt-2 bg-blue-500 text-white rounded p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loading ? 'Scraping...' : 'Scrape'} {/* Change button label based on loading state */}
        </button>
      </form>
    </div>
  );
};

export default ScraperForm;
