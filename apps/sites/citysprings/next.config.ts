require('dotenv').config({ path: '../../.env' });

module.exports = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    NEXT_PUBLIC_HTAUTH_U: process.env.NEXT_PUBLIC_HTAUTH_U,
    NEXT_PUBLIC_HTAUTH_P: process.env.NEXT_PUBLIC_HTAUTH_P,
    NEXT_PUBLIC_CONSUMERUUID: process.env.NEXT_PUBLIC_CONSUMERUUID,
    NEXT_PUBLIC_UP_API_KEY: process.env.NEXT_PUBLIC_UP_API_KEY,
  },
};
