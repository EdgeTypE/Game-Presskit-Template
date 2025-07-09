<script>
  import { t } from '../../i18n/index.js';
  
  export let requirements = {};
</script>

<section class="requirements section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.systemRequirements')}</h2>
    
    <div class="requirements-grid">
      {#if requirements.minimum}
        <div class="requirement-card glass-card">
          <h3 class="req-title">{$t('requirements.minimum')}</h3>
          <div class="req-list">
            {#each Object.entries(requirements.minimum) as [key, value]}
              {#if key !== 'notes'}
                <div class="req-item">
                  <span class="req-label">{$t(`requirements.${key}`) || key}:</span>
                  <span class="req-value">{value}</span>
                </div>
              {/if}
            {/each}
            {#if requirements.minimum.notes}
              <div class="req-notes">{requirements.minimum.notes}</div>
            {/if}
          </div>
        </div>
      {/if}

      {#if requirements.recommended}
        <div class="requirement-card glass-card recommended">
          <h3 class="req-title">{$t('requirements.recommended')}</h3>
          <div class="req-list">
            {#each Object.entries(requirements.recommended) as [key, value]}
              {#if key !== 'notes'}
                <div class="req-item">
                  <span class="req-label">{$t(`requirements.${key}`) || key}:</span>
                  <span class="req-value">{value}</span>
                </div>
              {/if}
            {/each}
            {#if requirements.recommended.notes}
              <div class="req-notes">{requirements.recommended.notes}</div>
            {/if}
          </div>
        </div>
      {/if}

      {#if requirements.ultra}
        <div class="requirement-card glass-card ultra">
          <h3 class="req-title">{$t('requirements.ultra')}</h3>
          <div class="req-list">
            {#each Object.entries(requirements.ultra) as [key, value]}
              {#if key !== 'notes'}
                <div class="req-item">
                  <span class="req-label">{$t(`requirements.${key}`) || key}:</span>
                  <span class="req-value">{value}</span>
                </div>
              {/if}
            {/each}
            {#if requirements.ultra.notes}
              <div class="req-notes">{requirements.ultra.notes}</div>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    {#if requirements.additionalNotes}
      <div class="additional-notes glass-panel">
        <h4>{$t('requirements.notes')}</h4>
        <ul>
          {#each requirements.additionalNotes as note}
            <li>{note}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</section>

<style>
  .requirements {
    padding: var(--spacing-3xl) 0;
  }

  .requirements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }

  .requirement-card {
    padding: var(--spacing-xl);
    position: relative;
  }

  .requirement-card.recommended {
    border: 2px solid var(--primary-color);
  }

  .requirement-card.ultra {
    border: 2px solid var(--secondary-color);
  }

  .req-title {
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .recommended .req-title {
    color: var(--primary-color);
  }

  .ultra .req-title {
    color: var(--secondary-color);
  }

  .req-item {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .req-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
    text-transform: capitalize;
  }

  .req-value {
    color: var(--text-primary);
    font-weight: 500;
    text-align: right;
    max-width: 60%;
  }

  .req-notes {
    margin-top: var(--spacing-md);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    font-style: italic;
    background: rgba(99, 102, 241, 0.1);
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
  }

  .additional-notes {
    padding: var(--spacing-xl);
  }

  .additional-notes h4 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
  }

  .additional-notes ul {
    list-style: none;
    padding: 0;
  }

  .additional-notes li {
    padding: var(--spacing-xs) 0;
    position: relative;
    padding-left: var(--spacing-lg);
  }

  .additional-notes li::before {
    content: '•';
    color: var(--primary-color);
    position: absolute;
    left: 0;
  }

  @media (max-width: 768px) {
    .requirements-grid {
      grid-template-columns: 1fr;
    }
  }
</style>