// Hardcoded username & password
const USERNAME = "sanjana";   
const PASSWORD = "12345";  

// Login function
function isLoggedIn() {
  return localStorage.getItem(LOGIN_KEY) === 'true';
}
function setLoggedIn(flag) {
  localStorage.setItem(LOGIN_KEY, flag ? 'true' : 'false');
  renderAuth();
}
function renderAuth() {
  if (isLoggedIn()) {
    loginScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    loadParts();
    renderParts();
    populateCategoryFilter();
  } else {
    loginScreen.classList.remove('hidden');
    mainApp.classList.add('hidden');
  }
}
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const u = document.querySelector('#username').value.trim();
  const p = document.querySelector('#password').value;
  if (u === USERNAME && p === PASSWORD) {
    setLoggedIn(true);
    loginError.classList.add('hidden');
    loginForm.reset();
  } else {
    loginError.classList.remove('hidden');
  }
});
logoutBtn.addEventListener('click', () => setLoggedIn(false));

