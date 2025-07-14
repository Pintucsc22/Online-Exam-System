/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}  // or false to disable
};

export default {
  allowedDevOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000']
}
