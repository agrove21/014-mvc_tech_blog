function showMessage( message, type ) {
    const alert = document.createElement("p");
    alert.textContent = message;
    alert.setAttribute("class", `alert alert-${type}`);
    document.querySelector(".messages").appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
   
}

let idleTime = 0;
const idleLimit = 60 * 1000; // 1 minutes
let idleTimer;

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        console.log("You are idle for 1 minute");
    }, idleLimit);
}

function setupIdleTimer() {
    document.addEventListener("mousemove", resetIdleTimer);
    document.addEventListener("keypress", resetIdleTimer);
    document.addEventListener("scroll", resetIdleTimer);
    document.addEventListener("click", resetIdleTimer);
    resetIdleTimer();
}

window.onload = setupIdleTimer;