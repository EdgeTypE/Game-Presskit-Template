<script>
  import { t } from '../../i18n/index.js';
  
  export let metadata = {};
  export let social = {};
  export let config = {};
  
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <!-- Game Info -->
      <div class="footer-section">
        <h3>{metadata.gameName || 'Game Name'}</h3>
        <p>{metadata.shortDescription}</p>
        {#if metadata.website}
          <a href={metadata.website} target="_blank" rel="noopener" class="link-underline">
            Official Website
          </a>
        {/if}
      </div>
      
      <!-- Social Links -->
      {#if social?.socialLinks}
        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-grid">
            {#each social.socialLinks.slice(0, 6) as link}
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener"
                class="social-link hover-lift"
                title={link.platform}
              >
                {#if link.icon}
                  <img src={link.icon} alt={link.platform} />
                {:else}
                  <span>{link.platform}</span>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      {/if}
      
      <!-- Developer Info -->
      <div class="footer-section">
        <h4>Developer</h4>
        <p>{metadata.developer}</p>
        {#if metadata.publisher && metadata.publisher !== metadata.developer}
          <p><strong>Publisher:</strong> {metadata.publisher}</p>
        {/if}
        <p class="copyright">© {currentYear} {metadata.developer}. All rights reserved.</p>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-links">
        <a href="#privacy" class="footer-link">Privacy Policy</a>
        <a href="#terms" class="footer-link">Terms of Service</a>
        <a href="#contact" class="footer-link">Contact</a>
      </div>
      
      <div class="footer-credits">
        <p>Made with <a href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a></p>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: var(--spacing-3xl) 0 var(--spacing-xl);
    margin-top: var(--spacing-3xl);
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-2xl);
    margin-bottom: var(--spacing-2xl);
  }

  .footer-section h3,
  .footer-section h4 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
  }

  .footer-section p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-sm);
  }

  .social-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
    gap: var(--spacing-sm);
    max-width: 240px;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-primary);
    transition: all var(--transition-normal);
  }

  .social-link:hover {
    background: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
  }

  .social-link img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .social-link span {
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .copyright {
    margin-top: var(--spacing-md);
    font-size: var(--font-size-sm);
    color: var(--text-muted);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--spacing-xl);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  .footer-links {
    display: flex;
    gap: var(--spacing-lg);
    flex-wrap: wrap;
  }

  .footer-link {
    color: var(--text-muted);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
  }

  .footer-link:hover {
    color: var(--primary-color);
  }

  .footer-credits {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .footer-credits a {
    color: var(--primary-color);
    text-decoration: none;
  }

  .footer-credits a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
    
    .footer-bottom {
      flex-direction: column;
      text-align: center;
      gap: var(--spacing-lg);
    }
    
    .footer-links {
      justify-content: center;
    }
    
    .social-grid {
      max-width: none;
      grid-template-columns: repeat(6, 1fr);
    }
  }
</style>