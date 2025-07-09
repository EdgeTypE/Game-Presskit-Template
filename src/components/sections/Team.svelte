<script>
  import { t } from '../../i18n/index.js';
  
  export let team = {};
</script>

<section class="team section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('sections.team')}</h2>
    
    {#if team.studio}
      <div class="studio-info glass-panel">
        <div class="studio-content">
          <div class="studio-text">
            <h3>{team.studio.name}</h3>
            <p>{team.studio.description}</p>
            <div class="studio-facts">
              <span>Founded: {team.studio.founded}</span>
              <span>Location: {team.studio.location}</span>
              <span>Team Size: {team.studio.size}</span>
            </div>
          </div>
          {#if team.studio.logo}
            <div class="studio-logo">
              <img src={team.studio.logo} alt={team.studio.name} />
            </div>
          {/if}
        </div>
      </div>
    {/if}

    {#if team.teamMembers}
      <div class="team-members">
        <h3>Meet the Team</h3>
        <div class="members-grid">
          {#each team.teamMembers as member}
            <div class="member-card glass-card hover-lift">
              {#if member.avatar}
                <div class="member-avatar">
                  <img src={member.avatar} alt={member.name} />
                </div>
              {/if}
              <div class="member-info">
                <h4>{member.name}</h4>
                <p class="role">{member.role}</p>
                <p class="bio">{member.bio}</p>
                {#if member.social}
                  <div class="social-links">
                    {#each Object.entries(member.social) as [platform, url]}
                      <a href={url} target="_blank" rel="noopener" class="social-link">
                        {platform}
                      </a>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if team.specialThanks}
      <div class="special-thanks">
        <h3 class="subsection-title">{$t('team.specialThanks')}</h3>
        <div class="thanks-grid">
          {#each team.specialThanks as thanks}
            <div class="thanks-item glass-card hover-lift">
              <span class="thanks-icon">💙</span>
              <span class="thanks-text">{thanks}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .team {
    padding: var(--spacing-3xl) 0;
  }

  .studio-info {
    padding: var(--spacing-2xl);
    margin-bottom: var(--spacing-3xl);
  }

  .studio-content {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--spacing-2xl);
    align-items: center;
  }

  .studio-text h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
  }

  .studio-facts {
    display: flex;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
    flex-wrap: wrap;
  }

  .studio-facts span {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .studio-logo img {
    max-width: 150px;
    height: auto;
  }

  .team-members h3 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: var(--spacing-xl);
  }

  .members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
  }

  .member-card {
    padding: var(--spacing-xl);
    text-align: center;
  }

  .member-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto var(--spacing-lg);
    background: var(--surface-color);
  }

  .member-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .member-info h4 {
    margin-bottom: var(--spacing-xs);
    font-size: var(--font-size-lg);
  }

  .role {
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
  }

  .bio {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin-bottom: var(--spacing-md);
  }

  .social-links {
    display: flex;
    gap: var(--spacing-sm);
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-link {
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(99, 102, 241, 0.2);
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--text-primary);
    font-size: var(--font-size-xs);
    transition: background var(--transition-fast);
  }

  .social-link:hover {
    background: rgba(99, 102, 241, 0.4);
  }

  @media (max-width: 768px) {
    .studio-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .studio-facts {
      justify-content: center;
    }
  }

  .special-thanks {
    margin-top: var(--spacing-3xl);
  }

  .subsection-title {
    text-align: center;
    color: var(--secondary-color);
    margin-bottom: var(--spacing-2xl);
    font-size: var(--font-size-2xl);
  }

  .thanks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .thanks-item {
    padding: var(--spacing-lg);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  .thanks-icon {
    font-size: var(--font-size-2xl);
  }

  .thanks-text {
    color: var(--text-primary);
    font-weight: 500;
    text-align: center;
  }

  @media (max-width: 768px) {
    .thanks-grid {
      grid-template-columns: 1fr;
    }
  }
</style>