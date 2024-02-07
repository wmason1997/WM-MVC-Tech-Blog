const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment_body = document.querySelector('#new-comment-id').value.trim();

    if(comment_body) {
        const response = await fetch(`/api/blogs/${id}/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment_body }),
            headers: {
                'Content-Type': 'application/javascript',
            },
        });

        if (response.ok) {
            document.location.replace(`/blog/${id}`);
        } else {
            alert('Failed to add comment');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler)