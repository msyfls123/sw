import WorkboxPlugin from 'workbox-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'

const srcPath = path.join(__dirname, '../src')
const outputPath = path.join(__dirname, '../dist')

export const config = {
  entry: {
    main: path.join(srcPath, 'app.ts')
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: '/sw/dist/'
  },
  resolve: {
    extensions: ['ts', 'js', 'tsx', 'jsx']
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
}
