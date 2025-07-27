<script>
  import { onMount } from 'svelte';

  // Dinamik yaş hesaplama
  const birthDate = new Date('2005-03-29');
  let age = 0;
  let totalHoursWasted = 175310;

  onMount(() => {
    const today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Her yıl total_hours_wasted_here'ı güncelle
    const yearsPassed = age - 19; // 2024'te 19 yaşında olduğu varsayılarak
    totalHoursWasted = 175310 + yearsPassed;
  });

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/edgetype', icon: '🐙' },
    { name: 'YouTube', url: 'https://youtube.com/@edgetype', icon: '📺' },
    { name: 'Twitter', url: 'https://twitter.com/edgetype', icon: '🐦' },
    { name: 'Xbox', url: 'https://xbox.com/edgetype', icon: '🎮' },
    { name: 'Discord', url: 'https://discord.com/users/edgetype', icon: '💬' }
  ];

  const skills = [
    'Game Design',
    'Unreal Engine 4/5',
    'C#',
    'C++',
    'JavaScript',
    'Node.js',
    'Svelte'
  ];
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
          <p class="hero-subtitle">Game Designer & Developer</p>
          <p class="hero-nickname">EdgeTypE</p>
          
          <div class="hero-details">
            <div class="detail-item">
              <span class="detail-label">Yaş:</span>
              <span class="detail-value">{age}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Eğitim:</span>
              <span class="detail-value">Ege Üniversitesi - Bilgisayar Programcılığı</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Uzmanlik:</span>
              <span class="detail-value">Game Design, Unreal Engine</span>
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
// Dear programmer:
// When I wrote this code, only god and
// I knew how it worked.
// Now, only god knows it!
//
// Therefore, if you are trying to optimize
// this routine and it fails (most surely),
// please increase this counter as a
// warning for the next person:
//
// total_hours_wasted_here = {totalHoursWasted}
        </pre>
      </div>

      <!-- Yetenekler -->
      <div class="skills-section glass">
        <h3>Yetenekler</h3>
        <div class="skills-grid">
          {#each skills as skill}
            <div class="skill-tag">
              {skill}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
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