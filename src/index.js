import App from './app'

App
  .renderSync({ name:'Marko' })
  .replace(document.getElementById('root'))
