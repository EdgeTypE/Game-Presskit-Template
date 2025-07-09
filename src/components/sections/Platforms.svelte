<script>
  import { t } from '../../i18n/index.js';
  
  export let platforms = {};
</script>

<section class="platforms section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.platforms')}</h2>
    
    {#if platforms.supportedPlatforms}
      <div class="supported-platforms">
        <h3 class="subsection-title">{$t('platforms.supportedPlatforms')}</h3>
        <div class="platforms-grid">
          {#each platforms.supportedPlatforms as platform}
            <div class="platform-card glass-card hover-lift {platform.available ? 'available' : 'unavailable'}">
              {#if platform.icon}
                <div class="platform-icon">
                  <img src={platform.icon} alt={platform.name} />
                </div>
              {/if}
              
              <div class="platform-info">
                <h4 class="platform-name">{platform.name}</h4>
                
                {#if platform.minVersion}
                  <p class="platform-version">Min: {platform.minVersion}</p>
                {/if}
                
                {#if platform.architecture}
                  <div class="platform-arch">
                    {#each platform.architecture as arch}
                      <span class="arch-tag">{arch}</span>
                    {/each}
                  </div>
                {/if}
                
                {#if platform.verified}
                  <div class="platform-verified">
                    <span class="verified-badge">✓ Verified</span>
                  </div>
                {/if}
                
                {#if platform.performance}
                  <p class="platform-performance">Performance: {platform.performance}</p>
                {/if}
                
                {#if platform.notes}
                  <p class="platform-notes">{platform.notes}</p>
                {/if}
                
                {#if platform.distributions}
                  <div class="platform-distributions">
                    <span class="distro-label">Distributions:</span>
                    <div class="distro-tags">
                      {#each platform.distributions as distro}
                        <span class="distro-tag">{distro}</span>
                      {/each}
                    </div>
                  </div>
                {/if}
              </div>
              
              <div class="platform-status">
                {#if platform.available}
                  <span class="status-available">Available Now</span>
                {:else}
                  <span class="status-unavailable">Not Available</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if platforms.upcomingPlatforms}
      <div class="upcoming-platforms">
        <h3 class="subsection-title">{$t('platforms.upcomingPlatforms')}</h3>
        <div class="upcoming-grid">
          {#each platforms.upcomingPlatforms as platform}
            <div class="upcoming-card glass-card hover-lift">
              {#if platform.icon}
                <div class="upcoming-icon">
                  <img src={platform.icon} alt={platform.name} />
                </div>
              {/if}
              
              <div class="upcoming-info">
                <h4>{platform.name}</h4>
                {#if platform.releaseDate}
                  <p class="release-date">Expected: {platform.releaseDate}</p>
                {/if}
                <span class="development-status status-{platform.status?.toLowerCase().replace(' ', '-')}">{platform.status}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if platforms.controllerSupport}
      <div class="controller-support">
        <h3 class="subsection-title">{$t('platforms.controllerSupport')}</h3>
        <div class="controllers-grid">
          {#each platforms.controllerSupport as controller}
            <div class="controller-card glass-card">
              <div class="controller-header">
                <h4>{controller.type}</h4>
                {#if controller.nativeSupport}
                  <span class="native-support">Native Support</span>
                {/if}
              </div>
              
              {#if controller.features?.length > 0}
                <div class="controller-features">
                  <span class="features-label">Features:</span>
                  <ul class="features-list">
                    {#each controller.features as feature}
                      <li>{feature}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if platforms.accessibility}
      <div class="accessibility-features">
        <h3 class="subsection-title">{$t('platforms.accessibility')}</h3>
        <div class="accessibility-grid">
          {#each platforms.accessibility as feature}
            <div class="accessibility-item glass-card">
              <span class="accessibility-icon">♿</span>
              <span class="accessibility-text">{feature}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .platforms {
    padding: var(--spacing-3xl) 0;
  }

  .supported-platforms,
  .upcoming-platforms,
  .controller-support,
  .accessibility-features {
    margin-bottom: var(--spacing-3xl);
  }

  .subsection-title {
    text-align: center;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-2xl);
    font-size: var(--font-size-2xl);
  }

  .platforms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
  }

  .platform-card {
    padding: var(--spacing-xl);
    position: relative;
    min-height: 200px;
    display: flex;
    flex-direction: column;
  }

  .platform-card.available {
    border-left: 4px solid var(--primary-color);
  }

  .platform-card.unavailable {
    border-left: 4px solid var(--text-muted);
    opacity: 0.7;
  }

  .platform-icon {
    width: 60px;
    height: 60px;
    margin-bottom: var(--spacing-md);
  }

  .platform-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .platform-info {
    flex: 1;
  }

  .platform-name {
    color: var(--primary-color);
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-xl);
  }

  .platform-version {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-sm);
  }

  .platform-arch {
    display: flex;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .arch-tag {
    background: rgba(99, 102, 241, 0.2);
    color: var(--primary-color);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .platform-verified {
    margin-bottom: var(--spacing-sm);
  }

  .verified-badge {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .platform-performance {
    color: var(--accent-color);
    font-weight: 600;
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-sm);
  }

  .platform-notes {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    font-style: italic;
    margin-bottom: var(--spacing-sm);
  }

  .platform-distributions {
    margin-bottom: var(--spacing-sm);
  }

  .distro-label {
    color: var(--text-muted);
    font-size: var(--font-size-xs);
    display: block;
    margin-bottom: var(--spacing-xs);
  }

  .distro-tags {
    display: flex;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
  }

  .distro-tag {
    background: rgba(139, 92, 246, 0.2);
    color: var(--secondary-color);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
  }

  .platform-status {
    margin-top: auto;
    text-align: center;
  }

  .status-available {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-weight: 600;
  }

  .status-unavailable {
    background: rgba(107, 114, 128, 0.2);
    color: var(--text-muted);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-weight: 600;
  }

  .upcoming-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .upcoming-card {
    padding: var(--spacing-lg);
    text-align: center;
  }

  .upcoming-icon {
    width: 50px;
    height: 50px;
    margin: 0 auto var(--spacing-md);
  }

  .upcoming-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .upcoming-info h4 {
    margin-bottom: var(--spacing-sm);
    color: var(--text-primary);
  }

  .release-date {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-sm);
  }

  .development-status {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .status-in-development {
    background: rgba(249, 115, 22, 0.2);
    color: #f97316;
  }

  .status-planned {
    background: rgba(59, 130, 246, 0.2);
    color: #3b82f6;
  }

  .controllers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .controller-card {
    padding: var(--spacing-lg);
  }

  .controller-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .controller-header h4 {
    margin: 0;
    color: var(--primary-color);
  }

  .native-support {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .controller-features {
    margin-top: var(--spacing-md);
  }

  .features-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
    display: block;
    margin-bottom: var(--spacing-xs);
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .features-list li {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    padding: var(--spacing-xs) 0;
    position: relative;
    padding-left: var(--spacing-md);
  }

  .features-list li::before {
    content: '•';
    color: var(--accent-color);
    position: absolute;
    left: 0;
  }

  .accessibility-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-md);
  }

  .accessibility-item {
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .accessibility-icon {
    font-size: var(--font-size-xl);
  }

  .accessibility-text {
    color: var(--text-primary);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .platforms-grid,
    .upcoming-grid,
    .controllers-grid {
      grid-template-columns: 1fr;
    }
    
    .accessibility-grid {
      grid-template-columns: 1fr;
    }
    
    .controller-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }
  }
</style>