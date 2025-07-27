<script>
  import { onMount } from 'svelte';

  let projects = [];
  let loading = true;
  let error = null;

  // GitHub API'den projeleri çek
  onMount(async () => {
    try {
      const response = await fetch('https://api.github.com/users/edgetype/repos?sort=updated&per_page=6');
      if (response.ok) {
        const data = await response.json();
        projects = data.filter(repo => !repo.fork).map(repo => ({
          name: repo.name,
          description: repo.description || 'Açıklama bulunmuyor',
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updated: new Date(repo.updated_at).toLocaleDateString('tr-TR'),
          url: repo.html_url,
          homepage: repo.homepage
        }));
      } else {
        throw new Error('GitHub API\'ye erişilemedi');
      }
    } catch (err) {
      console.error('GitHub projeleri yüklenirken hata:', err);
      error = err.message;
      // Fallback projeler
      projects = [
        {
          name: 'Örnek Proje 1',
          description: 'Unreal Engine ile geliştirilmiş aksiyon oyunu',
          language: 'C++',
          stars: 15,
          forks: 3,
          updated: '15.01.2024',
          url: '#',
          homepage: null
        },
        {
          name: 'Örnek Proje 2', 
          description: 'Svelte ile CV sitesi template\'i',
          language: 'JavaScript',
          stars: 8,
          forks: 2,
          updated: '10.01.2024',
          url: '#',
          homepage: null
        }
      ];
    } finally {
      loading = false;
    }
  });

  function getLanguageColor(language) {
    const colors = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489', 
      'Python': '#3572A5',
      'C++': '#f34b7d',
      'C#': '#239120',
      'Java': '#b07219',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'HTML': '#e34c26',
      'CSS': '#1572B6',
      'Svelte': '#ff3e00'
    };
    return colors[language] || '#8b949e';
  }
</script>

<section class="projects-section section">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="gradient-text">GitHub Projelerim</h2>
      <p>Son güncellenen açık kaynak projelerim</p>
    </div>

    {#if loading}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Projeler yükleniyor...</p>
      </div>
    {:else if error && projects.length === 0}
      <div class="error-container glass">
        <p>Projeler yüklenirken bir hata oluştu: {error}</p>
      </div>
    {:else}
      <div class="projects-grid">
        {#each projects as project}
          <div class="project-card glass">
            <div class="project-header">
              <h3 class="project-title">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
              </h3>
              {#if project.language}
                <div class="language-badge" style="background-color: {getLanguageColor(project.language)}">
                  {project.language}
                </div>
              {/if}
            </div>

            <p class="project-description">{project.description}</p>

            <div class="project-stats">
              <div class="stat">
                <span class="stat-icon">⭐</span>
                <span class="stat-value">{project.stars}</span>
              </div>
              <div class="stat">
                <span class="stat-icon">🔄</span>
                <span class="stat-value">{project.forks}</span>
              </div>
              <div class="stat">
                <span class="stat-icon">📅</span>
                <span class="stat-value">{project.updated}</span>
              </div>
            </div>

            <div class="project-actions">
              <a href={project.url} class="project-link" target="_blank" rel="noopener noreferrer">
                <span class="link-icon">🔗</span>
                GitHub
              </a>
              {#if project.homepage}
                <a href={project.homepage} class="project-link" target="_blank" rel="noopener noreferrer">
                  <span class="link-icon">🌐</span>
                  Demo
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <div class="view-more text-center">
        <a href="https://github.com/edgetype" class="glass-button" target="_blank" rel="noopener noreferrer">
          <span class="button-icon">🐙</span>
          Tüm Projelerimi Görüntüle
        </a>
      </div>
    {/if}
  </div>
</section>

<style>
  .projects-section {
    padding: var(--spacing-3xl) 0;
  }

  .section-header {
    margin-bottom: var(--spacing-3xl);
  }

  .section-header h2 {
    margin-bottom: var(--spacing-md);
  }

  .section-header p {
    color: var(--text-secondary);
    font-size: var(--font-size-lg);
  }

  .loading-container {
    text-align: center;
    padding: var(--spacing-3xl);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--glass-border);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto var(--spacing-md);
  }

  .error-container {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--text-secondary);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }

  .project-card {
    padding: var(--spacing-xl);
    transition: all var(--transition-normal);
    height: fit-content;
  }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  .project-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
    gap: var(--spacing-md);
  }

  .project-title {
    margin: 0;
    font-size: var(--font-size-xl);
    flex: 1;
  }

  .project-title a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .project-title a:hover {
    color: var(--primary-color);
  }

  .language-badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
  }

  .project-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    line-height: 1.5;
  }

  .project-stats {
    display: flex;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  .stat {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }

  .stat-icon {
    font-size: var(--font-size-base);
  }

  .project-actions {
    display: flex;
    gap: var(--spacing-md);
  }

  .project-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    transition: all var(--transition-fast);
  }

  .project-link:hover {
    color: var(--text-primary);
    background: var(--surface-color);
    transform: translateY(-1px);
  }

  .link-icon {
    font-size: var(--font-size-sm);
  }

  .view-more {
    margin-top: var(--spacing-2xl);
  }

  .glass-button {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 600;
    transition: all var(--transition-normal);
    backdrop-filter: blur(16px);
  }

  .glass-button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
  }

  .button-icon {
    font-size: var(--font-size-lg);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }

    .project-card {
      padding: var(--spacing-lg);
    }

    .project-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }

    .project-stats {
      gap: var(--spacing-md);
    }

    .project-actions {
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  }
</style>