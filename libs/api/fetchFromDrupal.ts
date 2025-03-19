import type { NextRequest } from 'next/server';

interface FetchOptions {
  endpoint: string;
  params?: Record<string, string>;
  filter?: Record<string, any>;
}

// Fetch data from Drupal API with OAuth Client
export async function fetchFromDrupal({ endpoint, params = {} }: FetchOptions) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  // const username = process.env.NEXT_PUBLIC_HTAUTH_U;
  // const password = process.env.NEXT_PUBLIC_HTAUTH_P;
  // const consumerId = process.env.NEXT_PUBLIC_CONSUMERUUID;
  // const apiKey = process.env.NEXT_PUBLIC_UP_API_KEY;
  // const token = process.env.NEXT_PUBLIC_OATH_KEY;
  const clientID = process.env.DRUPAL_CLIENT_ID
  const clientSecret = process.env.DRUPAL_CLIENT_SECRET

  if (!baseUrl || !apiBase) {
    throw new Error('Drupal API configuration is missing.');
  }

  // Build the URL
  const url = new URL(`${baseUrl}/${apiBase}/${endpoint}`);
  
  

  // Fetch data from Drupal API
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      // Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      // 'X-Consumer-ID': consumerId || '',
      // 'api-key': apiKey || '',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`,
    },
    cache: 'no-store', // Ensure fresh data on every request
  });

  const rawResponse = await response.text(); // Get the raw response as text for debugging
  
  if (!response.ok) {
    console.error("Failed to fetch data. Status:", response.status, "Response:", rawResponse);
    throw new Error(`Drupal API request failed: ${response.statusText}`);
  }

  try {
    const jsonResponse = JSON.parse(rawResponse);  
    return jsonResponse;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("Raw response that caused the error:", rawResponse);
  }
}
