import type { Configuration } from 'webpack';

import devConfig from './webpack/webpack.dev';
import prodConfig from './webpack/webpack.prod';

const config = (env: any, arg: any): Configuration => {
  switch (arg.mode) {
    case 'development':
      return devConfig;

    case 'production':
      return prodConfig;

    default:
      return devConfig;
  }
};

export default config;
