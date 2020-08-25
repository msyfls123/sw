if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    console.log('Scope is', reg.scope);
  })
}

const req1 = new Request('https://day.ebichu.cc/api/1', { mode: 'cors' });
const req2 = new Request('https://day.ebichu.cc/api/321', { mode: 'cors' });
const app = document.querySelector('#main');
function fetchDay(req) {
  fetch(req).then(res => res.json()).then((res) => {
    const pre = document.createElement('pre')
    pre.textContent = JSON.stringify(res, null, 2)
    app.appendChild(pre)
  })
}
fetchDay(req1)
fetchDay(req2)
