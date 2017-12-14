import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import App from './components/app'

UIkit.use(Icons)

App
  .renderSync({ name:'Marko' })
  .replace(document.getElementById('root'))
