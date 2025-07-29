<script>
  import { onMount } from 'svelte';
  import { languageManager } from '../../utils/languageManager.js';

  // Dinamik yaş hesaplama
  const birthDate = new Date('2005-03-29');
  let age = 0;
  let totalHoursWasted = 175310;
  let currentLanguage = languageManager.getCurrentLanguage();

  // Dil değişikliği callback'i
  languageManager.addLanguageChangeListener((lang) => {
    currentLanguage = lang;
  });
  
  // Reactive dil değişkeni
  $: currentLanguage = languageManager.getCurrentLanguage();

  onMount(() => {
    const today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Her yıl total_hours_wasted_here'ı güncelle
    // 29 Mart 2005 15:00'dan bugüne kadar geçen saat sayısını hesapla
    totalHoursWasted = Math.floor((today - new Date('2005-03-29T15:00:00')) / 1000 / 60 / 60);
  });

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/edgetype', icon: '🐙' },
    { name: 'YouTube', url: 'https://youtube.com/@edgetype', icon: '📺' },
    { name: 'Twitter', url: 'https://twitter.com/edgetype', icon: '🐦' },
    { name: 'Steam', url: 'https://steamcommunity.com/id/EdgeTypE', icon: '🎮' },
    { name: 'Discord', url: 'https://discord.gg/kjFPznJQBq', icon: '💬' }
  ];

let cs16 = false;

  const skills = [
    'Game Design',
    'Unreal Engine 4/5',
    'C#',
    // 'C++',
    'Python',
    'JavaScript',
    'SQL',
    'Node.js',
    'Svelte'
  ];
  
  // Çeviri fonksiyonu
  $: t = (key) => {
    const translations = {
      'hero-subtitle': {
        'en': 'Game Designer & Developer',
        'tr': 'Game Designer & Developer'
      },
      'hero-nickname': {
        'en': 'EdgeTypE',
        'tr': 'EdgeTypE'
      },
      'detail-label-age': {
        'en': 'Age:',
        'tr': 'Yaş:'
      },
      'detail-label-education': {
        'en': 'Education:',
        'tr': 'Eğitim:'
      },
      'detail-label-expertise': {
        'en': 'Expertise:',
        'tr': 'Uzmanlık:'
      },
      'education-value': {
        'en': 'Ege University - Computer Programming',
        'tr': 'Ege Üniversitesi - Bilgisayar Programcılığı'
      },
      'expertise-value': {
        'en': 'Game Design, Unreal Engine',
        'tr': 'Game Design, Unreal Engine'
      },
      'skills-title': {
        'en': 'Skills',
        'tr': 'Yetenekler'
      },
      'code-comment-line1': {
        'en': '// Dear programmer:',
        'tr': '// Dear programmer:'
      },
      'code-comment-line2': {
        'en': '// When I wrote this code, only god and',
        'tr': '// When I wrote this code, only god and'
      },
      'code-comment-line3': {
        'en': '// I knew how it worked.',
        'tr': '// I knew how it worked.'
      },
      'code-comment-line4': {
        'en': '// Now, only god knows it!',
        'tr': '// Now, only god knows it!'
      },
      'code-comment-line5': {
        'en': '//',
        'tr': '//'
      },
      'code-comment-line6': {
        'en': '// Therefore, if you are trying to optimize',
        'tr': '// Therefore, if you are trying to optimize'
      },
      'code-comment-line7': {
        'en': '// this routine and it fails (most surely),',
        'tr': '// this routine and it fails (most surely),'
      },
      'code-comment-line8': {
        'en': '// please increase this counter as a',
        'tr': '// please increase this counter as a'
      },
      'code-comment-line9': {
        'en': '// warning for the next person:',
        'tr': '// warning for the next person:'
      },
      'code-comment-line10': {
        'en': '//',
        'tr': '//'
      },
      'code-comment-line11': {
        'en': '// total_hours_wasted_here = ',
        'tr': '// total_hours_wasted_here = '
      }
    };
    
    if (translations[key] && translations[key][currentLanguage]) {
      return translations[key][currentLanguage];
    }
    
    return key;
  }
</script>

