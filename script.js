//  CONFIG (set your login)
const USERNAME = "sanjana";   // 👈 change username here
const PASSWORD = "12345";     // 👈 change password here


  // ELEMENTS
const loginScreen = document.querySelector('#loginScreen');
const mainApp = document.querySelector('#mainApp');
const loginForm = document.querySelector('#loginForm');
const loginError = document.querySelector('#loginError');
const loginHint = document.querySelector('#loginHint');
const logoutBtn = document.querySelector('#logoutBtn');

const createForm = document.querySelector('#createForm');
const createError = document.querySelector('#createError');
const partsTable = document.querySelector('#partsTable');
const partsTbody = document.querySelector('#partsTbody');
const emptyState = document.querySelector('#emptyState');
const totalCount = document.querySelector('#totalCount');

const filterCategory = document.querySelector('#filterCategory');
const searchBox = document.querySelector('#searchBox');
const exportCSV = document.querySelector('#exportCSV');


//   STATE & STORAGE

let parts = [];
const STORAGE_KEY = 'inventory_parts';
const LOGIN_KEY = 'inventory_loggedIn';


  // AUTH
  
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
