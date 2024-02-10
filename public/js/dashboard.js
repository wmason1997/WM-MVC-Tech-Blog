const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-name').value.trim();
    const content = document.querySelector('#blog-desc').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
    }
  };
  
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-del-id')) {
      const id = event.target.getAttribute('data-del-id');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

const addCommentHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector('.new-comment-body').value.trim();
}

// Add editBlogHandler
const editBlogHandler = async (event) => {
  if (event.target.hasAttribute('data-edit-id')) {
    const id = event.target.getAttribute('data-edit-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit blog');
    }
  }
};


  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);

// add editBlogHandler
