const newPost = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('input[name="postTitle"]').value;
    const postURL = document.querySelector('input[name="postURL"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            postTitle,
            postURL
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.newPost').addEventListener('submit', newPost)