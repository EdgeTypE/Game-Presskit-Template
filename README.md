# 🎮 Modern Game Presskit Template

A modern, responsive, and highly customizable presskit template for indie game developers. Built with Svelte and modular JSON-based content management. 

This template is designed to showcase your game with a professional look, featuring a clean design, SEO optimization, and easy-to-use components. You can easily customize colors, content, and features to fit your game's branding. 

## ✨ Features

- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🎯 SEO Optimized**: JSON+LD structured data and meta tag management
- **📊 Modular Data**: Separate JSON files for different content sections
- **🎨 Theme Customization**: Easy color theme customization for developers
- **💬 Comment System**: Integrated GDB Easy Comment system
- **⚡ Static Site**: No backend required, easy to deploy anywhere
- **🎬 Media Rich**: Support for screenshots, videos, concept art, and more
- **🏆 Achievement System**: Display game achievements and progress
- **📰 Press Kit**: Comprehensive press materials and assets
- **🔄 Update Timeline**: Game update history and roadmap

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 📁 Project Structure

```
game-presskit/
├── public/
│   └── data/           # JSON data files
│       ├── config.json # Theme and app configuration
│       ├── metadata.json # Game basic information
│       ├── features.json # Game features
│       ├── media.json # Screenshots, videos, artwork
│       ├── team.json # Development team info
│       ├── reviews.json # Reviews and awards
│       └── ... (more data files)
├── src/
│   ├── components/     # Svelte components
│   ├── styles/         # CSS styles and effects
│   ├── utils/          # Utility functions
│   └── i18n/           # Internationalization
└── README.md
```

## 🎨 Customization

### Theme Colors

Edit `public/data/config.json` to customize your theme:

```json
{
  "theme": {
    "primaryColor": "#6366f1",
    "secondaryColor": "#8b5cf6", 
    "accentColor": "#06b6d4"
  }
}
```

### Game Data

Update the JSON files in `public/data/` with your game's information:

- `metadata.json` - Basic game info, title, description, etc.
- `features.json` - Game features and selling points
- `media.json` - Screenshots, videos, concept art
- `storeLinks.json` - Steam, Epic, GOG, etc. store links
- `team.json` - Development team information
- `pressKit.json` - Press materials and assets

### Enabling/Disabling Sections

Each JSON file has an `enabled` field to control visibility:

```json
{
  "enabled": true,
  "data": {
    // ... your content
  }
}
```


## 🚀 Deployment

### Hosting (Recommended)

This is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel 

and many other static hosting providers.


## 🎯 SEO Features

- Automatic meta tag generation
- JSON+LD structured data for games
- Open Graph tags for social sharing
- Twitter Card support
- Sitemap generation ready
- Semantic HTML structure

## 💬 Comment System

Integrated with GDB Easy Comment system:

1. Comments are enabled by default
2. Configure in `config.json` features section
3. No additional setup required
4. Rate limited and spam protected

## 🔧 Technical Details

- **Framework**: Svelte with Vite
- **Styling**: CSS with custom properties
- **Effects**: Glassmorphism and hover animations
- **Images**: Responsive images with lazy loading
- **Performance**: Optimized builds with code splitting

## 📝 License

MIT License - feel free to use for commercial and personal projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all JSON files are valid
3. Verify image and video file paths
4. Check network requests in developer tools
5. For help, open an issue on GitHub

---
