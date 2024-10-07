function showMessage( message, type ) {
    const alert = document.createElement("p");
    alert.textContent = message;
    alert.setAttribute("class", `alert alert-${type}`);
    document.querySelector(".messages").appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
   
}