/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:[
      'ipfs.infura.io',
      'rb.gy'
    ]
  }
}

module.exports = nextConfig
