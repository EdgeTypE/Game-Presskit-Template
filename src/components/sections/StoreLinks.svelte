<script>
  import { t } from '../../i18n/index.js';
  
  export let storeLinks = {};
</script>

<section class="store-links section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">Get the Game</h2>
    
    {#if storeLinks.stores}
      <div class="stores-grid">
        {#each storeLinks.stores as store}
          <a 
            href={store.url} 
            class="store-card glass-card hover-lift {store.primaryButton ? 'primary' : ''}"
            target="_blank"
            rel="noopener noreferrer"
          >
            {#if store.icon}
              <div class="store-icon">
                <img src={store.icon} alt={store.name} />
              </div>
            {/if}
            <div class="store-info">
              <h3>{store.name}</h3>
              <div class="store-price">{store.price}</div>
              {#if !store.available}
                <span class="coming-soon">Coming Soon</span>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .store-links {
    padding: var(--spacing-3xl) 0;
  }

  .stores-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .store-card {
    padding: var(--spacing-xl);
    text-decoration: none;
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    transition: all var(--transition-normal);
  }

  .store-card.primary {
    border: 2px solid var(--primary-color);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  }

  .store-icon {
    width: 80px;
    height: 80px;
    margin-bottom: var(--spacing-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .store-icon img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .store-info h3 {
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-xl);
  }

  .store-price {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--primary-color);
  }

  .coming-soon {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    background: var(--accent-color);
    color: white;
    font-size: var(--font-size-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-weight: 600;
    text-transform: uppercase;
  }

  .store-card:hover {
    transform: translateY(-4px);
  }
</style>