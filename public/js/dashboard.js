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



// New function for handling the click event on the "Edit" button
const editPost = async (id) => {
  console.log(`Editing post with ID: ${id}`)
  const response = await fetch(`/blogs/${id}`);
  const blog = await response.json();

  // Set the editing flag for the specific blog to true
  blog.editing = true;

  // Render the updated view
  updateView();
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
      // Set editing back to false after successfully saving changes
      blog.editing = false;
      updateView();
    } else {
      alert('Failed to save changes');
    }
  }
};

const addEventListeners = () => {
  // Event listener for the "Create" button
  document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);

  // Event listener for the "Delete" buttons in the blog list
  const deleteButtons = document.querySelectorAll('.btn-danger');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-del-id')) {
        delButtonHandler(event);
      }
    });
  });

  // Event listener for the "Edit" buttons in the blog list
  const editButtons = document.querySelectorAll('.post-title');
  
  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-edit-id')) {
            
      const id = event.target.id;
      editPost(id);
      console.log(id);
    }
  });

  // Event listener for the "Save Changes" button (if present)
  document.querySelector('.blog-list').addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-save-id')) {
      const id = event.target.getAttribute('data-save-id');
      saveChanges(id);
    }
  });
});


// Function to update the view based on the data
const updateView = async (id) => {
  id = 1;
  const response = await fetch(`/api/blogs/${id}`);
  const data = await response.json();
  //const template = Handlebars.compile(document.getElementById('template').innerHTML);
  //document.getElementById('app').innerHTML = template(data);


};

addEventListeners();


}
//updateView(id)
