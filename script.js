// Hardcoded username & password
const USER = "admin";
const PASS = "1234";

// Login function
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === USER && password === PASS) {
    localStorage.setItem("loggedIn", "true"); // store login flag
    alert("Login successful ✅");
    // redirect to main app page (later you can use main.html)
    window.location.href = "main.html";
  } else {
    alert("❌ Invalid username or password");
  }
}
