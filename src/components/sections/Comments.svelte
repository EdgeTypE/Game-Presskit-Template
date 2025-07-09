<script>
  import { onMount } from 'svelte';
  import { t } from '../../i18n/index.js';
  import { loadComments, postComment, formatCommentTime } from '../../utils/commentService.js';
  
  let comments = [];
  let loading = true;
  let error = null;
  let newComment = { username: '', text: '' };
  let submitting = false;
  
  onMount(async () => {
    await loadCommentsData();
  });
  
  async function loadCommentsData() {
    try {
      loading = true;
      comments = await loadComments();
      error = null;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
  
  async function handleSubmit() {
    if (!newComment.text.trim()) return;
    
    try {
      submitting = true;
      await postComment(newComment.username || 'Anonymous', newComment.text);
      newComment = { username: '', text: '' };
      await loadCommentsData();
    } catch (err) {
      error = err.message;
    } finally {
      submitting = false;
    }
  }
</script>

<section class="comments section">
  <div class="container">
    <h2 class="section-title gradient-text text-center">{$t('comments.title')}</h2>
    
    <!-- Add Comment Form -->
    <div class="comment-form glass-card">
      <h3>{$t('comments.addComment')}</h3>
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <input 
            type="text" 
            placeholder={$t('comments.username')}
            bind:value={newComment.username}
            class="glass-input"
          />
        </div>
        <div class="form-group">
          <textarea 
            placeholder={$t('comments.commentText')}
            bind:value={newComment.text}
            class="glass-input"
            rows="4"
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          class="glass-button btn-magnetic"
          disabled={submitting || !newComment.text.trim()}
        >
          {submitting ? 'Submitting...' : $t('comments.submit')}
        </button>
      </form>
    </div>
    
    <!-- Comments List -->
    <div class="comments-list">
      {#if loading}
        <div class="loading-state">
          <p>{$t('comments.loading')}</p>
        </div>
      {:else if error}
        <div class="error-state glass-card">
          <p>{$t('comments.error')}: {error}</p>
          <button class="glass-button" on:click={loadCommentsData}>
            {$t('common.tryAgain')}
          </button>
        </div>
      {:else if comments.length === 0}
        <div class="empty-state glass-card">
          <p>{$t('comments.noComments')}</p>
        </div>
      {:else}
        {#each comments as comment}
          <div class="comment glass-card">
            <div class="comment-header">
              <span class="comment-author">{comment.username}</span>
              <span class="comment-time">{formatCommentTime(comment.timestamp)}</span>
            </div>
            <p class="comment-text">{comment.text}</p>
            
            {#if comment.replies?.length > 0}
              <div class="comment-replies">
                {#each comment.replies as reply}
                  <div class="comment reply">
                    <div class="comment-header">
                      <span class="comment-author">{reply.username}</span>
                      <span class="comment-time">{formatCommentTime(reply.timestamp)}</span>
                    </div>
                    <p class="comment-text">{reply.text}</p>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  .comments {
    padding: var(--spacing-3xl) 0;
  }

  .comment-form {
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-3xl);
  }

  .comment-form h3 {
    margin-bottom: var(--spacing-lg);
    color: var(--primary-color);
  }

  .form-group {
    margin-bottom: var(--spacing-lg);
  }

  .glass-input {
    width: 100%;
    resize: vertical;
  }

  .glass-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .comments-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .comment {
    padding: var(--spacing-xl);
  }

  .comment.reply {
    margin-left: var(--spacing-xl);
    margin-top: var(--spacing-md);
    border-left: 2px solid var(--primary-color);
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .comment-author {
    font-weight: 600;
    color: var(--primary-color);
  }

  .comment-time {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }

  .comment-text {
    line-height: 1.6;
    margin: 0;
  }

  .comment-replies {
    margin-top: var(--spacing-lg);
  }

  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
  }

  .error-state {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .empty-state {
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 768px) {
    .comment.reply {
      margin-left: var(--spacing-md);
    }
    
    .comment-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xs);
    }
  }
</style>