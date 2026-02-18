const { getSentryExpoConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig ? getSentryExpoConfig(__dirname) : require('expo/metro-config').getDefaultConfig(__dirname);

// ── Path aliases (must match tsconfig.json paths) ──────────────────────────
const path = require('path');

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
