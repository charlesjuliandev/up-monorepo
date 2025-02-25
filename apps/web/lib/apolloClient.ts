import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

if (!BASE_URL || !API_BASE) {
  console.error("ERROR: Missing environment variables!");
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${BASE_URL}/${API_BASE}`,
    basicAuth: `username: ${process.env.NEXT_PUBLIC_HTAUTH_U}, password: ${process.env.NEXT_PUBLIC_HTAUTH_p}`,
    headers: {
      "X-Consumer-ID": process.env.NEXT_PUBLIC_CONSUMERUUID || "",
      "api-key": process.env.NEXT_PUBLIC_UP_API_KEY || "",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
