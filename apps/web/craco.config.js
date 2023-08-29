const webpack = require('webpack');

module.exports = {
  typescript: {
    enableTypeChecking: true /* (default value) */,
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
        assert: require.resolve('assert')
      };

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