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
};

export default nextConfig;
