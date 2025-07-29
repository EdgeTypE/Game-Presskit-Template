<script>
  import { onMount } from 'svelte';
  import { languageManager } from '../../utils/languageManager.js';
  
  let currentLanguage = languageManager.getCurrentLanguage();
  let currentYear = new Date().getFullYear();
  
  // Dil değişikliği callback'i
  languageManager.addLanguageChangeListener((lang) => {
    currentLanguage = lang;
  });
  
  // Reactive dil değişkeni
  $: currentLanguage = languageManager.getCurrentLanguage();
  
  // Sosyal medya bağlantıları
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/edgetype', icon: '🐙' },
    { name: 'YouTube', url: 'https://youtube.com/@edgetype', icon: '📺' },
    { name: 'Twitter', url: 'https://twitter.com/edgetype', icon: '🐦' },
    { name: 'Steam', url: 'https://steamcommunity.com/id/EdgeTypE/', icon: '🎮' },
    // { name: 'Discord', url: 'https://discord.com/users/edgetype', icon: '💬' }
  ];
  
  // Çeviri fonksiyonu
  function t(key) {
    const translations = {
      'footer-title': {
        'en': 'Çağrı Dürü',
        'tr': 'Çağrı Dürü'
      },
      'footer-subtitle': {
        'en': 'Game Designer & Developer',
        'tr': 'Game Designer & Developer'
      },
      'footer-follow': {
        'en': 'Follow Me',
        'tr': 'Beni Takip Et'
      },
      'footer-rights': {
        'en': 'All rights reserved',
        'tr': 'Tüm hakları saklıdır'
      },
      'footer-made': {
        'en': 'Made with',
        'tr': 'yaptım şunun ilen:'
      }
    };
    
    if (translations[key] && translations[key][currentLanguage]) {
      return translations[key][currentLanguage];
    }
    
    return key;
  }
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <!-- Personal Info -->
      <div class="footer-section">
        <h3>{t('footer-title')}</h3>
        <p>{t('footer-subtitle')}</p>
        <p class="copyright">© {currentYear} Çağrı Dürü.</p>
                <!-- <p class="copyright">© {currentYear} Çağrı Dürü. {t('footer-rights')}.</p> -->

      </div>
      
      <!-- Social Links -->
      <div class="footer-section">
        <h4>{t('footer-follow')}</h4>
        <div class="social-grid">
          {#each socialLinks as link}
            <a
              href={link.url}
              target="_blank"
              rel="noopener"
              class="social-link hover-lift"
              title={link.name}
            >
              <span class="social-icon">{link.icon}</span>
              <span class="social-name">{link.name}</span>
            </a>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-credits">
        <p>{t('footer-made')} <a href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a></p>
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
  
  .social-name {
    display: none;
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