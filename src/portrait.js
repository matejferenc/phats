import './style.css'
import { initI18n } from './i18n.js'
import { initLightbox } from './gallery.js'

const base = import.meta.env.BASE_URL
document.getElementById('hero-bg').style.backgroundImage =
  `url('${base}photos_webp/portrait/photo_36.webp')`

const header = document.getElementById('site-header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60)
}, { passive: true })

const PORTRAIT_SHOWCASE = [
  { file: 'portrait/photo_25.webp', small: 'portrait/photo_25.webp', caption_cs: 'Každý pohled vypráví příběh, který slova nedokážou vyjádřit.', caption_en: 'Every gaze tells a story that words cannot express.' },
  { file: 'portrait/photo_30.webp', small: 'portrait/photo_30.webp', caption_cs: 'Autentický okamžik, zachycený navždy.', caption_en: 'An authentic moment, captured forever.' },
  { file: 'portrait/photo_55.webp', small: 'portrait/photo_55.webp', caption_cs: 'Světlo odhaluje to, co skrýváme — charakter, klid, sílu.', caption_en: 'Light reveals what we hide — character, calm, strength.' },
]

const open = initLightbox(PORTRAIT_SHOWCASE)
const container = document.getElementById('gallery-main')
container.className = 'portrait-showcase'

const lang = document.documentElement.lang || 'cs'

PORTRAIT_SHOWCASE.forEach((photo, i) => {
  const li = document.createElement('li')
  li.className = 'portrait-item'

  const btn = document.createElement('button')
  btn.className = 'photo-btn'
  btn.setAttribute('aria-label', `View photo ${i + 1}`)

  const img = document.createElement('img')
  img.src = `${base}photos_webp_small/${photo.small}`
  img.alt = `Tiso Photo — ${photo.file}`
  img.loading = i === 0 ? 'eager' : 'lazy'
  img.decoding = 'async'

  btn.appendChild(img)

  const caption = document.createElement('p')
  caption.className = 'portrait-caption'
  caption.setAttribute('data-caption-cs', photo.caption_cs)
  caption.setAttribute('data-caption-en', photo.caption_en)
  caption.textContent = lang === 'en' ? photo.caption_en : photo.caption_cs

  li.appendChild(btn)
  li.appendChild(caption)
  btn.addEventListener('click', () => open(i))
  container.appendChild(li)
})

document.getElementById('lang-toggle')?.addEventListener('click', () => {
  const newLang = document.documentElement.lang === 'cs' ? 'en' : 'cs'
  document.querySelectorAll('.portrait-caption').forEach(el => {
    el.textContent = newLang === 'en' ? el.dataset.captionEn : el.dataset.captionCs
  })
}, { capture: true })

initI18n()
