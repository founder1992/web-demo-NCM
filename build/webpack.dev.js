const webpack=require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { SkeletonPlugin } = require('page-skeleton-webpack-plugin');

const { resolve, resolveAssetsRootDir } = require('./utils');

const devConfig={
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      cdn: {
        js: [
          'https://cdn.bootcss.com/react/16.8.6/umd/react.production.min.js',
          'https://cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.production.min.js'
        ]
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new SkeletonPlugin({
    //   pathname: resolve('../shell'), // the path to store shell file
    //   staticDir: resolve('../dist'), // the same as the `output.path`
    //   routes: ['/'], // Which routes you want to generate skeleton screen
    //   port: '5001',
    //   loading: 'chiaroscuro'
    // })
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    overlay: {
      //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true
    },
    inline: true,
    hot: true,
    proxy: {
      '/': {
        target: 'https://api.necm.chenfangzheng.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  },
};

module.exports = merge(baseConfig, devConfig);