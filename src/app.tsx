import React from 'react'
import { render } from 'react-dom'
import Root from './root'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw/dist/sw.js', { scope: '/sw/dist/' }).then(() => {
    console.log('success register sw.js')
  })
}

const mountNode = document.getElementById('main')
render(<Root/>, mountNode)
