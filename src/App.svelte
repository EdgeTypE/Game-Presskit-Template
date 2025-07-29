<script>
  import { onMount } from 'svelte';
  import { router } from './utils/router.js';
  import { blogPosts } from './data/blogPosts.js';
  import { languageManager } from './utils/languageManager.js';
  
  // CV Components
  import CVHero from './components/sections/CVHero.svelte';
  import Projects from './components/sections/Projects.svelte';
  import Footer from './components/sections/Footer.svelte';
  import Loading from './components/ui/Loading.svelte';
  import BlogPage from './components/pages/BlogPage.svelte';
  import BlogPostPage from './components/pages/BlogPostPage.svelte';

  // State
  let loading = true;
  let error = null;
  let currentRoute = '/';
  let currentPost = null;
  let currentLanguage = languageManager.getCurrentLanguage();

  // let cs16 = false;

  // Initialize app
  onMount(async () => {
    try {
      // CV sitesi için basit başlatma
      updatePageMeta();
      
      // Router setup
      router.onRouteChange = handleRouteChange;
      handleRouteChange(router.getCurrentRoute());
      
      // Dil değişikliği callback'i
      languageManager.addLanguageChangeListener(handleLanguageChange);
      
      loading = false;
    } catch (err) {
      console.error('Failed to initialize app:', err);
      error = err.message;
      loading = false;
    }
  });
  
  // Reactive dil değişkeni
  $: currentLanguage = languageManager.getCurrentLanguage();

  // Blog postlarını seçili dile göre reaktif çevir
  $: translatedBlogPosts = blogPosts.map(translatePost);

  // Dil değişikliği işleme
  function handleLanguageChange(lang) {
    currentLanguage = lang;
    // Sayfa meta verilerini güncelle
    updatePageMeta();
  }

  // Route değişikliği işleme
  function handleRouteChange(path) {
    currentRoute = path;
    currentPost = null;
    
    // Blog post route kontrolü
    if (path.startsWith('/blog/')) {
      const postId = path.substring(6); // '/blog/' sonrası
      currentPost = blogPosts.find(post => post.id === postId);
    }
    
    // Sayfa başlığını güncelle
    updatePageTitle();
  }

  // Sayfa başlığını güncelle
  function updatePageTitle() {
    if (currentRoute === '/') {
      document.title = 'Çağrı Dürü - Game Designer & Developer';
    } else if (currentRoute === '/blog') {
      document.title = 'Blog - Çağrı Dürü';
    } else if (currentRoute.startsWith('/blog/') && currentPost) {
      document.title = `${currentPost.title} - Çağrı Dürü`;
    } else {
      document.title = 'Çağrı Dürü - Game Designer & Developer';
    }
  }

  // Update page metadata for CV site
  function updatePageMeta() {
    document.title = 'Çağrı Dürü - Game Designer & Developer';
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Çağrı Dürü - Game Designer, Unreal Engine Developer. CV, projeler ve blog yazıları.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Çağrı Dürü - Game Designer, Unreal Engine Developer. CV, projeler ve blog yazıları.';
      document.head.appendChild(meta);
    }
    
    // Update OG tags
    updateOrCreateMetaTag('property', 'og:title', 'Çağrı Dürü - Game Designer & Developer');
    updateOrCreateMetaTag('property', 'og:description', 'Game Designer ve Developer. Unreal Engine uzmanı.');
    updateOrCreateMetaTag('property', 'og:type', 'website');
    updateOrCreateMetaTag('property', 'og:url', window.location.href);
    
    // Update Twitter tags
    updateOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMetaTag('name', 'twitter:title', 'Çağrı Dürü - Game Designer & Developer');
    updateOrCreateMetaTag('name', 'twitter:description', 'Game Designer ve Developer. Unreal Engine uzmanı.');
    updateOrCreateMetaTag('name', 'twitter:creator', '@edgetype');
    
    // Add JSON-LD structured data for personal website
    addJsonLd();
  }

  function updateOrCreateMetaTag(attribute, value, content) {
    let tag = document.querySelector(`meta[${attribute}="${value}"]`);
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, value);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    }
  }

  // Add JSON-LD structured data for CV site
  function addJsonLd() {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Çağrı Dürü",
      "alternateName": "EdgeTypE",
      "jobTitle": "Game Designer & Developer",
      "description": "Game Designer ve Unreal Engine Developer",
      "birthDate": "2005-03-29",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Ege Üniversitesi",
        "department": "Bilgisayar Programcılığı"
      },
      "knowsAbout": [
        "Game Design",
        "Unreal Engine",
        "C#",
        "C++", 
        "JavaScript",
        "Node.js",
        "Svelte"
      ],
      "sameAs": [
        "https://github.com/edgetype",
        "https://youtube.com/@edgetype",
        "https://twitter.com/edgetype"
      ],
      "url": window.location.origin
    };

    // Remove existing JSON-LD if present
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  // Navigation handler
  function handleNavigation(event) {
    if (event.target.matches('a[href^="/blog"]')) {
      // Blog navigation - could be handled by SvelteKit router
      return;
    }
  }
  
  // Blog yazısını çevir
  function translatePost(post) {
    return languageManager.translatePost(post);
  }
  
  // Tarih formatlama fonksiyonu
  function formatDate(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    // Dil bazlı tarih formatlaması
    if (currentLanguage === 'tr') {
      return date.toLocaleDateString('tr-TR', options);
    } else {
      return date.toLocaleDateString('en-US', options);
    }
  }
