const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')
const Jarvis = require('webpack-jarvis')
const lessToJs = require('less-vars-to-js')

const env = process.env.NODE_ENV || 'default'

const configPath = path.join(__dirname, `./config/${env}.js`)

new WebpackDevServer(
  webpack({
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:3009',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './src',
    ],
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
      new HtmlWebpackPlugin({ template: './index.html' }),
      new Jarvis({
        port: 1337, // optional: set a port
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', 'scss'],
      alias: {
        '@': path.join(__dirname, './'),
        config: configPath,
        'react-dom': '@hot-loader/react-dom',
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: [
            path.join(__dirname, './components'),
            path.join(__dirname, './stores'),
            path.join(__dirname, './src'),
            path.join(__dirname, './lib'),
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.(jpe?g|png|gif)(\?.+)?$/,
          loader: 'url-loader',
        },
      ],
    },
  }),
  {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
    proxy: {
      '/file/file': {
        target: 'http://www.beta.hellorf.pub/',
        pathRewrite: { '^/file': '' },
        changeOrigin: true,
      },
      '/api': {
        // target: 'http://mock.beta.hellorf.pub/mock/5ba35dacbe3b94059994b42b/contributor',
        target: 'http://www.beta.hellorf.pub/api/contributor/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
).listen(3009, 'localhost', error => {
  if (error) {
    throw error
  }
})
