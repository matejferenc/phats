export const translations = {
  cs: {
    nav_portrait:  'Portréty',
    nav_events:    'Události',
    nav_products:  'Produkty',
    nav_contact:   'Kontakt',

    hero_eyebrow:  'Profesionální fotografie · Praha',
    hero_title:    'Zachyťte\ndokonalý okamžik.',
    hero_subtitle: 'Portréty, události a produktová fotografie na nejvyšší úrovni.',
    hero_cta:      'Prohlédnout portfolio',
    cat_view:      'Zobrazit galerii',

    portrait_title:    'Portréty',
    portrait_subtitle: 'Každý člověk má svůj příběh. Nechte nás ho zachytit.',
    events_title:      'Události',
    events_subtitle:   'Od rodinných slavností po firemní akce.',
    products_title:    'Produkty',
    products_subtitle: 'Profesionální produktová fotografie, která prodává.',

    contact_title:    'Rezervujte si focení',
    contact_subtitle: 'Kontaktujte nás a domluvíme termín.',
    contact_email_label: 'Email',
    contact_phone_label: 'Telefon',

    footer_copy: '© 2026 Tiso Photo · Všechna práva vyhrazena',
  },
  en: {
    nav_portrait:  'Portrait',
    nav_events:    'Events',
    nav_products:  'Products',
    nav_contact:   'Contact',

    hero_eyebrow:  'Professional Photography · Prague',
    hero_title:    'Capture\nthe perfect moment.',
    hero_subtitle: 'Portrait, event and product photography at the highest level.',
    hero_cta:      'View portfolio',
    cat_view:      'View gallery',

    portrait_title:    'Portrait',
    portrait_subtitle: 'Every person has a story. Let us capture it.',
    events_title:      'Events',
    events_subtitle:   'From family celebrations to corporate events — every moment deserves to be remembered.',
    products_title:    'Products',
    products_subtitle: 'Professional product photography that sells.',

    contact_title:    'Book a session',
    contact_subtitle: 'Contact us and we\'ll arrange a time.',
    contact_email_label: 'Email',
    contact_phone_label: 'Mobile',

    footer_copy: '© 2026 Tiso Photo · All rights reserved',
  },
}

function detectLanguage() {
  const stored = localStorage.getItem('lang')
  if (stored === 'cs' || stored === 'en') return stored
  const browser = (navigator.language || 'en').toLowerCase()
  return browser.startsWith('cs') || browser.startsWith('sk') ? 'cs' : 'en'
}

let currentLang = detectLanguage()

export function getLang() { return currentLang }

export function setLang(lang) {
  currentLang = lang
  localStorage.setItem('lang', lang)
  document.documentElement.lang = lang
  applyTranslations()
  updateLangToggle()
}

export function t(key) {
  return translations[currentLang][key] ?? translations.en[key] ?? key
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    const text = t(key)
    if (text.includes('\n')) {
      el.innerHTML = text.split('\n').map(line => `<span>${line}</span>`).join('<br>')
    } else {
      el.textContent = text
    }
  })
}

export function updateLangToggle() {
  const btn = document.getElementById('lang-toggle')
  if (btn) btn.textContent = currentLang === 'cs' ? 'EN' : 'CS'
}

export function initI18n() {
  document.documentElement.lang = currentLang
  applyTranslations()
  updateLangToggle()
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    setLang(currentLang === 'cs' ? 'en' : 'cs')
  })
}
