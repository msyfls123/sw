import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { genConfig } from './webpack-config'
import rimraf from 'rimraf'

const isDev = process.env.NODE_ENV === 'development'

function compileCb (err, stat) {
  if (err) {
    console.error(JSON.stringify(err, null, 2))
  } else {
    console.log(stat.toString({
      colors: true
    }))
  }
}

const config = genConfig()
const host = 'localhost'
const port = 8090
const devServerOptions = {
  host,
  port,
  publicPath: config.output.publicPath,
  contentBase: path.join(__dirname, '../..'),
  inline: true,
  noInfo: true,
  stats: { colors: true },
  watchOptions: {
    poll: 1000
  }
}

rimraf('./dist', (er) => {
  if (er) {
    console.error(er)
    return
  }
  if (isDev) {
    WebpackDevServer.addDevServerEntrypoints(config, devServerOptions)
    ;(new WebpackDevServer(webpack(config), devServerOptions)).listen(port, host, (err) => {
      if (err) {
        console.error('DevServer Error:', err)
      } else {
        console.log('Webpack Dev Server listening:', `${host}:${port}`)
      }
    })
  } else {
    webpack(config, compileCb)
  }
})
