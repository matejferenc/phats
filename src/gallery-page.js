import { initI18n } from './i18n.js'
import { initLightbox } from './gallery.js'

export function initGalleryPage(photos, heroPhoto) {
  const base = import.meta.env.BASE_URL

  document.getElementById('hero-bg').style.backgroundImage =
    `url('${base}${heroPhoto}')`

  const header = document.getElementById('site-header')
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60)
  }, { passive: true })

  const el = document.getElementById('gallery-main')
  photos.forEach((photo, i) => {
    const li = document.createElement('li')
    li.className = 'photo-card'
    li.setAttribute('role', 'listitem')

    const btn = document.createElement('button')
    btn.className = 'photo-btn'
    btn.setAttribute('aria-label', `View photo ${i + 1}`)

    const img = document.createElement('img')
    img.src = `${base}photos_webp_small/${photo.small}`
    img.alt = `Tiso Photo — ${photo.file}`
    img.loading = i < 6 ? 'eager' : 'lazy'
    img.decoding = 'async'

    btn.appendChild(img)
    li.appendChild(btn)
    btn.addEventListener('click', () => openLightbox(i, photos))
    el.appendChild(li)
  })

  initI18n()
  initLightbox(photos)
}

function openLightbox(index, photos) {
  window.__lightboxPhotos = photos
  window.__lightboxIndex = index
  updateLightboxImage()
  const lb = document.getElementById('lightbox')
  lb.hidden = false
  document.body.style.overflow = 'hidden'
  document.getElementById('lightbox-close').focus()
}

function updateLightboxImage() {
  const photos = window.__lightboxPhotos
  const index = window.__lightboxIndex
  const photo = photos[index]
  const img = document.getElementById('lightbox-img')
  img.src = `${import.meta.env.BASE_URL}photos_webp/${photo.file}`
  img.alt = `Tiso Photo — ${photo.file}`
}
