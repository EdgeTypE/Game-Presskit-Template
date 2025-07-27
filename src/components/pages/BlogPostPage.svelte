<script>
  import { router } from '../../utils/router.js';
  
  export let post = null;
  
  function goBack() {
    router.navigate('/blog');
  }
  
  function formatDate(date) {
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

{#if post}
  <div class="blog-post-page">
    <div class="container">
      <!-- Blog Post Header -->
      <header class="post-header">
        <button class="back-button glass" on:click|preventDefault={goBack}>
          ← Blog'a Dön
        </button>
        
        <h1 class="gradient-text">{post.title}</h1>
        
        <div class="post-meta-detail">
          <time datetime={post.created} class="post-date">
            {formatDate(post.created)}
          </time>
          
          <div class="post-tags">
            {#each post.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        
        <div class="featured-image">
          <img src={post.image} alt={post.alt} />
        </div>
      </header>

      <!-- Blog Post Content -->
      <div class="post-content-detail glass">
        {@html post.content}
      </div>

      <!-- Blog Post Footer -->
      <footer class="post-footer glass">
        <div class="post-navigation">
          <button class="nav-button" on:click|preventDefault={goBack}>
            ← Tüm Blog Yazıları
          </button>
        </div>
        
        <div class="post-share">
          <h4>Bu yazıyı paylaş:</h4>
          <div class="share-buttons">
            <a 
              href="https://twitter.com/intent/tweet?text={encodeURIComponent(post.title)}&url={encodeURIComponent(window.location.href)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="share-button twitter"
            >
              🐦 Twitter
            </a>
            <a 
              href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(window.location.href)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="share-button linkedin"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  </div>
{:else}
  <div class="error-page">
    <div class="container">
      <div class="error-content glass text-center">
        <h2>Blog yazısı bulunamadı</h2>
        <p>Aradığınız blog yazısı mevcut değil.</p>
        <button class="glass-button" on:click|preventDefault={goBack}>
          Blog'a Dön
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .blog-post-page {
    min-height: 100vh;
    padding: calc(var(--spacing-3xl) + 80px) 0 var(--spacing-3xl);
  }

  .post-header {
    margin-bottom: var(--spacing-3xl);
  }

  .back-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    background: var(--glass-bg);
    color: var(--primary-color);
    cursor: pointer;
    transition: all var(--transition-fast);
    margin-bottom: var(--spacing-xl);
    font-size: var(--font-size-base);
    border-radius: var(--radius-md);
  }

  .back-button:hover {
    color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .post-header h1 {
    font-size: var(--font-size-5xl);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .post-meta-detail {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
    flex-wrap: wrap;
  }

  .post-date {
    color: var(--text-secondary);
    font-size: var(--font-size-lg);
  }

  .post-tags {
    display: flex;
    gap: var(--spacing-sm);
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

  .featured-image {
    width: 100%;
    height: 300px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    margin: 0 auto;
    max-width: 800px;
  }

  .featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .post-content-detail {
    max-width: 800px;
    margin: 0 auto var(--spacing-3xl);
    padding: var(--spacing-3xl);
    line-height: 1.8;
  }

  .post-footer {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-2xl);
  }

  .post-navigation {
    margin-bottom: var(--spacing-2xl);
    padding-bottom: var(--spacing-xl);
    border-bottom: 1px solid var(--border-color);
  }

  .nav-button {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-md) var(--spacing-lg);
    color: var(--primary-color);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: var(--font-size-base);
  }

  .nav-button:hover {
    color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .post-share h4 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
  }

  .share-buttons {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }

  .share-button {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    transition: all var(--transition-fast);
  }

  .share-button:hover {
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-3xl) 0;
  }

  .error-content {
    padding: var(--spacing-3xl);
    max-width: 500px;
  }

  .error-content h2 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
  }

  .error-content p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
  }

  .glass-button {
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

  .glass-button:hover {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  /* Blog Content Styles */
  :global(.post-content-detail .blog-content .lead) {
    font-size: var(--font-size-xl);
    color: var(--text-primary);
    margin-bottom: var(--spacing-2xl);
    text-align: center;
    font-weight: 500;
  }

  :global(.post-content-detail .blog-content h2) {
    color: var(--primary-color);
    margin-top: var(--spacing-2xl);
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 2px solid var(--border-color);
  }

  :global(.post-content-detail .blog-content ul) {
    margin: var(--spacing-lg) 0;
    padding-left: var(--spacing-xl);
  }

  :global(.post-content-detail .blog-content li) {
    margin-bottom: var(--spacing-sm);
    color: var(--text-secondary);
  }

  :global(.post-content-detail .blog-content strong) {
    color: var(--text-primary);
  }

  :global(.post-content-detail .blog-content .code-block) {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-left: 4px solid var(--primary-color);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    margin: var(--spacing-xl) 0;
    overflow-x: auto;
  }

  :global(.post-content-detail .blog-content .code-block pre) {
    margin: 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: var(--font-size-sm);
    line-height: 1.4;
    color: var(--text-secondary);
  }

  :global(.post-content-detail .blog-content .social-links) {
    display: flex;
    gap: var(--spacing-md);
    margin: var(--spacing-lg) 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  :global(.post-content-detail .blog-content .social-link) {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
  }

  :global(.post-content-detail .blog-content .social-link:hover) {
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .post-header h1 {
      font-size: var(--font-size-3xl);
    }

    .post-meta-detail {
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .featured-image {
      height: 200px;
    }

    .post-content-detail {
      padding: var(--spacing-xl);
    }

    :global(.post-content-detail .blog-content .lead) {
      font-size: var(--font-size-lg);
    }

    .share-buttons {
      flex-direction: column;
    }
  }
</style>