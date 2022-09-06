const newComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim()
    const post_id = location.toString().split('/')[ location.toString().split('/').length -1 ]

    if (comment) {
        const comments = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (comments.ok) {
            document.location.reload();
        } else {
            alert(comments.statusText);
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', newComment)