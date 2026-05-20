import './style.css'
import { initI18n } from './i18n.js'
import { initLightbox } from './gallery.js'

const base = import.meta.env.BASE_URL
const PHOTO = { file: 'products/photo_49.webp', small: 'products/photo_49.webp' }

document.getElementById('hero-bg').style.backgroundImage =
  `url('${base}photos_webp/${PHOTO.file}')`

document.getElementById('project-img').src = `${base}photos_webp_small/${PHOTO.small}`

const header = document.getElementById('site-header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60)
}, { passive: true })

const open = initLightbox([PHOTO])
document.getElementById('project-photo-btn').addEventListener('click', () => open(0))

const TEXT = {
  cs: 'Kampaň Lumière vznikla jako vizuální oslava světla — jeho proměn, stínů a tiché přítomnosti v každodenním životě. Každý snímek je studií kontrastu mezi jasem a tmou, mezi odhalením a záhadou.',
  en: 'The Lumière campaign was born as a visual celebration of light — its transformations, shadows, and quiet presence in everyday life. Each image is a study in the contrast between brightness and darkness, between revelation and mystery.',
}

const lang = document.documentElement.lang || 'cs'
const descEl = document.getElementById('project-desc')
const heroSubEl = document.getElementById('hero-sub')

descEl.textContent = lang === 'en' ? TEXT.en : TEXT.cs
heroSubEl.textContent = lang === 'en'
  ? 'Light · Shadow · Silence'
  : 'Světlo · Stín · Ticho'

descEl.setAttribute('data-text-cs', TEXT.cs)
descEl.setAttribute('data-text-en', TEXT.en)

document.getElementById('lang-toggle')?.addEventListener('click', () => {
  const newLang = document.documentElement.lang === 'cs' ? 'en' : 'cs'
  descEl.textContent = newLang === 'en' ? TEXT.en : TEXT.cs
  heroSubEl.textContent = newLang === 'en' ? 'Light · Shadow · Silence' : 'Světlo · Stín · Ticho'
  document.getElementById('back-link').textContent = newLang === 'en' ? '← Projects' : '← Projekty'
}, { capture: true })

initI18n()
