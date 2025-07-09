import App from './App.svelte'
import './styles/global.css'
import './styles/effects/glassmorphism.css'
import './styles/effects/hover.css'

const app = new App({
  target: document.getElementById('app'),
})

export default app