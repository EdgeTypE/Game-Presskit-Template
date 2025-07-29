<script>
  import { router } from '../../utils/router.js';
  import { languageManager } from '../../utils/languageManager.js';
  
  export let posts = [];
  
  let currentLanguage = languageManager.getCurrentLanguage();
  
  // Dil değişikliği callback'i
  languageManager.addLanguageChangeListener((lang) => {
    currentLanguage = lang;
  });
  
  // Reactive dil değişkeni
  $: currentLanguage = languageManager.getCurrentLanguage();
  
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
  
  // Blog yazısını çevir
  function translatePost(post) {
    return languageManager.translatePost(post);
  }
  
  function openPost(postId) {
    router.navigate(`/blog/${postId}`);
  }
</script>

<div class="blog-page">
  <div class="container">
    <!-- Blog Header -->
    <div class="blog-header text-center">
      <h1 class="gradient-text">Blog</h1>
      <p class="blog-subtitle">Düşüncelerim, deneyimlerim ve keşiflerim</p>
    </div>

    <!-- Blog Posts Grid -->
    <div class="posts-grid">
      {#each posts as post}
        {@const translatedPost = translatePost(post)}
        <article class="post-card glass" on:click|preventDefault={() => openPost(post.id)}>
          <div class="post-image">
            <img src={translatedPost.image} alt={translatedPost.alt} />
            <div class="post-date">
              {formatDate(translatedPost.created)}
            </div>
          </div>
          
          <div class="post-content">
            <div class="post-tags">
              {#each translatedPost.tags as tag}
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
  </div>
</div>

<style>
  .blog-page {
    min-height: 100vh;
    padding: calc(var(--spacing-3xl) + 80px) 0 var(--spacing-3xl);
  }

  .blog-header {
    margin-bottom: var(--spacing-3xl);
  }

  .blog-header h1 {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-5xl);
  }

  .blog-subtitle {
    font-size: var(--font-size-xl);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--spacing-xl);
  }

  .post-card {
    cursor: pointer;
    overflow: hidden;
    transition: all var(--transition-normal);
    height: fit-content;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  .post-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  .post-card:hover .post-image img {
    transform: scale(1.05);
  }

  .post-date {
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

  .post-content {
    padding: var(--spacing-xl);
  }

  .post-tags {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
  }

  .tag {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .post-title {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-xl);
    color: var(--text-primary);
  }

  .post-excerpt {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
  }

  .post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--border-color);
    font-size: var(--font-size-sm);
  }

  .post-meta span:first-child {
    color: var(--text-muted);
  }

  .read-more {
    color: var(--primary-color);
    font-weight: 600;
  }

   /* class="blog-image" style="max-width: 100%; height: auto;" */


  /* Responsive Design */
  @media (max-width: 768px) {
    .blog-header h1 {
      font-size: var(--font-size-4xl);
    }

    .blog-subtitle {
      font-size: var(--font-size-lg);
    }

    .posts-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }

    .post-content {
      padding: var(--spacing-lg);
    }

    .post-meta {
      flex-direction: column;
      gap: var(--spacing-sm);
      align-items: flex-start;
    }
  }
</style>