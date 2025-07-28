
const logger = {
  info: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[INFO]:', ...args);
    }
  },
  warn: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[WARN]:', ...args);
    }
  },
  error: (...args) => {
    console.error('[ERROR]:', ...args);
  }
};

export default logger;