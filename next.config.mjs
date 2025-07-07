/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
    ],
  },

  // Fix styled-jsx issues
  transpilePackages: ['styled-jsx'],

  // Enable styled-jsx compiler flag
  compiler: {
    styledJsx: true,
  },

  // Optimize for deployment
  poweredByHeader: false,

  // Fix ESLint serialization issues during build
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Enable experimental features
  experimental: {
    esmExternals: true,
    serverComponentsExternalPackages: ['styled-jsx'],
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Fix styled-jsx resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      'styled-jsx': require.resolve('styled-jsx'),
    };

    // Add fallbacks for Node core modules to prevent build errors
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    return config;
  },
};

export default nextConfig;
