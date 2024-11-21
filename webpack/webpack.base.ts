import Dotenv from 'dotenv-webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import type { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/index.tsx',
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ESLintPlugin(),
    new Dotenv({
      systemvars: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            process.env.NODE_ENV === 'development' &&
              require.resolve('react-refresh/babel'),
          ].filter(Boolean),
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                noIeCompat: true,
                javascriptEnabled: true,
                math: 'always',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|woff2)$/,
        use: ['file-loader'],
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
  optimization: {
    concatenateModules: false,
  },
};

export default config;