<section class="hero-section section">
  <div class="container">
    <div class="hero-content">
      <!-- Ana Bilgiler -->
      <div class="hero-main glass">
        <div class="hero-avatar">
          <div class="avatar-circle">
            <span class="avatar-text">ÇD</span>
          </div>
        </div>
        
        <div class="hero-info">
          <h1 class="gradient-text">Çağrı Dürü</h1>
          <p class="hero-subtitle">{t('hero-subtitle')}</p>
          <p class="hero-nickname">{t('hero-nickname')}</p>
          
          <div class="hero-details">
            <div class="detail-item">
              <span class="detail-label">{t('detail-label-age')}</span>
              <span class="detail-value">{age}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{t('detail-label-education')}</span>
              <span class="detail-value">{t('education-value')}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{t('detail-label-expertise')}</span>
              <span class="detail-value">{t('expertise-value')}</span>
            </div>
          </div>

          <!-- Sosyal Medya Bağlantıları -->
          <div class="social-links">
            {#each socialLinks as link}
              <a href={link.url} class="social-link glass" target="_blank" rel="noopener noreferrer">
                <span class="social-icon">{link.icon}</span>
                <span class="social-name">{link.name}</span>
              </a>
            {/each}
          </div>
        </div>
      </div>

      <!-- Kod Yorumu -->
      <div class="code-comment glass">
        <pre class="code-text">
{t('code-comment-line1')}
{t('code-comment-line2')}
{t('code-comment-line3')}
{t('code-comment-line4')}
{t('code-comment-line5')}
{t('code-comment-line6')}
{t('code-comment-line7')}
{t('code-comment-line8')}
{t('code-comment-line9')}
{t('code-comment-line10')}
{t('code-comment-line11')}{totalHoursWasted}
        </pre>
      </div>

      <!-- Yetenekler -->
      <div class="skills-section glass">
        <h3>{t('skills-title')}</h3>
        <div class="skills-grid">
            {#each skills as skill}
            <div
              class="skill-tag"
              on:mouseenter={() => { if (skill === "Game Design") cs16 = true; }}
              on:mouseleave={() => { if (skill === "Game Design") cs16 = false; }}
            >
              {skill}
            </div>
            {/each}
        </div>
      </div>
    </div>
  </div>
  {#if cs16}
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/ekmas/cs16.css@main/css/cs16.min.css">
  {/if}
</section>

<style>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: var(--spacing-3xl) 0;
    position: relative;
  }

  .hero-content {
    display: grid;
    gap: var(--spacing-xl);
    grid-template-columns: 1fr;
    max-width: 1000px;
    margin: 0 auto;
  }

  .hero-main {
    display: flex;
    gap: var(--spacing-xl);
    padding: var(--spacing-2xl);
    align-items: center;
  }

  .hero-avatar {
    flex-shrink: 0;
  }

  .avatar-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-glow);
  }

  .avatar-text {
    font-size: var(--font-size-3xl);
    font-weight: bold;
    color: white;
    font-family: var(--font-family-heading);
  }

  .hero-info {
    flex: 1;
  }

  .hero-subtitle {
    font-size: var(--font-size-xl);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
  }

  .hero-nickname {
    font-size: var(--font-size-lg);
    color: var(--accent-color);
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
  }

  .hero-details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
  }

  .detail-item {
    display: flex;
    gap: var(--spacing-sm);
  }

  .detail-label {
    font-weight: 600;
    color: var(--text-primary);
    min-width: 80px;
  }

  .detail-value {
    color: var(--text-secondary);
  }

  .social-links {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: all var(--transition-normal);
    font-size: var(--font-size-sm);
  }

  .social-link:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .social-icon {
    font-size: var(--font-size-lg);
  }

  .social-name {
    color: var(--text-secondary);
  }

  .code-comment {
    padding: var(--spacing-xl);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    background: var(--surface-color);
    border-left: 4px solid var(--primary-color);
  }

  .code-text {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.4;
    margin: 0;
    white-space: pre-wrap;
  }

  .skills-section {
    padding: var(--spacing-xl);
  }

  .skills-section h3 {
    margin-bottom: var(--spacing-lg);
    color: var(--text-primary);
  }

  .skills-grid {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .skill-tag {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: 600;
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-fast);
  }

  .skill-tag:hover {
    transform: scale(1.05);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-main {
      flex-direction: column;
      text-align: center;
      padding: var(--spacing-lg);
    }

    .hero-content {
      gap: var(--spacing-lg);
    }

    .social-links {
      justify-content: center;
    }

    .avatar-circle {
      width: 100px;
      height: 100px;
    }

    .avatar-text {
      font-size: var(--font-size-2xl);
    }

    .code-comment {
      padding: var(--spacing-lg);
    }

    .code-text {
      font-size: var(--font-size-xs);
    }
  }
</style>