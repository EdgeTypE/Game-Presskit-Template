<script>
  import { t } from '../../i18n/index.js';
  
  export let pressKit = {};
</script>

<section class="presskit section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.pressKit')}</h2>
    
    {#if pressKit.downloadableAssets}
      <div class="assets-grid">
        {#each Object.entries(pressKit.downloadableAssets) as [category, assets]}
          <div class="asset-category glass-card">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="assets-list">
              {#each assets as asset}
                <a href={asset.url} class="asset-item hover-lift" download>
                  <span class="asset-name">{asset.name}</span>
                  <span class="asset-size">{asset.fileSize}</span>
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if pressKit.pressKitInfo}
      <div class="download-section">
        <a href={pressKit.pressKitInfo.downloadUrl} class="download-btn glass-button btn-magnetic">
          Download Complete Press Kit ({pressKit.pressKitInfo.size})
        </a>
      </div>
    {/if}
  </div>
</section>

<style>
  .presskit {
    padding: var(--spacing-3xl) 0;
  }

  .assets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }

  .asset-category {
    padding: var(--spacing-xl);
  }

  .asset-category h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .assets-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .asset-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-primary);
    transition: background var(--transition-fast);
  }

  .asset-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .asset-name {
    font-weight: 500;
  }

  .asset-size {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .download-section {
    text-align: center;
  }

  .download-btn {
    padding: var(--spacing-lg) var(--spacing-2xl);
    font-size: var(--font-size-lg);
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
  }
</style>