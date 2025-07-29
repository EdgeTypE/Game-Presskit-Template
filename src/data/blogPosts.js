// Blog yazıları verisi
export const blogPosts = [
    {
    id: 'space-game-devlog-1',
    title: 'Space Game | Devlog #1',
    'title-tr': 'Uzay Oyunu | Geliştirici Günlüğü #1',
    excerpt: 'The beginning of a new 2D space exploration game built from scratch in C++ and SFML, inspired by hard sci-fi and cosmic horror. This is the first devlog of my journey.',
    'excerpt-tr': 'C++ ve SFML ile sıfırdan geliştirilen, hard scifi ve kozmik korkudan ilham alan yeni bir 2D uzay keşif oyununun başlangıcı. Bu, yolculuğumun ilk geliştirici günlüğü.',
    image: 'https://cdn.goygoyengine.com/images/1753778262594-f0ceed169cfbef90.png',
    alt: 'A screenshot of the 2D space game showing a star system with a central star, orbiting planets, and the player ship.',
    'alt-tr': '2D uzay oyunundan bir yıldız sistemini gösteren ekran görüntüsü. Merkezi bir yıldız, yörüngedeki gezegenler ve oyuncu gemisi görünüyor.',
    created: new Date('2025-07-29T10:00:00Z'),
    updated: new Date('2025-07-29T10:00:00Z'),
    tags: ['Devlog', 'Game Development', 'C++', 'SFML', 'Indie Dev', 'Sci-Fi', 'Procedural Generation'],
    'tags-tr': ['Geliştirici Günlüğü', 'Oyun Geliştirme', 'C++', 'SFML', 'Bağımsız Geliştirici', 'Bilim Kurgu', 'Prosedürel Üretim'],
    content: `
      <div class="blog-content">
        <p class="lead">
          I've been searching for a new project, something to truly pour my passion into. This is the first development log for my new 2D space exploration game, built from the ground up with C++ and SFML.
        </p>

        <h2>From Inspiration to a Concept</h2>
        <p>
          The catalyst came after I finished Alastair Reynolds' Merlin series. I was captivated by its core concept of a solitary traveler on a continuous journey through the cosmos, sporadically encountering other travelers, artifacts, or entire civilizations. I immediately thought this narrative structure would be perfect for a game, almost like a more grounded, <strong>hard sci-fi version of Rick and Morty's</strong> episodic adventures.
        </p>
        <p>
          My goal is to take this structure and infuse it with my own interests: realistic science fiction and a palpable sense of cosmic horror. This led to the design of the game.
        </p>

        <h2>Choosing the Hard Path: C++ and SFML</h2>
        <p>
          My usual tool of choice is Unreal Engine, but for this project, it felt like using a sledgehammer to crack a nut. After considering other engines, I opted for a more foundational approach: building it from scratch with <strong>C++ and the SFML library</strong>. This grants complete control and ensures the game's core is as lean and deliberate as its design philosophy.
        </p>

        <h2>Phase 1: A Universe of Infinite Possibilities</h2>
        <p>
          The first step was a simple ship that could move freely. The real challenge was crafting the void itself. I want the player to be unable to predict what lies in the next sector, to feel the awe and fear of infinite space and its infinite possibilities.
        </p>
        <p>
          In our own world, who can guarantee we won't face a cosmic event tomorrow that is beyond our comprehension? Who's to say that after spreading to the stars for thousands of years, we won't encounter our own Reapers (a nod to Mass Effect)? To evoke this feeling, a <strong>chunk-based procedural generation system</strong>, much like in roguelike games, is the perfect mechanical heart for that uncertainty.
        </p>
        
        <h2>Phase 2: Celestial Bodies and Placeholder Orbits</h2>
        <p>
          With the canvas of space laid out, I began to populate it. I started by implementing a base <code>CelestialBody</code> class, from which <code>Star</code> and <code>Planet</code> classes are derived. This allows for a variety of celestial types, forming the building blocks of star systems. To bring these systems to life, I've implemented a temporary, <strong>kinematic orbit system</strong>. It's a placeholder, but it's crucial for visualizing planetary motion while I architect the more complex, physics-driven systems to come.
        </p>

        <img src="https://cdn.goygoyengine.com/images/1753778281145-e80cf7af4a3f2e6c.png" alt="A screenshot of the 2D space game showing a star system with a central star, orbiting planets, and the player ship." class="blog-image" style="    max-width: 100%; height: auto; border-radius: var(--radius-md);margin-top: var(--spacing-lg);box-shadow: var(--shadow-md);">

        <h2>Phase 3: The Gravity of the Situation and an Emergent Discovery</h2>
        <p>
          Gravity is a cornerstone of this game's design. It's a fundamental, mysterious force that shapes our universe and time itself. After implementing a gravitational pull that affects the player's ship, something wonderful occurred.
        </p>
        <p>
          It was a true moment of emergent design. By simply implementing the core physics of gravitational pull and ship acceleration, a <strong>slingshot effect (gravity assist) emerged naturally</strong>. I hadn't explicitly coded a "slingshot" function; it was an organic consequence of the systems working together. It’s incredibly rewarding to see foundational mechanics give rise to such complex and realistic behaviors on their own.
        </p>

        <h2>Next Steps</h2>
        <p>
          Currently, gravity only affects the player. The next major step is to evolve the placeholder orbits into a dynamic physics system where celestial objects influence each other gravitationally, creating a truly living star system. This is a passion project I'm developing in my spare time, and I look forward to sharing more progress as it happens.
        </p>
      </div>
    `,
    'content-tr': `
      <div class="blog-content">
        <p class="lead">
          Canım sıkılmıştı ve yapacak bir şey arıyordum. Bu, C++ ve SFML ile sıfırdan geliştirdiğim yeni 2D uzay keşif oyunumun ilk geliştirici günlüğü.
        </p>

        <h2>İlhamdan Konsepte</h2>
        <p>
          Fikir, Alastair Reynolds'ın Merlin serisini bitirdikten sonra geldi. Evrende sürekli bir yolculukta olan, ara sıra diğer gezginlerle, yapılarla veya medeniyetlerle karşılaşan yalnız bir gezgin konsepti etkileyici geldi. Bu konseptin bir oyun için mükemmel olacağını düşündüm; adeta <strong>Rick and Morty'nin</strong> bölümlük maceralarının daha ayakları yere basan, daha sert bir bilim kurgu versiyonu gibi.
        </p>
        <p>
          Amacım bu yapıyı alıp gerçekçi bir kozmik bilim kurgu oyunu yapmak.
        </p>

        <h2>Oyun Motoru Seçimi</h2>
        <p>
          Normalde ben Unreal Engine'ciyimdir, ancak bu proje için onu kullanmak orantısız güç gibi geldi. Godot, Unity gibi diğer oyun motorlarını düşündükten sonra daha temel bir yaklaşımı seçtim: <strong>C++ ve SFML kütüphanesiyle</strong> sıfırdan başlamak. Bu, hem oyun üzerinde tam kontrolümün olmasını sağlayacaktı, hem de potansiyel olarak daha optimize bir şey ortaya koyabilmemi sağlayacaktı. 
        </p>

        <h2>Aşama 1: Sonsuz Olasılıklar Evreni</h2>
        <p>
          İlk başta her yöne gidebilen basit bir karakter oluşturdum. Sonrasında uzay boşluğunu olusturmaya başladım. Oyuncu, bir sonraki bölgede ne olacağını tahmin edemesin ve sonsuz uzayın sonsuz olasılıklarından korksun istiyordum. 
        </p>
        <p>
          Kendi dünyamızda, yarın aklımızın alamayacağı bir kozmik olay yaşamayacağımızın garantisini kim verebilir? Binlerce yıl sonra gezegenlere, yıldızlara yayıldıktan sonra kendi Reaper'larımızla (Mass Effect oynayın) karşılaşmayacağımızı kim bilebilir? Bu duyguyu vermek için, roguelike oyunlardakine benzer bir harita/keşif sistemi yapmaya karar verdim. <strong>Chunk tabanlı bir prosedürel dünya oluşumu</strong> ile her seferinde farklı dünyalarımız olacak ve oyuncu uzayı keşfedecek.
        </p>

        <h2>Aşama 2: Gök Cisimleri ve Geçici Yörüngeler</h2>
        <p>
          Uzay kabaca hazır olduğunda, onu doldurmaya başladım. Temel bir <code>CelestialBody</code> sınıfı hazırladım ve onlardan <code>Star</code> ve <code>Planet</code> sınıflarını oluşturdum. Böylece temel gök cisimlerinin yapılarını oluşturmuş oldum. Yıldız sistemlerini harekete geçirmek için geçici, <strong>kinematik bir yörünge sistemi</strong> hazırladım. İleride fizik tabanlı dinamik bir yörünge sistemi hazırlayana kadar geçici olarak kinematik bu sistemi kullanacağım.
        </p>

        <img src="https://cdn.goygoyengine.com/images/1753778281145-e80cf7af4a3f2e6c.png" alt="A screenshot of the 2D space game showing a star system with a central star, orbiting planets, and the player ship." class="blog-image" style="    max-width: 100%; height: auto; border-radius: var(--radius-md);margin-top: var(--spacing-lg);box-shadow: var(--shadow-md);">


        <h2>Aşama 3: Kütle Çekimi</h2>
        <p>
Sırada yerçekimi sistemi vardı. Yer çekimi oyunun en temel fonksiyonlarından biri olacaktı. Yerçekimi(kütle çekimi) günümüz biliminde de hala tamamen çözemediğimiz gizemli bir evrensel gerçek. Gravitonları hala gözlemleyemedik. Kütle çekimi aynı zamanda zamanın da temel yapı taşı. Böyle bir oyunda göreli zaman da önemli bir yer kaplamalı. Bu yüzden sağlam bir yer çekimi sistemi yapmam gerekiyordu. Bir sürelik çalışmanın ardından yer çekimini ekledim. Hiç fark etmemiştim ama bu sayede doğal olarak sapan etkisini de oyuna eklemiş oldum. Sonuçta sapan etkisi dediğimiz şey de sadece ivme ve yer çekimi. 
        </p>
        <p>
Yer çekimi eklemenin, sapan etkisi ekleyeceğini bir anlık fark etmemiştim. Keyifli bir andı. Yer çekimi sistemi şimdilik sadece oyuncuya etki ediyor. Gök cisimleri, birbirlerinin kütle çekiminden şimdilik etkilenmiyor. Tüm bunlarda ileriki aşamada dinamik yörünge sisteminin bir parçası olacaklar.
        </p>

        <h2>Sonraki Adımlar</h2>
        <p>
Boş zamanlarımda oyunu geliştirmeyi ve geliştirdikçe buradan paylaşmayı planlıyorum. Umuyorum. 

        </p>
      </div>
    `
  },
  {
    id: 'hello-world',
    title: 'Hello World!',
    'title-tr': 'Merhaba Dünya!',
    excerpt: 'Probably i need to write something about myself, my blog and what i will share here.',
    'excerpt-tr': 'Muhtemelen buraya kendim, blogum ve burada neler paylaşacağım hakkında bir şeyler yazmam gerekiyor.',
    image: '/assets/images/game-icon.png',
    alt: 'Hello World Blog Post',
    'alt-tr': 'Hello World Blog Yazısı',
    created: new Date('2025-07-28T00:00:00Z'),
    updated: new Date('2025-07-28T12:00:00Z'),
    tags: ['Hello World', 'Beginnings', 'Blog', 'Personal'],
    'tags-tr': ['Merhaba Dünya', 'Başlangıç', 'Blog', 'Kişisel'],
    content: `
      <div class="blog-content">
        <p class="lead">
          Welcome to my blog + CV + portfolio site. 
        </p>

        <h2>Who Am I?</h2>

        <p>
          My name is <strong>Çağrı Dürü</strong>, born on March 29, 2005, you can find me on various platform as EdgeTypE. I am creating game reviews, how games develop on YouTube. Writing something on <a href="https://goygoyengine.com">goygoyengine.com</a> and developing games with Unreal Engine 5.
        </p>

        <p>
          I'm especially expert in <strong>Unreal Engine 4/5</strong> in game development. I'm also 
          proficient in C#, C++, JavaScript, Node.js and Svelte. 
        </p>

        <h2>What Will You Find in This Blog?</h2>

        <p>
          In this blog, I plan to share devlogs about the projects I develop. In addition, I plan to write about extremely specific technical topics that nobody cares about. Solutions to problems in 10-year-old threads on Reddit or forums, for people who have the same issue as you, etc. Maybe more.
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

        <h2>My Projects and Goals</h2>

        <p>
          You can find various projects of mine on my GitHub profile. I'm especially active in 
          game development and web technologies. This blog actually started as a Svelte project 
          and was converted from a presskit template to a CV site. You can still find the press kit version on my GitHub.
        </p>

        <h2>Contact</h2>

        <p>
          If you want to get in touch with me, you can reach me through my social media accounts:
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
              <a href="mailto:edgetype@goygoyengine.com" class="social-link">
      📧 Email
    </a>
        </div>

        <p>
          Thank you for reading this post!
        </p>
      </div>
    `,
    'content-tr': `
 <div class="blog-content">
  <p class="lead">
    Bloguma, CV’me ve portfolyoma hoş geldin!
  </p>

  <h2>Ben Kimim?</h2>

  <p>
    Ben <strong>Çağrı Dürü</strong>. 29 Mart 2005 doğumluyum. Beni <strong>EdgeTypE</strong> kullanıcı adıyla çeşitli platformlarda bulabilirsiniz. YouTube’da oyun incelemeleri yapıyor, oyunların nasıl geliştirildiğini anlatıyorum. Aynı zamanda <a href="https://goygoyengine.com">goygoyengine.com</a> sitesinde yazılar yazıyor ve Unreal Engine 5 ile oyunlar geliştiriyorum.
  </p>

  <h2>Bu Blogda Neler Bulacaksın?</h2>

  <p>
    Bu blogda geliştirdiğim projelere dair devlog'lar paylaşmayı planlıyorum. Ayrıca kimsenin umurunda olmayan gereksiz seviyede teknik detaylı yazılar yazmayı düşünüyorum.
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

  <h2>Projelerim ve Hedeflerim</h2>

  <p>
    GitHub profilimde çeşitli projelerimi bulabilirsiniz. Aslında bu blog, ilk başta bir Svelte projesi olarak başladı; bir presskit şablonundan CV sitesine dönüştü. Eski presskit versiyonu hala GitHub'da duruyor, dilerseniz göz atabilirsiniz.
  </p>

  <h2>İletişim</h2>

  <p>
    İletişime geçmek için aşağıdaki sosyal medya hesaplarım üzerinden ulaşabilirsiniz:
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
    <a href="mailto:edgetype@goygoyengine.com" class="social-link">
      📧 Email
    </a>
  </div>

  <p>
    Okuduğunuz için teşekkürler!
  </p>
</div>

    `
  }
];