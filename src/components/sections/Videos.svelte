<script>
  import { t } from '../../i18n/index.js';
  
  export let media = {};
</script>

<section class="videos section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.videos')}</h2>
    
    {#if media.videos}
      <div class="videos-grid">
        {#each media.videos as video}
          <div class="video-item glass-card hover-lift">
            <div class="video-container">
              <video controls preload="metadata" poster={video.thumbnail}>
                <source src={video.url} type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="video-info">
              <h3>{video.title}</h3>
              {#if video.duration}
                <span class="duration">{video.duration}</span>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .videos {
    padding: var(--spacing-3xl) 0;
  }

  .videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--spacing-xl);
  }

  .video-item {
    padding: var(--spacing-lg);
  }

  .video-container {
    aspect-ratio: 16/9;
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: var(--spacing-md);
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .video-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .video-info h3 {
    margin: 0;
    font-size: var(--font-size-lg);
  }

  .duration {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  @media (max-width: 768px) {
    .videos-grid {
      grid-template-columns: 1fr;
    }
  }
</style>