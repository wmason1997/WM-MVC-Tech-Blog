module.exports = {
  format_date: (date) => {
    if (!date) {
        return '';
    }
    return new Date(date).toLocaleDateString();
},
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
    
    // Might want to remove or re-work get_emoji helper entirely. Will circle back
    // get_emoji: () => {
    //   const randomNum = Math.random();
  
    //   // Return a random emoji
    //   if (randomNum > 0.7) {
    //     return `<span for="img" aria-label="lightbulb">💡</span>`;
    //   } else if (randomNum > 0.4) {
    //     return `<span for="img" aria-label="laptop">💻</span>`;
    //   } else {
    //     return `<span for="img" aria-label="gear">⚙️</span>`;
    //   }
    // },
    list_all_comments_on_given_blog: (comments, blogId) => {
      if (!Array.isArray(comments)) {
          return [];
      }
      return comments.filter(comment => comment.blog_id === blogId);
  },

  
  };