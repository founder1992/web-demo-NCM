const webpack=require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
          'https://cdn.bootcss.com/react/16.9.0-alpha.0/umd/react.development.js',
          'https://cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.development.js'
        ]
      }
    }),
    new webpack.HotModuleReplacementPlugin()
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