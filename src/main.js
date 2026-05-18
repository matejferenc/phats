import './style.css'
import { initI18n } from './i18n.js'
import { renderGallery, initLightbox } from './gallery.js'

function initHeader() {
  const header = document.getElementById('site-header')
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60)
  }, { passive: true })
}

function initActiveNav() {
  const sections = ['portrait', 'events', 'products']
  const links = sections.map(id => document.querySelector(`.nav-links a[href="#${id}"]`))

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const id = entry.target.id
      links.forEach(l => l?.classList.remove('active'))
      const active = document.querySelector(`.nav-links a[href="#${id}"]`)
      active?.classList.add('active')
    })
  }, { threshold: 0.3 })

  sections.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}

document.getElementById('hero-bg').style.backgroundImage =
  `url('${import.meta.env.BASE_URL}photos_webp/portrait/photo_01.webp')`

initI18n()
initHeader()
initActiveNav()
renderGallery()
initLightbox()
