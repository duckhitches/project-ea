/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  /* If the app is served from a subpath (e.g. vercel.app/ea), set NEXT_PUBLIC_BASE_PATH=/ea in Vercel env */
  ...(basePath && { basePath, assetPrefix: basePath }),
  trailingSlash: false,
};
 
module.exports = nextConfig; 