import { portraitPhotos, eventsPhotos, productsPhotos } from './photos.js'

const allPhotos = [...portraitPhotos, ...eventsPhotos, ...productsPhotos]
let lightboxIndex = 0

function createPhotoCard(photo, globalIndex) {
  const li = document.createElement('li')
  li.className = 'photo-card'
  li.setAttribute('role', 'listitem')

  const btn = document.createElement('button')
  btn.className = 'photo-btn'
  btn.setAttribute('aria-label', `View photo ${globalIndex + 1}`)

  const img = document.createElement('img')
  img.src = `${import.meta.env.BASE_URL}photos_webp_small/${photo.small}`
  img.alt = `Tiso Photo — ${photo.file}`
  img.loading = 'lazy'
  img.decoding = 'async'

  btn.appendChild(img)
  li.appendChild(btn)
  btn.addEventListener('click', () => openLightbox(globalIndex))
  return li
}

export function renderGallery() {
  const sections = [
    { id: 'gallery-portrait', photos: portraitPhotos, offset: 0 },
    { id: 'gallery-events',   photos: eventsPhotos,   offset: portraitPhotos.length },
    { id: 'gallery-products', photos: productsPhotos, offset: portraitPhotos.length + eventsPhotos.length },
  ]
  sections.forEach(({ id, photos, offset }) => {
    const el = document.getElementById(id)
    if (!el) return
    photos.forEach((photo, i) => el.appendChild(createPhotoCard(photo, offset + i)))
  })
}

function openLightbox(index) {
  lightboxIndex = index
  updateLightboxImage()
  const lb = document.getElementById('lightbox')
  lb.hidden = false
  document.body.style.overflow = 'hidden'
  document.getElementById('lightbox-close').focus()
}

function closeLightbox() {
  document.getElementById('lightbox').hidden = true
  document.body.style.overflow = ''
}

function updateLightboxImage() {
  const photo = allPhotos[lightboxIndex]
  const img = document.getElementById('lightbox-img')
  img.src = `${import.meta.env.BASE_URL}photos_webp/${photo.file}`
  img.alt = `Tiso Photo — ${photo.file}`
}

function prevPhoto() {
  lightboxIndex = (lightboxIndex - 1 + allPhotos.length) % allPhotos.length
  updateLightboxImage()
}

function nextPhoto() {
  lightboxIndex = (lightboxIndex + 1) % allPhotos.length
  updateLightboxImage()
}

export function initLightbox() {
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox)
  document.getElementById('lightbox-backdrop').addEventListener('click', closeLightbox)
  document.getElementById('lightbox-prev').addEventListener('click', prevPhoto)
  document.getElementById('lightbox-next').addEventListener('click', nextPhoto)

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox')
    if (lb.hidden) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevPhoto()
    if (e.key === 'ArrowRight') nextPhoto()
  })
}
