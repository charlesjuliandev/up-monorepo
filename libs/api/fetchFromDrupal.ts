import type { NextRequest } from 'next/server';

interface FetchOptions {
  endpoint: string;
  params?: Record<string, string>;
  filter?: Record<string, any>;
}

export async function fetchFromDrupal({ endpoint, params = {} }: FetchOptions) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  const username = process.env.NEXT_PUBLIC_HTAUTH_U;
  const password = process.env.NEXT_PUBLIC_HTAUTH_P;
  const consumerId = process.env.NEXT_PUBLIC_CONSUMERUUID;
  const apiKey = process.env.NEXT_PUBLIC_UP_API_KEY;
  const token = process.env.NEXT_PUBLIC_OATH_KEY;
  const clientID = process.env.DRUPAL_CLIENT_ID
  const clientSecret = process.env.DRUPAL_CLIENT_SECRET

  if (!baseUrl || !apiBase) {
    throw new Error('Drupal API configuration is missing.');
  }

  // Build the URL
  const url = new URL(`${baseUrl}/${apiBase}/${endpoint}`);
  
  // Log the URL before appending parameters
    console.log("Full URL:", url.toString());
  console.log("Params:", params);

  // Encode and append parameters
  // Object.entries(params).forEach(([key, value]) => {
  //   // Log each parameter before appending
  //   console.log(`Appending param - ${key}: ${value}`);
  //   url.searchParams.append(encodeURIComponent(key), encodeURIComponent(value));
  // });

  console.log("Final URL with parameters:", url.toString());

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

  // Log the status code and raw response before parsing
  console.log("Response Status:", response.status);
  console.log("response", await response.json)
  const rawResponse = await response.text(); // Get the raw response as text for debugging
  console.log("Raw Response:", rawResponse);

  // Check if the response is OK
  if (!response.ok) {
    console.error("Failed to fetch data. Status:", response.status, "Response:", rawResponse);
    throw new Error(`Drupal API request failed: ${response.statusText}`);
  }

  try {
    // Attempt to parse the response as JSON
    const jsonResponse = JSON.parse(rawResponse);
    // Log the parsed JSON response for further debugging
    console.log("Parsed JSON Response:", JSON.stringify(jsonResponse, null, 2));
    return jsonResponse;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("Raw response that caused the error:", rawResponse);
    throw new Error("Failed to parse JSON from the response.");
  }
}
