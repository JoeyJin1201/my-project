import baseConfig from './config.base';
import devConfig from './config.dev';
import prodConfig from './config.prd';
import qasConfig from './config.qas';

const getConfiguration = (environment: string | undefined) => {
  switch (environment) {
    case 'dev':
      return devConfig;

    case 'qas':
      return qasConfig;

    case 'prd':
      return prodConfig;

    default:
      return baseConfig;
  }
};

const AppConfig = getConfiguration(process.env.PROJECT_ENV);

export default AppConfig;
