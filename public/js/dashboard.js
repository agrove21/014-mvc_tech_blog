document.querySelector(".delete-post-btn").addEventListener("click", function (event) {
    const id = event.target.dataset.id;
    fetch(`/api/posts/${id}`, {
        method: "DELETE",
    })
        .then(function (response) {
            if (response.ok) {
                document.location.replace("/dashboard");
            }   
        })

        .catch(function (error) {
            showMessage(error.message, "danger");
        });
});

