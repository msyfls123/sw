import webpack from 'webpack'
import { config } from './webpack-config.ts'

webpack(config, (err, stat) => {
  if (err) {
    console.error(JSON.stringify(err, null, 2))
  } else {
    console.log(stat.toString({
      colors: true
    }))
  }
})
