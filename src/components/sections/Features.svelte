<script>
  import { t } from '../../i18n/index.js';
  
  export let features = {};
</script>

<section class="features section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.features')}</h2>
    
    {#if features.mainFeatures}
      <div class="main-features">
        <div class="features-grid">
          {#each features.mainFeatures as feature}
            <div class="feature-card glass-card hover-lift">
              {#if feature.icon}
                <div class="feature-icon">
                  <img src={feature.icon} alt={feature.title} />
                </div>
              {/if}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if features.gameplayFeatures}
      <div class="gameplay-features">
        <h3 class="subsection-title">{$t('features.gameplayFeatures')}</h3>
        <div class="gameplay-grid">
          {#each features.gameplayFeatures as category}
            <div class="gameplay-category glass-card">
              <h4>{category.category}</h4>
              <ul class="feature-list">
                {#each category.features as feature}
                  <li>{feature}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if features.technicalFeatures}
      <div class="technical-features">
        <h3 class="subsection-title">{$t('features.technicalFeatures')}</h3>
        <div class="technical-grid">
          {#each features.technicalFeatures as feature}
            <div class="technical-item glass-card hover-lift">
              <span class="tech-icon">✓</span>
              <span>{feature}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .features {
    padding: var(--spacing-3xl) 0;
  }

  .section-title {
    margin-bottom: var(--spacing-3xl);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
  }

  .feature-card {
    padding: var(--spacing-xl);
    text-align: center;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto var(--spacing-lg);
    opacity: 0.8;
  }

  .feature-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .feature-card h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
  }

  .gameplay-features,
  .technical-features {
    margin-top: var(--spacing-3xl);
  }

  .subsection-title {
    text-align: center;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-2xl);
    font-size: var(--font-size-2xl);
  }

  .gameplay-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .gameplay-category {
    padding: var(--spacing-lg);
  }

  .gameplay-category h4 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
    text-align: center;
  }

  .feature-list {
    list-style: none;
    padding: 0;
  }

  .feature-list li {
    padding: var(--spacing-sm) 0;
    position: relative;
    padding-left: var(--spacing-lg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .feature-list li:last-child {
    border-bottom: none;
  }

  .feature-list li::before {
    content: '▶';
    color: var(--accent-color);
    position: absolute;
    left: 0;
    font-size: var(--font-size-sm);
  }

  .technical-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-md);
  }

  .technical-item {
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.2);
  }

  .tech-icon {
    color: var(--accent-color);
    font-weight: bold;
    font-size: var(--font-size-lg);
  }

  @media (max-width: 768px) {
    .gameplay-grid,
    .technical-grid {
      grid-template-columns: 1fr;
    }
  }
</style>