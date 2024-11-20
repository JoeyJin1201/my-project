import { merge } from 'webpack-merge';

import type { Configuration } from 'webpack';

import baseConfig from './webpack.base';

const prodConfig: Configuration = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
};

const config = merge(baseConfig, prodConfig);

export default config;
