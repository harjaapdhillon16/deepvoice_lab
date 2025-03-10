const appToServe = process.env.NEXT_PUBLIC_APP_NAME || "messaging"; // Default app if not set

console.log(`Serving ${appToServe}`);

const nextConfig = {
  // No redirect; instead, directly serve from base URL
  async rewrites() {
    return [
      {
        source: "/",
        destination: `/${appToServe}/`, // Serve the main app at the root
      },
      {
        source: "/:path*",
        destination: `/${appToServe}/:path*`, // Rewrite all other requests to the app
      },
    ];
  },
  i18n: {
    locales: ['en', 'es'], // include Spanish
    defaultLocale: 'en',   // change this to 'es' if you want Spanish as default
  },
};

module.exports = nextConfig;
