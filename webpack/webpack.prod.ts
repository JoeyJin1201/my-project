import { merge } from 'webpack-merge';

import type { Configuration } from 'webpack';

import baseConfig from './webpack.base';

const prodConfig: Configuration = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devServer: {
    allowedHosts: 'all',
    host: '0.0.0.0',
  },
};

const config = merge(baseConfig, prodConfig);

export default config;
