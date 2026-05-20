import './style.css'
import { initI18n } from './i18n.js'
import { initLightbox } from './gallery.js'

const base = import.meta.env.BASE_URL
document.getElementById('hero-bg').style.backgroundImage =
  `url('${base}photos_webp/events/photo_01.webp')`

const header = document.getElementById('site-header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60)
}, { passive: true })

const EVENTS_SHOWCASE = [
  { file: 'events/photo_33.webp', small: 'events/photo_33.webp', caption_cs: 'Společné chvíle, které zůstanou v paměti celé generace.', caption_en: 'Shared moments that will stay in memory for generations.' },
  { file: 'events/photo_17.webp', small: 'events/photo_17.webp', caption_cs: 'Atmosféra, kterou nelze zopakovat — jen zachytit.', caption_en: 'An atmosphere that cannot be repeated — only captured.' },
  { file: 'events/photo_54.webp', small: 'events/photo_54.webp', caption_cs: 'Za každou slavností stojí příběh. My ho vyprávíme obrazem.', caption_en: 'Behind every celebration there is a story. We tell it in pictures.' },
]

const open = initLightbox(EVENTS_SHOWCASE)
const container = document.getElementById('gallery-main')
container.className = 'portrait-showcase'

const lang = document.documentElement.lang || 'cs'

EVENTS_SHOWCASE.forEach((photo, i) => {
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
