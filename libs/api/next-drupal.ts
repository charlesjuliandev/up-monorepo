import { DrupalClient } from "next-drupal";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiBase = process.env.NEXT_PUBLIC_API_BASE;
const username = process.env.NEXT_PUBLIC_HTAUTH_U;
const password = process.env.NEXT_PUBLIC_HTAUTH_P;
const consumerId = process.env.NEXT_PUBLIC_CONSUMERUUID;
const apiKey = process.env.NEXT_PUBLIC_UP_API_KEY;

export const drupal = new DrupalClient(baseUrl, {
    frontPage: "/",
    headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        'X-Consumer-ID': consumerId || '',
        'api-key': apiKey || '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data on every request
});

