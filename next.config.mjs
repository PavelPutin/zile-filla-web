/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/explorer",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
