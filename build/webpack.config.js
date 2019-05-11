const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const lessToJs = require('less-vars-to-js')

const extractCss = new MiniCssExtractPlugin({
  filename: 'main.[contenthash:8].css',
})

const env = process.env.NODE_ENV || 'production'

const configPath = path.join(__dirname, `../config/${env}.js`)

const plugins = [extractCss]

if (process.env.ANALYZE) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      openAnalyzer: true,
    })
  )
}

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  entry: {
    main: path.join(__dirname, '../src'),
  },
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist_temp'),
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].chunk.[chunkhash:8].js',
  },
  plugins: plugins.concat([
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
      growingLoader:
        env === 'production'
          ? `<script>${fs.readFileSync(
            path.join(__dirname, './growing.js'),
            'utf-8'
          )}</script>`
          : '',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
  ]),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '../'),
      config: configPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '../components'),
          path.join(__dirname, '../stores'),
          path.join(__dirname, '../src'),
          path.join(__dirname, '../lib'),
          path.join(__dirname, '../config'),
        ],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, '../'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=[hash:12].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'url-loader?name=[hash:12].[ext]&limit=25000',
      },
    ],
  },
}
