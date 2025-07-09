<script>
  import { onMount } from 'svelte';
  
  let progress = 0;
  let loadingText = 'Loading';
  
  const loadingMessages = [
    'Loading game data...',
    'Initializing theme...',
    'Preparing content...',
    'Almost ready...'
  ];
  
  onMount(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      // Update loading message based on progress
      const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
      loadingText = loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)];
    }, 200);
    
    return () => clearInterval(interval);
  });
</script>

<div class="loading-container">
  <div class="loading-content glass-card">
    <!-- Logo/Icon -->
    <div class="loading-icon">
      <div class="spinner"></div>
    </div>
    
    <!-- Loading Text -->
    <h2 class="loading-title gradient-text">{loadingText}</h2>
    
    <!-- Progress Bar -->
    <div class="progress-container">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          style="width: {progress}%"
        ></div>
      </div>
      <span class="progress-text">{Math.round(progress)}%</span>
    </div>
    
    <!-- Animated dots -->
    <div class="loading-dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  
  <!-- Background animation -->
  <div class="bg-animation">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>
</div>

<style>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    overflow: hidden;
  }

  .loading-content {
    text-align: center;
    padding: var(--spacing-3xl) var(--spacing-2xl);
    max-width: 400px;
    width: 90%;
    position: relative;
    z-index: 2;
  }

  .loading-icon {
    margin-bottom: var(--spacing-lg);
    display: flex;
    justify-content: center;
  }

  .spinner {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: relative;
  }

  .spinner::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 2px solid transparent;
    border-top: 2px solid var(--secondary-color);
    border-radius: 50%;
    animation: spin 2s linear infinite reverse;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
    min-height: 1.5em;
  }

  .progress-container {
    margin-bottom: var(--spacing-lg);
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: var(--spacing-sm);
    position: relative;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border-radius: 2px;
    transition: width 0.3s ease;
    position: relative;
  }

  .progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .progress-text {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    font-weight: 500;
  }

  .loading-dots {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
  }

  .dot {
    width: 8px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
  .dot:nth-child(3) { animation-delay: 0s; }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Background animation */
  .bg-animation {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--primary-color);
    border-radius: 50%;
    opacity: 0.3;
    animation: float 6s infinite linear;
  }

  .particle:nth-child(1) {
    left: 10%;
    animation-delay: 0s;
    animation-duration: 6s;
  }

  .particle:nth-child(2) {
    left: 30%;
    animation-delay: 1s;
    animation-duration: 8s;
  }

  .particle:nth-child(3) {
    left: 50%;
    animation-delay: 2s;
    animation-duration: 7s;
  }

  .particle:nth-child(4) {
    left: 70%;
    animation-delay: 3s;
    animation-duration: 9s;
  }

  .particle:nth-child(5) {
    left: 90%;
    animation-delay: 4s;
    animation-duration: 5s;
  }

  @keyframes float {
    0% {
      transform: translateY(100vh) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 0.3;
    }
    90% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(-100vh) scale(1);
      opacity: 0;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .loading-content {
      padding: var(--spacing-2xl) var(--spacing-lg);
    }
    
    .spinner {
      width: 50px;
      height: 50px;
    }
    
    .loading-title {
      font-size: var(--font-size-lg);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .spinner,
    .spinner::before,
    .dot,
    .particle {
      animation: none;
    }
    
    .progress-fill::after {
      animation: none;
    }
  }
</style>