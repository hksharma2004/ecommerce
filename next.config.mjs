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
    
    // Optimize for deployment
    poweredByHeader: false,
    
    // Fix ESLint serialization issues during build
    eslint: {
        ignoreDuringBuilds: false,
    },
    
    // Ensure proper compilation
    experimental: {
        esmExternals: true,
    },
    
    // Fix webpack issues
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        // Fix styled-jsx resolution
        config.resolve.alias = {
            ...config.resolve.alias,
            'styled-jsx': require.resolve('styled-jsx'),
        };
        
        return config;
    },
};

export default nextConfig;