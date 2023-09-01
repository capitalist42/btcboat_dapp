/* eslint-disable no-undef */
const webpack = require('webpack');

module.exports = {
  typescript: {
    enableTypeChecking: true /* (default value) */,
  },
  styple: {
    postcss: {
      loaderOptions: postcssLoaderOptions => {
        postcssLoaderOptions.postcssOptions = require('@heavens_door/tailwindcss-config/postcss.config.js');
        return postcssLoaderOptions;
      }
    }
  },
  webpack: {
    configure: config => {
      config.module.rules.push({
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.json',
        },
      });
      config.resolve.fallback = {
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert'), 
        https:  require.resolve('https-browserify'),
        http: require.resolve('stream-http'), 
        url: require.resolve('url'),
      };
      config.ignoreWarnings = [
        /Failed to parse source map/,
      ];

      config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      ]);
      return config;
    }
  },
  babel: {
    presets: ['@babel/preset-react'],
  },
};