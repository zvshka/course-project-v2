const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    images: {
        loader: 'custom',
        path: process.env.BASE_URL || 'https://localhost:3000',
    },
})