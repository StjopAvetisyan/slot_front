/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: false,
    env: {
        API_BASE_URL: "http://localhost:3004",
    }
};

module.exports = nextConfig;
