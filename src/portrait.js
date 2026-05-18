import './style.css'
import { initI18n } from './i18n.js'
import { renderGallery } from './gallery.js'
import { portraitPhotos } from './photos.js'

const base = import.meta.env.BASE_URL
document.getElementById('hero-bg').style.backgroundImage =
  `url('${base}photos_webp/portrait/photo_36.webp')`

const header = document.getElementById('site-header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60)
}, { passive: true })

initI18n()
renderGallery(portraitPhotos, 'gallery-main')
