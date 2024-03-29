/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
