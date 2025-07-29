<script>
  import { onMount } from 'svelte';
  import { initializeI18n, t } from './i18n/index.js';
  import { loadGameData } from './utils/dataLoader.js';
  import { themeManager } from './utils/themeManager.js';
  
  // Components
  import Hero from './components/sections/Hero.svelte';
  import GameInfo from './components/sections/GameInfo.svelte';
  import Features from './components/sections/Features.svelte';
  import Screenshots from './components/sections/Screenshots.svelte';
  import Videos from './components/sections/Videos.svelte';
  import Requirements from './components/sections/Requirements.svelte';
  import Reviews from './components/sections/Reviews.svelte';
  import Team from './components/sections/Team.svelte';
  import PressKit from './components/sections/PressKit.svelte';
  import StoreLinks from './components/sections/StoreLinks.svelte';
  import Achievements from './components/sections/Achievements.svelte';
  import Platforms from './components/sections/Platforms.svelte';
  import Languages from './components/sections/Languages.svelte';
  import Updates from './components/sections/Updates.svelte';
  import Social from './components/sections/Social.svelte';
  import Comments from './components/sections/Comments.svelte';
  import Footer from './components/sections/Footer.svelte';
  import Loading from './components/ui/Loading.svelte';

  // State
  let gameData = {};
  let loading = true;
  let error = null;

  // Initialize app
  onMount(async () => {
    try {
      // Initialize internationalization
      initializeI18n();
      
      // Load all game data
      gameData = await loadGameData();
      
      // Apply theme from config
      if (gameData.config && gameData.config.enabled) {
        themeManager.applyTheme(gameData.config);
        
        // Update page title and meta
        updatePageMeta(gameData);
      }
      
      loading = false;
    } catch (err) {
      console.error('Failed to initialize app:', err);
      error = err.message;
      loading = false;
    }
  });

  // Update page metadata
  function updatePageMeta(data) {
    if (data.config?.seo) {
      const seo = data.config.seo;
      document.title = seo.title || 'Game Presskit';
      
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', seo.description);
      }
      
      // Update OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      
      if (ogTitle) ogTitle.setAttribute('content', seo.title);
      if (ogDesc) ogDesc.setAttribute('content', seo.description);
      if (ogImage && seo.ogImage) ogImage.setAttribute('content', seo.ogImage);
      
      // Update Twitter tags
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      
      if (twitterTitle) twitterTitle.setAttribute('content', seo.title);
      if (twitterDesc) twitterDesc.setAttribute('content', seo.description);
      if (twitterImage && seo.twitterImage) twitterImage.setAttribute('content', seo.twitterImage);
    }
    
    if (data.metadata?.enabled) {
      // Add JSON-LD structured data
      addJsonLd(data.metadata);
    }
  }

  // Add JSON-LD structured data for SEO
  function addJsonLd(metadata) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": metadata.gameName,
      "description": metadata.shortDescription,
      "genre": metadata.genre,
      "developer": {
        "@type": "Organization",
        "name": metadata.developer
      },
      "publisher": {
        "@type": "Organization", 
        "name": metadata.publisher
      },
      "datePublished": metadata.releaseDate,
      "operatingSystem": gameData.platforms?.enabled ? 
        gameData.platforms.supportedPlatforms.map(p => p.name).join(', ') : 
        undefined,
      "applicationCategory": "Game",
      "offers": {
        "@type": "Offer",
        "price": metadata.price?.usd,
        "priceCurrency": metadata.price?.currency || "USD"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  // Check if section should be rendered
  function shouldRender(sectionData) {
    return sectionData && sectionData.enabled === true;
  }
</script>

<main class="app">
  {#if loading}
    <Loading />
  {:else if error}
    <div class="error-container">
      <div class="glass-card p-xl text-center">
        <h2>Failed to Load</h2>
        <p>Error: {error}</p>
        <button 
          class="glass-button mt-md" 
          on:click={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  {:else}
    <!-- Hero Section -->
    {#if shouldRender(gameData.metadata)}
      <Hero 
        metadata={gameData.metadata} 
        storeLinks={gameData.storeLinks}
        media={gameData.media}
      />
    {/if}

    <!-- Game Information -->
    {#if shouldRender(gameData.metadata)}
      <GameInfo metadata={gameData.metadata} />
    {/if}

    <!-- Features -->
    {#if shouldRender(gameData.features)}
      <Features features={gameData.features} />
    {/if}

    <!-- Screenshots -->
    {#if shouldRender(gameData.media)}
      <Screenshots media={gameData.media} />
    {/if}

    <!-- Videos -->
    {#if shouldRender(gameData.media)}
      <Videos media={gameData.media} />
    {/if}

    <!-- System Requirements -->
    {#if shouldRender(gameData.systemRequirements)}
      <Requirements requirements={gameData.systemRequirements} />
    {/if}

    <!-- Reviews & Awards -->
    {#if shouldRender(gameData.reviews)}
      <Reviews reviews={gameData.reviews} />
    {/if}

    <!-- Development Team -->
    {#if shouldRender(gameData.team)}
      <Team team={gameData.team} />
    {/if}

    <!-- Achievements -->
    {#if shouldRender(gameData.achievements)}
      <Achievements achievements={gameData.achievements} />
    {/if}

    <!-- Platforms -->
    {#if shouldRender(gameData.platforms)}
      <Platforms platforms={gameData.platforms} />
    {/if}

    <!-- Languages -->
    {#if shouldRender(gameData.languages)}
      <Languages languages={gameData.languages} />
    {/if}

    <!-- Updates -->
    {#if shouldRender(gameData.updates)}
      <Updates updates={gameData.updates} />
    {/if}

    <!-- Social -->
    {#if shouldRender(gameData.social)}
      <Social social={gameData.social} />
    {/if}

    <!-- Press Kit -->
    {#if shouldRender(gameData.pressKit)}
      <PressKit pressKit={gameData.pressKit} />
    {/if}

    <!-- Store Links -->
    {#if shouldRender(gameData.storeLinks)}
      <StoreLinks storeLinks={gameData.storeLinks} />
    {/if}

    <!-- Comments -->
    {#if gameData.config?.features?.comments}
      <!-- <Comments /> -->
       <!-- DISABLED DUE TO BUG -->
    {/if}

    <!-- Footer -->
    <Footer
      metadata={gameData.metadata}
      social={gameData.social}
      config={gameData.config}
    />
  {/if}
</main>

<style>
  .app {
    min-height: 100vh;
    background: var(--background-color);
    position: relative;
    overflow-x: hidden;
  }

  .app::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: var(--spacing-md);
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: var(--font-family-base);
    background-color: var(--background-color);
    color: var(--text-primary);
    line-height: 1.6;
  }

  /* Ensure sections have proper spacing */
  :global(.section) {
    position: relative;
    z-index: 1;
  }

  /* Add subtle animations for section entries */
  :global(.section) {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInSection 0.8s ease-out forwards;
  }

  @keyframes fadeInSection {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Stagger animation delays for sections */
  :global(.section:nth-child(1)) { animation-delay: 0.1s; }
  :global(.section:nth-child(2)) { animation-delay: 0.2s; }
  :global(.section:nth-child(3)) { animation-delay: 0.3s; }
  :global(.section:nth-child(4)) { animation-delay: 0.4s; }
  :global(.section:nth-child(5)) { animation-delay: 0.5s; }
  :global(.section:nth-child(6)) { animation-delay: 0.6s; }
  :global(.section:nth-child(7)) { animation-delay: 0.7s; }
  :global(.section:nth-child(8)) { animation-delay: 0.8s; }
  :global(.section:nth-child(9)) { animation-delay: 0.9s; }
  :global(.section:nth-child(10)) { animation-delay: 1.0s; }
</style>