import 'dotenv/config'; // Load .env variables

export default {
  expo: {
    name: 'Educado Mobile Learning',
    slug: 'eml',
    version: '1.0.0',
    extra: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      MONGO_URI: process.env.MONGO_URI,
      COOKIE_KEY: process.env.COOKIE_KEY,
      GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    },
  },
};
