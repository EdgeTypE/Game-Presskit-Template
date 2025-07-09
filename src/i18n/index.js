import { writable } from 'svelte/store';
import en from './en.json';
import tr from './tr.json';

// Available translations
const translations = {
  en,
  tr
};

// Current language store
export const currentLanguage = writable('en');

// Translation function store
export const t = writable(() => {});

// Initialize translation function
function createTranslation(lang) {
  const translation = translations[lang] || translations.en;
  
  return function translate(key, fallback = key) {
    const keys = key.split('.');
    let value = translation;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback;
      }
    }
    
    return typeof value === 'string' ? value : fallback;
  };
}

// Set language and update translation function
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage.set(lang);
    t.set(createTranslation(lang));
    localStorage.setItem('language', lang);
  }
}

// Initialize with saved language or default to English
export function initializeI18n() {
  const savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);
}

// Get available languages
export function getAvailableLanguages() {
  return Object.keys(translations).map(code => ({
    code,
    name: translations[code].meta?.languageName || code.toUpperCase(),
    nativeName: translations[code].meta?.nativeLanguageName || code.toUpperCase()
  }));
}