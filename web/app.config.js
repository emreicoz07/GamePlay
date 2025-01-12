export default {
  expo: {
    // ... mevcut expo config
    extra: {
      apiUrl: process.env.API_URL || 'http://localhost:3000/api',
    },
  },
}; 