const newPost = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector("#postTitle").value;
    const postContents = document.querySelector("#postContents").value;

    if (postTitle && postContents) {
        const response = await fetch(`/api/posts/dashboard`, {
            method: 'POST',
            body: JSON.stringify({
                postTitle,
                postContents,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("The blog post could not be created");
        }
    }
};

document.querySelector('.newPost')
.addEventListener('submit', newPost)