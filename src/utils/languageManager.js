// Dil yöneticisi
class LanguageManager {
  constructor() {
    // Varsayılan dil İngilizce
    this.defaultLanguage = 'en';
    // Desteklenen diller
    this.supportedLanguages = ['en', 'tr'];
    // Mevcut dil
    this.currentLanguage = this.defaultLanguage;
    
    // Tarayıcı dilini kontrol et
    this.detectBrowserLanguage();
    
    // Dil değişikliği callback'leri
    this.callbacks = [];
  }
  
  // Tarayıcı dilini tespit et
  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    
    if (this.supportedLanguages.includes(langCode)) {
      this.currentLanguage = langCode;
    }
  }
  
  // Dil ayarla
  setLanguage(lang) {
    if (this.supportedLanguages.includes(lang)) {
      this.currentLanguage = lang;
      
      // Local storage'a kaydet
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', lang);
      }
      
      // Tüm callback'leri çağır
      this.callbacks.forEach(callback => {
        if (typeof callback === 'function') {
          callback(lang);
        }
      });
      
      return true;
    }
    return false;
  }
  
  // Mevcut dili al
  getCurrentLanguage() {
    // Local storage'dan dil ayarını kontrol et
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('language');
      if (savedLang && this.supportedLanguages.includes(savedLang)) {
        this.currentLanguage = savedLang;
      }
    }
    
    return this.currentLanguage;
  }
  
  // Dil değiştirme callback'i ekle
  addLanguageChangeListener(callback) {
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }
  }
  
  // Dil değiştirme callback'i kaldır
  removeLanguageChangeListener(callback) {
    const index = this.callbacks.indexOf(callback);
    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  }
  
  // Metin çevirisi
  translate(key, translations) {
    // Eğer mevcut dil için çeviri varsa ve doluysa onu kullan
    if (translations[`${key}-${this.currentLanguage}`] &&
        translations[`${key}-${this.currentLanguage}`].trim() !== '') {
      return translations[`${key}-${this.currentLanguage}`];
    }
    
    // Varsayılan dil için çeviri varsa onu kullan
    if (translations[key]) {
      return translations[key];
    }
    
    // Hiçbiri yoksa key'i döndür
    return key;
  }
  
  // Blog yazısı için içerik çevirisi
  translatePost(post) {
    const translatedPost = { ...post };
    
    // Başlık çevirisi
    if (post[`title-${this.currentLanguage}`] &&
        post[`title-${this.currentLanguage}`].trim() !== '') {
      translatedPost.title = post[`title-${this.currentLanguage}`];
    }
    
    // Özet çevirisi
    if (post[`excerpt-${this.currentLanguage}`] &&
        post[`excerpt-${this.currentLanguage}`].trim() !== '') {
      translatedPost.excerpt = post[`excerpt-${this.currentLanguage}`];
    }
    
    // Alt metni çevirisi
    if (post[`alt-${this.currentLanguage}`] &&
        post[`alt-${this.currentLanguage}`].trim() !== '') {
      translatedPost.alt = post[`alt-${this.currentLanguage}`];
    }
    
    // Etiketler çevirisi
    if (post[`tags-${this.currentLanguage}`] &&
        post[`tags-${this.currentLanguage}`].length > 0) {
      translatedPost.tags = post[`tags-${this.currentLanguage}`];
    }
    
    // İçerik çevirisi
    if (post[`content-${this.currentLanguage}`] &&
        post[`content-${this.currentLanguage}`].trim() !== '') {
      translatedPost.content = post[`content-${this.currentLanguage}`];
    }
    
    return translatedPost;
  }
}

// Global dil yöneticisi örneği
export const languageManager = new LanguageManager();