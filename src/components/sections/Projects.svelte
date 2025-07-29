<script>
  import { onMount } from 'svelte';
  import { languageManager } from '../../utils/languageManager.js';

  let projects = [];
  let loading = true;
  let error = null;
  let currentLanguage = languageManager.getCurrentLanguage();

  // Dil değişikliği callback'i
  languageManager.addLanguageChangeListener((lang) => {
    currentLanguage = lang;
    // Dil değiştiğinde mevcut projelerin tarihlerini ve açıklamalarını yeniden formatla/ayarla
    projects = projects.map(project => {
        // Statik projelerin açıklamalarını güncelle
        if (project.type === 'static') {
            project.description = getStaticProjectDescription(project.id, currentLanguage);
        }
        return {
          ...project,
          updated: project.updatedDate ? formatDate(project.updatedDate) : null
        };
    });
  });
  
  // Reactive dil değişkeni
  $: currentLanguage = languageManager.getCurrentLanguage();
  
  // Statik proje açıklamalarını diline göre getiren fonksiyon
  function getStaticProjectDescription(id, lang) {
      const descriptions = {
          'goygoyengine': {
              'tr': "Türkiye'de oyun sektörüne dair haberlere ve yeni çıkan oyunlara ait incelemelere yer veren bir oyun basını sitesi.",
              'en': "A gaming news and review site focusing on the Turkish gaming industry."
          },
          'gaming-db': {
              'tr': "Goygoy Engine için ürettiğimiz içerikleri İngilizce olarak tüm dünya ile paylaştığımız bir site.",
              'en': "A site where we share the content produced for Goygoy Engine with the whole world in English."
          },
          'gdb': {
              'tr': "Steam, Xbox, PlayStation, Epic Games gibi çeşitli oyun platformlarını tarayan ve verileri analiz eden bir oyun veritabanı hizmeti. Henüz erken geliştirme aşamasında.",
              'en': "A game database service that scans and analyzes data from various gaming platforms like Steam, Xbox, and PlayStation. Still in early development."
          }
      };
      return descriptions[id][lang];
  }


  // GitHub API'den projeleri çek
  onMount(async () => {
    try {
      const response = await fetch('https://api.github.com/users/edgetype/repos?sort=updated&per_page=3');
      if (response.ok) {
        const data = await response.json();
        projects = data.filter(repo => !repo.fork).map(repo => {
          const updatedDate = new Date(repo.updated_at);
          return {
            id: repo.id,
            type: 'github', // Proje tipini belirt
            name: repo.name,
            description: repo.description || (currentLanguage === 'tr' ? 'Açıklama bulunmuyor' : 'No description available'),
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedDate: updatedDate,
            updated: formatDate(updatedDate),
            url: repo.html_url,
            homepage: repo.homepage
          };
        });
      } else {
        throw new Error(currentLanguage === 'tr' ? 'GitHub API\'ye erişilemedi' : 'Failed to access GitHub API');
      }
    } catch (err) {
      console.error('GitHub projeleri yüklenirken hata:', err);
      error = err.message;
      // Fallback projeler
      projects = [
        {
          id: 'sample1',
          type: 'github',
          name: currentLanguage === 'tr' ? 'Örnek Proje 1' : 'Sample Project 1',
          description: currentLanguage === 'tr' ?
            'Unreal Engine ile geliştirilmiş aksiyon oyunu' :
            'Action game developed with Unreal Engine',
          language: 'C++',
          stars: 15,
          forks: 3,
          updatedDate: new Date('2024-01-15'),
          updated: formatDate(new Date('2024-01-15')),
          url: '#',
          homepage: null
        },
        {
          id: 'sample2',
          type: 'github',
          name: currentLanguage === 'tr' ? 'Örnek Proje 2' : 'Sample Project 2',
          description: currentLanguage === 'tr' ?
            'Svelte ile CV sitesi template\'i' :
            'CV site template with Svelte',
          language: 'JavaScript',
          stars: 8,
          forks: 2,
          updatedDate: new Date('2024-01-10'),
          updated: formatDate(new Date('2024-01-10')),
          url: '#',
          homepage: null
        }
      ];
    } finally {
        // Statik projeleri ekle
        const staticProjects = [
            {
                id: 'goygoyengine',
                type: 'static',
                name: 'goygoyengine.com',
                description: getStaticProjectDescription('goygoyengine', currentLanguage),
                language: 'Website',
                stars: null,
                forks: null,
                updatedDate: null,
                updated: null,
                url: 'https://goygoyengine.com',
                homepage: null
            },
            {
                id: 'gaming-db',
                type: 'static',
                name: 'gaming-db.com',
                description: getStaticProjectDescription('gaming-db', currentLanguage),
                language: 'Website',
                stars: null,
                forks: null,
                updatedDate: null,
                updated: null,
                url: 'https://gaming-db.com',
                homepage: null
            },
            {
                id: 'gdb',
                type: 'static',
                name: 'gdb',
                description: getStaticProjectDescription('gdb', currentLanguage),
                language: 'Database Service',
                stars: null,
                forks: null,
                updatedDate: null,
                updated: null,
                url: 'https://gdb.gaming-db.com',
                homepage: null
            }
        ];
        
        projects = [...projects, ...staticProjects];
        loading = false;
    }
  });

  // Tarih formatlama fonksiyonu
  function formatDate(date) {
    if (!date) return '';
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    
    if (currentLanguage === 'tr') {
      return date.toLocaleDateString('tr-TR', options);
    } else {
      return date.toLocaleDateString('en-US', options);
    }
  }

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
      'Svelte': '#ff3e00',
      'Website': '#4CAF50',
      'Database Service': '#00BCD4'
    };
    return colors[language] || '#8b949e';
  }
  
  // Çeviri fonksiyonu
  $: t = (key) => {
    const translations = {
      'projects-title': {
        'en': 'My Projects',
        'tr': 'Projelerim'
      },
      'projects-subtitle': {
        'en': 'My latest open source and personal projects',
        'tr': 'Son açık kaynak ve kişisel projelerim'
      },
      'loading-text': {
        'en': 'Loading projects...',
        'tr': 'Projeler yükleniyor...'
      },
      'error-text': {
        'en': 'An error occurred while loading projects: ',
        'tr': 'Projeler yüklenirken bir hata oluştu: '
      },
      'view-all-button': {
        'en': 'View All My Projects on GitHub',
        'tr': 'Tüm Projelerimi GitHub\'da Görüntüle'
      },
      'github-link': {
        'en': 'GitHub',
        'tr': 'GitHub'
      },
      'demo-link': {
        'en': 'Demo',
        'tr': 'Demo'
      },
      'visit-link': {
        'en': 'Visit',
        'tr': 'Ziyaret Et'
      }
    };
    if (translations[key] && translations[key][currentLanguage]) {
      return translations[key][currentLanguage];
    }
    return key;
  }
