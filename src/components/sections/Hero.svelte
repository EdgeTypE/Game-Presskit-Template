<script>
  import { onMount } from 'svelte';
  import { t } from '../../i18n/index.js';
  
  export let metadata = {};
  export let storeLinks = {};
  export let media = {};
  
  let videoElement;
  let isVideoPlaying = false;
  let heroRef;
  
  // Extract primary store link
  $: primaryStore = storeLinks?.stores?.find(store => store.primaryButton) || storeLinks?.stores?.[0];
  
  // Extract trailer video
  $: trailer = media?.videos?.find(video => video.featured) || media?.videos?.[0];
  
  onMount(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (heroRef) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroRef.style.transform = `translateY(${parallax}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  function playTrailer() {
    if (videoElement) {
      if (isVideoPlaying) {
        videoElement.pause();
        isVideoPlaying = false;
      } else {
        videoElement.play();
        isVideoPlaying = true;
      }
    }
  }
  
  function handleVideoEnd() {
    isVideoPlaying = false;
  }
</script>

<section class="hero" bind:this={heroRef}>
  <!-- Background Video/Image -->
  <div class="hero-background">
    {#if metadata.heroImage}
      <img 
        src={metadata.heroImage} 
        alt={metadata.gameName}
        class="hero-bg-image"
      />
    {/if}
    
    <!-- Video Overlay (if trailer exists) -->
    {#if trailer}
      <video
        bind:this={videoElement}
        class="hero-video {isVideoPlaying ? 'playing' : ''}"
        muted
        loop
        preload="metadata"
        on:ended={handleVideoEnd}
      >
        <source src={trailer.url} type="video/mp4">
      </video>
    {/if}
    
    <!-- Gradient Overlay -->
    <div class="hero-overlay"></div>
  </div>
  
  <!-- Content -->
  <div class="hero-content container">
    <div class="hero-main">
      <!-- Game Logo -->
    {#if metadata.logo}
      <div class="game-logo hover-lift">
        <img src={metadata.logo} alt={metadata.gameName} />
      </div>
    {/if}
      
      <!-- Game Title (fallback if no logo) -->
      {#if !metadata.logo}
        <h1 class="game-title gradient-text">{metadata.gameName}</h1>
      {/if}
      
      <!-- Tagline -->
      {#if metadata.tagline}
        <p class="tagline">{metadata.tagline}</p>
      {/if}
      
      <!-- Action Buttons -->
      <div class="hero-actions">
        {#if trailer}
          <button 
            class="btn-play glass-button btn-magnetic"
            on:click={playTrailer}
          >
            <span class="play-icon">
              {#if isVideoPlaying}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              {:else}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              {/if}
            </span>
            {$t('hero.playTrailer')}
          </button>
        {/if}
        
        {#if primaryStore}
          <a 
            href={primaryStore.url}
            class="btn-primary glass-button btn-magnetic hover-glow"
            target="_blank"
            rel="noopener noreferrer"
          >
            {$t('hero.getGame')} - {primaryStore.price}
          </a>
        {/if}
      </div>
      
      <!-- Store Icons -->
      {#if storeLinks?.stores?.length > 0}
        <div class="store-badges">
          <span class="store-label">{$t('hero.availableOn')}:</span>
          <div class="store-icons">
            {#each storeLinks.stores.slice(0, 4) as store}
              <a 
                href={store.url} 
                class="store-icon hover-lift"
                title={store.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {#if store.icon}
                  <img src={store.icon} alt={store.name} />
                {:else}
                  <span class="store-text">{store.name}</span>
                {/if}
                {#if !store.available}
                  <span class="coming-soon">{$t('hero.comingSoon')}</span>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Game Info Cards -->
    <div class="hero-info">
      <div class="info-cards">
        {#if metadata.genre}
          <div class="info-card glass-card hover-lift">
            <span class="info-label">Genre</span>
            <span class="info-value">{metadata.genre.join(', ')}</span>
          </div>
        {/if}
        
        {#if metadata.releaseDate}
          <div class="info-card glass-card hover-lift">
            <span class="info-label">Release Date</span>
            <span class="info-value">{new Date(metadata.releaseDate).toLocaleDateString()}</span>
          </div>
        {/if}
        
        {#if metadata.developer}
          <div class="info-card glass-card hover-lift">
            <span class="info-label">Developer</span>
            <span class="info-value">{metadata.developer}</span>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="scroll-indicator">
    <div class="scroll-arrow">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--background-color);
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .hero-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .hero-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity var(--transition-slow);
  }

  .hero-video.playing {
    opacity: 0.8;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--spacing-3xl);
    align-items: center;
  }

  .hero-main {
    text-align: center;
  }

  .game-logo {
    margin-bottom: var(--spacing-xl);
  }

  .game-logo img {
    max-width: 600px;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
  }

  .game-title {
    font-size: var(--font-size-5xl);
    margin-bottom: var(--spacing-lg);
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  }

  .tagline {
    font-size: var(--font-size-xl);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-2xl);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  }

  .hero-actions {
    display: flex;
    gap: var(--spacing-lg);
    justify-content: center;
    align-items: center;
    margin-bottom: var(--spacing-2xl);
    flex-wrap: wrap;
  }

  .btn-play,
  .btn-primary {
    padding: var(--spacing-lg) var(--spacing-2xl);
    font-size: var(--font-size-lg);
    font-weight: 600;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    text-decoration: none;
    transition: all var(--transition-normal);
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border: none;
  }

  .play-icon {
    display: flex;
    align-items: center;
  }

  .store-badges {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }

  .store-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .store-icons {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
    justify-content: center;
  }

  .store-icon {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    transition: all var(--transition-normal);
    text-decoration: none;
  }

  .store-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0.8);
    transition: filter var(--transition-normal);
  }

  .store-icon:hover img {
    filter: brightness(1);
  }

  .store-text {
    font-size: var(--font-size-xs);
    color: var(--text-primary);
    font-weight: 600;
  }

  .coming-soon {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--accent-color);
    color: white;
    font-size: 8px;
    padding: 2px 4px;
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .hero-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .info-cards {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .info-card {
    padding: var(--spacing-lg);
    text-align: center;
    min-width: 200px;
    backdrop-filter: blur(12px);
  }

  .info-label {
    display: block;
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--spacing-xs);
  }

  .info-value {
    display: block;
    font-size: var(--font-size-lg);
    color: var(--text-primary);
    font-weight: 600;
  }

  .scroll-indicator {
    position: absolute;
    bottom: var(--spacing-xl);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    animation: bounce 2s infinite;
  }

  .scroll-arrow {
    color: var(--text-secondary);
    opacity: 0.7;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .hero-content {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }
    
    .hero-info {
      order: -1;
    }
    
    .info-cards {
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 768px) {
    .hero {
      min-height: 90vh;
    }
    
    .game-logo img {
      max-width: 400px;
    }
    
    .game-title {
      font-size: var(--font-size-3xl);
    }
    
    .tagline {
      font-size: var(--font-size-lg);
    }
    
    .hero-actions {
      flex-direction: column;
      gap: var(--spacing-md);
    }
    
    .btn-play,
    .btn-primary {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
    
    .info-cards {
      flex-direction: column;
    }
    
    .info-card {
      min-width: auto;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .scroll-indicator {
      animation: none;
    }
    
    .hero-video {
      opacity: 0.3;
    }
  }
</style>