
/**
 * This is the real Logging Middleware.
 * It sends log data to the evaluation server via a POST request.
 * * @param {string} level .
 * @param {string} package 
 * @param {string} message 
 * @param {object} [data={}] 
 */
export const log = async (level, pkg, message, data = {}) => {
  const LOG_API_URL = 'http://28.244.56.144/evaluation-service/logs';
  
  const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZX...';

  const fullMessage = data ? `${message} | Data: ${JSON.stringify(data)}` : message;

  const requestBody = {
    stack: 'frontend',
    level: level.toLowerCase(), 
    package: pkg.toLowerCase(), 
    message: fullMessage,
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`, 
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error('Logging API Error:', response.status, await response.text());
    } else {
        console.log('Log sent successfully:', fullMessage);
    }
  } catch (error) {
    console.error('Failed to send log:', error);
  }
};
