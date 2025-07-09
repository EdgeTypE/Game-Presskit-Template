// Theme manager utility
class ThemeManager {
  constructor() {
    this.defaultTheme = {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#06b6d4'
    };
  }

  // Apply theme colors to CSS variables
  applyTheme(themeConfig) {
    const root = document.documentElement;
    
    if (!themeConfig || !themeConfig.theme) {
      this.applyDefaultTheme();
      return;
    }

    const theme = themeConfig.theme;

    // Apply primary color
    if (theme.primaryColor) {
      root.style.setProperty('--primary-color', theme.primaryColor);
      // Create variations
      root.style.setProperty('--primary-color-light', this.lightenColor(theme.primaryColor, 20));
      root.style.setProperty('--primary-color-dark', this.darkenColor(theme.primaryColor, 20));
    }

    // Apply secondary color
    if (theme.secondaryColor) {
      root.style.setProperty('--secondary-color', theme.secondaryColor);
      root.style.setProperty('--secondary-color-light', this.lightenColor(theme.secondaryColor, 20));
      root.style.setProperty('--secondary-color-dark', this.darkenColor(theme.secondaryColor, 20));
    }

    // Apply accent color
    if (theme.accentColor) {
      root.style.setProperty('--accent-color', theme.accentColor);
      root.style.setProperty('--accent-color-light', this.lightenColor(theme.accentColor, 20));
      root.style.setProperty('--accent-color-dark', this.darkenColor(theme.accentColor, 20));
    }

    // Update glass effects with new colors
    this.updateGlassEffects(theme);
    
    // Update gradient colors
    this.updateGradients(theme);
  }

  // Apply default theme
  applyDefaultTheme() {
    this.applyTheme({ theme: this.defaultTheme });
  }

  // Update glass effect colors
  updateGlassEffects(theme) {
    const root = document.documentElement;
    
    if (theme.primaryColor) {
      // Convert hex to rgba for glass effects
      const primaryRgba = this.hexToRgba(theme.primaryColor, 0.2);
      const primaryRgbaLight = this.hexToRgba(theme.primaryColor, 0.1);
      
      root.style.setProperty('--glass-primary', primaryRgba);
      root.style.setProperty('--glass-primary-light', primaryRgbaLight);
    }
  }

  // Update gradient colors
  updateGradients(theme) {
    const root = document.documentElement;
    
    if (theme.primaryColor && theme.secondaryColor) {
      const gradient = `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`;
      root.style.setProperty('--gradient-primary', gradient);
    }
    
    if (theme.primaryColor && theme.accentColor) {
      const gradientAccent = `linear-gradient(45deg, ${theme.primaryColor}, ${theme.accentColor})`;
      root.style.setProperty('--gradient-accent', gradientAccent);
    }
  }

  // Convert hex to rgba
  hexToRgba(hex, alpha) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(99, 102, 241, ${alpha})`;
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Lighten a color
  lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  // Darken a color
  darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    
    return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  }

  // Generate complementary colors
  generatePalette(baseColor) {
    const hsl = this.hexToHsl(baseColor);
    
    return {
      primary: baseColor,
      secondary: this.hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l),
      accent: this.hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
      light: this.lightenColor(baseColor, 30),
      dark: this.darkenColor(baseColor, 30)
    };
  }

  // Convert hex to HSL
  hexToHsl(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  // Convert HSL to hex
  hslToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // Save theme to localStorage
  saveTheme(theme) {
    localStorage.setItem('gameTheme', JSON.stringify(theme));
  }

  // Load theme from localStorage
  loadSavedTheme() {
    const saved = localStorage.getItem('gameTheme');
    return saved ? JSON.parse(saved) : null;
  }
}

// Create singleton instance
export const themeManager = new ThemeManager();