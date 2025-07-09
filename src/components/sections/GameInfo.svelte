<script>
  import { t } from '../../i18n/index.js';
  
  export let metadata = {};
</script>

<section class="game-info section">
  <div class="container">
    <div class="game-info-content glass-panel">
      <div class="info-grid">
        <div class="description">
          <h2>{$t('sections.overview')}</h2>
          <p class="long-description">{metadata.longDescription}</p>
          
          {#if metadata.genre?.length > 0}
            <div class="genre-tags">
              {#each metadata.genre as genre}
                <span class="genre-tag glass-card">{genre}</span>
              {/each}
            </div>
          {/if}
        </div>
        
        <div class="quick-facts">
          <h3>Quick Facts</h3>
          <div class="facts-list">
            {#if metadata.developer}
              <div class="fact">
                <span class="fact-label">Developer</span>
                <span class="fact-value">{metadata.developer}</span>
              </div>
            {/if}
            
            {#if metadata.publisher}
              <div class="fact">
                <span class="fact-label">Publisher</span>
                <span class="fact-value">{metadata.publisher}</span>
              </div>
            {/if}
            
            {#if metadata.releaseDate}
              <div class="fact">
                <span class="fact-label">Release Date</span>
                <span class="fact-value">{new Date(metadata.releaseDate).toLocaleDateString()}</span>
              </div>
            {/if}
            
            {#if metadata.price}
              <div class="fact">
                <span class="fact-label">Price</span>
                <span class="fact-value">${metadata.price.usd}</span>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .game-info {
    padding: var(--spacing-3xl) 0;
  }

  .game-info-content {
    padding: var(--spacing-2xl);
  }

  .info-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--spacing-3xl);
    align-items: start;
  }

  .description h2 {
    margin-bottom: var(--spacing-lg);
  }

  .long-description {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    margin-bottom: var(--spacing-xl);
  }

  .genre-tags {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .genre-tag {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
    border-radius: var(--radius-md);
    background: rgba(99, 102, 241, 0.2);
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  .quick-facts h3 {
    margin-bottom: var(--spacing-lg);
    color: var(--primary-color);
  }

  .facts-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .fact {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid var(--border-color);
  }

  .fact-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .fact-value {
    color: var(--text-primary);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .info-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
  }
</style>