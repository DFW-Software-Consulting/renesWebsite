import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource/anton/400.css'
import '@fontsource-variable/manrope'
import '@fontsource/kaushan-script/400.css'
import './index.css'
import App from './App'
import { pageFor } from './pages'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (root.hasChildNodes()) {
  // Prerendered page: load this route's chunk first so hydration matches the HTML exactly.
  const page = pageFor(window.location.pathname)
  Promise.resolve(page?.preload())
    .catch(() => {})
    .then(() => hydrateRoot(root, app))
} else {
  createRoot(root).render(app)
}
