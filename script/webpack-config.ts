import WorkboxPlugin from 'workbox-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import webpack from 'webpack'

const basePath = path.dirname(__dirname)
const srcPath = path.join(basePath, 'src')
const outputPath = path.join(basePath, 'dist')

export const genConfig: () => webpack.Configuration = () => ({
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: path.join(srcPath, 'app.ts')
  },
  output: {
    path: outputPath,
    filename: '[name].[contenthash:6].js',
    publicPath: '/sw/dist/'
  },
  resolve: {
    modules: [
      srcPath,
      path.join(basePath, 'node_modules')
    ],
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      title: 'service-worker!!!'
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.join(srcPath, 'sw.ts'),
      injectionPoint: '__WB_MANIFEST'
    })
  ]
})
