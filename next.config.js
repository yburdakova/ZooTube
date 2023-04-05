/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  typescript:{
    ignoreBuildErrors: true,
  },
  images:{
    domains: ['burdakova.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
