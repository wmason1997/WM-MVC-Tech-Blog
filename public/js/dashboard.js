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

let editing_value=0; // Declare the editing variable

  // edit blog handler
const editPost = async (id) => {
  console.log(`Editing post with ID: ${id}`)
  //const response = await fetch(`/blog/${id}`);
  //const blog = await response.json();

  // Set the editing flag for the specific blog to true
  editing_value = id;
  console.log("Inside editPost");
  console.log( {id, editing_value });
  //document.location.replace('/dashboard');
  // Render the updated view
  // updateView();
};

  // save editable blog handler
const saveChanges = async (id) => {
  console.log("Inside saveChanges", { id, editing_value }); // log for debugging
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Set editing back to false after successfully saving changes
      blog.editing_value = 0; // Number not equal to any blogs
      //updateView();
    } else {
      alert('Failed to save changes');
    }
  }
};


  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);

  // edit blog document object model event listener
  document
    .querySelector('.post-title-edit')
    .addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-edit-id');
      editPost(id);
    });

  // save blog edits document object model event listener
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('post-title-save')) {
      const id = event.target.getAttribute('data-save-id');
      saveChanges(id);
    }
  });




