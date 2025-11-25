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

  compiler: {
    // Removed styled-jsx since we're using Tailwind CSS
  },

  poweredByHeader: false,

  eslint: {
    // Allow builds to continue even with ESLint errors during deployment
    ignoreDuringBuilds: true,
  },

  // Suppress warnings during build
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Updated for Next.js 15 - moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['styled-jsx'],

  experimental: {
    esmExternals: true,
  },

  // Optimize for production builds
  productionBrowserSourceMaps: false,
  // Note: optimizeFonts is now enabled by default in Next.js 15
  compress: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Suppress warnings during webpack compilation
    config.stats = {
      warnings: false,
      warningsFilter: [
        /serialize-error-cjs/,
        /You or someone you depend on is using Q/,
        /Module not found/,
        /regenerate-unicode-properties/,
      ],
    };

    // Add optimization for production builds
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;

