module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'production',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tfkvzrwajkrxpnfcpvhx.supabase.co'
      }
    ]
  }
};
