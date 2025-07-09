// GDB Easy Comment service integration
class CommentService {
  constructor() {
    this.baseUrl = 'https://auth.goygoyengine.com/api/easycomment/v1';
    this.rateLimitDelay = 1000; // 1 second between requests
    this.lastRequestTime = 0;
  }

  // Rate limiting helper
  async rateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.rateLimitDelay) {
      const delay = this.rateLimitDelay - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastRequestTime = Date.now();
  }

  // Get comments for a specific URL
  async getComments(url) {
    try {
      await this.rateLimit();
      
      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(`${this.baseUrl}/comments?comment_url=${encodedUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('🐛 DEBUG - API Response for getComments:', data);
      console.log('🐛 DEBUG - Response type:', typeof data, 'Array:', Array.isArray(data));
      if (Array.isArray(data) && data.length > 0) {
        console.log('🐛 DEBUG - First comment structure:', data[0]);
      }
      return this.formatComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  // Add a new comment
  async addComment(url, username, text, replyToId = null) {
    try {
      await this.rateLimit();
      
      const commentData = {
        comment_url: url,
        username: username || 'Anonymous',
        text: text.trim(),
        answer_comment_id: replyToId
      };

      const response = await fetch(`${this.baseUrl}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('🐛 DEBUG - API Response for addComment:', data);
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Format comments into a hierarchical structure
  formatComments(comments) {
    if (!Array.isArray(comments)) {
      return [];
    }

    const commentMap = new Map();
    const rootComments = [];

    // First pass: create comment objects and map them
    comments.forEach(comment => {
      console.log('🐛 DEBUG - Processing comment:', comment);
      const formattedComment = {
        id: comment.comment_id, // FIX: API uses comment_id not id
        username: comment.username || 'Anonymous',
        text: comment.text,
        timestamp: comment.timestamp, // FIX: API only has timestamp
        replies: [],
        parentId: comment.answer_comment_id || null
      };
      
      console.log('🐛 DEBUG - Formatted comment:', formattedComment);
      commentMap.set(comment.comment_id, formattedComment); // FIX: Use comment_id
    });

    // Second pass: build hierarchy
    commentMap.forEach(comment => {
      if (comment.parentId && commentMap.has(comment.parentId)) {
        // This is a reply, add it to parent's replies
        commentMap.get(comment.parentId).replies.push(comment);
      } else {
        // This is a root comment
        rootComments.push(comment);
      }
    });

    // Sort comments by timestamp (newest first)
    rootComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Sort replies by timestamp (oldest first for better conversation flow)
    rootComments.forEach(comment => {
      comment.replies.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });

    return rootComments;
  }

  // Get current page URL for comments
  getCurrentPageUrl() {
    return window.location.href;
  }

  // Validate comment input
  validateComment(username, text) {
    const errors = [];

    if (!text || text.trim().length === 0) {
      errors.push('Comment text is required');
    }

    if (text && text.trim().length > 1000) {
      errors.push('Comment text must be less than 1000 characters');
    }

    if (username && username.length > 50) {
      errors.push('Username must be less than 50 characters');
    }

    return errors;
  }

  // Format timestamp for display
  formatTimestamp(timestamp) {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) {
        return 'Just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString();
      }
    } catch (error) {
      return 'Unknown time';
    }
  }

  // Sanitize HTML content (basic implementation)
  sanitizeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Check if comments are enabled
  async checkStatus() {
    try {
      const response = await fetch(`${this.baseUrl}/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return response.ok;
    } catch (error) {
      console.warn('Comment service status check failed:', error);
      return false;
    }
  }
}

// Create singleton instance
export const commentService = new CommentService();

// Helper functions for components
export async function loadComments(url = null) {
  const targetUrl = url || commentService.getCurrentPageUrl();
  return commentService.getComments(targetUrl);
}

export async function postComment(username, text, replyToId = null, url = null) {
  const targetUrl = url || commentService.getCurrentPageUrl();
  const errors = commentService.validateComment(username, text);
  
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
  
  return commentService.addComment(targetUrl, username, text, replyToId);
}

export function formatCommentTime(timestamp) {
  return commentService.formatTimestamp(timestamp);
}