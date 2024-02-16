const newCommentHandler = async (event) => {
    event.preventDefault();

    // Extracting the id from the URL
    const pathArray = window.location.pathname.split('/');
    const blog_id = pathArray[pathArray.length - 1];

    const comment_body = document.querySelector('#new-comment-id').value.trim();

    if(comment_body) {
        const response = await fetch(`/api/blogs/${blog_id}/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment_body, blog_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert('Failed to add comment');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);
});
