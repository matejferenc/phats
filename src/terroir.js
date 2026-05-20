import './style.css'
import { initI18n } from './i18n.js'
import { initLightbox } from './gallery.js'

const base = import.meta.env.BASE_URL
const PHOTO = { file: 'products/photo_25.webp', small: 'products/photo_25.webp' }

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
  cs: 'Projekt Terroir je oslavou původu — chutí, vůní a příběhů ukrytých v jídle. Fotografie zachycují suroviny, prostředí i lidi, kteří za každým pokrmem stojí. Výsledkem je vizuální jazyk, který mluví dříve než první sousto.',
  en: 'The Terroir project is a celebration of origin — the flavours, aromas, and stories hidden in food. The photographs capture ingredients, environments, and the people behind each dish. The result is a visual language that speaks before the first bite.',
}

const lang = document.documentElement.lang || 'cs'
const descEl = document.getElementById('project-desc')
const heroSubEl = document.getElementById('hero-sub')

descEl.textContent = lang === 'en' ? TEXT.en : TEXT.cs
heroSubEl.textContent = lang === 'en'
  ? 'Origin · Flavour · Story'
  : 'Původ · Chuť · Příběh'

document.getElementById('lang-toggle')?.addEventListener('click', () => {
  const newLang = document.documentElement.lang === 'cs' ? 'en' : 'cs'
  descEl.textContent = newLang === 'en' ? TEXT.en : TEXT.cs
  heroSubEl.textContent = newLang === 'en' ? 'Origin · Flavour · Story' : 'Původ · Chuť · Příběh'
  document.getElementById('back-link').textContent = newLang === 'en' ? '← Projects' : '← Projekty'
}, { capture: true })

initI18n()
