const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// ── Path aliases (must match tsconfig.json paths) ──────────────────────────
config.resolver.alias = {
    '@components': path.resolve(__dirname, 'src/components'),
    '@screens': path.resolve(__dirname, 'src/screens'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@types': path.resolve(__dirname, 'src/types'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@assets': path.resolve(__dirname, 'assets'),
};

module.exports = config;
