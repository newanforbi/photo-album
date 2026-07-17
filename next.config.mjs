/** @type {import('next').NextConfig} */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  async redirects() {
    return [
      {
        source: "/photos/2026-07-15/lobby-briefcase-portrait.png",
        destination: "/photos/2026-07-15/lobby-briefcase-portrait.jpg",
        permanent: true,
      },
      {
        source: "/photos/2017-02-26/mirror-selfie-jersey.png",
        destination: "/photos/2017-02-26/mirror-selfie-jersey.jpg",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
