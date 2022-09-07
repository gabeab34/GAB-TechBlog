async function editFormHandler(event) {
    event.preventDefault();

    const postTitle = document.querySelector('input[name="postTitle"]').value.trim();
    const postContents = document.querySelector('input[name="postContents"]').value.trim();


    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          postTitle: postTitle,
          postContents: postContents
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

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);