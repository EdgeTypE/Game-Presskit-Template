<script>
  import { t } from '../../i18n/index.js';
  
  export let languages = {};
</script>

<section class="languages section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.languages')}</h2>
    
    {#if languages.supportedLanguages}
      <div class="supported-languages">
        <h3 class="subsection-title">{$t('languages.supportedLanguages')}</h3>
        <div class="languages-grid">
          {#each languages.supportedLanguages as language}
            <div class="language-card glass-card hover-lift">
              <div class="language-header">
                <span class="language-flag">{language.flag}</span>
                <div class="language-names">
                  <h4 class="language-name">{language.name}</h4>
                  <p class="language-native">{language.nativeName}</p>
                </div>
              </div>
              
              <div class="language-features">
                <div class="feature-item {language.fullAudio ? 'available' : 'unavailable'}">
                  <span class="feature-icon">{language.fullAudio ? '🔊' : '🔇'}</span>
                  <span class="feature-label">{$t('languages.fullAudio')}</span>
                  <span class="feature-status">{language.fullAudio ? '✓' : '✗'}</span>
                </div>
                
                <div class="feature-item {language.subtitles ? 'available' : 'unavailable'}">
                  <span class="feature-icon">{language.subtitles ? '💬' : '🚫'}</span>
                  <span class="feature-label">{$t('languages.subtitles')}</span>
                  <span class="feature-status">{language.subtitles ? '✓' : '✗'}</span>
                </div>
                
                <div class="feature-item {language.interface ? 'available' : 'unavailable'}">
                  <span class="feature-icon">{language.interface ? '🖥️' : '❌'}</span>
                  <span class="feature-label">{$t('languages.interface')}</span>
                  <span class="feature-status">{language.interface ? '✓' : '✗'}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if languages.localizationInfo}
      <div class="localization-info glass-panel">
        <h3>Localization Details</h3>
        <div class="localization-stats">
          <div class="stat-item">
            <span class="stat-icon">📝</span>
            <div class="stat-content">
              <span class="stat-label">Text Volume</span>
              <span class="stat-value">{languages.localizationInfo.textVolume}</span>
            </div>
          </div>
          
          {#if languages.localizationInfo.audioHours}
            <div class="stat-item">
              <span class="stat-icon">🎙️</span>
              <div class="stat-content">
                <span class="stat-label">Audio Hours</span>
                <span class="stat-value">{languages.localizationInfo.audioHours}</span>
              </div>
            </div>
          {/if}
          
          <div class="stat-item">
            <span class="stat-icon">📅</span>
            <div class="stat-content">
              <span class="stat-label">Last Updated</span>
              <span class="stat-value">{new Date(languages.localizationInfo.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div class="stat-item">
            <span class="stat-icon">⭐</span>
            <div class="stat-content">
              <span class="stat-label">Translation Quality</span>
              <span class="stat-value">{languages.localizationInfo.translationQuality}</span>
            </div>
          </div>
        </div>
      </div>
    {/if}

    {#if languages.communityTranslations?.enabled}
      <div class="community-translations">
        <h3 class="subsection-title">{$t('languages.communityTranslations')}</h3>
        <div class="community-info glass-panel">
          <div class="community-header">
            <div class="community-stats">
              <div class="community-stat">
                <span class="stat-number">{languages.communityTranslations.contributorCount}</span>
                <span class="stat-label">Contributors</span>
              </div>
              <div class="community-stat">
                <span class="stat-number">{languages.communityTranslations.languages?.length || 0}</span>
                <span class="stat-label">Community Languages</span>
              </div>
            </div>
            
            {#if languages.communityTranslations.url}
              <a 
                href={languages.communityTranslations.url} 
                target="_blank" 
                rel="noopener"
                class="community-link glass-button btn-magnetic"
              >
                Join Translation Team
              </a>
            {/if}
          </div>
          
          {#if languages.communityTranslations.languages}
            <div class="community-languages">
              <h4>Community Languages</h4>
              <div class="community-lang-grid">
                {#each languages.communityTranslations.languages as langCode}
                  <div class="community-lang-item">
                    <span class="lang-code">{langCode.toUpperCase()}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          
          <div class="community-platform">
            <span class="platform-label">Translation Platform:</span>
            <span class="platform-name">{languages.communityTranslations.platform}</span>
          </div>
        </div>
      </div>
    {/if}

    <!-- Language Statistics Summary -->
    {#if languages.supportedLanguages}
      <div class="language-summary">
        <h3 class="subsection-title">Language Support Summary</h3>
        <div class="summary-grid">
          <div class="summary-card glass-card">
            <span class="summary-icon">🌍</span>
            <div class="summary-content">
              <span class="summary-number">{languages.supportedLanguages.length}</span>
              <span class="summary-label">Total Languages</span>
            </div>
          </div>
          
          <div class="summary-card glass-card">
            <span class="summary-icon">🔊</span>
            <div class="summary-content">
              <span class="summary-number">{languages.supportedLanguages.filter(lang => lang.fullAudio).length}</span>
              <span class="summary-label">Full Audio</span>
            </div>
          </div>
          
          <div class="summary-card glass-card">
            <span class="summary-icon">💬</span>
            <div class="summary-content">
              <span class="summary-number">{languages.supportedLanguages.filter(lang => lang.subtitles).length}</span>
              <span class="summary-label">With Subtitles</span>
            </div>
          </div>
          
          <div class="summary-card glass-card">
            <span class="summary-icon">🖥️</span>
            <div class="summary-content">
              <span class="summary-number">{languages.supportedLanguages.filter(lang => lang.interface).length}</span>
              <span class="summary-label">UI Translated</span>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .languages {
    padding: var(--spacing-3xl) 0;
  }

  .supported-languages,
  .community-translations,
  .language-summary {
    margin-bottom: var(--spacing-3xl);
  }

  .subsection-title {
    text-align: center;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-2xl);
    font-size: var(--font-size-2xl);
  }

  .languages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .language-card {
    padding: var(--spacing-lg);
  }

  .language-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .language-flag {
    font-size: var(--font-size-2xl);
  }

  .language-names {
    flex: 1;
  }

  .language-name {
    margin: 0 0 var(--spacing-xs) 0;
    color: var(--primary-color);
    font-size: var(--font-size-lg);
  }

  .language-native {
    margin: 0;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    font-style: italic;
  }

  .language-features {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    transition: background var(--transition-fast);
  }

  .feature-item.available {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .feature-item.unavailable {
    background: rgba(107, 114, 128, 0.1);
    border: 1px solid rgba(107, 114, 128, 0.2);
  }

  .feature-icon {
    font-size: var(--font-size-lg);
  }

  .feature-label {
    flex: 1;
    color: var(--text-primary);
    font-weight: 500;
  }

  .feature-status {
    font-weight: bold;
  }

  .feature-item.available .feature-status {
    color: #22c55e;
  }

  .feature-item.unavailable .feature-status {
    color: var(--text-muted);
  }

  .localization-info {
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }

  .localization-info h3 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xl);
  }

  .localization-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .stat-icon {
    font-size: var(--font-size-xl);
  }

  .stat-content {
    display: flex;
    flex-direction: column;
  }

  .stat-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .stat-value {
    color: var(--text-primary);
    font-weight: 600;
  }

  .community-info {
    padding: var(--spacing-xl);
  }

  .community-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
    gap: var(--spacing-lg);
  }

  .community-stats {
    display: flex;
    gap: var(--spacing-xl);
  }

  .community-stat {
    text-align: center;
  }

  .community-stat .stat-number {
    display: block;
    font-size: var(--font-size-2xl);
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xs);
  }

  .community-stat .stat-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .community-link {
    padding: var(--spacing-md) var(--spacing-lg);
    text-decoration: none;
    font-weight: 600;
  }

  .community-languages {
    margin-bottom: var(--spacing-lg);
  }

  .community-languages h4 {
    color: var(--secondary-color);
    margin-bottom: var(--spacing-md);
  }

  .community-lang-grid {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .community-lang-item {
    background: rgba(139, 92, 246, 0.2);
    color: var(--secondary-color);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .community-platform {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .platform-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .platform-name {
    color: var(--primary-color);
    font-weight: 600;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
  }

  .summary-card {
    padding: var(--spacing-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    text-align: center;
  }

  .summary-icon {
    font-size: var(--font-size-2xl);
  }

  .summary-content {
    display: flex;
    flex-direction: column;
  }

  .summary-number {
    font-size: var(--font-size-2xl);
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xs);
  }

  .summary-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  @media (max-width: 768px) {
    .languages-grid {
      grid-template-columns: 1fr;
    }
    
    .localization-stats {
      grid-template-columns: 1fr;
    }
    
    .community-header {
      flex-direction: column;
      text-align: center;
    }
    
    .community-stats {
      justify-content: center;
    }
    
    .summary-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>