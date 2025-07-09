<script>
  import { t } from '../../i18n/index.js';
  
  export let media = {};
  
  let selectedImage = null;
  
  function openModal(screenshot) {
    selectedImage = screenshot;
  }
  
  function closeModal() {
    selectedImage = null;
  }
</script>

<section class="screenshots section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.screenshots')}</h2>
    
    {#if media.screenshots}
      <div class="screenshots-grid">
        {#each media.screenshots as screenshot}
          <div class="screenshot-item hover-lift img-zoom" on:click={() => openModal(screenshot)}>
            <img 
              src={screenshot.thumbnail || screenshot.url} 
              alt={screenshot.caption || screenshot.alt}
              loading="lazy"
            />
            <div class="screenshot-overlay">
              <span class="view-text">View Full Size</span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  
  <!-- Modal -->
  {#if selectedImage}
    <div class="modal-overlay" on:click={closeModal}>
      <div class="modal-content glass-modal">
        <button class="modal-close" on:click={closeModal}>×</button>
        <img src={selectedImage.url} alt={selectedImage.alt} />
        {#if selectedImage.caption}
          <p class="image-caption">{selectedImage.caption}</p>
        {/if}
      </div>
    </div>
  {/if}
</section>

<style>
  .screenshots {
    padding: var(--spacing-3xl) 0;
  }

  .section-title {
    margin-bottom: var(--spacing-3xl);
  }

  .screenshots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .screenshot-item {
    position: relative;
    aspect-ratio: 16/9;
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    background: var(--surface-color);
  }

  .screenshot-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }

  .screenshot-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-normal);
  }

  .screenshot-item:hover .screenshot-overlay {
    opacity: 1;
  }

  .view-text {
    color: white;
    font-weight: 600;
    font-size: var(--font-size-lg);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-lg);
  }

  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    padding: var(--spacing-lg);
  }

  .modal-content img {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
    border-radius: var(--radius-lg);
  }

  .modal-close {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-caption {
    text-align: center;
    margin-top: var(--spacing-md);
    color: var(--text-secondary);
  }
</style>