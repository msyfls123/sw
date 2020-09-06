import React from 'react'
import { render } from 'react-dom'
import Root from './root'

import './app.styl'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/sw/dist/sw.js', { scope: '/sw/dist/' }).then(() => {
    console.log('success register sw.js!')
  })
}

const mountNode = document.getElementById('main')
render(<Root/>, mountNode)
