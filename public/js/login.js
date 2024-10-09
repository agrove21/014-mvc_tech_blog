document
  .querySelector(".sign-up-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log("success");
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

document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
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
