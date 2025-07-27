// Blog yazıları verisi
export const blogPosts = [
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
          Adım <strong>Çağrı Dürü</strong>, 29 Mart 2005 doğumluyum. EdgeTypE nickname'iyle 
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