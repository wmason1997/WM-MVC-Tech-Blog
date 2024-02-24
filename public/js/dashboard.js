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

// Update View function to be used whenever toggled between editing and saving states
function updateView(data) {
  // Clear the current view
  clearView();

  // Update the view based on the data
  data.forEach(item => {
      const element = document.createElement('div');
      element.textContent = item.name;
      document.getElementById('app').appendChild(element);
  });
}

function clearView() {
  const appElement = document.getElementById('app');
  if (appElement) {
      while (appElement.firstChild) {
          appElement.removeChild(appElement.firstChild);
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
  console.log("Inside editPost", {id, editing_value });
  //document.location.replace('/dashboard');
  // Render the updated view

  // Fetch the updated data for the post with the given ID
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'GET', 
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updatedPost = await response.json();

  //Render the updated view with the new data
  updateView([updatedPost]);
};


const saveChanges = async (id) => {
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
      editing_value = 0; // Reset editing flag
      updateView(); // Update the view after saving changes
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




