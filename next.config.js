module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'production',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tfkvzrwajkrxpnfcpvhx.supabase.co'
      }
    ]
  }
};
