
import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage'; 

function StatisticsPage() {
  const [allUrls, setAllUrls] = useState([]);

  useEffect(() => {
    const savedUrls = storage.getAllUrls();
    setAllUrls(savedUrls);
  }, []); 

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>URL Statistics</h1>
      <p>Here are all the links you have created.</p>

      {allUrls.length === 0 ? (
        <p style={{ marginTop: '20px' }}>You haven't shortened any URLs yet!</p>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Original URL</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Short URL</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Created On</th>
            </tr>
          </thead>
          <tbody>
            {allUrls.map(url => (
              <tr key={url.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd', wordBreak: 'break-all' }}>
                  {url.originalUrl}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <a href={`${window.location.origin}/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                    {`${window.location.origin}/${url.shortCode}`}
                  </a>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(url.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StatisticsPage;