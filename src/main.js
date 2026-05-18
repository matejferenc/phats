import './style.css'
import { initI18n } from './i18n.js'

function initHeader() {
  const header = document.getElementById('site-header')
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60)
  }, { passive: true })
}

const base = import.meta.env.BASE_URL

document.getElementById('hero-bg').style.backgroundImage =
  `url('${base}photos_webp/portrait/photo_01.webp')`

document.getElementById('cat-portrait').style.backgroundImage =
  `url('${base}photos_webp/portrait/photo_08.webp')`
document.getElementById('cat-events').style.backgroundImage =
  `url('${base}photos_webp/events/photo_05.webp')`
document.getElementById('cat-products').style.backgroundImage =
  `url('${base}photos_webp/products/photo_03.webp')`

initI18n()
initHeader()
