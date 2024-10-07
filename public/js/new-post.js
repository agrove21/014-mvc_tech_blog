document.querySelector("#new-post-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const content = form.content.value;

    fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            content,
        }),
    })
        .then(function (response) {
            if (response.ok) {
                document.location.replace("/dashboard");
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
