const { response } = require("express");

const deletePost = async (event) => {
    event.preventDefault();

    const id = location.toString().split('/')[ location.toString().split('/').length - 1 ];
    const deletePosts = await fetch (`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (deletePosts.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(deletePosts.statusText);
    }
}

document.querySelector('.deleteBtn').addEventListener('click', deletePost)