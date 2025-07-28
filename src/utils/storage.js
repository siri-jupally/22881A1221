
const STORAGE_KEY = 'shortenedUrls';

export const storage = {
  /**
   * Get all shortened URLs from localStorage.
   * @returns {Array}
   */
  getAllUrls: () => {
    const urls = localStorage.getItem(STORAGE_KEY);
    return urls ? JSON.parse(urls) : [];
  },

  /**
   * Save all shortened URLs to localStorage.
   * @param {Array} urls
   */
  saveAllUrls: (urls) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  },
};
export default storage;
