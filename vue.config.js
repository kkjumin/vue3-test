const webpack = require('webpack');
const path = require('path');

const isDevelop = process.env.NODE_ENV === 'development';
let plugins = [];
if (!isDevelop) plugins = [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })];

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'domain.com',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins,
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, 'src/assets/images'),
        '@media': path.resolve(__dirname, 'src/assets/media')
      }
    },
    output: {
      filename: isDevelop ? '[name].js' : '[name].[chunkhash].js'
    }
  },
  css: {
    extract: {
      filename: isDevelop ? '[name].css' : '[name].[chunkhash].css'
    }
  },
  filenameHashing: isDevelop,
  productionSourceMap: isDevelop
};
