<script>
  import { onMount } from 'svelte';

  let posts = [
    {
      id: 'hello-world',
      title: 'Hello World - Yeni Başlangıçlar',
      excerpt: 'Blog siteme hoş geldiniz! Bu benim ilk yazım ve burada neler paylaşacağım hakkında...',
      image: '/assets/images/game-icon.png',
      alt: 'Hello World Blog Yazısı',
      created: new Date('2024-01-27T00:00:00Z'),
      updated: new Date('2024-01-27T12:00:00Z'),
      tags: ['Hello World', 'Başlangıç', 'Blog', 'Kişisel'],
      content: `
        <div class="blog-content">
          <p class="lead">
            Blog siteme hoş geldiniz! Bu benim ilk yazım ve burada sizinle neler paylaşacağım, 
            hangi konularda yazılar yazacağım hakkında konuşmak istiyorum.
          </p>

          <h2>Kimim Ben?</h2>

          <p>
            Adım <strong>Çağrı Dürü</strong>, 29 Mart 2005 doğumluyum. EdgeTypE nickname'iyla 
            çeşitli platformlarda bulunabilirsiniz. Ege Üniversitesi Bilgisayar Programcılığı 
            bölümünden mezun oldum ve aslen bir game designer'ım.
          </p>

          <p>
            Oyun geliştirme konusunda özellikle <strong>Unreal Engine 4/5</strong> konusunda 
            uzman sayılabilirim. Ayrıca C#, C++, JavaScript, Node.js ve Svelte gibi dil ve 
            framework'lere de hakimim.
          </p>

          <h2>Bu Blog'da Neler Bulacaksınız?</h2>

          <p>Bu blog'da şu konularda yazılar paylaşmayı planlıyorum:</p>

          <ul>
            <li><strong>Oyun Tasarımı:</strong> Game design prensipleri, deneyimlerim ve öğrendiklerim</li>
            <li><strong>Unreal Engine:</strong> Tutorial'lar, ipuçları ve projelerimden örnekler</li>
            <li><strong>Programlama:</strong> Çeşitli dillerde kod örnekleri ve best practice'ler</li>
            <li><strong>Kişisel Deneyimler:</strong> Projelerimden hikayeler ve öğrenme süreçlerim</li>
            <li><strong>Teknoloji:</strong> Yeni araçlar, framework'ler ve trendler hakkında düşüncelerim</li>
          </ul>

          <h2>Kod ve Yaratıcılık</h2>

          <p>
            Programlama dünyasında herkesin bildiği bir gerçek var. Bazen kod yazarken o kadar 
            karmaşık hale getiriyoruz ki, daha sonra kendimiz bile anlayamıyoruz. Bu durumu 
            en güzel ifade eden şu klasik yorum beni her zaman güldürür:
          </p>

          <div class="code-block">
            <pre><code>// Dear programmer:
// When I wrote this code, only god and
// I knew how it worked.
// Now, only god knows it!
//
// Therefore, if you are trying to optimize
// this routine and it fails (most surely),
// please increase this counter as a
// warning for the next person:
//
// total_hours_wasted_here = 175310</code></pre>
          </div>

          <p>
            Bu yorumu GitHub profilimde tutuyorum ve her doğum günümde sayacı bir yıl artırıyorum. 
            Bu hem eğlenceli bir gelenek hem de programcıların ortak acısının bir sembolü! 😄
          </p>

          <h2>Projelerim ve Hedeflerim</h2>

          <p>
            GitHub profilimde çeşitli projelerimi bulabilirsiniz. Özellikle oyun geliştirme 
            ve web teknolojileri alanlarında aktif olarak çalışıyorum. Bu blog da aslında 
            bir Svelte projesi olarak başladı ve presskit template'inden CV sitesine dönüştü.
          </p>

          <p>
            Gelecekte daha fazla açık kaynak projeye katkıda bulunmayı, oyun geliştirme 
            topluluğuna faydalı içerikler üretmeyi ve kendi oyun projelerimi hayata geçirmeyi 
            hedefliyorum.
          </p>

          <h2>İletişim</h2>

          <p>
            Benimle iletişime geçmek istiyorsanız, sosyal medya hesaplarımdan ulaşabilirsiniz:
          </p>

          <div class="social-links">
            <a href="https://github.com/edgetype" target="_blank" rel="noopener noreferrer" class="social-link">
              🐙 GitHub
            </a>
            <a href="https://youtube.com/@edgetype" target="_blank" rel="noopener noreferrer" class="social-link">
              📺 YouTube
            </a>
            <a href="https://twitter.com/edgetype" target="_blank" rel="noopener noreferrer" class="social-link">
              🐦 Twitter
            </a>
          </div>

          <p>
            Bu yazıyı okuduğunuz için teşekkür ederim! Yakında yeni içeriklerle karşınızda 
            olacağım. Blog'u takipte kalın! 🚀
          </p>
        </div>
      `
    },
    {
      id: 'unreal-engine-tips',
      title: 'Unreal Engine 5 İpuçları',
      excerpt: 'Unreal Engine 5 ile geliştirme yaparken karşılaştığım sorunlar ve çözümleri...',
      image: '/assets/images/game-icon.png',
      alt: 'Unreal Engine Blog Yazısı',
      created: new Date('2024-01-20T00:00:00Z'),
      updated: new Date('2024-01-20T15:00:00Z'),
      tags: ['Unreal Engine', 'Game Development', 'Tips'],
      content: `
        <div class="blog-content">
          <p class="lead">
            Unreal Engine 5 ile oyun geliştirirken karşılaştığım yaygın sorunlar ve pratik çözümler.
          </p>

          <h2>Blueprint vs C++</h2>
          <p>
            Oyun geliştirme sürecinde Blueprint ve C++ arasında seçim yapmak önemli bir karardır.
            Blueprint'ler hızlı prototipleme için idealken, C++ performans kritik işlemler için gereklidir.
          </p>

          <h2>Optimizasyon İpuçları</h2>
          <ul>
            <li>LOD (Level of Detail) sistemlerini doğru kullanın</li>
            <li>Texture streaming'i optimize edin</li>
            <li>Gereksiz tick event'lerinden kaçının</li>
            <li>Object pooling kullanın</li>
          </ul>

          <div class="code-block">
            <pre><code>// C++ örnek optimizasyon
void AMyActor::BeginPlay()
{
    Super::BeginPlay();
    
    // Tick'i sadece gerektiğinde aktif et
    SetActorTickEnabled(false);
}</code></pre>
          </div>

          <p>
            Bu konularda daha detaylı yazılar yazacağım. Takipte kalın! 🎮
          </p>
        </div>
      `
    },
    {
      id: 'web-development-journey',
      title: 'Web Geliştirme Yolculuğum',
      excerpt: 'Oyun geliştirmeden web teknolojilerine geçiş sürecim ve öğrendiklerim...',
      image: '/assets/images/game-icon.png',
      alt: 'Web Development Blog Yazısı',
      created: new Date('2024-01-15T00:00:00Z'),
      updated: new Date('2024-01-15T18:00:00Z'),
      tags: ['Web Development', 'JavaScript', 'Svelte', 'Career'],
      content: `
        <div class="blog-content">
          <p class="lead">
            Oyun geliştirme geçmişimden web teknolojilerine nasıl adapte oldum ve bu süreçte neler öğrendim.
          </p>

          <h2>Neden Web Teknolojileri?</h2>
          <p>
            Oyun geliştirme deneyimim web geliştirmede büyük avantaj sağladı. Özellikle:
          </p>
          <ul>
            <li>Problem çözme becerileri</li>
            <li>Algoritma ve veri yapıları bilgisi</li>
            <li>Performans optimizasyonu</li>
            <li>Kullanıcı deneyimi tasarımı</li>
          </ul>

          <h2>Öğrendiğim Teknolojiler</h2>
          <p>
            Web geliştirme yolculuğumda odaklandığım temel teknolojiler:
          </p>
          <ul>
            <li><strong>JavaScript:</strong> Modern ES6+ özellikleri</li>
            <li><strong>Svelte:</strong> Reaktif ve performanslı UI geliştirme</li>
            <li><strong>Node.js:</strong> Backend geliştirme</li>
            <li><strong>CSS:</strong> Modern layout teknikleri</li>
          </ul>

          <p>
            Her iki alan da yaratıcılık ve teknik beceri gerektiriyor. Oyun geliştirmedeki deneyimim,
            web projelerinde de büyük fayda sağlıyor.
          </p>
        </div>
      `
    }
  ];

  let selectedPost = null;
  let showBlogList = true;

  function openPost(post) {
    selectedPost = post;
    showBlogList = false;
  }

  function closeBlog() {
    selectedPost = null;
    showBlogList = true;
  }

  function formatDate(date) {
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<section class="blog-section section" id="blog">
  <div class="container">
    {#if showBlogList}
      <!-- Blog Header -->
      <div class="blog-header text-center">
        <h2 class="gradient-text">Blog</h2>
        <p class="blog-subtitle">Düşüncelerim, deneyimlerim ve keşiflerim</p>
      </div>

      <!-- Blog Posts Grid -->
      <div class="posts-grid">
        {#each posts as post}
          <article class="post-card glass" on:click={() => openPost(post)}>
            <div class="post-image">
              <img src={post.image} alt={post.alt} />
              <div class="post-date">
                {formatDate(post.created)}
              </div>
            </div>
            
            <div class="post-content">
              <div class="post-tags">
                {#each post.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
              
              <h3 class="post-title">{post.title}</h3>
              
              <p class="post-excerpt">{post.excerpt}</p>
              
              <div class="post-meta">
                <span>Güncelleme: {formatDate(post.updated)}</span>
                <span class="read-more">Devamını Oku →</span>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {:else if selectedPost}
      <!-- Blog Post Detail -->
      <div class="blog-post">
        <header class="post-header">
          <button class="back-button glass" on:click={closeBlog}>
            ← Blog'a Dön
          </button>
          
          <h1 class="gradient-text">{selectedPost.title}</h1>
          
          <div class="post-meta-detail">
            <time datetime={selectedPost.created} class="post-date">
              {formatDate(selectedPost.created)}
            </time>
            
            <div class="post-tags">
              {#each selectedPost.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
          
          <div class="featured-image">
            <img src={selectedPost.image} alt={selectedPost.alt} />
          </div>
        </header>

        <div class="post-content-detail glass">
          {@html selectedPost.content}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .blog-section {
    padding: var(--spacing-3xl) 0;
  }

  .blog-header {
    margin-bottom: var(--spacing-3xl);
  }

  .blog-header h2 {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-5xl);
  }

  .blog-subtitle {
    font-size: var(--font-size-xl);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--spacing-xl);
  }

  .post-card {
    cursor: pointer;
    overflow: hidden;
    transition: all var(--transition-normal);
    height: fit-content;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  .post-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  .post-card:hover .post-image img {
    transform: scale(1.05);
  }

  .post-date {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--glass-bg);
    backdrop-filter: blur(8px);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: var(--text-primary);
    border: 1px solid var(--glass-border);
  }

  .post-content {
    padding: var(--spacing-xl);
  }

  .post-tags {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
  }

  .tag {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .post-title {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-xl);
    color: var(--text-primary);
  }

  .post-excerpt {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
  }

  .post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--border-color);
    font-size: var(--font-size-sm);
  }

  .post-meta span:first-child {
    color: var(--text-muted);
  }

  .read-more {
    color: var(--primary-color);
    font-weight: 600;
  }

  /* Blog Post Detail Styles */
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
  }

  .post-header {
    margin-bottom: var(--spacing-3xl);
  }

  .back-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    background: var(--glass-bg);
    color: var(--primary-color);
    cursor: pointer;
    transition: all var(--transition-fast);
    margin-bottom: var(--spacing-xl);
    font-size: var(--font-size-base);
  }

  .back-button:hover {
    color: var(--secondary-color);
    transform: translateY(-2px);
  }

  .post-header h1 {
    font-size: var(--font-size-5xl);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .post-meta-detail {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
    flex-wrap: wrap;
  }

  .post-meta-detail .post-date {
    position: static;
    background: none;
    border: none;
    padding: 0;
    color: var(--text-secondary);
    font-size: var(--font-size-lg);
  }

  .featured-image {
    width: 100%;
    height: 300px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }

  .featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .post-content-detail {
    padding: var(--spacing-3xl);
    line-height: 1.8;
  }

  /* Blog Content Styles */
  :global(.blog-content .lead) {
    font-size: var(--font-size-xl);
    color: var(--text-primary);
    margin-bottom: var(--spacing-2xl);
    text-align: center;
    font-weight: 500;
  }

  :global(.blog-content h2) {
    color: var(--primary-color);
    margin-top: var(--spacing-2xl);
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 2px solid var(--border-color);
  }

  :global(.blog-content ul) {
    margin: var(--spacing-lg) 0;
    padding-left: var(--spacing-xl);
  }

  :global(.blog-content li) {
    margin-bottom: var(--spacing-sm);
    color: var(--text-secondary);
  }

  :global(.blog-content strong) {
    color: var(--text-primary);
  }

  :global(.blog-content .code-block) {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    margin: var(--spacing-xl) 0;
    overflow-x: auto;
  }

  :global(.blog-content .code-block pre) {
    margin: 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: var(--font-size-sm);
    line-height: 1.4;
    color: var(--text-secondary);
  }

  :global(.blog-content .social-links) {
    display: flex;
    gap: var(--spacing-md);
    margin: var(--spacing-lg) 0;
    flex-wrap: wrap;
  }

  :global(.blog-content .social-link) {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
  }

  :global(.blog-content .social-link:hover) {
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .blog-header h2 {
      font-size: var(--font-size-4xl);
    }

    .blog-subtitle {
      font-size: var(--font-size-lg);
    }

    .posts-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }

    .post-content {
      padding: var(--spacing-lg);
    }

    .post-meta {
      flex-direction: column;
      gap: var(--spacing-sm);
      align-items: flex-start;
    }

    .post-header h1 {
      font-size: var(--font-size-3xl);
    }

    .post-meta-detail {
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .featured-image {
      height: 200px;
    }

    .post-content-detail {
      padding: var(--spacing-xl);
    }

    :global(.blog-content .lead) {
      font-size: var(--font-size-lg);
    }

    :global(.blog-content .social-links) {
      justify-content: center;
    }
  }
</style>