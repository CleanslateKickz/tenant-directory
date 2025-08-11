import type { Handler } from "@netlify/functions";

const GRIST_API_URL = 'https://docs.getgrist.com/api/docs/8VJ8y5ig393qLhax6oUjRN';
// IMPORTANT: This key should be set as an environment variable in your Netlify project settings.
const GRIST_API_KEY = process.env.VITE_GRIST_API_KEY;

const handler: Handler = async (event) => {
  // This allows the function to handle requests for different tables if needed in the future.
  const path = event.path.replace('/api', '');
  const targetUrl = `${GRIST_API_URL}${path}`;

  if (!GRIST_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Grist API key is not configured.' }),
    };
  }

  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        'Authorization': `Bearer ${GRIST_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: event.body,
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from Grist API', details: message }),
    };
  }
};

export { handler };
