import type { NextRequest } from 'next/server';

interface FetchOptions {
  endpoint: string;
  params?: Record<string, string>;
}

export async function fetchFromDrupal({ endpoint, params = {} }: FetchOptions) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  const username = process.env.NEXT_PUBLIC_HTAUTH_U;
  const password = process.env.NEXT_PUBLIC_HTAUTH_P;
  const consumerId = process.env.NEXT_PUBLIC_CONSUMERUUID;
  const apiKey = process.env.NEXT_PUBLIC_UP_API_KEY;

  if (!baseUrl || !apiBase) {
    throw new Error('Drupal API configuration is missing.');
  }

  const url = new URL(`${baseUrl}/${apiBase}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      'X-Consumer-ID': consumerId || '',
      'api-key': apiKey || '',
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Ensure fresh data on every request
  });

  if (!response.ok) {
    throw new Error(`Drupal API request failed: ${response.statusText}`);
  }

  return response.json();
}
