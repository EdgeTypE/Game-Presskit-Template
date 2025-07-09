<script>
  import { t } from '../../i18n/index.js';
  
  export let social = {};
  
  function formatFollowerCount(count) {
    if (typeof count === 'string') {
      return count;
    }
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }
</script>

<section class="social section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.social')}</h2>
    
    {#if social.socialLinks}
      <div class="social-platforms">
        <h3 class="subsection-title">{$t('social.followUs')}</h3>
        <div class="platforms-grid">
          {#each social.socialLinks as platform}
            <a 
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer"
              class="platform-card glass-card hover-lift"
            >
              <div class="platform-header">
                {#if platform.icon}
                  <div class="platform-icon">
                    <img src={platform.icon} alt={platform.platform} />
                  </div>
                {/if}
                <div class="platform-info">
                  <h4 class="platform-name">{platform.platform}</h4>
                  <p class="platform-handle">{platform.handle || platform.name}</p>
                </div>
              </div>
              
              <div class="platform-stats">
                {#if platform.followers}
                  <div class="stat-item">
                    <span class="stat-number">{formatFollowerCount(platform.followers)}</span>
                    <span class="stat-label">Followers</span>
                  </div>
                {:else if platform.members}
                  <div class="stat-item">
                    <span class="stat-number">{formatFollowerCount(platform.members)}</span>
                    <span class="stat-label">Members</span>
                  </div>
                {:else if platform.subscribers}
                  <div class="stat-item">
                    <span class="stat-number">{formatFollowerCount(platform.subscribers)}</span>
                    <span class="stat-label">Subscribers</span>
                  </div>
                {/if}
              </div>
              
              {#if platform.description}
                <p class="platform-description">{platform.description}</p>
              {/if}
            </a>
          {/each}
        </div>
      </div>
    {/if}

    {#if social.communityContent}
      <div class="community-content">
        <h3 class="subsection-title">{$t('social.fanContent')}</h3>
        
        {#if social.communityContent.fanArt?.enabled}
          <div class="content-section">
            <h4>Fan Art</h4>
            <div class="content-info">
              <p>Share your amazing fan art using <span class="highlight-hashtag">{social.communityContent.fanArt.hashtag}</span></p>
              
              {#if social.communityContent.fanArt.featured}
                <div class="featured-content">
                  <h5>Featured Fan Art</h5>
                  <div class="featured-grid">
                    {#each social.communityContent.fanArt.featured as artwork}
                      <div class="featured-item glass-card hover-lift">
                        <div class="featured-image">
                          <img src={artwork.image} alt={artwork.description} />
                        </div>
                        <div class="featured-info">
                          <p class="featured-artist">by <a href={artwork.url} target="_blank" rel="noopener">{artwork.artist}</a></p>
                          <p class="featured-description">{artwork.description}</p>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}

        {#if social.communityContent.screenshots?.enabled}
          <div class="content-section">
            <h4>Screenshots</h4>
            <div class="content-info">
              <p>Share your best in-game moments using <span class="highlight-hashtag">{social.communityContent.screenshots.hashtag}</span></p>
              {#if social.communityContent.screenshots.photoMode}
                <p class="feature-note">📸 Photo Mode available in-game for perfect shots!</p>
              {/if}
            </div>
          </div>
        {/if}

        {#if social.communityContent.videos?.enabled}
          <div class="content-section">
            <h4>Videos & Streaming</h4>
            <div class="content-info">
              <p>Create content using <span class="highlight-hashtag">{social.communityContent.videos.hashtag}</span></p>
              <div class="streaming-perms">
                {#if social.communityContent.videos.streamingAllowed}
                  <span class="perm-badge allowed">✓ Streaming Allowed</span>
                {/if}
                {#if social.communityContent.videos.monetizationAllowed}
                  <span class="perm-badge allowed">✓ Monetization Allowed</span>
                {/if}
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}

    {#if social.influencers}
      <div class="influencers-section">
        <h3 class="subsection-title">{$t('social.influencers')}</h3>
        <div class="influencers-grid">
          {#each social.influencers as influencer}
            <a 
              href={influencer.url} 
              target="_blank" 
              rel="noopener noreferrer"
              class="influencer-card glass-card hover-lift"
            >
              <div class="influencer-header">
                <h4 class="influencer-name">{influencer.name}</h4>
                <span class="influencer-platform">{influencer.platform}</span>
              </div>
              
              <div class="influencer-stats">
                {#if influencer.subscribers}
                  <span class="influencer-followers">{formatFollowerCount(influencer.subscribers)} subscribers</span>
                {:else if influencer.followers}
                  <span class="influencer-followers">{formatFollowerCount(influencer.followers)} followers</span>
                {/if}
              </div>
              
              <p class="influencer-coverage">{influencer.coverage}</p>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    {#if social.pressContact}
      <div class="press-contact glass-panel">
        <h3>{$t('social.pressContact')}</h3>
        <div class="contact-info">
          <div class="contact-item">
            <span class="contact-icon">✉️</span>
            <div class="contact-details">
              <span class="contact-label">Email</span>
              <a href="mailto:{social.pressContact.email}" class="contact-value">{social.pressContact.email}</a>
            </div>
          </div>
          
          {#if social.pressContact.mediaKit}
            <div class="contact-item">
              <span class="contact-icon">📁</span>
              <div class="contact-details">
                <span class="contact-label">Media Kit</span>
                <a href={social.pressContact.mediaKit} target="_blank" rel="noopener" class="contact-value">Download Press Kit</a>
              </div>
            </div>
          {/if}
          
          {#if social.pressContact.responseTime}
            <div class="contact-item">
              <span class="contact-icon">⏱️</span>
              <div class="contact-details">
                <span class="contact-label">Response Time</span>
                <span class="contact-value">{social.pressContact.responseTime}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .social {
    padding: var(--spacing-3xl) 0;
  }

  .social-platforms,
  .community-content,
  .influencers-section {
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
    text-decoration: none;
    color: var(--text-primary);
    display: block;
    transition: all var(--transition-normal);
  }

  .platform-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  .platform-icon {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
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
    margin: 0 0 var(--spacing-xs) 0;
    color: var(--primary-color);
    font-size: var(--font-size-lg);
  }

  .platform-handle {
    margin: 0;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    font-family: monospace;
  }

  .platform-stats {
    margin-bottom: var(--spacing-md);
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: var(--font-size-2xl);
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xs);
  }

  .stat-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .platform-description {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.5;
    margin: 0;
  }


  .content-section {
    margin-bottom: var(--spacing-2xl);
    padding: var(--spacing-xl);
    background: rgba(255, 255, 255, 0.02);
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .content-section h4 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .highlight-hashtag {
    background: rgba(99, 102, 241, 0.2);
    color: var(--primary-color);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-family: monospace;
    font-weight: 600;
  }

  .feature-note {
    color: var(--accent-color);
    font-style: italic;
    margin-top: var(--spacing-sm);
  }

  .featured-content {
    margin-top: var(--spacing-lg);
  }

  .featured-content h5 {
    color: var(--secondary-color);
    margin-bottom: var(--spacing-md);
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .featured-item {
    padding: var(--spacing-md);
  }

  .featured-image {
    aspect-ratio: 16/9;
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: var(--spacing-md);
  }

  .featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .featured-info {
    text-align: center;
  }

  .featured-artist {
    margin-bottom: var(--spacing-xs);
    font-size: var(--font-size-sm);
  }

  .featured-artist a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
  }

  .featured-artist a:hover {
    text-decoration: underline;
  }

  .featured-description {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
  }

  .streaming-perms {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
    flex-wrap: wrap;
  }

  .perm-badge {
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: 600;
  }

  .perm-badge.allowed {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  .influencers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .influencer-card {
    padding: var(--spacing-lg);
    text-decoration: none;
    color: var(--text-primary);
    display: block;
  }

  .influencer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .influencer-name {
    margin: 0;
    color: var(--primary-color);
    font-size: var(--font-size-lg);
  }

  .influencer-platform {
    background: rgba(139, 92, 246, 0.2);
    color: var(--secondary-color);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .influencer-stats {
    margin-bottom: var(--spacing-md);
  }

  .influencer-followers {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .influencer-coverage {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
  }

  .press-contact {
    padding: var(--spacing-xl);
  }

  .press-contact h3 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xl);
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .contact-icon {
    font-size: var(--font-size-xl);
  }

  .contact-details {
    display: flex;
    flex-direction: column;
  }

  .contact-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-xs);
  }

  .contact-value {
    color: var(--text-primary);
    font-weight: 500;
    text-decoration: none;
  }

  .contact-value:hover {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    .platforms-grid {
      grid-template-columns: 1fr;
    }
    
    
    .featured-grid {
      grid-template-columns: 1fr;
    }
    
    .influencers-grid {
      grid-template-columns: 1fr;
    }
    
    .streaming-perms {
      flex-direction: column;
    }
    
    .influencer-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }
  }
</style>