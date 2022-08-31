const newComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('textarea[name="comment"]').value.trim()
    const postID = location.toString().split('/')[ location.toString().split('/').length -1 ]

    if (comment) {
        const comments = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postID,
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

document.querySelector('.newPost').addEventListener('submit', newComment)