</script>

<svelte:head>
  <title>Çağrı Dürü - Game Designer & Developer</title>
  <meta name="description" content="Çağrı Dürü - Game Designer, Unreal Engine Developer. CV, projeler ve blog yazıları." />
  <meta name="keywords" content="Game Designer, Unreal Engine, C#, C++, JavaScript, Svelte, EdgeTypE" />
  <meta name="author" content="Çağrı Dürü" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Çağrı Dürü - Game Designer & Developer" />
  <meta property="og:description" content="Game Designer ve Developer. Unreal Engine uzmanı." />
  <meta property="og:type" content="website" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="@edgetype" />
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" />
</svelte:head>

<main class="app">
  {#if loading}
    <Loading />
  {:else if error}
    <div class="error-container">
      <div class="glass-card p-xl text-center">
        <h2>Yükleme Hatası</h2>
        <p>Hata: {error}</p>
        <button
          class="glass-button mt-md"
          on:click={() => window.location.reload()}
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  {:else}
    <!-- Navigation -->
    <nav class="main-nav">
      <div class="container">
        <div class="nav-content">
          <a href="/" class="nav-logo" on:click|preventDefault={() => router.navigate('/')}>
            <span class="logo-text gradient-text">ÇD</span>
          </a>
          
          <div class="nav-links">            
            {#if currentLanguage === 'tr'}
                          {#if currentRoute === '/'}
              <a href="#hero" class="nav-link">Ana Sayfa</a>
              <a href="#projects" class="nav-link">Projeler</a>
              <a href="#blog" class="nav-link">Blog</a>
            {:else}
              <a href="/" class="nav-link" on:click|preventDefault={() => router.navigate('/')}>Ana Sayfa</a>
              <a href="/blog" class="nav-link" on:click|preventDefault={() => router.navigate('/blog')}>Blog</a>
            {/if}
            <a href="https://github.com/edgetype" target="_blank" rel="noopener noreferrer" class="nav-link">
              GitHub
            </a>
            {:else}
                          {#if currentRoute === '/'}
              <a href="#hero" class="nav-link">Home</a>
              <a href="#projects" class="nav-link">Projects</a>
              <a href="#blog" class="nav-link">Blog</a>
            {:else}
              <a href="/" class="nav-link" on:click|preventDefault={() => router.navigate('/')}>Home</a>
              <a href="/blog" class="nav-link" on:click|preventDefault={() => router.navigate('/blog')}>Blog</a>
            {/if}
            <a href="https://github.com/edgetype" target="_blank" rel="noopener noreferrer" class="nav-link">
              GitHub
            </a>
            {/if}

            
            <!-- Dil Seçimi Dropdown -->
            <div class="language-selector">
              <select
                class="language-select"
                value={currentLanguage}
                on:change={(e) => languageManager.setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>

    {#if currentRoute === '/'}
      <!-- Hero Section -->
      <div id="hero">
        <CVHero />
      </div>

      <!-- Projects Section -->
      <div id="projects">
        <Projects />
      </div>

      <!-- Blog Section -->
      <div id="blog">
        <section class="blog-section section">
          <div class="container">
            <div class="section-header text-center">
              <h2 class="gradient-text">
                {#if currentLanguage === 'tr'}
                  Blog
                {:else}
                  Blog
                {/if}
              </h2>
              <p>
                {#if currentLanguage === 'tr'}
                  Son yazılarım
                {:else}
                  My latest posts
                {/if}
              </p>
            </div>
            
            <div class="posts-grid">
              {#each translatedBlogPosts.slice(0, 3) as translatedPost}
                <article class="post-card glass" on:click|preventDefault={() => router.navigate(`/blog/${translatedPost.id}`)}>
                  <div class="post-image">
                    <img src={translatedPost.image} alt={translatedPost.alt} />
                    <div class="post-date">
                      {formatDate(translatedPost.created)}
                    </div>
                  </div>
                  
                  <div class="post-content">
                    <div class="post-tags">
                      {#each translatedPost.tags.slice(0, 2) as tag}
                        <span class="tag">{tag}</span>
                      {/each}
                    </div>
                    
                    <h3 class="post-title">{translatedPost.title}</h3>
                    
                    <p class="post-excerpt">{translatedPost.excerpt}</p>
                    
                    <div class="post-meta">
                      <span>
                        {#if currentLanguage === 'tr'}
                          Güncelleme: {formatDate(translatedPost.updated)}
                        {:else}
                          Updated: {formatDate(translatedPost.updated)}
                        {/if}
                      </span>
                      <span class="read-more">
                        {#if currentLanguage === 'tr'}
                          Devamını Oku →
                        {:else}
                          Read More →
                        {/if}
                      </span>
                    </div>
                  </div>
                </article>
              {/each}
            </div>
            
            <div class="view-all text-center">
              <button class="glass-button" on:click|preventDefault={() => router.navigate('/blog')}>
                {#if currentLanguage === 'tr'}
                  Tüm Blog Yazılarını Görüntüle
                {:else}
                  View All Blog Posts
                {/if}
              </button>
            </div>
          </div>
        </section>
      </div>
    {:else if currentRoute === '/blog'}
      <BlogPage posts={blogPosts} />
    {:else if currentRoute.startsWith('/blog/') && currentPost}
      <BlogPostPage post={currentPost} />
    {:else}
      <!-- 404 Page -->
      <div class="error-page">
        <div class="container">
          <div class="error-content glass text-center">
            <h2>Sayfa Bulunamadı</h2>
            <p>Aradığınız sayfa mevcut değil.</p>
            <button class="glass-button" on:click={() => router.navigate('/')}>
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- Footer -->
    <Footer />


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

  .main-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--glass-border);
    padding: var(--spacing-md) 0;
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    text-decoration: none;
  }

  .logo-text {
    font-size: var(--font-size-2xl);
    font-weight: bold;
    font-family: var(--font-family-heading);
  }

  .nav-links {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--transition-fast);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
  }

  .nav-link:hover {
    color: var(--primary-color);
    background: var(--glass-bg);
  }

  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: var(--spacing-md);
  }

  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }

  .glass-button {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-lg);
    color: var(--text-primary);
    cursor: pointer;
    transition: all var(--transition-normal);
    font-family: inherit;
    font-size: var(--font-size-base);
  }

  .glass-button:hover {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  /* Ana sayfa blog section stilleri */
  #blog .blog-section {
    padding: var(--spacing-3xl) 0;
  }
  
  #blog .section-header {
    margin-bottom: var(--spacing-3xl);
  }
  
  #blog .section-header h2 {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-5xl);
  }
  
  #blog .section-header p {
    font-size: var(--font-size-xl);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
  
  #blog .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--spacing-xl);
  }
  
  #blog .post-card {
    cursor: pointer;
    overflow: hidden;
    transition: all var(--transition-normal);
    height: fit-content;
  }
  
  #blog .post-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
  
  #blog .post-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  #blog .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
  
  #blog .post-card:hover .post-image img {
    transform: scale(1.05);
  }
  
  #blog .post-date {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--glass-bg);
    backdrop-filter: blur(8px);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: var(--text-primary);
    border: 1px solid var(--glass-border);
  }
  
  #blog .post-content {
    padding: var(--spacing-xl);
  }
  
  #blog .post-tags {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
  }
  
  #blog .tag {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }
  
  #blog .post-title {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-xl);
    color: var(--text-primary);
  }
  
  #blog .post-excerpt {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
  }
  
  #blog .post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--border-color);
    font-size: var(--font-size-sm);
  }
  
  #blog .post-meta span:first-child {
    color: var(--text-muted);
  }
  
  #blog .read-more {
    color: var(--primary-color);
    font-weight: 600;
  }
  
  #blog .view-all {
    margin-top: var(--spacing-2xl);
  }
  
  #blog .glass-button {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-md) var(--spacing-xl);
    color: var(--text-primary);
    cursor: pointer;
    transition: all var(--transition-normal);
    font-family: inherit;
    font-size: var(--font-size-base);
    text-decoration: none;
    display: inline-block;
  }
  
  #blog .glass-button:hover {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  /* Dil seçimi stilleri */
  .language-selector {
    position: relative;
  }
  
  .language-select {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--text-primary);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  
  .language-select:hover {
    background: var(--surface-color);
    transform: translateY(-1px);
  }
  
  .language-select:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  
  /* Ensure sections have proper spacing for fixed nav */
  :global(.section:first-of-type) {
    padding-top: calc(var(--spacing-3xl) + 60px);
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
  :global(.section:nth-child(2)) { animation-delay: 0.3s; }
  :global(.section:nth-child(3)) { animation-delay: 0.5s; }

  /* Responsive Design */
  @media (max-width: 768px) {
    .nav-links {
      gap: var(--spacing-sm);
    }
    
    .nav-link {
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: var(--font-size-sm);
    }

    .logo-text {
      font-size: var(--font-size-xl);
    }

    :global(.section:first-of-type) {
      padding-top: calc(var(--spacing-2xl) + 60px);
    }
  }

  /* Utility classes */
  :global(.p-xl) { padding: var(--spacing-xl); }
  :global(.mt-md) { margin-top: var(--spacing-md); }
  :global(.text-center) { text-align: center; }
</style>