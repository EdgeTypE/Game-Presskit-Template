<script>
  import { t } from '../../i18n/index.js';
  
  export let updates = {};
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  function getUpdateTypeColor(type) {
    switch(type) {
      case 'major': return '#8b5cf6';
      case 'minor': return '#3b82f6';
      case 'patch': return '#22c55e';
      default: return '#6b7280';
    }
  }
</script>

<section class="updates section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.updates')}</h2>
    
    {#if updates.currentVersion}
      <div class="current-version glass-panel">
        <div class="version-info">
          <h3>{$t('updates.currentVersion')}</h3>
          <span class="version-number">{updates.currentVersion}</span>
        </div>
      </div>
    {/if}

    {#if updates.updates}
      <div class="updates-timeline">
        <h3 class="subsection-title">{$t('updates.releaseNotes')}</h3>
        <div class="timeline">
          {#each updates.updates as update}
            <div class="timeline-item">
              <div class="timeline-marker" style="background-color: {getUpdateTypeColor(update.type)}"></div>
              
              <div class="update-card glass-card">
                <div class="update-header">
                  <div class="update-meta">
                    <h4 class="update-title">{update.title}</h4>
                    <div class="update-badges">
                      <span class="version-badge">v{update.version}</span>
                      <span class="type-badge type-{update.type}" style="background-color: {getUpdateTypeColor(update.type)}20; color: {getUpdateTypeColor(update.type)}">
                        {update.type}
                      </span>
                    </div>
                  </div>
                  <div class="update-date">{formatDate(update.releaseDate)}</div>
                </div>
                
                {#if update.highlights}
                  <div class="update-highlights">
                    <h5>Highlights</h5>
                    <ul class="highlights-list">
                      {#each update.highlights as highlight}
                        <li>{highlight}</li>
                      {/each}
                    </ul>
                  </div>
                {/if}
                
                {#if update.changelog}
                  <div class="update-changelog">
                    <h5>{$t('updates.changelog')}</h5>
                    
                    {#if update.changelog.added}
                      <div class="changelog-section">
                        <h6 class="changelog-type added">{$t('updates.added')}</h6>
                        <ul class="changelog-list">
                          {#each update.changelog.added as item}
                            <li>{item}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                    
                    {#if update.changelog.improved}
                      <div class="changelog-section">
                        <h6 class="changelog-type improved">{$t('updates.improved')}</h6>
                        <ul class="changelog-list">
                          {#each update.changelog.improved as item}
                            <li>{item}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                    
                    {#if update.changelog.fixed}
                      <div class="changelog-section">
                        <h6 class="changelog-type fixed">{$t('updates.fixed')}</h6>
                        <ul class="changelog-list">
                          {#each update.changelog.fixed as item}
                            <li>{item}</li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  </div>
                {/if}
                
                {#if update.downloadSize}
                  <div class="update-footer">
                    <span class="download-size">Download Size: {update.downloadSize}</span>
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if updates.upcomingUpdates}
      <div class="upcoming-updates">
        <h3 class="subsection-title">{$t('updates.upcomingUpdates')}</h3>
        <div class="upcoming-grid">
          {#each updates.upcomingUpdates as update}
            <div class="upcoming-card glass-card hover-lift">
              <div class="upcoming-header">
                <h4>{update.title}</h4>
                <span class="upcoming-version">v{update.version}</span>
              </div>
              
              <p class="upcoming-description">{update.description}</p>
              
              {#if update.features}
                <div class="upcoming-features">
                  <h5>Planned Features</h5>
                  <ul class="upcoming-features-list">
                    {#each update.features as feature}
                      <li>{feature}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
              
              <div class="upcoming-footer">
                <span class="upcoming-release">Expected: {update.estimatedRelease}</span>
                <span class="upcoming-status status-{update.status?.toLowerCase().replace(' ', '-')}">{update.status}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if updates.roadmap}
      <div class="roadmap-section">
        <h3 class="subsection-title">{$t('updates.roadmap')}</h3>
        <div class="roadmap-grid">
          <div class="roadmap-card glass-card">
            <h4>Short Term</h4>
            <ul class="roadmap-list">
              {#each updates.roadmap.shortTerm as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
          
          <div class="roadmap-card glass-card">
            <h4>Long Term</h4>
            <ul class="roadmap-list">
              {#each updates.roadmap.longTerm as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    {/if}

    {#if updates.betaProgram?.enabled}
      <div class="beta-program glass-panel">
        <h3>{$t('updates.betaProgram')}</h3>
        <div class="beta-content">
          <div class="beta-info">
            <p>{updates.betaProgram.description}</p>
            
            {#if updates.betaProgram.requirements}
              <div class="beta-requirements">
                <h4>Requirements</h4>
                <ul class="requirements-list">
                  {#each updates.betaProgram.requirements as requirement}
                    <li>{requirement}</li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
          
          {#if updates.betaProgram.signupUrl}
            <div class="beta-action">
              <a href={updates.betaProgram.signupUrl} target="_blank" rel="noopener" class="beta-button glass-button btn-magnetic">
                Join Beta Program
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .updates {
    padding: var(--spacing-3xl) 0;
  }

  .current-version {
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
    text-align: center;
  }

  .version-info h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
  }

  .version-number {
    font-size: var(--font-size-3xl);
    font-weight: bold;
    color: var(--text-primary);
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .updates-timeline,
  .upcoming-updates,
  .roadmap-section {
    margin-bottom: var(--spacing-3xl);
  }

  .subsection-title {
    text-align: center;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-2xl);
    font-size: var(--font-size-2xl);
  }

  .timeline {
    position: relative;
    padding-left: var(--spacing-xl);
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
  }

  .timeline-item {
    position: relative;
    margin-bottom: var(--spacing-2xl);
  }

  .timeline-marker {
    position: absolute;
    left: -23px;
    top: var(--spacing-lg);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid var(--background-color);
    z-index: 1;
  }

  .update-card {
    padding: var(--spacing-xl);
    margin-left: var(--spacing-lg);
  }

  .update-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  .update-meta {
    flex: 1;
  }

  .update-title {
    margin-bottom: var(--spacing-sm);
    color: var(--primary-color);
    font-size: var(--font-size-xl);
  }

  .update-badges {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .version-badge,
  .type-badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .version-badge {
    background: rgba(99, 102, 241, 0.2);
    color: var(--primary-color);
  }

  .update-date {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
    white-space: nowrap;
  }

  .update-highlights {
    margin-bottom: var(--spacing-lg);
  }

  .update-highlights h5 {
    color: var(--secondary-color);
    margin-bottom: var(--spacing-md);
  }

  .highlights-list {
    list-style: none;
    padding: 0;
  }

  .highlights-list li {
    padding: var(--spacing-sm) 0;
    position: relative;
    padding-left: var(--spacing-lg);
    color: var(--text-primary);
    font-weight: 500;
  }

  .highlights-list li::before {
    content: '⭐';
    position: absolute;
    left: 0;
  }

  .update-changelog h5 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
  }

  .changelog-section {
    margin-bottom: var(--spacing-md);
  }

  .changelog-type {
    font-size: var(--font-size-sm);
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    display: inline-block;
  }

  .changelog-type.added {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }

  .changelog-type.improved {
    background: rgba(59, 130, 246, 0.2);
    color: #3b82f6;
  }

  .changelog-type.fixed {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }

  .changelog-list {
    list-style: none;
    padding: 0;
    margin-left: var(--spacing-md);
  }

  .changelog-list li {
    padding: var(--spacing-xs) 0;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    position: relative;
    padding-left: var(--spacing-lg);
  }

  .changelog-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--accent-color);
  }

  .update-footer {
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .download-size {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .upcoming-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-xl);
  }

  .upcoming-card {
    padding: var(--spacing-xl);
  }

  .upcoming-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .upcoming-header h4 {
    margin: 0;
    color: var(--primary-color);
  }

  .upcoming-version {
    background: rgba(139, 92, 246, 0.2);
    color: var(--secondary-color);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .upcoming-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
  }

  .upcoming-features h5 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
  }

  .upcoming-features-list {
    list-style: none;
    padding: 0;
    margin-bottom: var(--spacing-lg);
  }

  .upcoming-features-list li {
    padding: var(--spacing-sm) 0;
    color: var(--text-secondary);
    position: relative;
    padding-left: var(--spacing-lg);
  }

  .upcoming-features-list li::before {
    content: '🚀';
    position: absolute;
    left: 0;
  }

  .upcoming-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .upcoming-release {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .upcoming-status {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .status-in-development {
    background: rgba(249, 115, 22, 0.2);
    color: #f97316;
  }

  .roadmap-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
  }

  .roadmap-card {
    padding: var(--spacing-xl);
  }

  .roadmap-card h4 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .roadmap-list {
    list-style: none;
    padding: 0;
  }

  .roadmap-list li {
    padding: var(--spacing-md) 0;
    color: var(--text-secondary);
    position: relative;
    padding-left: var(--spacing-lg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .roadmap-list li:last-child {
    border-bottom: none;
  }

  .roadmap-list li::before {
    content: '📋';
    position: absolute;
    left: 0;
  }

  .beta-program {
    padding: var(--spacing-xl);
  }

  .beta-program h3 {
    text-align: center;
    color: var(--accent-color);
    margin-bottom: var(--spacing-lg);
  }

  .beta-content {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--spacing-xl);
    align-items: center;
  }

  .beta-requirements h4 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
  }

  .requirements-list {
    list-style: none;
    padding: 0;
  }

  .requirements-list li {
    padding: var(--spacing-sm) 0;
    color: var(--text-secondary);
    position: relative;
    padding-left: var(--spacing-lg);
  }

  .requirements-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent-color);
  }

  .beta-button {
    padding: var(--spacing-md) var(--spacing-xl);
    text-decoration: none;
    font-weight: 600;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .timeline {
      padding-left: var(--spacing-lg);
    }
    
    .update-card {
      margin-left: 0;
    }
    
    .update-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .upcoming-grid,
    .roadmap-grid {
      grid-template-columns: 1fr;
    }
    
    .beta-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
</style>