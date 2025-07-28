
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';

function RedirectPage() {
  const { shortCode } = useParams();
  
  const navigate = useNavigate();

  const [message, setMessage] = useState('Finding your link...');

  useEffect(() => {
    const allUrls = storage.getAllUrls();

    const urlToRedirect = allUrls.find(url => url.shortCode === shortCode);
    if (urlToRedirect) {
      if (!urlToRedirect.clicks) {
        urlToRedirect.clicks = [];
      }
      urlToRedirect.clicks.push({ timestamp: new Date().toISOString() });
      const urlIndex = allUrls.findIndex(url => url.id === urlToRedirect.id);
      allUrls[urlIndex] = urlToRedirect;
      storage.saveAllUrls(allUrls);
    
      window.location.href = urlToRedirect.originalUrl;

    } else {
      setMessage('Sorry, this link was not found. Redirecting to the homepage in 3 seconds...');
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [shortCode, navigate]); 

  return (
    <div className="app-container" style={{ textAlign: 'center' }}>
      <h1>Redirecting</h1>
      <p>{message}</p>
    </div>
  );
}

export default RedirectPage;