/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com'],
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // Optimize for static export if needed
  trailingSlash: true,
  // Handle large static assets
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/images/',
          outputPath: 'static/images/',
        },
      },
    });
    return config;
  },
}

module.exports = nextConfig