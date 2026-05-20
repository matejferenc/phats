import './style.css'
import { initI18n } from './i18n.js'

const base = import.meta.env.BASE_URL
document.getElementById('hero-bg').style.backgroundImage =
  `url('${base}photos_webp/products/photo_49.webp')`

const header = document.getElementById('site-header')
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60)
}, { passive: true })

const PROJECTS = [
  {
    slug: 'lumiere',
    name: 'Lumière',
    photo: 'products/photo_49.webp',
    desc_cs: 'Kampaň zachytávající hru světla na lidské tváři a každodenních předmětech.',
    desc_en: 'A campaign capturing the play of light on faces and everyday objects.',
  },
  {
    slug: 'terroir',
    name: 'Terroir',
    photo: 'products/photo_25.webp',
    desc_cs: 'Vizuální příběh o jídle, původu a atmosféře místa.',
    desc_en: 'A visual story about food, origin, and the atmosphere of place.',
  },
]

const lang = document.documentElement.lang || 'cs'
const container = document.getElementById('gallery-main')
container.className = 'projects-grid'

PROJECTS.forEach(project => {
  const li = document.createElement('li')
  li.className = 'project-card'

  li.innerHTML = `
    <a href="/photos/projects/${project.slug}/" class="project-card-inner" aria-label="${project.name}">
      <div class="project-card-img">
        <img src="${base}photos_webp_small/${project.photo}" alt="${project.name} — Tiso Photo" loading="lazy" decoding="async" />
      </div>
      <div class="project-card-body">
        <h2 class="project-card-name">${project.name}</h2>
        <p class="project-card-desc" data-desc-cs="${project.desc_cs}" data-desc-en="${project.desc_en}">
          ${lang === 'en' ? project.desc_en : project.desc_cs}
        </p>
        <span class="project-card-btn" data-i18n="cat_view"></span>
      </div>
    </a>
  `
  container.appendChild(li)
})

document.getElementById('lang-toggle')?.addEventListener('click', () => {
  const newLang = document.documentElement.lang === 'cs' ? 'en' : 'cs'
  document.querySelectorAll('.project-card-desc').forEach(el => {
    el.textContent = newLang === 'en' ? el.dataset.descEn : el.dataset.descCs
  })
}, { capture: true })

initI18n()
