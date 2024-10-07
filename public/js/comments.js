document.querySelector(".new-comment-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const form = event.target;
    const postId = form.dataset.postid;
    const body = form.body.value;

    fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            postId,
            body,
        }),
    })
        .then(function (response) {
            if (response.ok) {
                document.location.reload();
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            if (data) {
                showMessage(data.message, "danger");
            }
        })
        .catch(function (error) {
            showMessage(error.message, "danger");
        });
});