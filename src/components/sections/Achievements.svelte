<script>
  import { t } from '../../i18n/index.js';
  
  export let achievements = {};
  
  // Filter achievements by rarity
  function getAchievementsByRarity(achievements, rarity) {
    return achievements.filter(achievement => achievement.rarity.toLowerCase() === rarity.toLowerCase());
  }
  
  // Get rarity color
  function getRarityColor(rarity) {
    switch(rarity.toLowerCase()) {
      case 'common': return '#22c55e';
      case 'uncommon': return '#3b82f6';
      case 'rare': return '#a855f7';
      case 'very rare': return '#f59e0b';
      case 'ultra rare': return '#ef4444';
      default: return '#6b7280';
    }
  }
</script>

<section class="achievements section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.achievements')}</h2>
    
    {#if achievements.totalAchievements}
      <div class="achievements-stats glass-panel">
        <div class="stat-item">
          <span class="stat-number">{achievements.totalAchievements}</span>
          <span class="stat-label">{$t('achievements.totalAchievements')}</span>
        </div>
        {#if achievements.rewardSystem}
          <div class="stat-item">
            <span class="stat-number">{achievements.rewardSystem.totalPoints}</span>
            <span class="stat-label">{$t('achievements.points')}</span>
          </div>
        {/if}
      </div>
    {/if}

    {#if achievements.categories}
      <div class="achievements-categories">
        {#each achievements.categories as category}
          <div class="category-section">
            <h3 class="category-title">{category.name}</h3>
            <div class="achievements-grid">
              {#each category.achievements as achievement}
                <div class="achievement-card glass-card hover-lift" style="border-left: 4px solid {getRarityColor(achievement.rarity)}">
                  <div class="achievement-header">
                    {#if achievement.icon}
                      <div class="achievement-icon">
                        <img src={achievement.icon} alt={achievement.name} />
                      </div>
                    {/if}
                    <div class="achievement-info">
                      <h4 class="achievement-name">{achievement.name}</h4>
                      <p class="achievement-description">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <div class="achievement-meta">
                    <div class="achievement-stats">
                      <span class="rarity" style="color: {getRarityColor(achievement.rarity)}">
                        {$t(`achievements.${achievement.rarity.toLowerCase().replace(' ', '')}`)}
                      </span>
                      <span class="percentage">{achievement.percentage}%</span>
                    </div>
                    {#if achievement.points}
                      <div class="achievement-points">
                        <span class="points">{achievement.points} pts</span>
                      </div>
                    {/if}
                  </div>
                  
                  <div class="achievement-progress">
                    <div class="progress-bar">
                      <div 
                        class="progress-fill" 
                        style="width: {achievement.percentage}%; background-color: {getRarityColor(achievement.rarity)}"
                      ></div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    {#if achievements.steamIntegration}
      <div class="steam-integration glass-panel">
        <h3>Steam Integration</h3>
        <div class="steam-stats">
          <div class="steam-item">
            <span class="steam-number">{achievements.steamIntegration.tradingCards}</span>
            <span class="steam-label">Trading Cards</span>
          </div>
          <div class="steam-item">
            <span class="steam-number">{achievements.steamIntegration.badges}</span>
            <span class="steam-label">Badges</span>
          </div>
          <div class="steam-item">
            <span class="steam-number">{achievements.steamIntegration.emoticons}</span>
            <span class="steam-label">Emoticons</span>
          </div>
          <div class="steam-item">
            <span class="steam-number">{achievements.steamIntegration.backgrounds}</span>
            <span class="steam-label">Backgrounds</span>
          </div>
        </div>
      </div>
    {/if}

    {#if achievements.rewardSystem?.unlockables}
      <div class="reward-system">
        <h3>Unlockable Rewards</h3>
        <div class="rewards-grid">
          {#each achievements.rewardSystem.unlockables as reward}
            <div class="reward-item glass-card">
              <span class="reward-icon">🏆</span>
              <span class="reward-name">{reward}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .achievements {
    padding: var(--spacing-3xl) 0;
  }

  .achievements-stats {
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
    display: flex;
    justify-content: center;
    gap: var(--spacing-3xl);
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: var(--font-size-4xl);
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xs);
  }

  .stat-label {
    color: var(--text-muted);
    text-transform: uppercase;
    font-size: var(--font-size-sm);
    letter-spacing: 0.1em;
  }

  .category-section {
    margin-bottom: var(--spacing-3xl);
  }

  .category-title {
    text-align: center;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-xl);
    font-size: var(--font-size-2xl);
  }

  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-lg);
  }

  .achievement-card {
    padding: var(--spacing-lg);
    position: relative;
  }

  .achievement-header {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .achievement-icon {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }

  .achievement-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .achievement-info {
    flex: 1;
  }

  .achievement-name {
    margin-bottom: var(--spacing-xs);
    color: var(--text-primary);
    font-size: var(--font-size-lg);
  }

  .achievement-description {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.5;
    margin: 0;
  }

  .achievement-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .achievement-stats {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
  }

  .rarity {
    font-weight: 600;
    text-transform: capitalize;
    font-size: var(--font-size-sm);
  }

  .percentage {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .achievement-points {
    background: rgba(99, 102, 241, 0.2);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
  }

  .points {
    color: var(--primary-color);
    font-weight: 600;
    font-size: var(--font-size-sm);
  }

  .achievement-progress {
    margin-top: var(--spacing-md);
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    transition: width var(--transition-normal);
    border-radius: 2px;
  }

  .steam-integration,
  .reward-system {
    margin-top: var(--spacing-3xl);
    padding: var(--spacing-xl);
  }

  .steam-integration h3,
  .reward-system h3 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xl);
  }

  .steam-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
  }

  .steam-item {
    text-align: center;
  }

  .steam-number {
    display: block;
    font-size: var(--font-size-2xl);
    font-weight: bold;
    color: #1b2838;
    margin-bottom: var(--spacing-xs);
  }

  .steam-label {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .rewards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }

  .reward-item {
    padding: var(--spacing-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.2);
  }

  .reward-icon {
    font-size: var(--font-size-xl);
  }

  .reward-name {
    color: var(--text-primary);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .achievements-stats {
      flex-direction: column;
      gap: var(--spacing-xl);
    }
    
    .achievements-grid {
      grid-template-columns: 1fr;
    }
    
    .steam-stats {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .rewards-grid {
      grid-template-columns: 1fr;
    }
  }
</style>