</script>

<section class="projects-section section">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="gradient-text">{t('projects-title')}</h2>
      <p>{t('projects-subtitle')}</p>
    </div>

    {#if loading}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>{t('loading-text')}</p>
      </div>
    {:else if error && projects.length === 0}
      <div class="error-container glass">
        <p>{t('error-text')}{error}</p>
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
            
            {#if project.type === 'github'}
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
            {/if}

            <div class="project-actions">
              {#if project.type === 'static'}
                 <a href={project.url} class="project-link" target="_blank" rel="noopener noreferrer">
                    <span class="link-icon">🌐</span>
                    {t('visit-link')}
                  </a>
              {:else}
                <a href={project.url} class="project-link" target="_blank" rel="noopener noreferrer">
                  <span class="link-icon">🔗</span>
                  {t('github-link')}
                </a>
                {#if project.homepage}
                  <a href={project.homepage} class="project-link" target="_blank" rel="noopener noreferrer">
                    <span class="link-icon">🌐</span>
                    {t('demo-link')}
                  </a>
                {/if}
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <div class="view-more text-center">
        <a href="https://github.com/edgetype" class="glass-button" target="_blank" rel="noopener noreferrer">
          <span class="button-icon">🐙</span>
          {t('view-all-button')}
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
    height: 100%; /* Kartların aynı hizada durması için */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    flex-grow: 1; /* Açıklamanın boş alanı doldurmasını sağlar */
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
    margin-top: auto; /* Butonları kartın en altına iter */
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
      align-self: flex-start; /* Butonları sola hizala */
    }
  }
</style>