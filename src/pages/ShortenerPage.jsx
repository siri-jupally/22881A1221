import  React,{useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import { storage } from '../utils/storage';
function ShortenerPage(){
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrls, setShortenedUrls] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!originalUrl){
             alert('Please enter a URL to shorten.');
             return;
            }
        const getAllUrls= storage.getAllUrls();
        if (getAllUrls.some(url => url.originalUrl === originalUrl)) {
            alert('This URL has already been shortened.');
            return;
        }
        const shortCode = uuidv4().slice(0, 6); 
        const newUrl = {
            id:uuidv4(), 
            originalUrl:originalUrl, 
            shortCode:shortCode, 
            clicks: 0, 
            createdAt: new Date().toISOString() };

        // Save to local storage
        const updatedUrls = [...getAllUrls, newUrl];
        storage.saveAllUrls(updatedUrls);
        
        // Update state
        const fullshorturl = `${window.location.origin}/${shortCode}`;
        setShortenedUrls(fullshorturl);
        setOriginalUrl(''); 
        };

 return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>URL Shortener</h1>
      <p>Enter a long URL to make it short!</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <input
          type="url"
          placeholder="https://example.com/my-long-url"
          value={originalUrl} 
          onChange={(e) => setOriginalUrl(e.target.value)} 
          style={{ flexGrow: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}>
          Shorten
        </button>
      </form>

      {/* The results area. This will only show up if the 'result' state has something in it. */}
      {shortenedUrls && (
        <div style={{ marginTop: '30px', padding: '20px', background: '#e0f7fa', borderRadius: '5px' }}>
          <h2>Your shortened URL:</h2>
          <a href={shortenedUrls} target="_blank" rel="noopener noreferrer">
            {shortenedUrls}
          </a>
        </div>
      )}
    </div>
  );
}

export default ShortenerPage;
