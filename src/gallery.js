export function initLightbox(photos) {
  const base = import.meta.env.BASE_URL

  let index = 0

  function open(i) {
    index = i
    update()
    const lb = document.getElementById('lightbox')
    lb.hidden = false
    document.body.style.overflow = 'hidden'
    document.getElementById('lightbox-close').focus()
  }

  function close() {
    document.getElementById('lightbox').hidden = true
    document.body.style.overflow = ''
  }

  function update() {
    const photo = photos[index]
    const img = document.getElementById('lightbox-img')
    img.src = `${base}photos_webp/${photo.file}`
    img.alt = `Tiso Photo — ${photo.file}`
  }

  function prev() { index = (index - 1 + photos.length) % photos.length; update() }
  function next() { index = (index + 1) % photos.length; update() }

  document.getElementById('lightbox-close').addEventListener('click', close)
  document.getElementById('lightbox-backdrop').addEventListener('click', close)
  document.getElementById('lightbox-prev').addEventListener('click', prev)
  document.getElementById('lightbox-next').addEventListener('click', next)

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox')
    if (lb.hidden) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  })

  return open
}

export function renderGallery(photos, containerId) {
  const base = import.meta.env.BASE_URL
  const el = document.getElementById(containerId)
  const open = initLightbox(photos)

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
    btn.addEventListener('click', () => open(i))
    el.appendChild(li)
  })
}
