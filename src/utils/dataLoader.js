// Data loader utility for JSON files
class DataLoader {
  constructor() {
    this.cache = new Map();
    this.baseUrl = '/data/';
  }

  // Load and cache JSON data
  async loadData(filename) {
    // Check cache first
    if (this.cache.has(filename)) {
      return this.cache.get(filename);
    }

    try {
      const response = await fetch(`${this.baseUrl}${filename}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the data
      this.cache.set(filename, data);
      
      return data;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return null;
    }
  }

  // Load multiple files concurrently
  async loadMultiple(filenames) {
    const promises = filenames.map(filename => this.loadData(filename));
    const results = await Promise.allSettled(promises);
    
    const data = {};
    results.forEach((result, index) => {
      const filename = filenames[index];
      const key = filename.replace('.json', '');
      
      if (result.status === 'fulfilled' && result.value) {
        data[key] = result.value;
      } else {
        console.warn(`Failed to load ${filename}`);
        data[key] = { enabled: false };
      }
    });
    
    return data;
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Preload critical data
  async preloadCritical() {
    const criticalFiles = [
      'config.json',
      'metadata.json',
      'storeLinks.json'
    ];
    
    return this.loadMultiple(criticalFiles);
  }

  // Check if data is enabled
  isEnabled(data) {
    return data && data.enabled === true;
  }
}

// Create singleton instance
export const dataLoader = new DataLoader();

// Convenience functions
export async function loadGameData() {
  const files = [
    'config.json',
    'metadata.json',
    'systemRequirements.json',
    'storeLinks.json',
    'media.json',
    'features.json',
    'team.json',
    'reviews.json',
    'platforms.json',
    'languages.json',
    'pressKit.json',
    'achievements.json',
    'updates.json',
    'social.json'
  ];
  
  return dataLoader.loadMultiple(files);
}

export async function loadConfig() {
  return dataLoader.loadData('config.json');
}

export async function loadMetadata() {
  return dataLoader.loadData('metadata.json');
}