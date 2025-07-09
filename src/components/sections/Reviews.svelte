<script>
  import { t } from '../../i18n/index.js';
  
  export let reviews = {};
</script>

<section class="reviews section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.reviews')}</h2>
    
    {#if reviews.scores && reviews.scores.length > 0}
      <div class="scores-section">
        <h3 class="subsection-title">{$t('reviews.scores')}</h3>
        <div class="scores-grid">
          {#each reviews.scores as score}
            <a href={score.url} target="_blank" rel="noopener" class="score-card glass-card hover-lift">
              <div class="score-platform">{score.name}</div>
              <div class="score-value score-{score.name.toLowerCase().replace(' ', '-')}">
                {#if score.maxScore}
                  {score.score}/{score.maxScore}
                {:else if score.scoreText}
                  {score.score}% - {score.scoreText}
                {:else}
                  {score.score}%
                {/if}
              </div>
              {#if score.reviewCount}
                <div class="score-reviews">{score.reviewCount} reviews</div>
              {/if}
              {#if score.type}
                <div class="score-type">{score.type === 'critic' ? 'Critics' : 'Users'}</div>
              {/if}
            </a>
          {/each}
        </div>
      </div>
    {/if}
    
    {#if reviews.featuredReviews}
      <div class="reviews-grid">
        {#each reviews.featuredReviews as review}
          <div class="review-card glass-card hover-lift">
            <div class="review-header">
              {#if review.logo}
                <img src={review.logo} alt={review.publication} class="publication-logo" />
              {/if}
              <div class="review-meta">
                <h3>{review.publication}</h3>
                <div class="score">{review.score}</div>
              </div>
            </div>
            <blockquote>"{review.quote}"</blockquote>
            <cite>- {review.reviewer}</cite>
          </div>
        {/each}
      </div>
    {/if}

    {#if reviews.awards}
      <div class="awards-section">
        <h3>Awards & Recognition</h3>
        <div class="awards-grid">
          {#each reviews.awards as award}
            <div class="award-item glass-card">
              {#if award.image}
                <img src={award.image} alt={award.name} />
              {/if}
              <h4>{award.name}</h4>
              <p>{award.organization} - {award.year}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if reviews.playerTestimonials}
    <br><br>
      <div class="testimonials-section">
        <h3 class="subsection-title">{$t('reviews.playerTestimonials')}</h3>
        <div class="testimonials-grid">
          {#each reviews.playerTestimonials as testimonial}
            <div class="testimonial-card glass-card">
              <blockquote class="testimonial-quote">"{testimonial.quote}"</blockquote>
              <div class="testimonial-meta">
                <cite class="testimonial-author">- {testimonial.author}</cite>
                <div class="testimonial-info">
                  <span class="platform">{testimonial.platform}</span>
                  {#if testimonial.hours}
                    <span class="hours">{testimonial.hours}h played</span>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .reviews {
    padding: var(--spacing-3xl) 0;
  }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }

  .review-card {
    padding: var(--spacing-xl);
  }

  .review-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  .publication-logo {
    width: 60px;
    height: 30px;
    object-fit: contain;
  }

  .review-meta h3 {
    margin: 0;
    font-size: var(--font-size-lg);
  }

  .score {
    font-weight: bold;
    color: var(--primary-color);
    font-size: var(--font-size-xl);
  }

  blockquote {
    font-style: italic;
    font-size: var(--font-size-lg);
    line-height: 1.6;
    margin: var(--spacing-lg) 0;
    position: relative;
  }

  cite {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .awards-section h3 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xl);
  }

  .awards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
  }

  .award-item {
    padding: var(--spacing-lg);
    text-align: center;
  }

  .award-item img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: var(--spacing-md);
  }

  .award-item h4 {
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-md);
  }

  .award-item p {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .scores-section,
  .testimonials-section {
    margin-bottom: var(--spacing-3xl);
  }

  .subsection-title {
    text-align: center;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-2xl);
    font-size: var(--font-size-2xl);
  }

  .scores-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-3xl);
  }

  .score-card {
    padding: var(--spacing-lg);
    text-align: center;
    text-decoration: none;
    color: var(--text-primary);
    transition: all var(--transition-normal);
  }

  .score-platform {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--spacing-sm);
  }

  .score-value {
    font-size: var(--font-size-3xl);
    font-weight: bold;
    margin-bottom: var(--spacing-xs);
  }

  /* Score values use theme colors by default */
  .score-value {
    color: var(--primary-color);
  }
  
  /* Optional: Special colors for well-known platforms */
  .score-value.score-metacritic { color: #ffcc33; }
  .score-value.score-steam { color: #66c0f4; }

  .score-reviews,
  .score-count {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }

  .score-type {
    font-size: var(--font-size-xs);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: var(--spacing-xs);
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .testimonial-card {
    padding: var(--spacing-xl);
  }

  .testimonial-quote {
    font-style: italic;
    font-size: var(--font-size-lg);
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
    position: relative;
  }

  .testimonial-quote::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: -15px;
    font-size: var(--font-size-4xl);
    color: var(--primary-color);
    opacity: 0.3;
  }

  .testimonial-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .testimonial-author {
    color: var(--primary-color);
    font-weight: 600;
  }

  .testimonial-info {
    display: flex;
    gap: var(--spacing-sm);
    align-items: center;
  }

  .platform {
    background: rgba(99, 102, 241, 0.2);
    color: var(--primary-color);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .hours {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  @media (max-width: 768px) {
    .scores-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
    
    .testimonial-meta {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>