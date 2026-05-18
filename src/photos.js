function range(n, prefix, dir) {
  return Array.from({ length: n }, (_, i) => {
    const f = `${prefix}${String(i + 1).padStart(2, '0')}.webp`
    return { file: `${dir}/${f}`, small: `${dir}/${f}` }
  })
}

export const portraitPhotos = range(121, 'photo_', 'portrait')
export const eventsPhotos   = range(99,  'photo_', 'events')
export const productsPhotos = range(59,  'photo_', 'products')
