//CONFIG (set your login)
   
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

//  STATE & STORAGE
 
let parts = [];
const STORAGE_KEY = 'inventory_parts';
const LOGIN_KEY = 'inventory_loggedIn';

//AUTH
   

function isLoggedIn() {
  return sessionStorage.getItem(LOGIN_KEY) === 'true';
}
function setLoggedIn(flag) {
  sessionStorage.setItem(LOGIN_KEY, flag ? 'true' : 'false');
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

// PARTS CRUD

function loadParts() {
  parts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
function saveParts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parts));
}
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#partName').value.trim();
  const category = document.querySelector('#partCategory').value.trim();
  const qty = Number(document.querySelector('#partQuantity').value);
  const location = document.querySelector('#partLocation').value.trim();
  const notes = document.querySelector('#partNotes').value.trim();
  if (!name || !category || !Number.isFinite(qty) || qty < 0) {
    createError.classList.remove('hidden');
    return;
  }
  createError.classList.add('hidden');
  const part = { id: Date.now().toString(), name, category, qty, location, notes };
  parts.unshift(part);
  saveParts();
  createForm.reset();
  renderParts();
  populateCategoryFilter();
});

// RENDER TABLE
function renderParts() {
  const q = searchBox.value.trim().toLowerCase();
  const catFilter = filterCategory.value;
  const filtered = parts.filter(p => {
    if (catFilter && p.category !== catFilter) return false;
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      (p.notes && p.notes.toLowerCase().includes(q))
    );
  });
  partsTbody.innerHTML = '';
  if (filtered.length === 0) {
    partsTable.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    partsTable.classList.remove('hidden');
    emptyState.classList.add('hidden');
    filtered.forEach(p => {
      const tr = document.createElement('tr');
      tr.className = 'border-b';
      tr.innerHTML = `
        <td class="p-2">${p.name}</td>
        <td class="p-2">${p.category}</td>
        <td class="p-2">${p.qty}</td>
        <td class="p-2">${p.location}</td>
        <td class="p-2">${p.notes}</td>
        <td class="p-2">
          <button onclick="deletePart('${p.id}')" class="px-2 py-1 border rounded text-red-600">Delete</button>
        </td>`;
      partsTbody.appendChild(tr);
    });
  }
  totalCount.textContent = parts.length;
}
function deletePart(id) {
  if (confirm("Are you sure you want to delete this part?")) {
    parts = parts.filter(p => p.id !== id);
    saveParts();
    renderParts();
    populateCategoryFilter();
  }
}

// FILTER & SEARCH

filterCategory.addEventListener('change', renderParts);
searchBox.addEventListener('input', () => renderParts());
function populateCategoryFilter() {
  const cats = [...new Set(parts.map(p => p.category))];
  const current = filterCategory.value;
  filterCategory.innerHTML = '<option value="">-- Filter by category --</option>';
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    filterCategory.appendChild(opt);
  });
  if (current) filterCategory.value = current;
}

// CSV EXPORT

exportCSV.addEventListener('click', () => {
  if (parts.length === 0) { alert("No data to export."); return; }
  const headers = ['id','name','category','qty','location','notes'];
  const rows = parts.map(p => headers.map(h => `"${(p[h]||"").toString().replace(/"/g,'""')}"`));
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "inventory_export.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// INIT

(function init(){
  loginHint.textContent = `Use ${USERNAME} / ${PASSWORD}`;
  renderAuth();
})();
