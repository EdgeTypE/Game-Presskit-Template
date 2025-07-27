// Basit SPA Router
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = '/';
    this.onRouteChange = null;
    
    // Browser history events
    window.addEventListener('popstate', () => {
      this.handleRouteChange();
    });
    
    // Handle initial route
    this.handleRouteChange();
  }
  
  // Route tanımlama
  addRoute(path, component) {
    this.routes.set(path, component);
  }
  
  // Route değiştirme
  navigate(path) {
    if (this.currentRoute !== path) {
      this.currentRoute = path;
      window.history.pushState({}, '', path);
      this.handleRouteChange();
    }
  }
  
  // Eski navigateTo fonksiyonu için uyumluluk
  navigateTo(path) {
    this.navigate(path);
  }
  
  // Route değişikliği işleme
  handleRouteChange() {
    const path = window.location.pathname;
    this.currentRoute = path;
    
    if (this.onRouteChange) {
      this.onRouteChange(path);
    }
  }
  
  // Mevcut route'u al
  getCurrentRoute() {
    return this.currentRoute;
  }
  
  // Route'un var olup olmadığını kontrol et
  hasRoute(path) {
    return this.routes.has(path);
  }
}

// Global router instance
export const router = new Router();

// Navigation helper
export function navigateTo(path) {
  router.navigate(path);
}

// Link component helper
export function createNavLink(element, path) {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(path);
  });
}