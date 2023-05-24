// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
    /* config options here */
    experimental: {
        largePageDataBytes: 128 * 1_000_000
    }
}

module.exports = nextConfig
