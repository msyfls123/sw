// @ts-ignore since it's not available
import WorkboxPlugin from 'workbox-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack, { Configuration } from 'webpack'

const basePath = path.dirname(__dirname)
const srcPath = path.join(basePath, 'src')
const outputPath = path.join(basePath, 'dist')

const isProduction = process.env.NODE_ENV === 'production'

export const genConfig: () => Configuration = () => ({
  mode: process.env.NODE_ENV as Configuration['mode'] || 'production',
  entry: {
    main: path.join(srcPath, 'app')
  },
  output: {
    path: outputPath,
    filename: '[name].[contenthash:8].js',
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
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'img',
          esModule: false,
        },
      },
      {
        test: /\.styl$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackPwaManifest({
      name: 'Kimi PWA Page',
      short_name: 'KimiPWA',
      description: 'To Boldly Go No One Has Gone Before!',
      background_color: '#389eac',
      theme_color: '#d6c0a2',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/img/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
          src: path.resolve('src/img/large.png'),
          size: '1024x1024' // you can also use the specifications pattern
        },
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      title: 'service-worker!!!',
      minify: true
    }),
    ...(isProduction
      ? [new WorkboxPlugin.InjectManifest({
        swSrc: path.join(srcPath, 'sw.ts'),
        injectionPoint: '__WB_MANIFEST'
      })]
      : []
    ),
  ],
  optimization: {
    chunkIds: isProduction ? 'natural' : 'named',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'vendor',
          filename: '[name].[contenthash:8].js',
          test: new RegExp('[\\/]node_modules[\\/]'),
          chunks: 'initial',
          enforce: true
        }
      }
    }
  }
})
