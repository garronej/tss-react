
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const transpileModules = require('next-transpile-modules')([
	'@mui/material',
	'@mui/styled-engine',
	'@mui/system',
	'@mui/utils',
	'@mui/base',
	'@mui/private-theming',

  "@emotion/react",
  "@emotion/server",
  "@emotion/styled",
  "@mui/icons-material",
  "@mui/material",

]);

const paths = require('./tsconfig.json').compilerOptions.paths;
const isDevServer = process.env.NODE_ENV === 'development';

module.exports = 
	transpileModules( withBundleAnalyzer({
  reactStrictMode: true,
  webpack: function (config, { isServer, webpack }) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /next\/dist\/server/ })
      );
    }

    return config;
  },
}));
